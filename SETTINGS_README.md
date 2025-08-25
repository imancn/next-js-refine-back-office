# Frontend Settings System

This document describes the comprehensive frontend-only settings system that has been implemented for the backoffice application. This system allows users to customize their experience without requiring backend changes, with all settings stored in browser localStorage.

## Features

### 🎨 **Appearance Settings**
- **Theme Selection**: Light, Dark, or Auto (follows system preference)
- **Primary Color**: Customizable primary color with preset options
- **Font Size**: Small, Medium, or Large
- **Sidebar Width**: Narrow (200px), Normal (250px), or Wide (300px)
- **Table Density**: Compact, Comfortable, or Spacious
- **Visual Preferences**: Animations, grid lines, hover effects, compact mode

### 🖥️ **Interface Settings**
- **Navigation**: Breadcrumbs, page titles, search bar visibility
- **Interaction**: Keyboard shortcuts, tooltips, drag & drop
- **Performance**: Loading spinners, infinite scroll options

### 📅 **Display Settings**
- **Date Format**: MM/DD/YYYY, DD/MM/YYYY, or YYYY-MM-DD
- **Time Format**: 12-hour (AM/PM) or 24-hour
- **Number Format**: Comma, dot, or space separators
- **Currency**: Multiple currency symbols with optional currency codes
- **Decimal Places**: Configurable from 0 to 5 places
- **Scientific Notation**: Enable/disable for large/small numbers

### 💾 **Session Settings**
- **Auto-save**: Enable/disable with configurable intervals (1-30 minutes)
- **Session Memory**: Remember last page, filters, and sort order
- **Offline Mode**: Cache data for offline access with configurable expiry
- **Cache Management**: Clear cache and manage stored data

### 🔧 **Settings Management**
- **Import/Export**: Backup and restore settings via JSON files
- **Reset Options**: Reset to defaults or clear all settings
- **Storage Info**: View storage usage and settings summary
- **Modified Settings**: See which settings differ from defaults

## Architecture

### Components Structure
```
src/app/
├── contexts/
│   └── SettingsContext.tsx          # Main settings context provider
├── hooks/
│   └── useSettingsStorage.ts        # Storage utilities and import/export
├── components/settings/
│   ├── AppearanceSettings.tsx       # Theme and visual preferences
│   ├── UISettings.tsx              # Interface behavior settings
│   ├── DisplaySettings.tsx         # Formatting preferences
│   ├── SessionSettings.tsx         # Session and caching settings
│   └── SettingsManagement.tsx      # Import/export and management
└── settings/
    └── page.tsx                    # Main settings page
```

### Data Flow
1. **SettingsProvider** wraps the application and provides settings context
2. **Individual components** use `useSettings()` hook to access and modify settings
3. **Changes** are tracked and can be saved to localStorage
4. **Settings** are automatically applied (theme, font size, colors)
5. **Storage utilities** handle import/export and backup operations

## Usage

### Basic Settings Access
```tsx
import { useSettings } from '../contexts/SettingsContext';

function MyComponent() {
  const { settings, updateAppearanceSetting } = useSettings();
  
  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    updateAppearanceSetting('theme', theme);
  };
  
  return (
    <div>
      Current theme: {settings.appearance.theme}
      <button onClick={() => handleThemeChange('dark')}>
        Switch to Dark
      </button>
    </div>
  );
}
```

### Storage Utilities
```tsx
import { useSettingsStorage } from '../hooks/useSettingsStorage';

function SettingsManager() {
  const { exportSettings, importSettings, clearAllSettings } = useSettingsStorage();
  
  const handleExport = () => {
    exportSettings(); // Downloads settings as JSON file
  };
  
  const handleImport = (file: File) => {
    importSettings(file); // Imports settings from JSON file
  };
  
  return (
    <div>
      <button onClick={handleExport}>Export Settings</button>
      <input type="file" accept=".json" onChange={(e) => e.target.files?.[0] && handleImport(e.target.files[0])} />
    </div>
  );
}
```

### Applying Settings in Components
```tsx
import { useSettings } from '../contexts/SettingsContext';

function DataTable() {
  const { settings } = useSettings();
  
  const tableClasses = [
    'border-collapse',
    settings.appearance.showGridLines ? 'border' : 'border-none',
    settings.appearance.tableDensity === 'compact' ? 'compact-table' : '',
    settings.appearance.tableDensity === 'spacious' ? 'spacious-table' : '',
  ].filter(Boolean).join(' ');
  
  return (
    <table className={tableClasses}>
      {/* Table content */}
    </table>
  );
}
```

## CSS Variables

The system automatically sets CSS custom properties for theming:

```css
:root {
  --primary-color: #3b82f6;
  --primary-rgb: 59, 130, 246;
  --primary-light: #93c5fd;
  --primary-dark: #1e40af;
  
  --card-background: #ffffff;
  --card-border: #e5e7eb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
}

.dark {
  --card-background: #1f2937;
  --card-border: #374151;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --text-muted: #9ca3af;
}
```

## Storage Format

Settings are stored in localStorage as JSON with this structure:

```json
{
  "appearance": {
    "theme": "auto",
    "primaryColor": "#3b82f6",
    "fontSize": "medium",
    "sidebarWidth": "normal",
    "tableDensity": "comfortable",
    "showAnimations": true,
    "showGridLines": true,
    "enableHoverEffects": true,
    "compactMode": false,
    "sidebarCollapsed": false
  },
  "ui": {
    "showBreadcrumbs": true,
    "showPageTitle": true,
    "showSearchBar": true,
    "enableKeyboardShortcuts": true,
    "showTooltips": true,
    "enableDragAndDrop": true,
    "showLoadingSpinners": true,
    "enableInfiniteScroll": false
  },
  "display": {
    "dateFormat": "MM/DD/YYYY",
    "timeFormat": "24h",
    "numberFormat": "comma",
    "currencySymbol": "$",
    "showCurrencyCode": true,
    "decimalPlaces": 2,
    "enableScientificNotation": false
  },
  "session": {
    "autoSave": true,
    "autoSaveInterval": 5,
    "rememberLastPage": true,
    "rememberFilters": true,
    "rememberSortOrder": true,
    "enableOfflineMode": false,
    "cacheExpiry": 24
  }
}
```

## Browser Compatibility

- **Modern Browsers**: Full support (Chrome 60+, Firefox 55+, Safari 12+)
- **localStorage**: Required for settings persistence
- **CSS Custom Properties**: Required for theming
- **Media Queries**: Required for auto theme detection

## Performance Considerations

- **Settings Loading**: Settings are loaded once on app initialization
- **Theme Changes**: Applied immediately via CSS classes and variables
- **Storage Operations**: Import/export operations are asynchronous
- **Memory Usage**: Settings typically use < 5KB of localStorage

## Security Notes

- **Client-side Only**: All settings are stored locally in the browser
- **No Sensitive Data**: Settings contain only UI preferences, no credentials
- **Import Validation**: JSON files are validated before import
- **XSS Protection**: Settings are not executed as code

## Future Enhancements

- **Settings Sync**: Cloud synchronization across devices
- **User Profiles**: Multiple user profiles with different settings
- **Advanced Theming**: Custom CSS injection and advanced color schemes
- **Settings API**: Backend integration for team-wide settings
- **Analytics**: Track popular settings and usage patterns

## Troubleshooting

### Settings Not Saving
- Check if localStorage is available and not full
- Verify browser permissions for local storage
- Check console for JavaScript errors

### Theme Not Applying
- Ensure CSS custom properties are supported
- Check if theme classes are being applied to document root
- Verify CSS variables are defined in globals.css

### Import/Export Issues
- Ensure file format is valid JSON
- Check file size (should be < 100KB)
- Verify file structure matches expected format

### Performance Issues
- Settings are loaded once on mount
- Theme changes are applied via CSS, not JavaScript
- Large settings objects may impact initial load time

## Contributing

When adding new settings:

1. **Update Types**: Add new properties to the appropriate interface in `SettingsContext.tsx`
2. **Add Defaults**: Include default values in the `defaultSettings` object
3. **Create UI**: Add controls in the appropriate settings component
4. **Apply Changes**: Ensure settings are applied where needed
5. **Update CSS**: Add any new CSS variables if theming-related
6. **Test Persistence**: Verify settings save and restore correctly

## License

This settings system is part of the backoffice application and follows the same licensing terms.