'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette,
  Globe,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react';

interface SettingSection {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const settingSections: SettingSection[] = [
  { id: 'general', name: 'General', icon: Settings, description: 'Basic application settings' },
  { id: 'profile', name: 'Profile', icon: User, description: 'User account preferences' },
  { id: 'notifications', name: 'Notifications', icon: Bell, description: 'Notification preferences' },
  { id: 'security', name: 'Security', icon: Shield, description: 'Security and privacy settings' },
  { id: 'data', name: 'Data & Storage', icon: Database, description: 'Data management options' },
  { id: 'appearance', name: 'Appearance', icon: Palette, description: 'UI and theme settings' },
  { id: 'regional', name: 'Regional', icon: Globe, description: 'Language and locale settings' },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'Acme Corporation',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    language: 'en',
    autoSave: true,
    sessionTimeout: 30,
  });

  const [profileSettings, setProfileSettings] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://example.com/avatar.jpg',
    bio: 'System administrator with 5+ years of experience.',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    inventoryAlerts: true,
    systemMaintenance: false,
    marketingEmails: false,
    digestFrequency: 'daily',
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordExpiry: 90,
    sessionTimeout: 30,
    loginAttempts: 5,
    ipWhitelist: '',
    auditLogging: true,
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    primaryColor: '#3b82f6',
    sidebarCollapsed: false,
    compactMode: false,
    showAnimations: true,
    fontSize: 'medium',
  });

  const handleSettingChange = (section: string, field: string, value: any) => {
    setHasUnsavedChanges(true);
    
    switch (section) {
      case 'general':
        setGeneralSettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'profile':
        setProfileSettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'notifications':
        setNotificationSettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'security':
        setSecuritySettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'appearance':
        setAppearanceSettings(prev => ({ ...prev, [field]: value }));
        break;
    }
  };

  const handleSave = () => {
    // Simulate saving settings
    setTimeout(() => {
      setHasUnsavedChanges(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      setGeneralSettings({
        companyName: 'Acme Corporation',
        timezone: 'UTC-5',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD',
        language: 'en',
        autoSave: true,
        sessionTimeout: 30,
      });
      setHasUnsavedChanges(false);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={generalSettings.companyName}
            onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={generalSettings.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="UTC-8">UTC-8 (Pacific)</option>
            <option value="UTC-5">UTC-5 (Eastern)</option>
            <option value="UTC+0">UTC+0 (London)</option>
            <option value="UTC+1">UTC+1 (Paris)</option>
            <option value="UTC+8">UTC+8 (Beijing)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Format
          </label>
          <select
            value={generalSettings.dateFormat}
            onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={generalSettings.currency}
            onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Auto-save</h4>
            <p className="text-sm text-gray-500">Automatically save changes every few minutes</p>
          </div>
          <button
            onClick={() => handleSettingChange('general', 'autoSave', !generalSettings.autoSave)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              generalSettings.autoSave ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              generalSettings.autoSave ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            min="5"
            max="120"
            value={generalSettings.sessionTimeout}
            onChange={(e) => handleSettingChange('general', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="flex-shrink-0">
          <img
            className="h-20 w-20 rounded-full object-cover"
            src={profileSettings.avatar}
            alt="Profile"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNGM0Y0RjYiLz4KPHBhdGggZD0iTTI0IDMyQzI0IDI4LjY4NjMgMjYuNjg2MyAyNiAzMCAyNkg1MEM1My4zMTM3IDI2IDU2IDI4LjY4NjMgNTYgMzJWNjRDNzIgNjQgNzIgNDhDNzIgNDQuNjg2MyA3NC42ODYzIDQyIDc4IDQyVjQwQzc4IDM1LjU4MTcgNzQuNDE4MyAzMiA3MCAzMkg2NkM2Mi42ODYzIDMyIDYwIDI5LjMxMzcgNjAgMjZIMjBDMTYuNjg2MyAyNiAxNCAyOC42ODYzIDE0IDMyVjQyQzE3LjMxMzcgNDIgMjAgNDQuNjg2MyAyMCA0OFY2NEMyMCA2OC40MTgzIDIzLjU4MTcgNzIgMjggNzJIMzJDMzYuNDE4MyA3MiA0MCA2OC40MTgzIDQwIDY0VjMyWiIgZmlsbD0iI0QxRDVETyIvPgo8L3N2Zz4K';
            }}
          />
        </div>
        <div>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Change Photo
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={profileSettings.firstName}
            onChange={(e) => handleSettingChange('profile', 'firstName', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={profileSettings.lastName}
            onChange={(e) => handleSettingChange('profile', 'lastName', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={profileSettings.email}
            onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={profileSettings.phone}
            onChange={(e) => handleSettingChange('profile', 'phone', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bio
        </label>
        <textarea
          rows={4}
          value={profileSettings.bio}
          onChange={(e) => handleSettingChange('profile', 'bio', e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Notification Channels</h4>
        
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-sm font-medium text-gray-900">Email Notifications</h5>
            <p className="text-sm text-gray-500">Receive notifications via email</p>
          </div>
          <button
            onClick={() => handleSettingChange('notifications', 'emailNotifications', !notificationSettings.emailNotifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-sm font-medium text-gray-900">Push Notifications</h5>
            <p className="text-sm text-gray-500">Receive push notifications in browser</p>
          </div>
          <button
            onClick={() => handleSettingChange('notifications', 'pushNotifications', !notificationSettings.pushNotifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationSettings.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              notificationSettings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-sm font-medium text-gray-900">SMS Notifications</h5>
            <p className="text-sm text-gray-500">Receive notifications via SMS</p>
          </div>
          <button
            onClick={() => handleSettingChange('notifications', 'smsNotifications', !notificationSettings.smsNotifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationSettings.smsNotifications ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              notificationSettings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Notification Types</h4>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-900">Order Updates</span>
            <button
              onClick={() => handleSettingChange('notifications', 'orderUpdates', !notificationSettings.orderUpdates)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.orderUpdates ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationSettings.orderUpdates ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-900">Inventory Alerts</span>
            <button
              onClick={() => handleSettingChange('notifications', 'inventoryAlerts', !notificationSettings.inventoryAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.inventoryAlerts ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationSettings.inventoryAlerts ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-900">System Maintenance</span>
            <button
              onClick={() => handleSettingChange('notifications', 'systemMaintenance', !notificationSettings.systemMaintenance)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.systemMaintenance ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationSettings.systemMaintenance ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-900">Marketing Emails</span>
            <button
              onClick={() => handleSettingChange('notifications', 'marketingEmails', !notificationSettings.marketingEmails)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.marketingEmails ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationSettings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Digest Frequency
        </label>
        <select
          value={notificationSettings.digestFrequency}
          onChange={(e) => handleSettingChange('notifications', 'digestFrequency', e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="immediate">Immediate</option>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => handleSettingChange('security', 'twoFactorAuth', !securitySettings.twoFactorAuth)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              securitySettings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Audit Logging</h4>
            <p className="text-sm text-gray-500">Log all account activities for security monitoring</p>
          </div>
          <button
            onClick={() => handleSettingChange('security', 'auditLogging', !securitySettings.auditLogging)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              securitySettings.auditLogging ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              securitySettings.auditLogging ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Expiry (days)
          </label>
          <input
            type="number"
            min="30"
            max="365"
            value={securitySettings.passwordExpiry}
            onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            min="5"
            max="120"
            value={securitySettings.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Login Attempts
          </label>
          <input
            type="number"
            min="3"
            max="10"
            value={securitySettings.loginAttempts}
            onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IP Whitelist
          </label>
          <input
            type="text"
            placeholder="192.168.1.0/24, 10.0.0.0/8"
            value={securitySettings.ipWhitelist}
            onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <select
            value={appearanceSettings.theme}
            onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto (System)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={appearanceSettings.primaryColor}
              onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
              className="h-10 w-16 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={appearanceSettings.primaryColor}
              onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size
          </label>
          <select
            value={appearanceSettings.fontSize}
            onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Sidebar Collapsed</h4>
            <p className="text-sm text-gray-500">Start with sidebar in collapsed state</p>
          </div>
          <button
            onClick={() => handleSettingChange('appearance', 'sidebarCollapsed', !appearanceSettings.sidebarCollapsed)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              appearanceSettings.sidebarCollapsed ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              appearanceSettings.sidebarCollapsed ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Compact Mode</h4>
            <p className="text-sm text-gray-500">Use compact spacing for dense layouts</p>
          </div>
          <button
            onClick={() => handleSettingChange('appearance', 'compactMode', !appearanceSettings.compactMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              appearanceSettings.compactMode ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              appearanceSettings.compactMode ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Show Animations</h4>
            <p className="text-sm text-gray-500">Enable smooth transitions and animations</p>
          </div>
          <button
            onClick={() => handleSettingChange('appearance', 'showAnimations', !appearanceSettings.showAnimations)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              appearanceSettings.showAnimations ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              appearanceSettings.showAnimations ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'appearance':
        return renderAppearanceSettings();
      default:
        return <div className="text-center py-12 text-gray-500">Select a setting category to get started</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and application preferences</p>
        </div>
        
        {hasUnsavedChanges && (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-yellow-600">You have unsaved changes</span>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </button>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1 border-r border-gray-200">
            <nav className="p-4 space-y-2">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    <section.icon className="h-5 w-5 mr-3" />
                    <div>
                      <div>{section.name}</div>
                      <div className="text-xs text-gray-500">{section.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 p-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 capitalize">
                {settingSections.find(s => s.id === activeSection)?.name} Settings
              </h2>
              <p className="text-sm text-gray-500">
                {settingSections.find(s => s.id === activeSection)?.description}
              </p>
            </div>
            
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}