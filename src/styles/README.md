# CSS Architecture & Standards

This document outlines the standardized CSS architecture used in this project.

## Overview

The CSS architecture follows a modular, component-based approach using Tailwind CSS v4 with custom CSS variables and utility classes. The system is designed to be maintainable, scalable, and consistent across the entire application.

## Directory Structure

```
src/styles/
├── components/          # Component-specific styles
│   └── base.css        # Base component styles
├── layouts/            # Layout-specific styles
│   └── layout.css      # Layout patterns and utilities
├── themes/             # Theme-related styles
│   └── theme.css       # Theme switching and color schemes
├── utilities/          # Utility classes (future use)
├── index.css           # Main styles index
└── README.md           # This documentation
```

## Core Principles

### 1. CSS Variables First
- All design tokens are defined as CSS custom properties
- Colors, spacing, typography, and transitions are centralized
- Easy theme switching and customization

### 2. Utility-First Approach
- Leverage Tailwind CSS utilities for common patterns
- Custom utility classes for project-specific needs
- Consistent spacing, sizing, and layout patterns

### 3. Component-Based Architecture
- Reusable component styles with variants
- Consistent component APIs
- Easy to maintain and extend

### 4. Responsive Design
- Mobile-first approach
- Consistent breakpoint system
- Responsive utility classes

## CSS Variables

### Color System

```css
:root {
  /* Base colors */
  --background: #ffffff;
  --foreground: #171717;
  
  /* Primary palette */
  --primary-color: #3b82f6;
  --primary-rgb: 59, 130, 246;
  --primary-light: #93c5fd;
  --primary-dark: #1e40af;
  --primary-foreground: #ffffff;
  
  /* Semantic colors */
  --secondary: #f8fafc;
  --accent: #f1f5f9;
  --muted: #f8fafc;
  --destructive: #ef4444;
  
  /* Component colors */
  --card-background: #ffffff;
  --card-border: #e2e8f0;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #3b82f6;
}
```

### Spacing Scale

```css
:root {
  --spacing-xs: 0.5rem;   /* 8px */
  --spacing-sm: 0.75rem;  /* 12px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
}
```

### Typography

```css
:root {
  --font-size-small: 14px;
  --font-size-medium: 16px;
  --font-size-large: 18px;
}
```

### Transitions

```css
:root {
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
}
```

## Theme System

### Light Theme (Default)
```css
.light {
  --background: #ffffff;
  --foreground: #171717;
  --card-background: #ffffff;
  --card-border: #e5e7eb;
  /* ... other light theme variables */
}
```

### Dark Theme
```css
.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
  --card-background: #1f2937;
  --card-border: #374151;
  /* ... other dark theme variables */
}
```

### Spacing Modes

```css
/* Compact mode */
.compact-mode {
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  /* ... */
}

/* Normal mode (default) */
:root {
  --spacing-xs: 0.5rem;
  --spacing-sm: 0.75rem;
  /* ... */
}

/* Spacious mode */
.spacious-mode {
  --spacing-xs: 0.75rem;
  --spacing-sm: 1rem;
  /* ... */
}
```

## Component Styles

### Button Variants

```css
.btn {
  @apply inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2;
  @apply disabled:opacity-50 disabled:pointer-events-none;
}

.btn-xs { @apply h-7 px-2 text-xs; }
.btn-sm { @apply h-9 px-3; }
.btn-md { @apply h-10 py-2 px-4; }
.btn-lg { @apply h-11 px-8; }
.btn-xl { @apply h-12 px-10 text-lg; }
```

### Card Variants

```css
.card {
  @apply rounded-lg border bg-card text-card-foreground shadow-sm;
}

.card-sm { @apply p-4; }
.card-md { @apply p-6; }
.card-lg { @apply p-8; }
.card-xl { @apply p-10; }
```

### Form Variants

```css
.form {
  @apply space-y-6;
}

.form-horizontal {
  @apply grid grid-cols-1 gap-6 sm:grid-cols-2;
}

.form-compact {
  @apply space-y-4;
}
```

## Layout Patterns

### Dashboard Layout

```css
.dashboard-layout {
  @apply flex min-h-screen bg-background;
}

.dashboard-sidebar {
  @apply fixed left-0 top-0 z-40 h-screen w-sidebar border-r bg-card;
  @apply transition-transform duration-300 ease-in-out;
}

.dashboard-main {
  @apply flex-1 ml-sidebar transition-all duration-300;
}
```

### Grid Layouts

```css
.grid-layout-1 { @apply grid-cols-1; }
.grid-layout-2 { @apply grid-cols-1 sm:grid-cols-2; }
.grid-layout-3 { @apply grid-cols-1 sm:grid-cols-2 lg:grid-cols-3; }
.grid-layout-4 { @apply grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4; }
.grid-layout-responsive { @apply grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5; }
```

### Flex Layouts

```css
.flex-layout-center { @apply items-center justify-center; }
.flex-layout-between { @apply items-center justify-between; }
.flex-layout-start { @apply items-center justify-start; }
.flex-layout-end { @apply items-center justify-end; }
.flex-layout-col { @apply flex-col; }
.flex-layout-row { @apply flex-row; }
```

## Utility Classes

### Spacing Utilities

```css
.space-y-xs { @apply space-y-1; }
.space-y-sm { @apply space-y-2; }
.space-y-md { @apply space-y-4; }
.space-y-lg { @apply space-y-6; }
.space-y-xl { @apply space-y-8; }

.p-xs { @apply p-1; }
.p-sm { @apply p-2; }
.p-md { @apply p-4; }
.p-lg { @apply p-6; }
.p-xl { @apply p-8; }
```

### Text Utilities

```css
.text-xs { @apply text-xs; }
.text-sm { @apply text-sm; }
.text-base { @apply text-base; }
.text-lg { @apply text-lg; }
.text-xl { @apply text-xl; }
.text-2xl { @apply text-2xl; }
.text-3xl { @apply text-3xl; }
.text-4xl { @apply text-4xl; }
.text-5xl { @apply text-5xl; }

.font-light { @apply font-light; }
.font-normal { @apply font-normal; }
.font-medium { @apply font-medium; }
.font-semibold { @apply font-semibold; }
.font-bold { @apply font-bold; }
.font-extrabold { @apply font-extrabold; }
```

## Accessibility Features

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  :root {
    --border: #000000;
    --input: #000000;
    --ring: #000000;
    /* ... high contrast colors */
  }
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Management
```css
*:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
```

## Usage Examples

### Basic Component
```tsx
import { cn, buttonVariants } from '@/lib/utils';

function Button({ variant = 'default', size = 'default', className, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

### Layout Component
```tsx
function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        {/* Sidebar content */}
      </aside>
      <main className="dashboard-main">
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
}
```

### Form Component
```tsx
function Form({ layout = 'default', children }) {
  return (
    <form className={cn('form', `form-layout-${layout}`)}>
      {children}
    </form>
  );
}
```

## Best Practices

### 1. Use CSS Variables
- Always use CSS variables for design tokens
- Don't hardcode colors, spacing, or other values
- Leverage the theme system for consistency

### 2. Leverage Utility Classes
- Use Tailwind utilities for common patterns
- Create custom utilities for project-specific needs
- Keep utilities focused and reusable

### 3. Component Variants
- Use the `cva` function for component variants
- Keep variants consistent across components
- Document variant options clearly

### 4. Responsive Design
- Use mobile-first approach
- Leverage responsive utility classes
- Test on multiple screen sizes

### 5. Accessibility
- Always include focus states
- Support high contrast mode
- Respect reduced motion preferences
- Use semantic HTML with proper ARIA labels

### 6. Performance
- Minimize CSS bundle size
- Use CSS variables for dynamic values
- Avoid deep nesting
- Leverage CSS containment where appropriate

## Migration Guide

### From Inline Styles
```tsx
// Before
<div style={{ padding: '16px', marginBottom: '24px' }}>

// After
<div className="p-4 mb-6">
```

### From CSS Modules
```tsx
// Before
import styles from './Component.module.css';
<div className={styles.container}>

// After
<div className="card-layout p-6">
```

### From Styled Components
```tsx
// Before
const StyledButton = styled.button`
  padding: 8px 16px;
  background: ${props => props.primary ? '#007bff' : '#6c757d'};
`;

// After
<button className={cn(buttonVariants({ variant: primary ? 'default' : 'secondary' }))}>
```

## Troubleshooting

### Common Issues

1. **CSS Variables Not Working**
   - Ensure CSS variables are defined in `:root`
   - Check for typos in variable names
   - Verify CSS import order

2. **Theme Switching Not Working**
   - Check if theme class is applied to HTML element
   - Verify CSS variable definitions in theme classes
   - Check for CSS specificity conflicts

3. **Responsive Utilities Not Working**
   - Verify Tailwind configuration
   - Check breakpoint definitions
   - Ensure proper CSS import order

4. **Component Variants Not Applying**
   - Check `cva` function configuration
   - Verify variant names match usage
   - Check for CSS class conflicts

### Debug Tools

- Use browser dev tools to inspect CSS variables
- Check CSS cascade and specificity
- Verify Tailwind class generation
- Use CSS custom properties debugger

## Future Enhancements

- CSS-in-JS integration
- Advanced theming system
- Component style guide
- Automated CSS testing
- Performance monitoring
- Design token management system