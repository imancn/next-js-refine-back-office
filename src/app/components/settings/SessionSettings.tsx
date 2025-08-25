'use client';

import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { 
  Save, 
  Clock, 
  Filter, 
  SortAsc, 
  Wifi, 
  WifiOff, 
  Database,
  History,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const SessionSettings: React.FC = () => {
  const { settings, updateSessionSetting } = useSettings();

  const autoSaveIntervals = [
    { value: 1, label: '1 minute', description: 'Very frequent saves' },
    { value: 2, label: '2 minutes', description: 'Frequent saves' },
    { value: 5, label: '5 minutes', description: 'Recommended' },
    { value: 10, label: '10 minutes', description: 'Moderate saves' },
    { value: 15, label: '15 minutes', description: 'Less frequent saves' },
    { value: 30, label: '30 minutes', description: 'Infrequent saves' },
  ];

  const cacheExpiryOptions = [
    { value: 1, label: '1 hour', description: 'Fresh data' },
    { value: 6, label: '6 hours', description: 'Recent data' },
    { value: 12, label: '12 hours', description: 'Daily refresh' },
    { value: 24, label: '24 hours', description: 'Daily refresh' },
    { value: 48, label: '48 hours', description: 'Bi-daily refresh' },
    { value: 168, label: '1 week', description: 'Weekly refresh' },
  ];

  const toggleSetting = (key: keyof typeof settings.session, value: boolean) => {
    updateSessionSetting(key, value);
  };

  const updateInterval = (key: 'autoSaveInterval' | 'cacheExpiry', value: number) => {
    updateSessionSetting(key, value);
  };

  return (
    <div className="space-y-8">
      {/* Auto-save Settings */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Save className="h-5 w-5 mr-2" />
          Auto-save & Recovery
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Save className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Enable Auto-save</h4>
                <p className="text-sm text-gray-500">Automatically save your work to prevent data loss</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('autoSave', !settings.session.autoSave)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.session.autoSave ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.session.autoSave ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {settings.session.autoSave && (
            <div className="ml-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Auto-save Interval</label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {autoSaveIntervals.map((interval) => (
                    <button
                      key={interval.value}
                      onClick={() => updateInterval('autoSaveInterval', interval.value)}
                      className={`p-3 text-left border rounded-md transition-all ${
                        settings.session.autoSaveInterval === interval.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{interval.label}</div>
                      <div className="text-sm text-gray-500">{interval.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-md">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Auto-save is enabled</p>
                    <p>Your work will be saved every {settings.session.autoSaveInterval} minute{settings.session.autoSaveInterval !== 1 ? 's' : ''}.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Session Memory */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <History className="h-5 w-5 mr-2" />
          Session Memory
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <History className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Remember Last Page</h4>
                <p className="text-sm text-gray-500">Return to the last page you were viewing when you reopen the app</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('rememberLastPage', !settings.session.rememberLastPage)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.session.rememberLastPage ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.session.rememberLastPage ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Remember Filters</h4>
                <p className="text-sm text-gray-500">Restore your last applied filters when returning to list pages</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('rememberFilters', !settings.session.rememberFilters)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.session.rememberFilters ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.session.rememberFilters ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <SortAsc className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Remember Sort Order</h4>
                <p className="text-sm text-gray-500">Restore your last applied sorting when returning to list pages</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('rememberSortOrder', !settings.session.rememberSortOrder)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.session.rememberSortOrder ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.session.rememberSortOrder ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Offline & Caching */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Wifi className="h-5 w-5 mr-2" />
          Offline & Caching
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <WifiOff className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Enable Offline Mode</h4>
                <p className="text-sm text-gray-500">Allow the app to work with cached data when offline</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('enableOfflineMode', !settings.session.enableOfflineMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.session.enableOfflineMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.session.enableOfflineMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {settings.session.enableOfflineMode && (
            <div className="ml-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Cache Expiry Time</label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {cacheExpiryOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateInterval('cacheExpiry', option.value)}
                      className={`p-3 text-left border rounded-md transition-all ${
                        settings.session.cacheExpiry === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-md">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-700">
                    <p className="font-medium">Offline mode enabled</p>
                    <p>Data will be cached for {settings.session.cacheExpiry} hour{settings.session.cacheExpiry !== 1 ? 's' : ''} and available offline.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data Management */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Data Management
        </h3>
        
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Session Data</h4>
              <p className="text-sm text-gray-500">Manage your stored session preferences and cached data</p>
            </div>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Cache
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-white p-4 rounded-lg border">
              <h5 className="font-medium text-gray-900 mb-2">Current Session</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Auto-save:</span>
                  <span className="font-medium">
                    {settings.session.autoSave ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Interval:</span>
                  <span className="font-medium">
                    {settings.session.autoSaveInterval} minute{settings.session.autoSaveInterval !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Offline mode:</span>
                  <span className="font-medium">
                    {settings.session.enableOfflineMode ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h5 className="font-medium text-gray-900 mb-2">Memory Settings</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Last page:</span>
                  <span className="font-medium">
                    {settings.session.rememberLastPage ? 'Remembered' : 'Not remembered'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Filters:</span>
                  <span className="font-medium">
                    {settings.session.rememberFilters ? 'Remembered' : 'Not remembered'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sort order:</span>
                  <span className="font-medium">
                    {settings.session.rememberSortOrder ? 'Remembered' : 'Not remembered'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Summary */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Current Session Settings</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Auto-save:</span>
              <span className="text-sm font-medium">
                {settings.session.autoSave ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Auto-save Interval:</span>
              <span className="text-sm font-medium">
                {settings.session.autoSaveInterval} minute{settings.session.autoSaveInterval !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Remember Last Page:</span>
              <span className="text-sm font-medium">
                {settings.session.rememberLastPage ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Remember Filters:</span>
              <span className="text-sm font-medium">
                {settings.session.rememberFilters ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Remember Sort Order:</span>
              <span className="text-sm font-medium">
                {settings.session.rememberSortOrder ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Offline Mode:</span>
              <span className="text-sm font-medium">
                {settings.session.enableOfflineMode ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cache Expiry:</span>
              <span className="text-sm font-medium">
                {settings.session.cacheExpiry} hour{settings.session.cacheExpiry !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};