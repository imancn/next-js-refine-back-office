'use client';

import { useCallback } from 'react';
import { useSettings, FrontendSettings } from '../contexts/SettingsContext';

export const useSettingsStorage = () => {
  const { settings, saveSettings, resetToDefaults, hasUnsavedChanges } = useSettings();

  // Export settings to JSON file
  const exportSettings = useCallback(() => {
    try {
      const dataStr = JSON.stringify(settings, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `frontend-settings-${new Date().toISOString().split('T')[0]}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error('Failed to export settings:', error);
      return false;
    }
  }, [settings]);

  // Import settings from JSON file
  const importSettings = useCallback((file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedSettings = JSON.parse(content) as Partial<FrontendSettings>;
          
          // Validate the imported settings structure
          if (isValidSettings(importedSettings)) {
            // Store the imported settings
            localStorage.setItem('frontend-settings', JSON.stringify(importedSettings));
            
            // Reload the page to apply new settings
            window.location.reload();
            resolve(true);
          } else {
            console.error('Invalid settings file format');
            resolve(false);
          }
        } catch (error) {
          console.error('Failed to parse settings file:', error);
          resolve(false);
        }
      };
      
      reader.onerror = () => {
        console.error('Failed to read settings file');
        resolve(false);
      };
      
      reader.readAsText(file);
    });
  }, []);

  // Clear all settings and reset to defaults
  const clearAllSettings = useCallback(() => {
    try {
      localStorage.removeItem('frontend-settings');
      resetToDefaults();
      return true;
    } catch (error) {
      console.error('Failed to clear settings:', error);
      return false;
    }
  }, [resetToDefaults]);

  // Get settings summary for display
  const getSettingsSummary = useCallback(() => {
    const summary = {
      appearance: {
        theme: settings.appearance.theme,
        primaryColor: settings.appearance.primaryColor,
        fontSize: settings.appearance.fontSize,
      },
      ui: {
        showBreadcrumbs: settings.ui.showBreadcrumbs,
        enableKeyboardShortcuts: settings.ui.enableKeyboardShortcuts,
        showTooltips: settings.ui.showTooltips,
      },
      display: {
        dateFormat: settings.display.dateFormat,
        timeFormat: settings.display.timeFormat,
        currencySymbol: settings.display.currencySymbol,
      },
      session: {
        autoSave: settings.session.autoSave,
        autoSaveInterval: settings.session.autoSaveInterval,
        rememberLastPage: settings.session.rememberLastPage,
      },
    };
    
    return summary;
  }, [settings]);

  // Check if settings are different from defaults
  const getModifiedSettings = useCallback(() => {
    const defaultSettings = {
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

    const modified: Partial<FrontendSettings> = {};
    
    Object.keys(settings).forEach((sectionKey) => {
      const section = sectionKey as keyof FrontendSettings;
      const sectionSettings = settings[section];
      const defaultSection = defaultSettings[section];
      
      Object.keys(sectionSettings).forEach((key) => {
        const settingKey = key as keyof typeof sectionSettings;
        if (sectionSettings[settingKey] !== defaultSection[settingKey]) {
          if (!modified[section]) {
            modified[section] = {} as any;
          }
          (modified[section] as any)[settingKey] = sectionSettings[settingKey];
        }
      });
    });
    
    return modified;
  }, [settings]);

  // Get storage usage information
  const getStorageInfo = useCallback(() => {
    try {
      const settingsData = localStorage.getItem('frontend-settings');
      const size = settingsData ? new Blob([settingsData]).size : 0;
      const sizeKB = (size / 1024).toFixed(2);
      
      return {
        size,
        sizeKB,
        hasSettings: !!settingsData,
        lastModified: settingsData ? new Date().toISOString() : null,
      };
    } catch (error) {
      return {
        size: 0,
        sizeKB: '0',
        hasSettings: false,
        lastModified: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }, []);

  return {
    exportSettings,
    importSettings,
    clearAllSettings,
    getSettingsSummary,
    getModifiedSettings,
    getStorageInfo,
    hasUnsavedChanges,
    saveSettings,
  };
};

// Helper function to validate imported settings
const isValidSettings = (settings: any): settings is Partial<FrontendSettings> => {
  if (!settings || typeof settings !== 'object') return false;
  
  // Check if it has at least one valid section
  const validSections = ['appearance', 'ui', 'display', 'session'];
  const hasValidSection = validSections.some(section => 
    settings[section] && typeof settings[section] === 'object'
  );
  
  return hasValidSection;
};