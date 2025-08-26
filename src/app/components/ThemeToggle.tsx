'use client';

import React from 'react';
import { Button, Tooltip } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  size?: 'small' | 'middle' | 'large';
  type?: 'text' | 'link' | 'default' | 'primary' | 'dashed';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'middle',
  type = 'text',
  className = '',
}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
      <Button
        type={type}
        size={size}
        icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleTheme}
        className={`theme-toggle ${className}`}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      />
    </Tooltip>
  );
};