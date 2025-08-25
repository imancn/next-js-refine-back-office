'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define the types for all frontend settings
export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  primaryColor: string;
  sidebarCollapsed: boolean;
  compactMode: boolean;
  showAnimations: boolean;
  fontSize: 'small' | 'medium' | 'large';
  sidebarWidth: 'narrow' | 'normal' | 'wide';
  tableDensity: 'compact' | 'comfortable' | 'spacious';
  showGridLines: boolean;
  enableHoverEffects: boolean;
}

export interface UISettings {
  showBreadcrumbs: boolean;
  showPageTitle: boolean;
  showSearchBar: boolean;
  enableKeyboardShortcuts: boolean;
  showTooltips: boolean;
  enableDragAndDrop: boolean;
  showLoadingSpinners: boolean;
  enableInfiniteScroll: boolean;
}

export interface DisplaySettings {
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  timeFormat: '12h' | '24h';
  numberFormat: 'comma' | 'dot' | 'space';
  currencySymbol: string;
  showCurrencyCode: boolean;
  decimalPlaces: number;
  enableScientificNotation: boolean;
}

export interface SessionSettings {
  autoSave: boolean;
  autoSaveInterval: number; // in minutes
  rememberLastPage: boolean;
  rememberFilters: boolean;
  rememberSortOrder: boolean;
  enableOfflineMode: boolean;
  cacheExpiry: number; // in hours
}

export interface FrontendSettings {
  appearance: AppearanceSettings;
  ui: UISettings;
  display: DisplaySettings;
  session: SessionSettings;
}

// Default settings
const defaultSettings: FrontendSettings = {
  appearance: {
    theme: 'auto',
    primaryColor: '#3b82f6',
    sidebarCollapsed: false,
    compactMode: false,
    showAnimations: true,
    fontSize: 'medium',
    sidebarWidth: 'normal',
    tableDensity: 'comfortable',
    showGridLines: true,
    enableHoverEffects: true,
  },
  ui: {
    showBreadcrumbs: true,
    showPageTitle: true,
    showSearchBar: true,
    enableKeyboardShortcuts: true,
    showTooltips: true,
    enableDragAndDrop: true,
    showLoadingSpinners: true,
    enableInfiniteScroll: false,
  },
  display: {
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '24h',
    numberFormat: 'comma',
    currencySymbol: '$',
    showCurrencyCode: true,
    decimalPlaces: 2,
    enableScientificNotation: false,
  },
  session: {
    autoSave: true,
    autoSaveInterval: 5,
    rememberLastPage: true,
    rememberFilters: true,
    rememberSortOrder: true,
    enableOfflineMode: false,
    cacheExpiry: 24,
  },
};

interface SettingsContextType {
  settings: FrontendSettings;
  updateSetting: <K extends keyof FrontendSettings, S extends keyof FrontendSettings[K]>(
    section: K,
    key: S,
    value: FrontendSettings[K][S]
  ) => void;
  updateAppearanceSetting: <K extends keyof AppearanceSettings>(
    key: K,
    value: AppearanceSettings[K]
  ) => void;
  updateUISetting: <K extends keyof UISettings>(
    key: K,
    value: UISettings[K]
  ) => void;
  updateDisplaySetting: <K extends keyof DisplaySettings>(
    key: K,
    value: DisplaySettings[K]
  ) => void;
  updateSessionSetting: <K extends keyof SessionSettings>(
    key: K,
    value: SessionSettings[K]
  ) => void;
  resetToDefaults: () => void;
  resetSection: <K extends keyof FrontendSettings>(section: K) => void;
  hasUnsavedChanges: boolean;
  saveSettings: () => void;
  discardChanges: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<FrontendSettings>(defaultSettings);
  const [originalSettings, setOriginalSettings] = useState<FrontendSettings>(defaultSettings);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('frontend-settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        // Merge with defaults to ensure all properties exist
        const mergedSettings = mergeWithDefaults(parsed);
        setSettings(mergedSettings);
        setOriginalSettings(mergedSettings);
      }
    } catch (error) {
      console.warn('Failed to load settings from localStorage:', error);
    }
  }, []);

  // Apply theme changes immediately
  useEffect(() => {
    applyTheme(settings.appearance.theme);
  }, [settings.appearance.theme]);

  // Apply font size changes immediately
  useEffect(() => {
    applyFontSize(settings.appearance.fontSize);
  }, [settings.appearance.fontSize]);

  // Apply primary color changes immediately
  useEffect(() => {
    applyPrimaryColor(settings.appearance.primaryColor);
  }, [settings.appearance.primaryColor]);

  const mergeWithDefaults = (savedSettings: Partial<FrontendSettings>): FrontendSettings => {
    return {
      appearance: { ...defaultSettings.appearance, ...savedSettings.appearance },
      ui: { ...defaultSettings.ui, ...savedSettings.ui },
      display: { ...defaultSettings.display, ...savedSettings.display },
      session: { ...defaultSettings.session, ...savedSettings.session },
    };
  };

  const applyTheme = (theme: 'light' | 'dark' | 'auto') => {
    const root = document.documentElement;
    
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const isDark = mediaQuery.matches;
      root.classList.toggle('dark', isDark);
      
      // Listen for system theme changes
      const handleChange = (e: MediaQueryListEvent) => {
        root.classList.toggle('dark', e.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  };

  const applyFontSize = (fontSize: 'small' | 'medium' | 'large') => {
    const root = document.documentElement;
    const sizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
    };
    root.style.fontSize = sizes[fontSize];
  };

  const applyPrimaryColor = (color: string) => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', color);
    
    // Generate CSS custom properties for the color palette
    const rgb = hexToRgb(color);
    if (rgb) {
      root.style.setProperty('--primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
      root.style.setProperty('--primary-light', generateLightColor(color));
      root.style.setProperty('--primary-dark', generateDarkColor(color));
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const generateLightColor = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const factor = 0.3;
    return `rgb(${Math.round(rgb.r + (255 - rgb.r) * factor)}, ${Math.round(rgb.g + (255 - rgb.g) * factor)}, ${Math.round(rgb.b + (255 - rgb.b) * factor)})`;
  };

  const generateDarkColor = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const factor = 0.3;
    return `rgb(${Math.round(rgb.r * factor)}, ${Math.round(rgb.g * factor)}, ${Math.round(rgb.b * factor)})`;
  };

  const updateSetting = <K extends keyof FrontendSettings, S extends keyof FrontendSettings[K]>(
    section: K,
    key: S,
    value: FrontendSettings[K][S]
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const updateAppearanceSetting = <K extends keyof AppearanceSettings>(
    key: K,
    value: AppearanceSettings[K]
  ) => {
    updateSetting('appearance', key, value);
  };

  const updateUISetting = <K extends keyof UISettings>(
    key: K,
    value: UISettings[K]
  ) => {
    updateSetting('ui', key, value);
  };

  const updateDisplaySetting = <K extends keyof DisplaySettings>(
    key: K,
    value: DisplaySettings[K]
  ) => {
    updateSetting('display', key, value);
  };

  const updateSessionSetting = <K extends keyof SessionSettings>(
    key: K,
    value: SessionSettings[K]
  ) => {
    updateSetting('session', key, value);
  };

  const saveSettings = () => {
    try {
      localStorage.setItem('frontend-settings', JSON.stringify(settings));
      setOriginalSettings(settings);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to save settings to localStorage:', error);
    }
  };

  const discardChanges = () => {
    setSettings(originalSettings);
    setHasUnsavedChanges(false);
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    setHasUnsavedChanges(true);
  };

  const resetSection = <K extends keyof FrontendSettings>(section: K) => {
    setSettings(prev => ({
      ...prev,
      [section]: defaultSettings[section],
    }));
    setHasUnsavedChanges(true);
  };

  const value: SettingsContextType = {
    settings,
    updateSetting,
    updateAppearanceSetting,
    updateUISetting,
    updateDisplaySetting,
    updateSessionSetting,
    resetToDefaults,
    resetSection,
    hasUnsavedChanges,
    saveSettings,
    discardChanges,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};