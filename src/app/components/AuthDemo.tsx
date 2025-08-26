'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, LogOut, User, Shield, Mail, Phone } from 'lucide-react';

export const AuthDemo: React.FC = () => {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    showAuthModal, 
    logout 
  } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to BackOffice
          </h2>
          <p className="text-gray-600">
            Please sign in to access your dashboard
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={showAuthModal}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Available authentication methods:
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <div className="flex items-center text-xs text-gray-600">
                <Mail className="w-4 h-4 mr-1" />
                Email
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <Phone className="w-4 h-4 mr-1" />
                Phone
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <Shield className="w-4 h-4 mr-1" />
                OAuth
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <User className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back!
        </h2>
        <p className="text-gray-600">
          You are successfully authenticated
        </p>
      </div>
      
      <div className="space-y-4">
        {/* User Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">User Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{user?.email}</span>
            </div>
            {user?.phone && (
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{user.phone}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Role:</span>
              <span className="font-medium capitalize">{user?.role.toLowerCase().replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`font-medium ${
                user?.status === 'ACTIVE' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {user?.status}
              </span>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Verification Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Email Verified:</span>
              <span className={`font-medium ${
                user?.emailVerified ? 'text-green-600' : 'text-red-600'
              }`}>
                {user?.emailVerified ? 'Yes' : 'No'}
              </span>
            </div>
            {user?.phone && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Phone Verified:</span>
                <span className={`font-medium ${
                  user?.phoneVerified ? 'text-green-600' : 'text-red-600'
                }`}>
                  {user?.phoneVerified ? 'Yes' : 'No'}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">2FA Enabled:</span>
              <span className={`font-medium ${
                user?.twoFactorEnabled ? 'text-green-600' : 'text-gray-600'
              }`}>
                {user?.twoFactorEnabled ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={showAuthModal}
            className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            <User className="w-5 h-5 mr-2" />
            Manage Account
          </button>
          
          <button
            onClick={logout}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};