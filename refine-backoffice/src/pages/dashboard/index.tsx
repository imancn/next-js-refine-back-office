'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { cn, cardVariants, text, grid, spacing } from '@/lib/utils';
import { Layout } from '@/components/layout/Layout';
import { LineChart, chartConfigs } from '@/components/charts/LineChart';
import { BarChart, barChartConfigs } from '@/components/charts/BarChart';
import { PieChart, pieChartConfigs } from '@/components/charts/PieChart';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

// Mock data for demonstration
const mockStats = {
  totalUsers: 1247,
  totalProducts: 89,
  totalOrders: 156,
  totalRevenue: 45678.90,
  userGrowth: 12.5,
  revenueGrowth: 8.3,
  orderGrowth: -2.1,
  productGrowth: 5.7
};

const mockChartData = {
  userGrowth: [
    { date: '2024-01', users: 1200, activeUsers: 980 },
    { date: '2024-02', users: 1250, activeUsers: 1020 },
    { date: '2024-03', users: 1300, activeUsers: 1080 },
    { date: '2024-04', users: 1350, activeUsers: 1120 },
    { date: '2024-05', users: 1400, activeUsers: 1180 },
    { date: '2024-06', users: 1450, activeUsers: 1220 }
  ],
  revenueGrowth: [
    { date: '2024-01', revenue: 42000, profit: 12000 },
    { date: '2024-02', revenue: 43500, profit: 12800 },
    { date: '2024-03', revenue: 44800, profit: 13500 },
    { date: '2024-04', revenue: 45200, profit: 13800 },
    { date: '2024-05', revenue: 46000, profit: 14200 },
    { date: '2024-06', revenue: 46800, profit: 14800 }
  ],
  categoryDistribution: [
    { name: 'Electronics', value: 35, color: '#10b981' },
    { name: 'Clothing', value: 25, color: '#3b82f6' },
    { name: 'Books', value: 20, color: '#8b5cf6' },
    { name: 'Home & Garden', value: 15, color: '#f59e0b' },
    { name: 'Sports', value: 5, color: '#ef4444' }
  ],
  orderStatus: [
    { name: 'Delivered', value: 65, color: '#10b981' },
    { name: 'Processing', value: 20, color: '#3b82f6' },
    { name: 'Shipped', value: 10, color: '#8b5cf6' },
    { name: 'Pending', value: 5, color: '#f59e0b' }
  ],
  monthlySales: [
    { month: 'Jan', sales: 12000, target: 15000 },
    { month: 'Feb', sales: 13500, target: 15000 },
    { month: 'Mar', sales: 14200, target: 15000 },
    { month: 'Apr', sales: 13800, target: 15000 },
    { month: 'May', sales: 15200, target: 15000 },
    { month: 'Jun', sales: 14800, target: 15000 }
  ]
};

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  growth, 
  className 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ComponentType<{ className?: string }>; 
  growth?: number; 
  className?: string; 
}) => {
  const isPositive = growth && growth > 0;
  const isNegative = growth && growth < 0;

  return (
    <div className={cn(cardVariants(), 'p-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {growth !== undefined && (
            <div className="flex items-center gap-1 mt-1">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : isNegative ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : null}
              <span className={cn(
                'text-sm font-medium',
                isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-muted-foreground'
              )}>
                {growth > 0 ? '+' : ''}{growth}%
              </span>
            </div>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { t } = useI18n();

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className={text.h1}>{t('dashboard.title')}</h1>
          <p className={text.lead}>{t('dashboard.welcome')}</p>
        </div>

        {/* Stats Grid */}
        <div className={grid.responsive}>
          <StatCard
            title={t('dashboard.stats.totalUsers')}
            value={mockStats.totalUsers.toLocaleString()}
            icon={Users}
            growth={mockStats.userGrowth}
          />
          <StatCard
            title={t('dashboard.stats.totalProducts')}
            value={mockStats.totalProducts.toLocaleString()}
            icon={Package}
            growth={mockStats.productGrowth}
          />
          <StatCard
            title={t('dashboard.stats.totalOrders')}
            value={mockStats.totalOrders.toLocaleString()}
            icon={ShoppingCart}
            growth={mockStats.orderGrowth}
          />
          <StatCard
            title={t('dashboard.stats.totalRevenue')}
            value={`$${mockStats.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            growth={mockStats.revenueGrowth}
          />
        </div>

        {/* Charts Grid */}
        <div className="space-y-8">
          {/* Growth Charts */}
          <div className={grid.cols2}>
            <LineChart
              data={mockChartData.userGrowth}
              {...chartConfigs.users}
              title="User Growth"
              height={300}
            />
            <LineChart
              data={mockChartData.revenueGrowth}
              {...chartConfigs.revenue}
              title="Revenue Growth"
              height={300}
            />
          </div>

          {/* Distribution Charts */}
          <div className={grid.cols2}>
            <PieChart
              data={mockChartData.categoryDistribution}
              title="Product Categories"
              height={300}
              {...pieChartConfigs.categories}
            />
            <PieChart
              data={mockChartData.orderStatus}
              title="Order Status Distribution"
              height={300}
              {...pieChartConfigs.status}
            />
          </div>

          {/* Sales Performance */}
          <div className={grid.cols1}>
            <BarChart
              data={mockChartData.monthlySales}
              {...barChartConfigs.sales}
              title="Monthly Sales vs Target"
              height={400}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className={cn(cardVariants(), 'p-6')}>
          <h3 className={text.h3}>{t('dashboard.quickActions')}</h3>
          <div className={cn(grid.cols4, 'mt-4')}>
            <button className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <Users className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">Add User</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <Package className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">Add Product</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <ShoppingCart className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">Create Order</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <DollarSign className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}