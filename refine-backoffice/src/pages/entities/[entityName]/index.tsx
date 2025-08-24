'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { Layout } from '@/components/layout/Layout';
import { DataTable } from '@/components/tables/DataTable';
import { EntityForm } from '@/components/forms/EntityForm';
import { LineChart, chartConfigs } from '@/components/charts/LineChart';
import { BarChart, barChartConfigs } from '@/components/charts/BarChart';
import { PieChart, pieChartConfigs } from '@/components/charts/PieChart';
import { getEntityConfig } from '@/entities';
import { TableState, PaginationParams, SortParams, FilterParams } from '@/types';
import { cn, buttonVariants, text, grid } from '@/lib/utils';
import { Plus, BarChart3, Table } from 'lucide-react';

export default function EntityListPage() {
  const { entityName } = useParams<{ entityName: string }>();
  const router = useRouter();
  const { t } = useI18n();
  
  const [viewMode, setViewMode] = useState<'table' | 'charts'>('table');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [total, setTotal] = useState(0);

  // Initialize table state
  const [tableState, setTableState] = useState<TableState>({
    pagination: { page: 1, pageSize: 10 },
    sorting: [],
    filters: []
  });

  const entityConfig = getEntityConfig(entityName as string);

  // Mock data generation based on entity type
  const generateMockData = (count: number) => {
    if (!entityConfig) return [];
    
    const mockData = [];
    for (let i = 1; i <= count; i++) {
      const item: Record<string, any> = { id: `mock-${i}` };
      
      entityConfig.fields.forEach(field => {
        switch (field.type) {
          case 'string':
            if (field.name === 'name') {
              item[field.name] = `${entityConfig.displayName} ${i}`;
            } else if (field.name === 'email') {
              item[field.name] = `user${i}@example.com`;
            } else {
              item[field.name] = `Sample ${field.label} ${i}`;
            }
            break;
          case 'number':
            if (field.name === 'price') {
              item[field.name] = Math.floor(Math.random() * 1000) + 10;
            } else if (field.name === 'stock') {
              item[field.name] = Math.floor(Math.random() * 100) + 1;
            } else {
              item[field.name] = Math.floor(Math.random() * 1000);
            }
            break;
          case 'boolean':
            item[field.name] = Math.random() > 0.5;
            break;
          case 'select':
            if (field.options && field.options.length > 0) {
              const randomOption = field.options[Math.floor(Math.random() * field.options.length)];
              item[field.name] = randomOption.value;
            }
            break;
          case 'date':
            item[field.name] = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
            break;
          default:
            item[field.name] = `Sample ${field.label} ${i}`;
        }
      });
      
      item.createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
      item.updatedAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();
      
      mockData.push(item);
    }
    return mockData;
  };

  useEffect(() => {
    if (entityConfig) {
      // Load mock data
      setLoading(true);
      setTimeout(() => {
        const mockData = generateMockData(50);
        setData(mockData);
        setTotal(mockData.length);
        setLoading(false);
      }, 500);
    }
  }, [entityConfig]);

  if (!entityConfig) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-red-600">Entity not found</h1>
          <p className="text-muted-foreground mt-2">The requested entity &quot;{entityName}&quot; does not exist.</p>
        </div>
      </Layout>
    );
  }

  const handlePaginationChange = (pagination: PaginationParams) => {
    setTableState(prev => ({ ...prev, pagination }));
  };

  const handleSortChange = (sorting: SortParams[]) => {
    setTableState(prev => ({ ...prev, sorting }));
  };

  const handleFilterChange = (filters: FilterParams[]) => {
    setTableState(prev => ({ ...prev, filters, pagination: { ...prev.pagination, page: 1 } }));
  };

  const handleRowAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case 'view':
        router.push(`/entities/${entityName}/${row.id}`);
        break;
      case 'edit':
        router.push(`/entities/${entityName}/${row.id}/edit`);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this item?')) {
          setData(prev => prev.filter(item => item.id !== row.id));
          setTotal(prev => prev - 1);
        }
        break;
    }
  };

  const handleCreateSubmit = (formData: Record<string, any>) => {
    const newItem = {
      id: `new-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setData(prev => [newItem, ...prev]);
    setTotal(prev => prev + 1);
    setShowCreateForm(false);
  };

  // Generate chart data based on entity type
  const generateChartData = () => {
    if (entityName === 'users') {
      return {
        growth: [
          { date: 'Jan', users: 120, activeUsers: 98 },
          { date: 'Feb', users: 135, activeUsers: 112 },
          { date: 'Mar', users: 142, activeUsers: 118 },
          { date: 'Apr', users: 158, activeUsers: 132 },
          { date: 'May', users: 165, activeUsers: 138 },
          { date: 'Jun', users: 172, activeUsers: 145 }
        ],
        roles: [
          { name: 'Admin', value: 15, color: '#ef4444' },
          { name: 'Manager', value: 25, color: '#f59e0b' },
          { name: 'User', value: 60, color: '#3b82f6' }
        ]
      };
    } else if (entityName === 'products') {
      return {
        categories: [
          { name: 'Electronics', value: 35, color: '#10b981' },
          { name: 'Clothing', value: 25, color: '#3b82f6' },
          { name: 'Books', value: 20, color: '#8b5cf6' },
          { name: 'Home & Garden', value: 15, color: '#f59e0b' },
          { name: 'Sports', value: 5, color: '#ef4444' }
        ],
        stock: [
          { category: 'Electronics', stock: 150, lowStock: 20 },
          { category: 'Clothing', stock: 200, lowStock: 30 },
          { category: 'Books', stock: 300, lowStock: 50 },
          { category: 'Home & Garden', stock: 100, lowStock: 15 },
          { category: 'Sports', stock: 80, lowStock: 10 }
        ]
      };
    } else if (entityName === 'orders') {
      return {
        status: [
          { name: 'Delivered', value: 65, color: '#10b981' },
          { name: 'Processing', value: 20, color: '#3b82f6' },
          { name: 'Shipped', value: 10, color: '#8b5cf6' },
          { name: 'Pending', value: 5, color: '#f59e0b' }
        ],
        monthly: [
          { month: 'Jan', orders: 12, revenue: 1200 },
          { month: 'Feb', orders: 15, revenue: 1500 },
          { month: 'Mar', orders: 18, revenue: 1800 },
          { month: 'Apr', orders: 22, revenue: 2200 },
          { month: 'May', orders: 25, revenue: 2500 },
          { month: 'Jun', orders: 28, revenue: 2800 }
        ]
      };
    }
    return {};
  };

  const chartData = generateChartData();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={text.h1}>{entityConfig.displayName}</h1>
            <p className={text.lead}>{entityConfig.description}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border bg-background p-1">
              <button
                onClick={() => setViewMode('table')}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  viewMode === 'table' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Table className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('charts')}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  viewMode === 'charts' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <BarChart3 className="h-4 w-4" />
              </button>
            </div>
            
            <button
              onClick={() => setShowCreateForm(true)}
              className={buttonVariants({ size: 'lg' })}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('common.create')} {entityConfig.displayName}
            </button>
          </div>
        </div>

        {/* Create Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background border rounded-lg shadow-lg">
              <div className="p-6">
                <EntityForm
                  entityConfig={entityConfig}
                  onSubmit={handleCreateSubmit}
                  onCancel={() => setShowCreateForm(false)}
                  mode="create"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {viewMode === 'table' ? (
          <DataTable
            data={data}
            total={total}
            loading={loading}
            fields={entityConfig.fields}
            onPaginationChange={handlePaginationChange}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
            onRowAction={handleRowAction}
            tableState={tableState}
            entityName={entityName as string}
          />
        ) : (
          <div className="space-y-8">
            {/* Charts based on entity type */}
            {entityName === 'users' && chartData.growth && (
              <div className={grid.cols2}>
                <LineChart
                  data={chartData.growth}
                  {...chartConfigs.users}
                  title="User Growth"
                  height={300}
                />
                <PieChart
                  data={chartData.roles}
                  title="User Roles Distribution"
                  height={300}
                  {...pieChartConfigs.roles}
                />
              </div>
            )}
            
            {entityName === 'products' && chartData.categories && (
              <div className={grid.cols2}>
                <PieChart
                  data={chartData.categories}
                  title="Product Categories"
                  height={300}
                  {...pieChartConfigs.categories}
                />
                <BarChart
                  data={chartData.stock}
                  {...barChartConfigs.performance}
                  title="Stock Levels by Category"
                  height={300}
                />
              </div>
            )}
            
            {entityName === 'orders' && chartData.status && (
              <div className={grid.cols2}>
                <PieChart
                  data={chartData.status}
                  title="Order Status Distribution"
                  height={300}
                  {...pieChartConfigs.status}
                />
                <BarChart
                  data={chartData.monthly}
                  {...barChartConfigs.sales}
                  title="Monthly Orders & Revenue"
                  height={300}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}