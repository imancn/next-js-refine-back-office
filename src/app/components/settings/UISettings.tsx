'use client';

import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { 
  Navigation, 
  Type, 
  Search, 
  Keyboard, 
  HelpCircle, 
  MousePointer, 
  Loader, 
  Infinity,
  Eye,
  EyeOff
} from 'lucide-react';

export const UISettings: React.FC = () => {
  const { settings, updateUISetting } = useSettings();

  const toggleSetting = (key: keyof typeof settings.ui, value: boolean) => {
    updateUISetting(key, value);
  };

  return (
    <div className="space-y-8">
      {/* Navigation & Layout */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Navigation className="h-5 w-5 mr-2" />
          Navigation & Layout
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Navigation className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Show Breadcrumbs</h4>
                <p className="text-sm text-gray-500">Display navigation breadcrumbs at the top of pages</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('showBreadcrumbs', !settings.ui.showBreadcrumbs)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.ui.showBreadcrumbs ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.ui.showBreadcrumbs ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Type className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Show Page Title</h4>
                <p className="text-sm text-gray-500">Display the current page title prominently</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('showPageTitle', !settings.ui.showPageTitle)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.ui.showPageTitle ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.ui.showPageTitle ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Search className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Show Search Bar</h4>
                <p className="text-sm text-gray-500">Display global search functionality in the header</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('showSearchBar', !settings.ui.showSearchBar)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.ui.showSearchBar ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.ui.showSearchBar ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Interaction & Accessibility */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Keyboard className="h-5 w-5 mr-2" />
          Interaction & Accessibility
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Keyboard className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Enable Keyboard Shortcuts</h4>
                <p className="text-sm text-gray-500">Allow navigation and actions using keyboard shortcuts</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('enableKeyboardShortcuts', !settings.ui.enableKeyboardShortcuts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.ui.enableKeyboardShortcuts ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.ui.enableKeyboardShortcuts ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Show Tooltips</h4>
                <p className="text-sm text-gray-500">Display helpful tooltips on hover for UI elements</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('showTooltips', !settings.ui.showTooltips)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.ui.showTooltips ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.ui.showTooltips ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <MousePointer className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Enable Drag and Drop</h4>
                <p className="text-sm text-gray-500">Allow reordering and moving items with drag and drop</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('enableDragAndDrop', !settings.ui.enableDragAndDrop)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.ui.enableDragAndDrop ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.ui.enableDragAndDrop ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Loading & Performance */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Loader className="h-5 w-5 mr-2" />
          Loading & Performance
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Loader className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Show Loading Spinners</h4>
                <p className="text-sm text-gray-500">Display loading indicators during data operations</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('showLoadingSpinners', !settings.ui.showLoadingSpinners)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.ui.showLoadingSpinners ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.ui.showLoadingSpinners ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Infinity className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Enable Infinite Scroll</h4>
                <p className="text-sm text-gray-500">Load more content automatically when scrolling</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('enableInfiniteScroll', !settings.ui.enableInfiniteScroll)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.ui.enableInfiniteScroll ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.ui.enableInfiniteScroll ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      {settings.ui.enableKeyboardShortcuts && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Keyboard Shortcuts</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Navigate to Dashboard</span>
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">Ctrl + D</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Open Search</span>
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">Ctrl + K</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Go Back</span>
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">Alt + ←</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Go Forward</span>
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">Alt + →</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Save Changes</span>
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">Ctrl + S</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Refresh Page</span>
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">F5</kbd>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Summary */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Current Settings Summary</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center space-x-2">
              {settings.ui.showBreadcrumbs ? (
                <Eye className="h-4 w-4 text-green-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm text-gray-700">Breadcrumbs</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {settings.ui.showPageTitle ? (
                <Eye className="h-4 w-4 text-green-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm text-gray-700">Page Title</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {settings.ui.showSearchBar ? (
                <Eye className="h-4 w-4 text-green-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm text-gray-700">Search Bar</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {settings.ui.enableKeyboardShortcuts ? (
                <Eye className="h-4 w-4 text-green-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm text-gray-700">Keyboard Shortcuts</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {settings.ui.showTooltips ? (
                <Eye className="h-4 w-4 text-green-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm text-gray-700">Tooltips</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {settings.ui.enableDragAndDrop ? (
                <Eye className="h-4 w-4 text-green-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm text-gray-700">Drag & Drop</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {settings.ui.showLoadingSpinners ? (
                <Eye className="h-4 w-4 text-green-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm text-gray-700">Loading Spinners</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {settings.ui.enableInfiniteScroll ? (
                <Eye className="h-4 w-4 text-green-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm text-gray-700">Infinite Scroll</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};