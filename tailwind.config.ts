import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card-background)',
          foreground: 'var(--card-foreground)',
          border: 'var(--card-border)',
        },
        primary: {
          DEFAULT: 'var(--primary-color)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
          foreground: 'var(--primary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Monaco', 'Consolas', 'monospace'],
      },
      spacing: {
        'sidebar': 'var(--sidebar-width)',
        'sidebar-narrow': 'var(--sidebar-width-narrow)',
        'sidebar-wide': 'var(--sidebar-width-wide)',
      },
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'normal': 'var(--transition-normal)',
        'slow': 'var(--transition-slow)',
      },
      animation: {
        'fade-in': 'fadeIn var(--transition-normal) ease-out',
        'slide-up': 'slideUp var(--transition-normal) ease-out',
        'scale-in': 'scaleIn var(--transition-normal) ease-out',
        'in': 'fadeIn 0.2s ease-out',
        'out': 'fadeOut 0.2s ease-out',
        'fade-in-0': 'fadeIn0 0.2s ease-out',
        'fade-out-0': 'fadeOut0 0.2s ease-out',
        'slide-in-from-top': 'slideInFromTop 0.2s ease-out',
        'slide-in-from-bottom': 'slideInFromBottom 0.2s ease-out',
        'slide-in-from-left': 'slideInFromLeft 0.2s ease-out',
        'slide-in-from-right': 'slideInFromRight 0.2s ease-out',
        'slide-out-to-top': 'slideOutToTop 0.2s ease-out',
        'slide-out-to-bottom': 'slideOutToBottom 0.2s ease-out',
        'slide-out-to-left': 'slideOutToLeft 0.2s ease-out',
        'slide-out-to-right': 'slideOutToRight 0.2s ease-out',
        'slide-in-from-left-1/2': 'slideInFromLeftHalf 0.2s ease-out',
        'slide-in-from-top-48': 'slideInFromTop48 0.2s ease-out',
        'slide-out-to-left-1/2': 'slideOutToLeftHalf 0.2s ease-out',
        'slide-out-to-top-48': 'slideOutToTop48 0.2s ease-out',
        'zoom-in': 'zoomIn 0.2s ease-out',
        'zoom-out': 'zoomOut 0.2s ease-out',
        'zoom-in-95': 'zoomIn95 0.2s ease-out',
        'zoom-out-95': 'zoomOut95 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeIn0: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut0: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutToTop: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        slideOutToBottom: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        slideOutToLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        slideOutToRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideInFromLeftHalf: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInFromTop48: {
          '0%': { transform: 'translateY(-48%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideOutToLeftHalf: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideOutToTop48: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-48%)' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        zoomOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        zoomIn95: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        zoomOut95: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;