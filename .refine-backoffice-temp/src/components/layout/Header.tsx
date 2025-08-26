'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { cn, buttonVariants, badgeVariants } from '@/lib/utils';
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  Globe,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  const { t, currentLanguage, changeLanguage, direction } = useI18n();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New user registered', type: 'info', read: false },
    { id: 2, message: 'Order #1234 has been shipped', type: 'success', read: false },
    { id: 3, message: 'Low stock alert for Product A', type: 'warning', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    setShowLanguageMenu(false);
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logout clicked');
  };

  return (
    <header className={cn(
      'sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      'flex h-16 items-center justify-between px-4 sm:px-6',
      direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'
    )}>
      {/* Left side - Menu toggle and search */}
      <div className={cn(
        'flex items-center gap-4',
        direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'
      )}>
        <button
          onClick={onMenuToggle}
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'lg:hidden'
          )}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('common.search')}
            className="h-9 w-64 rounded-md border border-input bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Right side - Actions and user menu */}
      <div className={cn(
        'flex items-center gap-2',
        direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'
      )}>
        {/* Language switcher */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'relative'
            )}
            aria-label="Change language"
          >
            <Globe className="h-5 w-5" />
          </button>

          {showLanguageMenu && (
            <div className={cn(
              'absolute top-full mt-2 min-w-32 rounded-md border bg-popover p-1 shadow-lg',
              direction === 'rtl' ? 'left-0' : 'right-0'
            )}>
              <button
                onClick={() => handleLanguageChange('en')}
                className={cn(
                  'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent',
                  currentLanguage.code === 'en' && 'bg-accent'
                )}
              >
                🇺🇸 English
              </button>
              <button
                onClick={() => handleLanguageChange('ar')}
                className={cn(
                  'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent',
                  currentLanguage.code === 'ar' && 'bg-accent'
                )}
              >
                🇸🇦 العربية
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'relative'
            )}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className={cn(
                badgeVariants({ variant: 'destructive' }),
                'absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs'
              )}>
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'relative'
            )}
            aria-label="User menu"
          >
            <User className="h-5 w-5" />
          </button>

          {showUserMenu && (
            <div className={cn(
              'absolute top-full mt-2 min-w-48 rounded-md border bg-popover p-1 shadow-lg',
              direction === 'rtl' ? 'left-0' : 'right-0'
            )}>
              <div className="px-3 py-2 text-sm font-medium border-b">
                admin@example.com
              </div>
              <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent">
                <User className="h-4 w-4" />
                {t('common.profile')}
              </button>
              <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent">
                <Settings className="h-4 w-4" />
                {t('common.settings')}
              </button>
              <div className="border-t" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-destructive hover:bg-accent"
              >
                <LogOut className="h-4 w-4" />
                {t('common.logout')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click outside handlers */}
      {(showUserMenu || showLanguageMenu) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowUserMenu(false);
            setShowLanguageMenu(false);
          }}
        />
      )}
    </header>
  );
};