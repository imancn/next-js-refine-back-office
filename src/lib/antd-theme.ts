import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    // Color system - integrating with your existing CSS variables
    colorPrimary: 'var(--primary-color)',
    colorPrimaryHover: 'var(--primary-light)',
    colorPrimaryActive: 'var(--primary-dark)',
    colorPrimaryBg: 'var(--primary-color)',
    colorPrimaryBgHover: 'var(--primary-light)',
    colorPrimaryBorder: 'var(--primary-color)',
    colorPrimaryBorderHover: 'var(--primary-light)',
    
    // Success colors
    colorSuccess: '#10b981',
    colorSuccessHover: '#059669',
    colorSuccessActive: '#047857',
    colorSuccessBg: '#d1fae5',
    colorSuccessBgHover: '#a7f3d0',
    colorSuccessBorder: '#10b981',
    colorSuccessBorderHover: '#059669',
    
    // Warning colors
    colorWarning: '#f59e0b',
    colorWarningHover: '#d97706',
    colorWarningActive: '#b45309',
    colorWarningBg: '#fef3c7',
    colorWarningBgHover: '#fde68a',
    colorWarningBorder: '#f59e0b',
    colorWarningBorderHover: '#d97706',
    
    // Error colors
    colorError: 'var(--destructive)',
    colorErrorHover: '#dc2626',
    colorErrorActive: '#b91c1c',
    colorErrorBg: '#fee2e2',
    colorErrorBgHover: '#fecaca',
    colorErrorBorder: 'var(--destructive)',
    colorErrorBorderHover: '#dc2626',
    
    // Info colors
    colorInfo: '#3b82f6',
    colorInfoHover: '#2563eb',
    colorInfoActive: '#1d4ed8',
    colorInfoBg: '#dbeafe',
    colorInfoBgHover: '#bfdbfe',
    colorInfoBorder: '#3b82f6',
    colorInfoBorderHover: '#2563eb',
    
    // Neutral colors - integrating with your design system
    colorBgBase: 'var(--background)',
    colorBgContainer: 'var(--card-background)',
    colorBgElevated: 'var(--card-background)',
    colorBgLayout: 'var(--background)',
    colorBgSpotlight: 'var(--popover)',
    colorBgMask: 'rgba(0, 0, 0, 0.45)',
    
    // Text colors
    colorText: 'var(--foreground)',
    colorTextSecondary: 'var(--muted-foreground)',
    colorTextTertiary: 'var(--muted-foreground)',
    colorTextQuaternary: 'var(--muted-foreground)',
    colorTextPlaceholder: 'var(--muted-foreground)',
    colorTextDisabled: 'var(--muted-foreground)',
    
    // Border colors
    colorBorder: 'var(--border)',
    colorBorderSecondary: 'var(--card-border)',
    
    // Fill colors
    colorFill: 'var(--accent)',
    colorFillSecondary: 'var(--muted)',
    colorFillTertiary: 'var(--muted)',
    colorFillQuaternary: 'var(--muted)',
    
    // Control colors
    colorBgContainerDisabled: 'var(--muted)',
    
    // Font settings - integrating with your existing font system
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    fontFamilyCode: 'var(--font-geist-mono), "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
    
    // Font sizes
    fontSize: 14,
    fontSizeSM: 12,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    
    // Line heights
    lineHeight: 1.5714,
    lineHeightLG: 1.5,
    lineHeightSM: 1.6667,
    
    // Border radius
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
    borderRadiusXS: 2,
    
    // Control height
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,
    
    // Padding
    padding: 16,
    paddingLG: 24,
    paddingMD: 16,
    paddingSM: 12,
    paddingXS: 8,
    paddingXXS: 4,
    
    // Margin
    margin: 16,
    marginLG: 24,
    marginMD: 16,
    marginSM: 12,
    marginXS: 8,
    marginXXS: 4,
    
    // Motion
    motionDurationFast: 'var(--transition-fast)',
    motionDurationMid: 'var(--transition-normal)',
    motionDurationSlow: 'var(--transition-slow)',
    
    // Box shadow
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
    boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
  },
  
  // Component-specific token overrides
  components: {
    Button: {
      borderRadius: 6,
      controlHeight: 36,
      controlHeightLG: 44,
      controlHeightSM: 28,
      paddingInline: 16,
      paddingInlineLG: 20,
      paddingInlineSM: 12,
    },
    Input: {
      borderRadius: 6,
      controlHeight: 36,
      controlHeightLG: 44,
      controlHeightSM: 28,
    },
    Select: {
      borderRadius: 6,
      controlHeight: 36,
      controlHeightLG: 44,
      controlHeightSM: 28,
    },
    Card: {
      borderRadius: 8,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
      boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    },
    Table: {
      borderRadius: 8,
      headerBg: 'var(--secondary)',
      headerColor: 'var(--secondary-foreground)',
      rowHoverBg: 'var(--accent)',
    },
    Modal: {
      borderRadius: 8,
      headerBg: 'var(--card-background)',
      contentBg: 'var(--card-background)',
      footerBg: 'var(--card-background)',
    },
    Drawer: {
      colorBgElevated: 'var(--card-background)',
    },
    Menu: {
      itemBg: 'transparent',
      itemHoverBg: 'var(--accent)',
      itemSelectedBg: 'var(--primary-color)',
      itemSelectedColor: 'var(--primary-foreground)',
      itemHoverColor: 'var(--foreground)',
    },
    Layout: {
      headerBg: 'var(--card-background)',
      siderBg: 'var(--card-background)',
      bodyBg: 'var(--background)',
      footerBg: 'var(--card-background)',
    },
  },
};

// Dark theme overrides
export const antdDarkTheme: ThemeConfig = {
  ...antdTheme,
  token: {
    ...antdTheme.token,
    // Override colors for dark mode
    colorBgBase: 'var(--background)',
    colorBgContainer: 'var(--card-background)',
    colorBgElevated: 'var(--card-background)',
    colorBgLayout: 'var(--background)',
    colorBgSpotlight: 'var(--popover)',
    colorText: 'var(--foreground)',
    colorTextSecondary: 'var(--muted-foreground)',
    colorBorder: 'var(--border)',
    colorBorderSecondary: 'var(--card-border)',
    colorFill: 'var(--accent)',
    colorFillSecondary: 'var(--muted)',
  },
};