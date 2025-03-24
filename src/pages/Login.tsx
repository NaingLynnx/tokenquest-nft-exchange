
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, LockKeyhole, Mail } from 'lucide-react';
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

const loginSchema = z.object({
  email: z.string().min(1, 'Please enter your email or username'),
  password: z.string().min(1, 'Please enter your password'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      navigate('/games');
    } catch (error) {
      // Error is handled in the auth context
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-md mx-auto">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </Link>
          
          <GlassCard className="p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">
                Log in to your SF Token account
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Enter your email or username" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link 
                          to="/forgot-password" 
                          className="text-xs text-token-blue hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="password" 
                            placeholder="Enter your password" 
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
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Log In</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-token-blue hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
