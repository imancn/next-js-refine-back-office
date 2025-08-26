# Ant Design + Tailwind CSS Integration Guide

This guide explains how to use Ant Design components seamlessly with Tailwind CSS in your project.

## 🚀 What's Been Added

### 1. **Ant Design Installation**
- `antd` - Core component library
- `@ant-design/icons` - Icon library
- TypeScript types for React 18+

### 2. **Theme Integration**
- Custom theme configuration (`src/lib/antd-theme.ts`)
- Seamless integration with existing CSS variables
- Dark/light mode support
- Consistent design tokens

### 3. **Theme Context**
- `ThemeProvider` for managing theme state
- Automatic theme switching
- Local storage persistence
- System preference detection

### 4. **Utility Functions**
- `cn()` function for merging Tailwind + Ant Design classes
- Pre-built class combinations
- Responsive utilities
- Animation classes

## 🎨 How to Use

### Basic Component Usage

```tsx
import { Button, Card, Input } from 'antd';
import { cn } from '@/lib/antd-tailwind-utils';

// Simple component with Tailwind classes
<Button className="w-full bg-primary hover:bg-primary-dark">
  Click me
</Button>

// Card with custom styling
<Card className={cn(
  "shadow-lg hover:shadow-xl transition-shadow duration-300",
  "border-2 border-primary/20"
)}>
  Content here
</Card>
```

### Form Layouts

```tsx
import { Form, Input, Button } from 'antd';
import { componentWrappers } from '@/lib/antd-tailwind-utils';

<Form layout="vertical" className="space-y-6">
  <div className={componentWrappers.formRow}>
    <Form.Item label="First Name" className="col-span-1">
      <Input placeholder="Enter first name" />
    </Form.Item>
    <Form.Item label="Last Name" className="col-span-1">
      <Input placeholder="Enter last name" />
    </Form.Item>
  </div>
  
  <Form.Item label="Email" className={componentWrappers.formFullWidth}>
    <Input placeholder="Enter email" />
  </Form.Item>
  
  <div className={componentWrappers.formActions}>
    <Button>Cancel</Button>
    <Button type="primary">Submit</Button>
  </div>
</Form>
```

### Responsive Design

```tsx
import { responsiveClasses } from '@/lib/antd-tailwind-utils';

// Responsive grid
<div className={responsiveClasses.desktop.grid}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</div>

// Responsive visibility
<div className={responsiveClasses.mobile.hidden}>
  Desktop only content
</div>
```

### Theme Integration

```tsx
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/app/components/ThemeToggle';

function MyComponent() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div className="p-6">
      <ThemeToggle />
      <p>Current theme: {isDarkMode ? 'Dark' : 'Light'}</p>
    </div>
  );
}
```

## 🎯 Best Practices

### 1. **Class Organization**
```tsx
// ✅ Good: Use utility functions for common patterns
<Card className={componentWrappers.cardInteractive}>
  Content
</Card>

// ✅ Good: Combine with custom classes
<Button className={cn(
  componentWrappers.buttonPrimary,
  "w-full md:w-auto",
  "text-lg font-semibold"
)}>
  Action
</Button>
```

### 2. **Responsive Design**
```tsx
// ✅ Good: Use responsive utilities
<div className={cn(
  "grid gap-4",
  responsiveClasses.tablet.grid,
  responsiveClasses.desktop.grid
)}>
  {/* Content */}
</div>
```

### 3. **Theme Consistency**
```tsx
// ✅ Good: Use CSS variables for theming
<div className="bg-card text-foreground border-border">
  Content
</div>

// ❌ Avoid: Hard-coded colors
<div className="bg-white text-black border-gray-300">
  Content
</div>
```

### 4. **Component Composition**
```tsx
// ✅ Good: Extend Ant Design components
<Card 
  className="hover:shadow-xl transition-all duration-300"
  bodyStyle={{ padding: '2rem' }}
>
  <div className="space-y-4">
    <h3 className="text-xl font-bold text-foreground">Title</h3>
    <p className="text-muted-foreground">Description</p>
  </div>
</Card>
```

## 🔧 Available Utilities

### Component Wrappers
- `cardBasic`, `cardInteractive`, `cardCompact`
- `formField`, `formLabel`, `formError`
- `tableWrapper`, `tableHeader`, `tableRow`
- `modalContent`, `modalHeader`, `modalFooter`

### Animation Classes
- `fadeIn`, `slideUp`, `scaleIn`
- `transitionFast`, `transitionNormal`, `transitionSlow`
- `hoverLift`, `hoverScale`, `hoverGlow`

### Responsive Utilities
- `mobile.hidden/visible`
- `tablet.grid/stack`
- `desktop.container`
- `wide.grid`

### Status Styles
- `statusSuccess`, `statusWarning`
- `statusError`, `statusInfo`

## 🌟 Component Examples

### Enhanced Table
```tsx
import { Table } from 'antd';
import { componentWrappers } from '@/lib/antd-tailwind-utils';

<Table
  columns={columns}
  dataSource={data}
  className={componentWrappers.tableWrapper}
  rowClassName={componentWrappers.tableRow}
/>
```

### Interactive Card
```tsx
import { Card } from 'antd';
import { componentWrappers, animationClasses } from '@/lib/antd-tailwind-utils';

<Card 
  className={cn(
    componentWrappers.cardInteractive,
    animationClasses.hoverLift
  )}
  onClick={handleClick}
>
  <div className="text-center">
    <Icon className="text-4xl text-primary mb-4" />
    <h3 className="text-lg font-semibold text-foreground">Title</h3>
    <p className="text-muted-foreground">Description</p>
  </div>
</Card>
```

### Form with Validation
```tsx
import { Form, Input, Button } from 'antd';
import { componentWrappers, formValidationStyles } from '@/lib/antd-tailwind-utils';

<Form layout="vertical">
  <Form.Item 
    label="Email" 
    className={componentWrappers.formField}
    validateStatus={hasError ? 'error' : 'success'}
  >
    <Input 
      className={hasError ? formValidationStyles.error : formValidationStyles.success}
      placeholder="Enter email"
    />
    {hasError && (
      <div className={componentWrappers.formError}>
        Please enter a valid email
      </div>
    )}
  </Form.Item>
</Form>
```

## 🚀 Getting Started

1. **View the Demo**: Navigate to `/antd-demo` to see all components in action
2. **Use the Theme Toggle**: Add `<ThemeToggle />` to your components
3. **Import Utilities**: Use `@/lib/antd-tailwind-utils` for common patterns
4. **Follow Examples**: Reference the showcase component for implementation patterns

## 🔍 Troubleshooting

### Common Issues

1. **Class Conflicts**: Use the `cn()` function to merge classes properly
2. **Theme Not Updating**: Ensure `ThemeProvider` wraps your app
3. **Responsive Issues**: Use the responsive utility classes
4. **Dark Mode**: Check that CSS variables are properly defined

### Performance Tips

1. **Memoize Components**: Use `React.memo` for expensive components
2. **Lazy Load**: Import Ant Design components as needed
3. **Bundle Analysis**: Monitor bundle size with large component imports

## 📚 Additional Resources

- [Ant Design Documentation](https://ant.design/docs/react/introduce)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Project CSS Variables](./CSS_STANDARDIZATION_SUMMARY.md)
- [Component Showcase](./src/app/components/AntdShowcase.tsx)

---

This integration provides the best of both worlds: Ant Design's comprehensive component library with Tailwind CSS's utility-first approach for custom styling and responsive design.