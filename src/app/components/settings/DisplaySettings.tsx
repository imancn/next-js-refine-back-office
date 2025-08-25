'use client';

import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { 
  Calendar, 
  Clock, 
  Hash, 
  DollarSign, 
  Eye, 
  EyeOff,
  Calculator,
  TrendingUp
} from 'lucide-react';

export const DisplaySettings: React.FC = () => {
  const { settings, updateDisplaySetting } = useSettings();

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY', example: '12/25/2024' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY', example: '25/12/2024' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD', example: '2024-12-25' },
  ];

  const timeFormatOptions = [
    { value: '12h', label: '12-hour (AM/PM)', example: '2:30 PM' },
    { value: '24h', label: '24-hour', example: '14:30' },
  ];

  const numberFormatOptions = [
    { value: 'comma', label: 'Comma separator', example: '1,234.56' },
    { value: 'dot', label: 'Dot separator', example: '1.234,56' },
    { value: 'space', label: 'Space separator', example: '1 234.56' },
  ];

  const currencyOptions = [
    { symbol: '$', code: 'USD', name: 'US Dollar' },
    { symbol: '€', code: 'EUR', name: 'Euro' },
    { symbol: '£', code: 'GBP', name: 'British Pound' },
    { symbol: '¥', code: 'JPY', name: 'Japanese Yen' },
    { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
    { symbol: '₽', code: 'RUB', name: 'Russian Ruble' },
    { symbol: '₩', code: 'KRW', name: 'South Korean Won' },
    { symbol: '₪', code: 'ILS', name: 'Israeli Shekel' },
  ];

  const decimalPlacesOptions = [0, 1, 2, 3, 4, 5];

  const formatNumber = (value: number, format: string) => {
    switch (format) {
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

  const formatCurrency = (value: number, symbol: string, showCode: boolean, decimals: number) => {
    const formatted = value.toFixed(decimals);
    const code = showCode ? ' USD' : '';
    return `${symbol}${formatted}${code}`;
  };

  const formatDate = (format: string) => {
    const date = new Date('2024-12-25');
    switch (format) {
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

  const formatTime = (format: string) => {
    const time = new Date('2024-12-25T14:30:00');
    if (format === '12h') {
      return time.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return time.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Date & Time Formatting */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Date & Time Formatting
        </h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Date Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Date Format</label>
            <div className="space-y-2">
              {dateFormatOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateDisplaySetting('dateFormat', option.value)}
                  className={`w-full p-3 text-left border rounded-md transition-all ${
                    settings.display.dateFormat === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-500">Example: {option.example}</div>
                    </div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {formatDate(option.value)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Time Format</label>
            <div className="space-y-2">
              {timeFormatOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateDisplaySetting('timeFormat', option.value)}
                  className={`w-full p-3 text-left border rounded-md transition-all ${
                    settings.display.timeFormat === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-500">Example: {option.example}</div>
                    </div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {formatTime(option.value)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Number Formatting */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Hash className="h-5 w-5 mr-2" />
          Number Formatting
        </h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Number Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Number Format</label>
            <div className="space-y-2">
              {numberFormatOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateDisplaySetting('numberFormat', option.value)}
                  className={`w-full p-3 text-left border rounded-md transition-all ${
                    settings.display.numberFormat === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-500">Example: {option.example}</div>
                    </div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {formatNumber(1234.56, option.value)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Decimal Places */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Decimal Places</label>
            <div className="space-y-2">
              {decimalPlacesOptions.map((places) => (
                <button
                  key={places}
                  onClick={() => updateDisplaySetting('decimalPlaces', places)}
                  className={`w-full p-3 text-left border rounded-md transition-all ${
                    settings.display.decimalPlaces === places
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{places} decimal places</span>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {1234.56789.toFixed(places)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scientific Notation */}
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <Calculator className="h-5 w-5 mr-3 text-gray-500" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">Enable Scientific Notation</h4>
              <p className="text-sm text-gray-500">Use scientific notation for very large or small numbers</p>
            </div>
          </div>
          <button
            onClick={() => updateDisplaySetting('enableScientificNotation', !settings.display.enableScientificNotation)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.display.enableScientificNotation ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.display.enableScientificNotation ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>

      {/* Currency Display */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <DollarSign className="h-5 w-5 mr-2" />
          Currency Display
        </h3>
        
        <div className="space-y-4">
          {/* Currency Symbol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Currency Symbol</label>
            <div className="grid grid-cols-4 gap-2">
              {currencyOptions.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => updateDisplaySetting('currencySymbol', currency.symbol)}
                  className={`p-3 border rounded-lg text-center transition-all ${
                    settings.display.currencySymbol === currency.symbol
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg font-medium">{currency.symbol}</div>
                  <div className="text-xs text-gray-500">{currency.code}</div>
                  <div className="text-xs text-gray-400">{currency.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Show Currency Code */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Eye className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Show Currency Code</h4>
                <p className="text-sm text-gray-500">Display the currency code alongside the symbol</p>
              </div>
            </div>
            <button
              onClick={() => updateDisplaySetting('showCurrencyCode', !settings.display.showCurrencyCode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.display.showCurrencyCode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.display.showCurrencyCode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Live Preview
        </h3>
        
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">Date & Time</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Date:</span>{' '}
                  <span className="font-mono">{formatDate(settings.display.dateFormat)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Time:</span>{' '}
                  <span className="font-mono">{formatTime(settings.display.timeFormat)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">Numbers & Currency</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Number:</span>{' '}
                  <span className="font-mono">{formatNumber(1234567.89, settings.display.numberFormat)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Currency:</span>{' '}
                  <span className="font-mono">
                    {formatCurrency(1234.56, settings.display.currencySymbol, settings.display.showCurrencyCode, settings.display.decimalPlaces)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {settings.display.enableScientificNotation && (
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">Scientific Notation</h4>
              <div className="text-sm space-y-1">
                <div>
                  <span className="text-gray-500">Large number:</span>{' '}
                  <span className="font-mono">1.23 × 10⁶</span>
                </div>
                <div>
                  <span className="text-gray-500">Small number:</span>{' '}
                  <span className="font-mono">1.23 × 10⁻⁶</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings Summary */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Current Display Settings</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Date Format:</span>
              <span className="text-sm font-medium">{settings.display.dateFormat}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Time Format:</span>
              <span className="text-sm font-medium">{settings.display.timeFormat}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Number Format:</span>
              <span className="text-sm font-medium">{settings.display.numberFormat}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Currency Symbol:</span>
              <span className="text-sm font-medium">{settings.display.currencySymbol}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Decimal Places:</span>
              <span className="text-sm font-medium">{settings.display.decimalPlaces}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Show Currency Code:</span>
              <span className="text-sm font-medium">
                {settings.display.showCurrencyCode ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Scientific Notation:</span>
              <span className="text-sm font-medium">
                {settings.display.enableScientificNotation ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};