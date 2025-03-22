
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getCurrentUser, login as dbLogin, logout as dbLogout, createUser, getUserByEmail, updateUser } from '../services/database';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<string | null>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock function to simulate sending an email with a code
const sendResetCodeEmail = (email: string, code: string): Promise<boolean> => {
  console.log(`Sending reset code ${code} to ${email}`);
  // This would be implemented with a real email service in production
  return Promise.resolve(true);
};

// Store reset codes (this would be in a database in a real app)
const resetCodes: Record<string, { code: string, timestamp: number }> = {};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const loggedInUser = dbLogin(email, password);
      setUser(loggedInUser);
      toast.success('Login successful!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Login failed', {
          description: error.message
        });
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, username: string, password: string) => {
    try {
      setIsLoading(true);
      const newUser = createUser({ email, username, password });
      setUser(newUser);
      toast.success('Account created successfully!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Signup failed', {
          description: error.message
        });
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    dbLogout();
    setUser(null);
    toast.info('You have been logged out');
  };

  const requestPasswordReset = async (email: string): Promise<string | null> => {
    try {
      setIsLoading(true);
      const user = getUserByEmail(email);
      
      if (!user) {
        toast.error('User not found', {
          description: 'No account found with this email address'
        });
        return null;
      }
      
      // Generate a 6-digit code
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store the code with a timestamp (expires in 15 minutes)
      resetCodes[email] = {
        code: resetCode,
        timestamp: Date.now() + 15 * 60 * 1000 // 15 minutes
      };
      
      // Send the code via email
      await sendResetCodeEmail(email, resetCode);
      
      toast.success('Password reset code sent', {
        description: 'Check your email for the reset code'
      });
      
      return resetCode;
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to send reset code', {
          description: error.message
        });
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, code: string, newPassword: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const resetData = resetCodes[email];
      
      if (!resetData) {
        toast.error('Invalid reset attempt', {
          description: 'No reset code was requested for this email'
        });
        return false;
      }
      
      if (Date.now() > resetData.timestamp) {
        toast.error('Reset code expired', {
          description: 'Please request a new code'
        });
        delete resetCodes[email];
        return false;
      }
      
      if (resetData.code !== code) {
        toast.error('Invalid code', {
          description: 'The code you entered is incorrect'
        });
        return false;
      }
      
      const user = getUserByEmail(email);
      
      if (!user) {
        toast.error('User not found', {
          description: 'No account found with this email address'
        });
        return false;
      }
      
      // Update the user's password
      updateUser(user.id, { password: newPassword });
      
      // Clear the reset code
      delete resetCodes[email];
      
      toast.success('Password reset successful', {
        description: 'You can now log in with your new password'
      });
      
      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to reset password', {
          description: error.message
        });
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      signup, 
      logout, 
      requestPasswordReset, 
      resetPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
