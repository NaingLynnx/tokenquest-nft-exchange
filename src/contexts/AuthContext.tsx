
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getCurrentUser, login as dbLogin, logout as dbLogout, createUser, getUserByEmail, updateUser, getAllUsers } from '../services/database';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string, additionalData?: Record<string, any>) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
    
    // Debug: Log all users in localStorage
    console.log('All users in database:', getAllUsers());
  }, []);

  const login = async (emailOrUsername: string, password: string) => {
    try {
      setIsLoading(true);
      const loggedInUser = dbLogin(emailOrUsername, password);
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

  const signup = async (email: string, username: string, password: string, additionalData?: Record<string, any>) => {
    try {
      setIsLoading(true);
      const newUser = createUser({ 
        email, 
        username, 
        password,
        ...additionalData
      });
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

  const requestPasswordReset = async (email: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Check if user exists
      const user = getUserByEmail(email);
      if (!user) {
        toast.error('User not found', {
          description: 'No account found with this email address'
        });
        return;
      }
      
      // Generate a 6-digit code
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store token in Supabase - set to expire in 15 minutes
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      
      const { error: tokenError } = await supabase
        .from('reset_tokens')
        .insert({
          email,
          token: resetCode,
          expires_at: expiresAt
        });
        
      if (tokenError) {
        console.error('Error storing reset token:', tokenError);
        toast.error('Failed to initiate password reset', {
          description: 'Please try again later'
        });
        return;
      }
      
      // Send the reset email using our edge function
      const { error: emailError } = await supabase.functions.invoke('send-reset-email', {
        body: { email, resetToken: resetCode }
      });
      
      if (emailError) {
        console.error('Error sending reset email:', emailError);
        toast.error('Failed to send reset email', {
          description: 'Please try again later'
        });
        return;
      }
      
      toast.success('Password reset email sent', {
        description: 'Check your email for the reset code'
      });
      
    } catch (error) {
      console.error('Password reset request error:', error);
      if (error instanceof Error) {
        toast.error('Failed to send reset code', {
          description: error.message
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, code: string, newPassword: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Verify the reset token
      const { data: tokens, error: fetchError } = await supabase
        .from('reset_tokens')
        .select('*')
        .eq('email', email)
        .eq('token', code)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (fetchError || !tokens || tokens.length === 0) {
        toast.error('Invalid or expired code', {
          description: 'Please request a new code'
        });
        return false;
      }
      
      const resetToken = tokens[0];
      
      // Get the user
      const user = getUserByEmail(email);
      
      if (!user) {
        toast.error('User not found', {
          description: 'No account found with this email address'
        });
        return false;
      }
      
      // Update the user's password
      updateUser(user.id, { password: newPassword });
      
      // Mark the token as used
      const { error: updateError } = await supabase
        .from('reset_tokens')
        .update({ used: true })
        .eq('id', resetToken.id);
      
      if (updateError) {
        console.error('Error marking token as used:', updateError);
      }
      
      toast.success('Password reset successful', {
        description: 'You can now log in with your new password'
      });
      
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
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
