import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with Ant Design components
 * This ensures proper class precedence and removes duplicates
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Common Tailwind CSS classes for Ant Design components
 */
export const antdTailwindClasses = {
  // Layout & Spacing
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-8 lg:py-12',
  card: 'shadow-sm border border-border rounded-lg',
  cardHover: 'hover:shadow-md transition-shadow duration-200',
  
  // Form layouts
  formRow: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  formFullWidth: 'col-span-1 md:col-span-2',
  formActions: 'flex justify-end gap-3 pt-6 border-t border-border',
  
  // Button variations
  buttonPrimary: 'bg-primary hover:bg-primary-dark text-primary-foreground',
  buttonSecondary: 'bg-secondary hover:bg-secondary-foreground text-secondary-foreground',
  buttonDanger: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground',
  
  // Table enhancements
  tableContainer: 'overflow-x-auto border border-border rounded-lg',
  tableHeader: 'bg-secondary text-secondary-foreground font-medium',
  tableRow: 'hover:bg-accent transition-colors duration-150',
  
  // Modal & Drawer
  modalHeader: 'border-b border-border pb-4 mb-4',
  modalFooter: 'border-t border-border pt-4 mt-4',
  
  // Navigation
  navItem: 'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150',
  navItemActive: 'bg-primary text-primary-foreground',
  navItemHover: 'hover:bg-accent hover:text-accent-foreground',
  
  // Status indicators
  statusSuccess: 'text-green-600 bg-green-50 border-green-200',
  statusWarning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  statusError: 'text-red-600 bg-red-50 border-red-200',
  statusInfo: 'text-blue-600 bg-blue-50 border-blue-200',
  
  // Responsive utilities
  responsiveGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
  responsiveStack: 'flex flex-col sm:flex-row gap-4',
  
  // Animation classes
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  scaleIn: 'animate-scale-in',
  
  // Dark mode specific
  darkMode: 'dark:bg-card dark:text-foreground dark:border-border',
};

/**
 * Common component wrapper classes
 */
export const componentWrappers = {
  pageContainer: cn('min-h-screen bg-background'),
  contentArea: cn('p-6 space-y-6'),
  sidebar: cn('w-sidebar bg-card border-r border-border'),
  header: cn('h-16 bg-card border-b border-border px-6 flex items-center justify-between'),
  footer: cn('py-6 bg-card border-t border-border text-center text-muted-foreground'),
  
  // Form components
  formField: cn('mb-4'),
  formLabel: cn('block text-sm font-medium text-foreground mb-2'),
  formError: cn('text-sm text-destructive mt-1'),
  formHelp: cn('text-sm text-muted-foreground mt-1'),
  
  // Card variations
  cardBasic: cn('bg-card border border-border rounded-lg p-6'),
  cardInteractive: cn('bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer'),
  cardCompact: cn('bg-card border border-border rounded-lg p-4'),
  
  // Button groups
  buttonGroup: cn('flex gap-2'),
  buttonGroupVertical: cn('flex flex-col gap-2'),
  buttonGroupHorizontal: cn('flex gap-2'),
  
  // List variations
  listBasic: cn('divide-y divide-border'),
  listInteractive: cn('divide-y divide-border'),
  listItem: cn('py-3 px-4 hover:bg-accent transition-colors duration-150'),
  
  // Table enhancements
  tableWrapper: cn('overflow-x-auto border border-border rounded-lg'),
  tableHeader: cn('bg-secondary text-secondary-foreground'),
  tableRow: cn('hover:bg-accent transition-colors duration-150'),
  tableCell: cn('px-4 py-3 border-b border-border'),
  
  // Modal & Drawer
  modalContent: cn('bg-card border border-border rounded-lg'),
  modalHeader: cn('border-b border-border pb-4 mb-4'),
  modalBody: cn('py-4'),
  modalFooter: cn('border-t border-border pt-4 mt-4 flex justify-end gap-3'),
  
  // Navigation
  navContainer: cn('bg-card border-b border-border'),
  navItem: cn('px-4 py-2 text-foreground hover:bg-accent transition-colors duration-150'),
  navItemActive: cn('px-4 py-2 bg-primary text-primary-foreground'),
  
  // Status badges
  statusBadge: cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'),
  statusSuccess: cn('bg-green-100 text-green-800'),
  statusWarning: cn('bg-yellow-100 text-yellow-800'),
  statusError: cn('bg-red-100 text-red-800'),
  statusInfo: cn('bg-blue-100 text-blue-800'),
};

/**
 * Responsive breakpoint utilities
 */
export const responsiveClasses = {
  // Mobile first approach
  mobile: {
    hidden: 'block sm:hidden',
    visible: 'hidden sm:block',
    fullWidth: 'w-full',
    stack: 'flex flex-col space-y-4',
  },
  
  tablet: {
    hidden: 'hidden md:block',
    visible: 'block md:hidden',
    grid: 'grid-cols-1 md:grid-cols-2',
    stack: 'flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4',
  },
  
  desktop: {
    hidden: 'hidden lg:block',
    visible: 'block lg:hidden',
    grid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    container: 'max-w-6xl mx-auto',
  },
  
  wide: {
    hidden: 'hidden xl:block',
    visible: 'block xl:hidden',
    grid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    container: 'max-w-7xl mx-auto',
  },
};

/**
 * Animation and transition utilities
 */
export const animationClasses = {
  // Fade animations
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  fadeInUp: 'animate-fade-in-0',
  fadeOutDown: 'animate-fade-out-0',
  
  // Slide animations
  slideInLeft: 'animate-slide-in-from-left',
  slideInRight: 'animate-slide-in-from-right',
  slideInTop: 'animate-slide-in-from-top',
  slideInBottom: 'animate-slide-in-from-bottom',
  
  // Scale animations
  scaleIn: 'animate-scale-in',
  scaleOut: 'animate-scale-out',
  zoomIn: 'animate-zoom-in',
  zoomOut: 'animate-zoom-out',
  
  // Transitions
  transitionFast: 'transition-all duration-150',
  transitionNormal: 'transition-all duration-250',
  transitionSlow: 'transition-all duration-350',
  
  // Hover effects
  hoverLift: 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200',
  hoverScale: 'hover:scale-105 transition-transform duration-200',
  hoverGlow: 'hover:shadow-lg hover:shadow-primary/25 transition-shadow duration-200',
};

/**
 * Common form validation styles
 */
export const formValidationStyles = {
  success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
  error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
  warning: 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500',
  info: 'border-blue-500 focus:border-blue-500 focus:ring-blue-500',
};

/**
 * Utility function to create responsive class combinations
 */
export function createResponsiveClasses(
  baseClasses: string,
  breakpointClasses: Record<string, string> = {}
): string {
  const classes = [baseClasses];
  
  Object.entries(breakpointClasses).forEach(([breakpoint, classValue]) => {
    classes.push(`${breakpoint}:${classValue}`);
  });
  
  return cn(...classes);
}

/**
 * Common spacing scale that matches your design system
 */
export const spacingScale = {
  xs: 'var(--spacing-xs)', // 0.5rem
  sm: 'var(--spacing-sm)', // 0.75rem
  md: 'var(--spacing-md)', // 1rem
  lg: 'var(--spacing-lg)', // 1.5rem
  xl: 'var(--spacing-xl)', // 2rem
};

/**
 * Export commonly used combinations
 */
export default {
  cn,
  antdTailwindClasses,
  componentWrappers,
  responsiveClasses,
  animationClasses,
  formValidationStyles,
  createResponsiveClasses,
  spacingScale,
};