'use client';

import React, { useState, useRef } from 'react';
import { useSettingsStorage } from '../../hooks/useSettingsStorage';
import { useSettings } from '../../contexts/SettingsContext';
import { 
  Download, 
  Upload, 
  Trash2, 
  RotateCcw, 
  Save, 
  AlertTriangle,
  CheckCircle,
  Info,
  FileText,
  HardDrive
} from 'lucide-react';

export const SettingsManagement: React.FC = () => {
  const { 
    exportSettings, 
    importSettings, 
    clearAllSettings, 
    getSettingsSummary, 
    getModifiedSettings, 
    getStorageInfo,
    hasUnsavedChanges,
    saveSettings
  } = useSettingsStorage();
  
  const { settings, resetToDefaults, resetSection } = useSettings();
  
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportStatus('idle');
    setImportMessage('');

    try {
      const success = await importSettings(file);
      if (success) {
        setImportStatus('success');
        setImportMessage('Settings imported successfully! The page will reload to apply changes.');
      } else {
        setImportStatus('error');
        setImportMessage('Failed to import settings. Please check the file format.');
      }
    } catch (error) {
      setImportStatus('error');
      setImportMessage('An error occurred while importing settings.');
    } finally {
      setIsImporting(false);
    }
  };

  const handleExport = () => {
    const success = exportSettings();
    if (success) {
      // Show success message
      setImportStatus('success');
      setImportMessage('Settings exported successfully!');
      setTimeout(() => setImportStatus('idle'), 3000);
    }
  };

  const handleClearAll = () => {
    clearAllSettings();
    setShowConfirmClear(false);
    setImportStatus('success');
    setImportMessage('All settings have been cleared and reset to defaults.');
    setTimeout(() => setImportStatus('idle'), 3000);
  };

  const handleResetToDefaults = () => {
    resetToDefaults();
    setShowConfirmReset(false);
    setImportStatus('success');
    setImportMessage('Settings have been reset to defaults.');
    setTimeout(() => setImportStatus('idle'), 3000);
  };

  const storageInfo = getStorageInfo();
  const settingsSummary = getSettingsSummary();
  const modifiedSettings = getModifiedSettings();

  return (
    <div className="space-y-8">
      {/* Import/Export Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Import & Export Settings
        </h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Export Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Download className="h-6 w-6 text-blue-500 mr-3" />
              <h4 className="text-lg font-medium text-gray-900">Export Settings</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Download your current settings as a JSON file. You can use this to backup your preferences or transfer them to another device.
            </p>
            <button
              onClick={handleExport}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Settings
            </button>
          </div>

          {/* Import Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Upload className="h-6 w-6 text-green-500 mr-3" />
              <h4 className="text-lg font-medium text-gray-900">Import Settings</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Import settings from a previously exported JSON file. This will replace your current settings.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isImporting ? 'Importing...' : 'Import Settings'}
            </button>
          </div>
        </div>

        {/* Import Status */}
        {importStatus !== 'idle' && (
          <div className={`p-4 rounded-lg ${
            importStatus === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              {importStatus === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span className={`text-sm font-medium ${
                importStatus === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {importMessage}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Settings Summary */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Info className="h-5 w-5 mr-2" />
          Settings Summary
        </h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Current Settings Overview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Current Settings</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Theme:</span>
                <span className="text-sm font-medium">{settingsSummary.appearance.theme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Primary Color:</span>
                <span className="text-sm font-medium">{settingsSummary.appearance.primaryColor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Font Size:</span>
                <span className="text-sm font-medium">{settingsSummary.appearance.fontSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Date Format:</span>
                <span className="text-sm font-medium">{settingsSummary.display.dateFormat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Currency:</span>
                <span className="text-sm font-medium">{settingsSummary.display.currencySymbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Auto-save:</span>
                <span className="text-sm font-medium">
                  {settingsSummary.session.autoSave ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>

          {/* Modified Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Modified Settings</h4>
            {Object.keys(modifiedSettings).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(modifiedSettings).map(([section, sectionSettings]) => (
                  <div key={section} className="text-sm">
                    <span className="font-medium text-gray-900 capitalize">{section}:</span>
                    <div className="ml-4 text-gray-600">
                      {Object.entries(sectionSettings as any).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span>{key}:</span>
                          <span className="font-mono">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No settings have been modified from defaults.</p>
            )}
          </div>
        </div>
      </div>

      {/* Storage Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <HardDrive className="h-5 w-5 mr-2" />
          Storage Information
        </h3>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Local Storage</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Settings stored:</span>
                  <span className="font-medium">
                    {storageInfo.hasSettings ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Storage size:</span>
                  <span className="font-medium">{storageInfo.sizeKB} KB</span>
                </div>
                {storageInfo.lastModified && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last modified:</span>
                    <span className="font-medium">
                      {new Date(storageInfo.lastModified).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Unsaved changes:</span>
                  <span className={`font-medium ${
                    hasUnsavedChanges ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {hasUnsavedChanges ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Settings count:</span>
                  <span className="font-medium">
                    {Object.keys(settings).length} sections
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reset & Clear Options */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <RotateCcw className="h-5 w-5 mr-2" />
          Reset & Clear Options
        </h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Reset to Defaults */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <RotateCcw className="h-6 w-6 text-orange-500 mr-3" />
              <h4 className="text-lg font-medium text-gray-900">Reset to Defaults</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Reset all settings to their default values. This will remove all customizations.
            </p>
            <button
              onClick={() => setShowConfirmReset(true)}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-orange-300 text-sm font-medium rounded-md text-orange-700 bg-orange-50 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </button>
          </div>

          {/* Clear All Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Trash2 className="h-6 w-6 text-red-500 mr-3" />
              <h4 className="text-lg font-medium text-gray-900">Clear All Settings</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Remove all stored settings from local storage and reset to defaults. This action cannot be undone.
            </p>
            <button
              onClick={() => setShowConfirmClear(true)}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Settings
            </button>
          </div>
        </div>
      </div>

      {/* Save Changes */}
      {hasUnsavedChanges && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Save className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">Unsaved Changes</h4>
                <p className="text-sm text-blue-700">You have unsaved changes. Click save to persist them to local storage.</p>
              </div>
            </div>
            <button
              onClick={saveSettings}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modals */}
      {showConfirmReset && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Reset to Defaults?</h3>
              <p className="text-sm text-gray-500 mb-4">
                This will reset all settings to their default values. Your customizations will be lost.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleResetToDefaults}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmClear && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <Trash2 className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Clear All Settings?</h3>
              <p className="text-sm text-gray-500 mb-4">
                This will remove all stored settings from local storage. This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleClearAll}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};