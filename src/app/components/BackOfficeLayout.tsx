'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings, 
  BarChart3, 
  FileText, 
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Database
} from 'lucide-react';


interface BackOfficeLayoutProps {
  children: React.ReactNode;
}

interface NavigationItem {
  name: string;
  href?: string;
  icon: any;
  children?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { 
    name: 'CRUD', 
    icon: Database,
    children: [
      { name: 'Users', href: '/users', icon: Users },
      { name: 'Products', href: '/products', icon: Package },
      { name: 'Orders', href: '/orders', icon: ShoppingCart },
    ]
  },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function BackOfficeLayout({ children }: BackOfficeLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const renderNavigationItem = (item: NavigationItem, isMobile: boolean = false) => {
    const isActive = item.href ? pathname === item.href : false;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.name);

    if (hasChildren) {
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleExpanded(item.name)}
            className={`group flex w-full items-center justify-between px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900`}
          >
            <div className="flex items-center">
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </div>
            <ChevronDown 
              className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
          {isExpanded && (
            <div className="ml-4 space-y-1">
              {item.children!.map((child) => {
                const isChildActive = pathname === child.href;
                return (
                  <Link
                    key={child.name}
                    href={child.href!}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isChildActive
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => isMobile && setSidebarOpen(false)}
                  >
                    <child.icon className="mr-3 h-5 w-5" />
                    {child.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.name}
        href={item.href!}
        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
          isActive
            ? 'bg-blue-100 text-blue-900'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
        onClick={() => isMobile && setSidebarOpen(false)}
      >
        <item.icon className="mr-3 h-5 w-5" />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-gray-900">Back Office</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => renderNavigationItem(item, true))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-gray-900">Back Office</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => renderNavigationItem(item))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block h-full w-full border-0 py-0 pl-10 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <Bell className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      
    </div>
  );
}