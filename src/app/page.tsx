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
                          <TrendingUp className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                        ) : (
                          <TrendingDown className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
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

      {/* Quick actions and Recent activities */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <action.icon className={`h-5 w-5 text-${action.color}-600 mr-3`} />
                  <span className="text-sm font-medium text-gray-900">
                    {action.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
