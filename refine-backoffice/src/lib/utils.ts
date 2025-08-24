import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, cva } from 'class-variance-authority';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Button variants
export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Input variants
export const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Card variants
export const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-lg',
        outline: 'border-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Badge variants
export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        success: 'border-transparent bg-green-100 text-green-800 hover:bg-green-200',
        warning: 'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        info: 'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Table variants
export const tableVariants = cva(
  'w-full caption-bottom text-sm',
  {
    variants: {
      variant: {
        default: '',
        striped: '[&_tr:nth-child(even)]:bg-muted/50',
        bordered: 'border-collapse [&_td]:border [&_th]:border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Form variants
export const formVariants = cva(
  'space-y-6',
  {
    variants: {
      layout: {
        default: '',
        horizontal: 'grid grid-cols-1 gap-6 sm:grid-cols-2',
        compact: 'space-y-4',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  }
);

// Modal variants
export const modalVariants = cva(
  'fixed inset-0 z-50 flex items-center justify-center',
  {
    variants: {
      variant: {
        default: '',
        fullscreen: 'inset-0',
        centered: 'p-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Responsive utilities
export const responsive = {
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
  '2xl': '2xl:',
};

// Spacing utilities
export const spacing = {
  xs: 'space-y-1',
  sm: 'space-y-2',
  md: 'space-y-4',
  lg: 'space-y-6',
  xl: 'space-y-8',
};

// Flex utilities
export const flex = {
  center: 'flex items-center justify-center',
  between: 'flex items-center justify-between',
  start: 'flex items-center justify-start',
  end: 'flex items-center justify-end',
  col: 'flex flex-col',
  row: 'flex flex-row',
};

// Grid utilities
export const grid = {
  cols1: 'grid grid-cols-1',
  cols2: 'grid grid-cols-2',
  cols3: 'grid grid-cols-3',
  cols4: 'grid grid-cols-4',
  cols12: 'grid grid-cols-12',
  responsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

// Text utilities
export const text = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
  lead: 'text-xl text-muted-foreground',
  large: 'text-lg font-semibold',
  small: 'text-sm font-medium leading-none',
  muted: 'text-sm text-muted-foreground',
};

// Animation utilities
export const animation = {
  fadeIn: 'animate-in fade-in duration-300',
  slideIn: 'animate-in slide-in-from-bottom-4 duration-300',
  scaleIn: 'animate-in zoom-in-95 duration-200',
  slideUp: 'animate-in slide-in-from-top-4 duration-300',
};

// Status colors
export const statusColors = {
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  pending: 'bg-gray-100 text-gray-800 border-gray-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  shipped: 'bg-purple-100 text-purple-800 border-purple-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

// Role colors
export const roleColors = {
  admin: 'bg-red-100 text-red-800 border-red-200',
  user: 'bg-blue-100 text-blue-800 border-blue-200',
  manager: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type InputVariants = VariantProps<typeof inputVariants>;
export type CardVariants = VariantProps<typeof cardVariants>;
export type BadgeVariants = VariantProps<typeof badgeVariants>;
export type TableVariants = VariantProps<typeof tableVariants>;
export type FormVariants = VariantProps<typeof formVariants>;
export type ModalVariants = VariantProps<typeof modalVariants>;