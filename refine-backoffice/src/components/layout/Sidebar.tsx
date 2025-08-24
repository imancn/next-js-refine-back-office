'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { getAllEntityConfigs } from '@/entities';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3,
  FileText,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavigationItem {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children?: NavigationItem[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  FileText,
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t, direction } = useI18n();
  const pathname = usePathname();
  const entityConfigs = getAllEntityConfigs();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const navigationItems: NavigationItem[] = [
    {
      name: 'dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      label: t('navigation.dashboard'),
    },
    {
      name: 'entities',
      label: 'Entities',
      icon: FileText,
      children: entityConfigs.map(config => ({
        name: config.name,
        href: `/entities/${config.name}`,
        icon: iconMap[config.icon as keyof typeof iconMap] || FileText,
        label: t(`${config.name}.title`),
      })),
    },
    {
      name: 'reports',
      href: '/reports',
      icon: BarChart3,
      label: t('navigation.reports'),
    },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    if (href.startsWith('/entities/')) {
      return pathname.startsWith(href);
    }
    return pathname === href;
  };

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const isItemActive = item.href ? isActive(item.href) : false;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.name);

    if (hasChildren) {
      return (
        <div key={item.name} className="space-y-1">
          <button
            onClick={() => toggleExpanded(item.name)}
            className={cn(
              'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              'transition-colors',
              level > 0 && 'ml-4'
            )}
          >
            <div className={cn(
              'flex items-center gap-3',
              direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'
            )}>
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          {isExpanded && (
            <div className="ml-4 space-y-1">
              {item.children.map((child) => renderNavigationItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.name}
        href={item.href!}
        onClick={onClose}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          isItemActive
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground',
          level > 0 && 'ml-4'
        )}
      >
        <item.icon className="h-4 w-4" />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r bg-background transition-transform duration-200 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          direction === 'rtl' ? 'right-0' : 'left-0'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {navigationItems.map(item => renderNavigationItem(item))}
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="text-xs text-muted-foreground">
              <div className="font-medium">Refine Backoffice</div>
              <div>v1.0.0</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};