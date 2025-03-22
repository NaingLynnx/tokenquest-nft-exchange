
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  ArrowRight, 
  Mail, 
  LockKeyhole, 
  MailCheck,
  KeyRound
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Step 1: Request password reset
const requestSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Step 2: Verify code and set new password
const resetSchema = z.object({
  code: z.string().length(6, 'Code must be 6 digits'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RequestFormValues = z.infer<typeof requestSchema>;
type ResetFormValues = z.infer<typeof resetSchema>;

const ForgotPassword = () => {
  const { requestPasswordReset, resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  // Form for requesting a reset code
  const requestForm = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      email: '',
    },
  });

  // Form for verifying code and setting new password
  const resetForm = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      code: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onRequestSubmit = async (data: RequestFormValues) => {
    try {
      const result = await requestPasswordReset(data.email);
      if (result) {
        setEmail(data.email);
        setStep(2);
      }
    } catch (error) {
      console.error('Reset request error:', error);
    }
  };

  const onResetSubmit = async (data: ResetFormValues) => {
    try {
      const success = await resetPassword(email, data.code, data.newPassword);
      if (success) {
        setShowSuccessDialog(true);
      }
    } catch (error) {
      console.error('Password reset error:', error);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-md mx-auto">
          <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
          </Link>
          
          <GlassCard className="p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
              <p className="text-muted-foreground">
                {step === 1 
                  ? "Enter your email to reset your password" 
                  : "Enter the code sent to your email"}
              </p>
            </div>
            
            {step === 1 ? (
              // Step 1: Request reset code
              <Form {...requestForm}>
                <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="space-y-6">
                  <FormField
                    control={requestForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="Enter your registered email" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full rounded-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Send Reset Code</span>
                        <MailCheck className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              // Step 2: Enter code and new password
              <Form {...resetForm}>
                <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-6">
                  <Alert>
                    <KeyRound className="h-4 w-4" />
                    <AlertTitle>Reset code sent!</AlertTitle>
                    <AlertDescription>
                      We've sent a 6-digit code to {email}
                    </AlertDescription>
                  </Alert>
                  
                  <FormField
                    control={resetForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reset Code</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={resetForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="password" 
                              placeholder="Enter new password" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={resetForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="password" 
                              placeholder="Confirm new password" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex flex-col space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full rounded-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Resetting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>Reset Password</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full rounded-full" 
                      onClick={() => setStep(1)}
                    >
                      <div className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </div>
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </GlassCard>
        </div>
      </main>
      
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Password Reset Successful</DialogTitle>
            <DialogDescription>
              Your password has been reset successfully. You can now log in with your new password.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={navigateToLogin}>Go to Login</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
