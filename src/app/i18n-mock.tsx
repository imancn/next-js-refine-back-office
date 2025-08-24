'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Language {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
}

interface Translation {
  [key: string]: string | Translation;
}

interface I18nContextType {
  t: (key: string, params?: Record<string, any>) => string;
  currentLanguage: string;
  changeLanguage: (languageCode: string) => void;
  direction: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Mock translations
const translations: Record<string, Translation> = {
  en: {
    common: {
      actions: 'Actions',
      create: 'Create',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      loading: 'Loading...',
      noData: 'No data available',
      error: 'An error occurred',
      success: 'Success',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      close: 'Close',
      view: 'View',
      details: 'Details',
      history: 'History',
      dashboard: 'Dashboard',
      settings: 'Settings',
      profile: 'Profile',
      logout: 'Logout',
      language: 'Language',
      theme: 'Theme',
      dark: 'Dark',
      light: 'Light'
    },
    navigation: {
      dashboard: 'Dashboard',
      users: 'Users',
      products: 'Products',
      orders: 'Orders',
      reports: 'Reports',
      analytics: 'Analytics'
    },
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome to your back-office',
      stats: {
        totalUsers: 'Total Users',
        totalProducts: 'Total Products',
        totalOrders: 'Total Orders',
        totalRevenue: 'Total Revenue'
      },
      recentActivity: 'Recent Activity',
      quickActions: 'Quick Actions'
    },
    users: {
      title: 'Users',
      createTitle: 'Create User',
      editTitle: 'Edit User',
      showTitle: 'User Details',
      fields: {
        email: 'Email',
        firstName: 'First Name',
        lastName: 'Last Name',
        role: 'Role',
        avatar: 'Avatar',
        isActive: 'Active Status',
        createdAt: 'Created At',
        updatedAt: 'Updated At'
      },
      roles: {
        admin: 'Administrator',
        user: 'User',
        manager: 'Manager'
      }
    },
    products: {
      title: 'Products',
      createTitle: 'Create Product',
      editTitle: 'Edit Product',
      showTitle: 'Product Details',
      fields: {
        name: 'Product Name',
        description: 'Description',
        price: 'Price',
        category: 'Category',
        stock: 'Stock Quantity',
        sku: 'SKU',
        image: 'Product Image'
      }
    },
    orders: {
      title: 'Orders',
      createTitle: 'Create Order',
      editTitle: 'Edit Order',
      showTitle: 'Order Details',
      fields: {
        orderNumber: 'Order Number',
        customerId: 'Customer ID',
        customerName: 'Customer Name',
        total: 'Total Amount',
        status: 'Status',
        createdAt: 'Created At',
        updatedAt: 'Updated At'
      }
    },
    charts: {
      noData: 'No data available for chart'
    },
    forms: {
      validation: {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        min: 'Value must be at least {min}',
        url: 'Please enter a valid URL'
      }
    },
    history: {
      noChanges: 'No changes recorded',
      actions: {
        CREATE: 'Created',
        UPDATE: 'Updated',
        DELETE: 'Deleted'
      }
    }
  }
};

const languages: Language[] = [
  { code: 'en', name: 'English', direction: 'ltr' },
  { code: 'ar', name: 'العربية', direction: 'rtl' }
];

export function I18nProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const t = (key: string, params?: Record<string, any>): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    if (typeof value === 'string') {
      if (params) {
        return value.replace(/\{(\w+)\}/g, (match, param) => {
          return params[param]?.toString() || match;
        });
      }
      return value;
    }

    return key;
  };

  const changeLanguage = (languageCode: string) => {
    setCurrentLanguage(languageCode);
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);
  const direction = currentLang?.direction || 'ltr';

  return (
    <I18nContext.Provider value={{
      t,
      currentLanguage,
      changeLanguage,
      direction
    }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}