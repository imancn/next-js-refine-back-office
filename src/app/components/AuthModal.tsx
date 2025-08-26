'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Mail, Phone, Lock, Eye, EyeOff, User, Shield } from 'lucide-react';
import { useAuth, LoginCredentials, SignupData } from '../contexts/AuthContext';
import OTPInput from 'react-otp-input';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(6).optional(),
  otp: z.string().length(6).optional(),
}).refine((data) => {
  return (data.email || data.phone) && (data.password || data.otp);
}, {
  message: "Please provide either email or phone and either password or OTP",
});

const signupSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
}).refine((data) => {
  return data.email && data.password;
}, {
  message: "Please provide email and password",
});

const otpSchema = z.object({
  otp: z.string().length(6),
});

type AuthMode = 'login' | 'signup';
type LoginMethod = 'email' | 'phone' | 'google' | 'apple';
type SignupMethod = 'email' | 'phone' | 'google' | 'apple';
type VerificationMethod = 'password' | 'otp';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup, isLoading } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');
  const [signupMethod, setSignupMethod] = useState<SignupMethod>('email');
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>('password');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const loginForm = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const signupForm = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const otpForm = useForm<{ otp: string }>({
    resolver: zodResolver(otpSchema),
  });

  // Reset forms when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      loginForm.reset();
      signupForm.reset();
      otpForm.reset();
      setOtp('');
      setOtpSent(false);
      setMode('login');
      setLoginMethod('email');
      setSignupMethod('email');
      setVerificationMethod('password');
    }
  }, [isOpen, loginForm, signupForm, otpForm]);

  // Handle OAuth login
  const handleOAuthLogin = async (provider: 'google' | 'apple') => {
    try {
      await login({ provider });
    } catch (error) {
      console.error('OAuth login failed:', error);
    }
  };

  // Handle OAuth signup
  const handleOAuthSignup = async (provider: 'google' | 'apple') => {
    try {
      await signup({ provider });
    } catch (error) {
      console.error('OAuth signup failed:', error);
    }
  };

  // Handle login form submission
  const handleLoginSubmit = async (data: LoginCredentials) => {
    try {
      if (verificationMethod === 'otp') {
        data.otp = otp;
      }
      await login(data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Handle signup form submission
  const handleSignupSubmit = async (data: SignupData) => {
    try {
      await signup(data);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async (data: { otp: string }) => {
    try {
      const loginData = loginForm.getValues();
      await login({ ...loginData, otp: data.otp });
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };

  // Send OTP
  const handleSendOtp = async () => {
    try {
      const data = loginForm.getValues();
      if (loginMethod === 'email' && data.email) {
        // Call API to send email OTP
        const response = await fetch('/api/auth/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: data.email }),
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('OTP sent successfully:', result);
          setOtpSent(true);
        } else {
          const error = await response.json();
          console.error('Failed to send OTP:', error);
        }
      } else if (loginMethod === 'phone' && data.phone) {
        // Call API to send SMS OTP
        const response = await fetch('/api/auth/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone: data.phone }),
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('OTP sent successfully:', result);
          setOtpSent(true);
        } else {
          const error = await response.json();
          console.error('Failed to send OTP:', error);
        }
      }
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={(e) => {
          // Only close if clicking directly on the backdrop, not on modal content
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'login' ? (
            <LoginForm
              loginMethod={loginMethod}
              setLoginMethod={setLoginMethod}
              verificationMethod={verificationMethod}
              setVerificationMethod={setVerificationMethod}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              otpSent={otpSent}
              otp={otp}
              setOtp={setOtp}
              onSendOtp={handleSendOtp}
              onSubmit={handleLoginSubmit}
              onOtpSubmit={handleOtpSubmit}
              onOAuthLogin={handleOAuthLogin}
              form={loginForm}
              isLoading={isLoading}
            />
          ) : (
            <SignupForm
              signupMethod={signupMethod}
              setSignupMethod={setSignupMethod}
              showPassword={showSignupPassword}
              setShowPassword={setShowSignupPassword}
              onSubmit={handleSignupSubmit}
              onOAuthSignup={handleOAuthSignup}
              form={signupForm}
              isLoading={isLoading}
            />
          )}

          {/* Mode toggle */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Form Component
interface LoginFormProps {
  loginMethod: LoginMethod;
  setLoginMethod: (method: LoginMethod) => void;
  verificationMethod: VerificationMethod;
  setVerificationMethod: (method: VerificationMethod) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  otpSent: boolean;
  otp: string;
  setOtp: (otp: string) => void;
  onSendOtp: () => void;
  onSubmit: (data: LoginCredentials) => void;
  onOtpSubmit: (data: { otp: string }) => void;
  onOAuthLogin: (provider: 'google' | 'apple') => void;
  form: any;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginMethod,
  setLoginMethod,
  verificationMethod,
  setVerificationMethod,
  showPassword,
  setShowPassword,
  otpSent,
  otp,
  setOtp,
  onSendOtp,
  onSubmit,
  onOtpSubmit,
  onOAuthLogin,
  form,
  isLoading,
}) => {
  const { register, handleSubmit, watch, formState: { errors } } = form;

  return (
    <div className="space-y-4">
      {/* OAuth Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => onOAuthLogin('google')}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        
        <button
          onClick={() => onOAuthLogin('apple')}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-black text-sm font-medium text-white hover:bg-gray-900 disabled:opacity-50"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Continue with Apple
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Login Method Tabs - Moved below "Or continue with" */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {(['email', 'phone'] as const).map((method) => (
          <button
            key={method}
            onClick={() => setLoginMethod(method)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              loginMethod === method
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {method === 'email' ? <Mail className="w-4 h-4 inline mr-1" /> : <Phone className="w-4 h-4 inline mr-1" />}
            {method.charAt(0).toUpperCase() + method.slice(1)}
          </button>
        ))}
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email/Phone Input */}
        {loginMethod === 'email' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('email')}
                type="email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone number
            </label>
            <PhoneInput
              {...register('phone')}
              international
              defaultCountry="US"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        )}

        {/* Verification Method Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {(['password', 'otp'] as const).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setVerificationMethod(method)}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                verificationMethod === method
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {method === 'password' ? <Lock className="w-4 h-4 inline mr-1" /> : <Shield className="w-4 h-4 inline mr-1" />}
              {method.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Password Input */}
        {verificationMethod === 'password' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
        )}

        {/* OTP Input */}
        {verificationMethod === 'otp' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            {!otpSent ? (
              <button
                type="button"
                onClick={onSendOtp}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Verification Code
              </button>
            ) : (
              <div className="space-y-3">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(inputProps, index) => (
                    <input
                      {...inputProps}
                      style={{
                        width: '40px',
                        height: '40px',
                        margin: '0 4px',
                        fontSize: '16px',
                        borderRadius: '4px',
                        border: '1px solid #d1d5db',
                        textAlign: 'center',
                      }}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={onSendOtp}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Resend Code
                </button>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || (verificationMethod === 'otp' && !otpSent)}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

// Signup Form Component
interface SignupFormProps {
  signupMethod: SignupMethod;
  setSignupMethod: (method: SignupMethod) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  onSubmit: (data: SignupData) => void;
  onOAuthSignup: (provider: 'google' | 'apple') => void;
  form: any;
  isLoading: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({
  signupMethod,
  setSignupMethod,
  showPassword,
  setShowPassword,
  onSubmit,
  onOAuthSignup,
  form,
  isLoading,
}) => {
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <div className="space-y-4">
      {/* OAuth Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => onOAuthSignup('google')}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        
        <button
          onClick={() => onOAuthSignup('apple')}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-black text-sm font-medium text-white hover:bg-gray-900 disabled:opacity-50"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Continue with Apple
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Signup Method Tabs - Moved below "Or continue with" */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {(['email', 'phone'] as const).map((method) => (
          <button
            key={method}
            onClick={() => setSignupMethod(method)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              signupMethod === method
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {method === 'email' ? <Mail className="w-4 h-4 inline mr-1" /> : <Phone className="w-4 h-4 inline mr-1" />}
            {method.charAt(0).toUpperCase() + method.slice(1)}
          </button>
        ))}
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('firstName')}
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="First name"
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('lastName')}
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Last name"
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email/Phone Input */}
        {signupMethod === 'email' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('email')}
                type="email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone number
            </label>
            <PhoneInput
              {...register('phone')}
              international
              defaultCountry="US"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        )}

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};