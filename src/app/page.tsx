'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Eye,
  BarChart3,
  FileText
} from 'lucide-react';

// Mock data for demonstration
const stats = [
  {
    name: 'Total Users',
    value: '2,847',
    change: '+12.5%',
    changeType: 'positive',
    icon: Users,
    href: '/users'
  },
  {
    name: 'Total Products',
    value: '156',
    change: '+8.2%',
    changeType: 'positive',
    icon: Package,
    href: '/products'
  },
  {
    name: 'Total Orders',
    value: '1,234',
    change: '+23.1%',
    changeType: 'positive',
    icon: ShoppingCart,
    href: '/orders'
  },
  {
    name: 'Revenue',
    value: '$45,678',
    change: '+18.7%',
    changeType: 'positive',
    icon: DollarSign,
    href: '/analytics'
  }
];

const recentActivities = [
  { id: 1, action: 'New user registered', user: 'john.doe@example.com', time: '2 minutes ago' },
  { id: 2, action: 'Order #1234 completed', user: 'jane.smith@example.com', time: '5 minutes ago' },
  { id: 3, action: 'Product "Laptop Pro" updated', user: 'admin@company.com', time: '10 minutes ago' },
  { id: 4, action: 'New product added', user: 'admin@company.com', time: '15 minutes ago' },
  { id: 5, action: 'Payment received', user: 'bob.wilson@example.com', time: '20 minutes ago' }
];

const quickActions = [
  { name: 'Add User', href: '/users/new', icon: Plus, color: 'blue' },
  { name: 'Add Product', href: '/products/new', icon: Plus, color: 'green' },
  { name: 'View Analytics', href: '/analytics', icon: BarChart3, color: 'purple' },
  { name: 'Generate Report', href: '/reports', icon: FileText, color: 'orange' }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your back office dashboard</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.changeType === 'positive' ? (
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                        )}
                        <span className="sr-only">
                          {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                        </span>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className={`relative group bg-gray-50 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg hover:bg-gray-100 transition-colors`}
              >
                <div>
                  <span className={`rounded-lg inline-flex p-3 bg-${action.color}-100 text-${action.color}-600`}>
                    <action.icon className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                    {action.name}
                  </h3>
                </div>
                <span className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 00-1 1v1H6a1 1 0 000 2h1v1a1 1 0 002 0V7h1a1 1 0 000-2H9V4a1 1 0 00-1-1zm12 0a1 1 0 00-1 1v1h-1a1 1 0 000 2h1v1a1 1 0 002 0V7h1a1 1 0 000-2h-1V4a1 1 0 00-1-1z" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivities.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivities.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                          <Eye className="h-4 w-4 text-white" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {activity.action} by{' '}
                            <span className="font-medium text-gray-900">{activity.user}</span>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time>{activity.time}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Available Features
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">User Management</h4>
              <p className="text-sm text-gray-600 mb-3">Complete CRUD operations for user accounts</p>
              <Link href="/users" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Manage Users →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Product Catalog</h4>
              <p className="text-sm text-gray-600 mb-3">Manage products, categories, and inventory</p>
              <Link href="/products" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Manage Products →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Order Processing</h4>
              <p className="text-sm text-gray-600 mb-3">Track orders, status updates, and fulfillment</p>
              <Link href="/orders" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Orders →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Analytics Dashboard</h4>
              <p className="text-sm text-gray-600 mb-3">Charts, metrics, and business insights</p>
              <Link href="/analytics" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Analytics →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Reporting System</h4>
              <p className="text-sm text-gray-600 mb-3">Generate and export detailed reports</p>
              <Link href="/reports" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Generate Reports →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">System Settings</h4>
              <p className="text-sm text-gray-600 mb-3">Configure application preferences</p>
              <Link href="/settings" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Configure Settings →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
