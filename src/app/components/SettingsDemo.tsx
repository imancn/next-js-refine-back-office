'use client';

import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { 
  Palette, 
  Monitor, 
  Calendar, 
  Save, 
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';

export const SettingsDemo: React.FC = () => {
  const { settings, updateAppearanceSetting, updateUISetting } = useSettings();

  const formatNumber = (value: number) => {
    switch (settings.display.numberFormat) {
      case 'comma':
        return value.toLocaleString('en-US');
      case 'dot':
        return value.toLocaleString('de-DE');
      case 'space':
        return value.toLocaleString('fr-FR');
      default:
        return value.toString();
    }
  };

  const formatCurrency = (value: number) => {
    const formatted = value.toFixed(settings.display.decimalPlaces);
    const code = settings.display.showCurrencyCode ? ' USD' : '';
    return `${settings.display.currencySymbol}${formatted}${code}`;
  };

  const formatDate = (date: Date) => {
    switch (settings.display.dateFormat) {
      case 'MM/DD/YYYY':
        return date.toLocaleDateString('en-US');
      case 'DD/MM/YYYY':
        return date.toLocaleDateString('en-GB');
      case 'YYYY-MM-DD':
        return date.toISOString().split('T')[0];
      default:
        return date.toLocaleDateString();
    }
  };

  const formatTime = (date: Date) => {
    if (settings.display.timeFormat === '12h') {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    }
  };

  const getTableClasses = () => {
    const baseClasses = 'w-full border-collapse';
    
    if (settings.appearance.showGridLines) {
      baseClasses += ' border border-gray-300';
    }
    
    switch (settings.appearance.tableDensity) {
      case 'compact':
        return baseClasses + ' text-sm';
      case 'spacious':
        return baseClasses + ' text-lg';
      default:
        return baseClasses + ' text-base';
    }
  };

  const getCardClasses = () => {
    let classes = 'p-4 rounded-lg border transition-all';
    
    if (settings.appearance.enableHoverEffects) {
      classes += ' hover:shadow-lg hover:-translate-y-1';
    }
    
    if (settings.appearance.showAnimations) {
      classes += ' animate-fade-in';
    }
    
    return classes;
  };

  return (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Settings System Demo</h1>
        <p className="text-lg text-gray-600">
          This component demonstrates how the settings system affects the UI. 
          Change settings in the Settings page to see live updates here.
        </p>
      </div>

      {/* Theme and Appearance Demo */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={getCardClasses() + ' bg-white border-gray-200'}>
          <div className="flex items-center mb-4">
            <Palette className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">Appearance Settings</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Theme:</span>
              <span className="font-medium capitalize">{settings.appearance.theme}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Primary Color:</span>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: settings.appearance.primaryColor }}
                />
                <span className="font-mono text-sm">{settings.appearance.primaryColor}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Font Size:</span>
              <span className="font-medium capitalize">{settings.appearance.fontSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Table Density:</span>
              <span className="font-medium capitalize">{settings.appearance.tableDensity}</span>
            </div>
          </div>
        </div>

        <div className={getCardClasses() + ' bg-white border-gray-200'}>
          <div className="flex items-center mb-4">
            <Monitor className="h-6 w-6 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold">Interface Settings</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Breadcrumbs:</span>
              <span className="flex items-center">
                {settings.ui.showBreadcrumbs ? (
                  <Eye className="h-4 w-4 text-green-500" />
                ) : (
                  <EyeOff className="h-4 w-4 text-red-500" />
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Keyboard Shortcuts:</span>
              <span className="flex items-center">
                {settings.ui.enableKeyboardShortcuts ? (
                  <Eye className="h-4 w-4 text-green-500" />
                ) : (
                  <EyeOff className="h-4 w-4 text-red-500" />
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tooltips:</span>
              <span className="flex items-center">
                {settings.ui.showTooltips ? (
                  <Eye className="h-4 w-4 text-green-500" />
                ) : (
                  <EyeOff className="h-4 w-4 text-red-500" />
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Animations:</span>
              <span className="flex items-center">
                {settings.appearance.showAnimations ? (
                  <Eye className="h-4 w-4 text-green-500" />
                ) : (
                  <EyeOff className="h-4 w-4 text-red-500" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Display Settings Demo */}
      <div className={getCardClasses() + ' bg-white border-gray-200'}>
        <div className="flex items-center mb-4">
          <Calendar className="h-6 w-6 text-purple-500 mr-2" />
          <h2 className="text-xl font-semibold">Display Settings Demo</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-medium mb-3">Number & Currency Formatting</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Large Number:</span>
                <span className="font-mono">{formatNumber(1234567.89)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Currency:</span>
                <span className="font-mono">{formatCurrency(1234.56)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Decimal Places:</span>
                <span className="font-mono">{settings.display.decimalPlaces}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Date & Time Formatting</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date Format:</span>
                <span className="font-mono">{settings.display.dateFormat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Format:</span>
                <span className="font-mono">{settings.display.timeFormat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sample Date:</span>
                <span className="font-mono">{formatDate(new Date())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sample Time:</span>
                <span className="font-mono">{formatTime(new Date())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Session Settings Demo */}
      <div className={getCardClasses() + ' bg-white border-gray-200'}>
        <div className="flex items-center mb-4">
          <Save className="h-6 w-6 text-orange-500 mr-2" />
          <h2 className="text-xl font-semibold">Session Settings Demo</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-medium mb-3">Auto-save Configuration</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Auto-save:</span>
                <span className={`font-medium ${
                  settings.session.autoSave ? 'text-green-600' : 'text-red-600'
                }`}>
                  {settings.session.autoSave ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              {settings.session.autoSave && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Interval:</span>
                  <span className="font-medium">
                    {settings.session.autoSaveInterval} minute{settings.session.autoSaveInterval !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Offline Mode:</span>
                <span className={`font-medium ${
                  settings.session.enableOfflineMode ? 'text-green-600' : 'text-red-600'
                }`}>
                  {settings.session.enableOfflineMode ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Memory Settings</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Remember Last Page:</span>
                <span className="flex items-center">
                  {settings.session.rememberLastPage ? (
                    <Eye className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-red-500" />
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Remember Filters:</span>
                <span className="flex items-center">
                  {settings.session.rememberFilters ? (
                    <Eye className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-red-500" />
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Remember Sort Order:</span>
                <span className="flex items-center">
                  {settings.session.rememberSortOrder ? (
                    <Eye className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-red-500" />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Table Demo */}
      <div className={getCardClasses() + ' bg-white border-gray-200'}>
        <h2 className="text-xl font-semibold mb-4">Live Table Demo</h2>
        <p className="text-sm text-gray-600 mb-4">
          This table demonstrates the table density and grid line settings in action.
        </p>
        
        <table className={getTableClasses()}>
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left font-medium">Product</th>
              <th className="px-4 py-2 text-left font-medium">Price</th>
              <th className="px-4 py-2 text-left font-medium">Stock</th>
              <th className="px-4 py-2 text-left font-medium">Date Added</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2">Laptop Pro</td>
              <td className="px-4 py-2 font-mono">{formatCurrency(1299.99)}</td>
              <td className="px-4 py-2 font-mono">{formatNumber(45)}</td>
              <td className="px-4 py-2 font-mono">{formatDate(new Date('2024-01-15'))}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2">Wireless Mouse</td>
              <td className="px-4 py-2 font-mono">{formatCurrency(29.99)}</td>
              <td className="px-4 py-2 font-mono">{formatNumber(150)}</td>
              <td className="px-4 py-2 font-mono">{formatDate(new Date('2024-01-20'))}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2">USB-C Cable</td>
              <td className="px-4 py-2 font-mono">{formatCurrency(12.50)}</td>
              <td className="px-4 py-2 font-mono">{formatNumber(300)}</td>
              <td className="px-4 py-2 font-mono">{formatDate(new Date('2024-01-25'))}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Settings Toggle */}
      <div className={getCardClasses() + ' bg-blue-50 border-blue-200'}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-blue-900">Quick Settings Toggle</h3>
            <p className="text-sm text-blue-700">
              Try changing some settings to see live updates in this demo
            </p>
          </div>
          <button
            onClick={() => updateAppearanceSetting('theme', settings.appearance.theme === 'light' ? 'dark' : 'light')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Toggle Theme
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>
          Go to <span className="font-medium">Settings</span> to customize your experience
        </p>
        <p className="mt-1">
          All changes are automatically saved to your browser's local storage
        </p>
      </div>
    </div>
  );
};