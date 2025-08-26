'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { direction } = useI18n();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <main
        className={cn(
          'transition-all duration-200 ease-in-out',
          'pt-16', // Account for fixed header
          'lg:pl-64', // Account for sidebar on desktop
          direction === 'rtl' ? 'lg:pr-64 lg:pl-0' : 'lg:pl-64'
        )}
      >
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};