'use client';

import React, { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Palette, Eye, EyeOff, Monitor, Sun, Moon, Type, Layout, Grid, MousePointer } from 'lucide-react';

export const AppearanceSettings: React.FC = () => {
  const { settings, updateAppearanceSetting } = useSettings();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'auto', label: 'Auto (System)', icon: Monitor },
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small', size: '14px' },
    { value: 'medium', label: 'Medium', size: '16px' },
    { value: 'large', label: 'Large', size: '18px' },
  ];

  const sidebarWidthOptions = [
    { value: 'narrow', label: 'Narrow', width: '200px' },
    { value: 'normal', label: 'Normal', width: '250px' },
    { value: 'wide', label: 'Wide', width: '300px' },
  ];

  const tableDensityOptions = [
    { value: 'compact', label: 'Compact', description: 'Tight spacing for dense data' },
    { value: 'comfortable', label: 'Comfortable', description: 'Balanced spacing' },
    { value: 'spacious', label: 'Spacious', description: 'Loose spacing for readability' },
  ];

  const presetColors = [
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#10b981', // Green
    '#f59e0b', // Yellow
    '#8b5cf6', // Purple
    '#06b6d4', // Cyan
    '#f97316', // Orange
    '#ec4899', // Pink
  ];

  const handleColorChange = (color: string) => {
    updateAppearanceSetting('primaryColor', color);
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    updateAppearanceSetting('theme', theme);
  };

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Palette className="h-5 w-5 mr-2" />
          Theme & Colors
        </h3>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => handleThemeChange(option.value as 'light' | 'dark' | 'auto')}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  settings.appearance.theme === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-8 w-8 mx-auto mb-2" />
                <div className="font-medium">{option.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Color */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">Primary Color</h4>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-16 h-16 rounded-lg border-2 border-gray-300 shadow-sm"
              style={{ backgroundColor: settings.appearance.primaryColor }}
            />
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <input
                  type="color"
                  value={settings.appearance.primaryColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded"
                />
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <input
              type="text"
              value={settings.appearance.primaryColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-mono"
              placeholder="#3b82f6"
            />
            <p className="text-sm text-gray-500 mt-1">Enter hex color code</p>
          </div>
        </div>
      </div>

      {/* Layout Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Layout className="h-5 w-5 mr-2" />
          Layout & Spacing
        </h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Font Size</label>
            <div className="space-y-2">
              {fontSizeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateAppearanceSetting('fontSize', option.value as 'small' | 'medium' | 'large')}
                  className={`w-full p-3 text-left border rounded-md transition-all ${
                    settings.appearance.fontSize === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    <span className="text-sm text-gray-500">{option.size}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Sidebar Width</label>
            <div className="space-y-2">
              {sidebarWidthOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateAppearanceSetting('sidebarWidth', option.value as 'narrow' | 'normal' | 'wide')}
                  className={`w-full p-3 text-left border rounded-md transition-all ${
                    settings.appearance.sidebarWidth === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    <span className="text-sm text-gray-500">{option.width}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Density */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Table Density</label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {tableDensityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateAppearanceSetting('tableDensity', option.value as 'compact' | 'comfortable' | 'spacious')}
                className={`p-4 text-left border rounded-lg transition-all ${
                  settings.appearance.tableDensity === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-500 mt-1">{option.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Eye className="h-5 w-5 mr-2" />
          Visual Preferences
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Eye className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Show Animations</h4>
                <p className="text-sm text-gray-500">Enable smooth transitions and animations</p>
              </div>
            </div>
            <button
              onClick={() => updateAppearanceSetting('showAnimations', !settings.appearance.showAnimations)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.appearance.showAnimations ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.appearance.showAnimations ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Grid className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Show Grid Lines</h4>
                <p className="text-sm text-gray-500">Display grid lines in tables and forms</p>
              </div>
            </div>
            <button
              onClick={() => updateAppearanceSetting('showGridLines', !settings.appearance.showGridLines)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.appearance.showGridLines ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.appearance.showGridLines ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <MousePointer className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Enable Hover Effects</h4>
                <p className="text-sm text-gray-500">Show interactive hover states</p>
              </div>
            </div>
            <button
              onClick={() => updateAppearanceSetting('enableHoverEffects', !settings.appearance.enableHoverEffects)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.appearance.enableHoverEffects ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.appearance.enableHoverEffects ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Layout className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Compact Mode</h4>
                <p className="text-sm text-gray-500">Use compact spacing for dense layouts</p>
              </div>
            </div>
            <button
              onClick={() => updateAppearanceSetting('compactMode', !settings.appearance.compactMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.appearance.compactMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.appearance.compactMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Layout className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Sidebar Collapsed</h4>
                <p className="text-sm text-gray-500">Start with sidebar in collapsed state</p>
              </div>
            </div>
            <button
              onClick={() => updateAppearanceSetting('sidebarCollapsed', !settings.appearance.sidebarCollapsed)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.appearance.sidebarCollapsed ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.appearance.sidebarCollapsed ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Preview</h3>
        <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Primary Button
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Secondary Button
              </button>
            </div>
            
            <div className="p-4 bg-white border border-gray-200 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">Sample Card</h4>
              <p className="text-gray-600 text-sm">
                This preview shows how your current settings will look in the application.
              </p>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>Font Size: {settings.appearance.fontSize}</p>
              <p>Theme: {settings.appearance.theme}</p>
              <p>Primary Color: {settings.appearance.primaryColor}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};