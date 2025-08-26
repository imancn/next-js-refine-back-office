'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios, { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

// Types
export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  emailVerified?: Date;
  phoneVerified?: Date;
  twoFactorEnabled: boolean;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'USER' | 'GUEST';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  showAuthModal: () => void;
  hideAuthModal: () => void;
  isAuthModalOpen: boolean;
  verifyEmail: (token: string) => Promise<void>;
  verifyPhone: (token: string) => Promise<void>;
  sendEmailVerification: (email: string) => Promise<void>;
  sendPhoneVerification: (phone: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (token: string, password: string) => Promise<void>;
  enable2FA: () => Promise<void>;
  disable2FA: () => Promise<void>;
  verify2FA: (token: string) => Promise<void>;
}

export interface LoginCredentials {
  email?: string;
  phone?: string;
  password?: string;
  otp?: string;
  provider?: 'google' | 'apple';
  twoFactorToken?: string;
}

export interface SignupData {
  email?: string;
  phone?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  provider?: 'google' | 'apple';
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Constants
const COOKIE_NAMES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
} as const;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Axios instance with interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        await refreshAuthTokens();
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, show auth modal
        window.dispatchEvent(new CustomEvent('showAuthModal'));
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

// Helper functions
const setAuthCookies = (tokens: AuthTokens, userId: string) => {
  const cookieOptions = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    expires: 30, // 30 days
  };

  Cookies.set(COOKIE_NAMES.ACCESS_TOKEN, tokens.accessToken, cookieOptions);
  Cookies.set(COOKIE_NAMES.REFRESH_TOKEN, tokens.refreshToken, cookieOptions);
  Cookies.set(COOKIE_NAMES.USER_ID, userId, cookieOptions);
};

const clearAuthCookies = () => {
  Cookies.remove(COOKIE_NAMES.ACCESS_TOKEN);
  Cookies.remove(COOKIE_NAMES.REFRESH_TOKEN);
  Cookies.remove(COOKIE_NAMES.USER_ID);
};

const refreshAuthTokens = async (): Promise<void> => {
  const refreshToken = Cookies.get(COOKIE_NAMES.REFRESH_TOKEN);
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken, userId } = response.data;
    
    setAuthCookies(
      { accessToken, refreshToken: newRefreshToken, expiresIn: 3600 },
      userId
    );
  } catch (error) {
    clearAuthCookies();
    throw error;
  }
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const router = useRouter();

  const isAuthenticated = !!user;

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = Cookies.get(COOKIE_NAMES.ACCESS_TOKEN);
        const userId = Cookies.get(COOKIE_NAMES.USER_ID);

        if (accessToken && userId) {
          // Set auth header
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          
          // Fetch user data
          const response = await api.get(`/auth/me`);
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        clearAuthCookies();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Listen for auth modal events
  useEffect(() => {
    const handleShowAuthModal = () => setIsAuthModalOpen(true);
    const handleHideAuthModal = () => setIsAuthModalOpen(false);

    window.addEventListener('showAuthModal', handleShowAuthModal);
    window.addEventListener('hideAuthModal', handleHideAuthModal);

    return () => {
      window.removeEventListener('showAuthModal', handleShowAuthModal);
      window.removeEventListener('hideAuthModal', handleHideAuthModal);
    };
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      
      const response = await api.post('/auth/login', credentials);
      const { user: userData, accessToken, refreshToken, userId } = response.data;

      setAuthCookies(
        { accessToken, refreshToken, expiresIn: 3600 },
        userId
      );

      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setUser(userData);
      setIsAuthModalOpen(false);
      
      toast.success('Successfully logged in!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (userData: SignupData): Promise<void> => {
    try {
      setIsLoading(true);
      
      const response = await api.post('/auth/signup', userData);
      const { user: newUser, accessToken, refreshToken, userId } = response.data;

      setAuthCookies(
        { accessToken, refreshToken, expiresIn: 3600 },
        userId
      );

      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setUser(newUser);
      setIsAuthModalOpen(false);
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Signup failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthCookies();
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
      setIsAuthModalOpen(false);
      router.push('/');
      toast.success('Logged out successfully');
    }
  }, [router]);

  const refreshAuth = useCallback(async (): Promise<void> => {
    try {
      await refreshAuthTokens();
      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      console.error('Auth refresh failed:', error);
      clearAuthCookies();
      setUser(null);
      throw error;
    }
  }, []);

  const showAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const hideAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const verifyEmail = useCallback(async (token: string): Promise<void> => {
    try {
      const response = await api.post('/auth/verify-email', { token });
      setUser(response.data.user);
      toast.success('Email verified successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Email verification failed';
      toast.error(message);
      throw error;
    }
  }, []);

  const verifyPhone = useCallback(async (token: string): Promise<void> => {
    try {
      const response = await api.post('/auth/verify-phone', { token });
      setUser(response.data.user);
      toast.success('Phone verified successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Phone verification failed';
      toast.error(message);
      throw error;
    }
  }, []);

  const sendEmailVerification = useCallback(async (email: string): Promise<void> => {
    try {
      await api.post('/auth/send-email-verification', { email });
      toast.success('Verification email sent!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send verification email';
      toast.error(message);
      throw error;
    }
  }, []);

  const sendPhoneVerification = useCallback(async (phone: string): Promise<void> => {
    try {
      await api.post('/auth/send-phone-verification', { phone });
      toast.success('Verification SMS sent!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send verification SMS';
      toast.error(message);
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<void> => {
    try {
      await api.post('/auth/reset-password', { email });
      toast.success('Password reset email sent!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send reset email';
      toast.error(message);
      throw error;
    }
  }, []);

  const updatePassword = useCallback(async (token: string, password: string): Promise<void> => {
    try {
      await api.post('/auth/update-password', { token, password });
      toast.success('Password updated successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update password';
      toast.error(message);
      throw error;
    }
  }, []);

  const enable2FA = useCallback(async (): Promise<void> => {
    try {
      const response = await api.post('/auth/enable-2fa');
      toast.success('2FA enabled successfully!');
      setUser(response.data.user);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to enable 2FA';
      toast.error(message);
      throw error;
    }
  }, []);

  const disable2FA = useCallback(async (): Promise<void> => {
    try {
      const response = await api.post('/auth/disable-2fa');
      toast.success('2FA disabled successfully!');
      setUser(response.data.user);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to disable 2FA';
      toast.error(message);
      throw error;
    }
  }, []);

  const verify2FA = useCallback(async (token: string): Promise<void> => {
    try {
      const response = await api.post('/auth/verify-2fa', { token });
      setUser(response.data.user);
      toast.success('2FA verified successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || '2FA verification failed';
      toast.error(message);
      throw error;
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    refreshAuth,
    showAuthModal,
    hideAuthModal,
    isAuthModalOpen,
    verifyEmail,
    verifyPhone,
    sendEmailVerification,
    sendPhoneVerification,
    resetPassword,
    updatePassword,
    enable2FA,
    disable2FA,
    verify2FA,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};