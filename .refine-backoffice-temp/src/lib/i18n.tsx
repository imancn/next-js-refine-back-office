'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '@/locales/en.json';
import arTranslations from '@/locales/ar.json';

export interface Language {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
}

export const languages: Language[] = [
  { code: 'en', name: 'English', direction: 'ltr' },
  { code: 'ar', name: 'العربية', direction: 'rtl' }
];

export const translations = {
  en: enTranslations,
  ar: arTranslations
};

export type Translation = typeof enTranslations;

interface I18nContextType {
  currentLanguage: Language;
  t: (key: string, params?: Record<string, any>) => string;
  changeLanguage: (languageCode: string) => void;
  direction: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      if (saved) {
        const lang = languages.find(l => l.code === saved);
        if (lang) return lang;
      }
      
      const browserLang = navigator.language.split('-')[0];
      const lang = languages.find(l => l.code === browserLang);
      if (lang) return lang;
    }
    return languages[0];
  });

  const t = (key: string, params?: Record<string, any>): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage.code as keyof typeof translations];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    if (params) {
      return value.replace(/\{(\w+)\}/g, (match: string, param: string) => {
        return params[param] !== undefined ? String(params[param]) : match;
      });
    }

    return value;
  };

  const changeLanguage = (languageCode: string) => {
    const language = languages.find(l => l.code === languageCode);
    if (language) {
      setCurrentLanguage(language);
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', languageCode);
        document.documentElement.dir = language.direction;
        document.documentElement.lang = language.code;
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = currentLanguage.direction;
      document.documentElement.lang = currentLanguage.code;
    }
  }, [currentLanguage]);

  const value: I18nContextType = {
    currentLanguage,
    t,
    changeLanguage,
    direction: currentLanguage.direction
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export default I18nProvider;