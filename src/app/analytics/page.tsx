'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Calendar,
  Filter
} from 'lucide-react';

// Mock data for charts
const monthlyData = [
  { month: 'Jan', users: 1200, products: 85, orders: 45, revenue: 12500 },
  { month: 'Feb', users: 1250, products: 92, orders: 52, revenue: 14200 },
  { month: 'Mar', users: 1300, products: 98, orders: 58, revenue: 15800 },
  { month: 'Apr', users: 1350, products: 105, orders: 65, revenue: 17200 },
  { month: 'May', users: 1400, products: 112, orders: 72, revenue: 18900 },
  { month: 'Jun', users: 1450, products: 118, orders: 78, revenue: 20500 },
  { month: 'Jul', users: 1500, products: 125, orders: 85, revenue: 22100 },
  { month: 'Aug', users: 1550, products: 132, orders: 92, revenue: 23800 },
  { month: 'Sep', users: 1600, products: 138, orders: 98, revenue: 25500 },
  { month: 'Oct', users: 1650, products: 145, orders: 105, revenue: 27200 },
  { month: 'Nov', users: 1700, products: 152, orders: 112, revenue: 28900 },
  { month: 'Dec', users: 1750, products: 158, orders: 118, revenue: 30600 },
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#3b82f6' },
  { name: 'Clothing', value: 25, color: '#10b981' },
  { name: 'Books', value: 20, color: '#f59e0b' },
  { name: 'Home & Garden', value: 15, color: '#ef4444' },
  { name: 'Sports', value: 5, color: '#8b5cf6' },
];

const orderStatusData = [
  { name: 'Delivered', value: 65, color: '#10b981' },
  { name: 'Processing', value: 20, color: '#3b82f6' },
  { name: 'Shipped', value: 10, color: '#8b5cf6' },
  { name: 'Pending', value: 5, color: '#f59e0b' },
];

const topProducts = [
  { name: 'Laptop Pro', sales: 45, revenue: 58455, growth: 12.5 },
  { name: 'Wireless Headphones', sales: 38, revenue: 7562, growth: 8.2 },
  { name: 'Smart Watch', sales: 32, revenue: 9568, growth: 15.7 },
  { name: 'Fitness Tracker', sales: 28, revenue: 4172, growth: -2.1 },
  { name: 'Coffee Maker', sales: 25, revenue: 2225, growth: 5.4 },
];

const topCustomers = [
  { name: 'John Smith', orders: 12, total: 2345, lastOrder: '2024-02-15' },
  { name: 'Sarah Johnson', orders: 10, total: 1890, lastOrder: '2024-02-14' },
  { name: 'Mike Wilson', orders: 8, total: 1567, lastOrder: '2024-02-13' },
  { name: 'Emily Davis', orders: 7, total: 1345, lastOrder: '2024-02-12' },
  { name: 'David Brown', orders: 6, total: 1123, lastOrder: '2024-02-11' },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('12m');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const currentData = monthlyData[monthlyData.length - 1];
  const previousData = monthlyData[monthlyData.length - 2];

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  const userGrowth = calculateGrowth(currentData.users, previousData.users);
  const productGrowth = calculateGrowth(currentData.products, previousData.products);
  const orderGrowth = calculateGrowth(currentData.orders, previousData.orders);
  const revenueGrowth = calculateGrowth(currentData.revenue, previousData.revenue);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Business insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="3m">Last 3 months</option>
            <option value="6m">Last 6 months</option>
            <option value="12m">Last 12 months</option>
          </select>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{currentData.users.toLocaleString()}</dd>
                  <dd className="flex items-baseline">
                    {userGrowth >= 0 ? (
                      <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                    )}
                    <span className={`ml-2 text-sm font-semibold ${
                      userGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {userGrowth >= 0 ? '+' : ''}{userGrowth.toFixed(1)}%
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{currentData.products}</dd>
                  <dd className="flex items-baseline">
                    {productGrowth >= 0 ? (
                      <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                    )}
                    <span className={`ml-2 text-sm font-semibold ${
                      productGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {productGrowth >= 0 ? '+' : ''}{productGrowth.toFixed(1)}%
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShoppingCart className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{currentData.orders}</dd>
                  <dd className="flex items-baseline">
                    {orderGrowth >= 0 ? (
                      <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                    )}
                    <span className={`ml-2 text-sm font-semibold ${
                      orderGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {orderGrowth >= 0 ? '+' : ''}{orderGrowth.toFixed(1)}%
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="text-2xl font-semibold text-gray-900">${currentData.revenue.toLocaleString()}</dd>
                  <dd className="flex items-baseline">
                    {revenueGrowth >= 0 ? (
                      <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                    )}
                    <span className={`ml-2 text-sm font-semibold ${
                      revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth.toFixed(1)}%
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue trend chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-100 rounded-t" style={{ height: `${(data.revenue / 30600) * 200}px` }}>
                  <div className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600" style={{ height: '100%' }}></div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Monthly revenue progression</p>
          </div>
        </div>

        {/* User growth chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-green-100 rounded-t" style={{ height: `${(data.users / 1750) * 200}px` }}>
                  <div className="w-full bg-green-500 rounded-t transition-all duration-300 hover:bg-green-600" style={{ height: '100%' }}></div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Monthly user acquisition</p>
          </div>
        </div>
      </div>

      {/* Pie charts section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Category distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Product Category Distribution</h3>
          <div className="space-y-3">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                </div>
                <span className="text-sm text-gray-500">{category.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Product distribution by category</p>
          </div>
        </div>

        {/* Order status distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status Distribution</h3>
          <div className="space-y-3">
            {orderStatusData.map((status) => (
              <div key={status.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3" 
                    style={{ backgroundColor: status.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">{status.name}</span>
                </div>
                <span className="text-sm text-gray-500">{status.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Current order status breakdown</p>
          </div>
        </div>
      </div>

      {/* Top performers section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top products */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 w-6">{index + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${product.revenue.toLocaleString()}</p>
                  <p className={`text-xs ${
                    product.growth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.growth >= 0 ? '+' : ''}{product.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top customers */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Customers</h3>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={customer.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 w-6">{index + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${customer.total.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{customer.lastOrder}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional insights */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Peak Performance</h4>
            <p className="text-sm text-blue-700">December shows the highest revenue with $30,600</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Growth Trend</h4>
            <p className="text-sm text-green-700">Consistent month-over-month growth in user acquisition</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Category Leader</h4>
            <p className="text-sm text-purple-700">Electronics category dominates with 35% of products</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Customer Satisfaction</h4>
            <p className="text-sm text-yellow-700">65% of orders are successfully delivered</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-medium text-indigo-900 mb-2">Inventory Management</h4>
            <p className="text-sm text-indigo-700">Product catalog expanded by 8.2% this month</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h4 className="font-medium text-pink-900 mb-2">Revenue Per Order</h4>
            <p className="text-sm text-pink-700">Average order value: $259.32</p>
          </div>
        </div>
      </div>
    </div>
  );
}