'use client';

import React, { useState } from 'react';
import { SettingsProvider } from '../contexts/SettingsContext';
import { AppearanceSettings } from '../components/settings/AppearanceSettings';
import { UISettings } from '../components/settings/UISettings';
import { DisplaySettings } from '../components/settings/DisplaySettings';
import { SessionSettings } from '../components/settings/SessionSettings';
import { SettingsManagement } from '../components/settings/SettingsManagement';
import { 
  Settings, 
  Palette,
  Monitor,
  Calendar,
  Save,
  RotateCcw,
  Database,
  FileText
} from 'lucide-react';

interface SettingSection {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const settingSections: SettingSection[] = [
  { id: 'appearance', name: 'Appearance', icon: Palette, description: 'Theme, colors, and visual preferences' },
  { id: 'ui', name: 'Interface', icon: Monitor, description: 'UI behavior and interaction settings' },
  { id: 'display', name: 'Display', icon: Calendar, description: 'Date, time, and number formatting' },
  { id: 'session', name: 'Session', icon: Save, description: 'Auto-save and session preferences' },
  { id: 'management', name: 'Management', icon: FileText, description: 'Import, export, and backup settings' },
];

function SettingsPageContent() {
  const [activeSection, setActiveSection] = useState('appearance');

  const renderContent = () => {
    switch (activeSection) {
      case 'appearance':
        return <AppearanceSettings />;
      case 'ui':
        return <UISettings />;
      case 'display':
        return <DisplaySettings />;
      case 'session':
        return <SessionSettings />;
      case 'management':
        return <SettingsManagement />;
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
          <p className="text-gray-600">Manage your application preferences and appearance</p>
        </div>
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

export default function SettingsPage() {
  return (
    <SettingsProvider>
      <SettingsPageContent />
    </SettingsProvider>
  );
}