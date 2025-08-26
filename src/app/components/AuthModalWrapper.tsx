"use client";

import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';

// Wrapper component to use the auth context
export function AuthModalWrapper() {
  const { isAuthModalOpen, hideAuthModal } = useAuth();
  
  return (
    <AuthModal 
      isOpen={isAuthModalOpen} 
      onClose={hideAuthModal} 
    />
  );
}