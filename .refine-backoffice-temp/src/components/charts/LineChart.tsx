'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { cn, cardVariants, text } from '@/lib/utils';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: Array<{ [key: string]: any }>;
  xKey: string;
  yKeys: Array<{ key: string; color: string; label: string }>;
  title?: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  formatXAxis?: (value: any) => string;
  formatYAxis?: (value: any) => string;
  formatTooltip?: (value: any, name: string) => [string, string];
}

export function LineChart({
  data,
  xKey,
  yKeys,
  title,
  height = 300,
  className,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  formatXAxis,
  formatYAxis,
  formatTooltip
}: LineChartProps) {
  const { t } = useI18n();

  if (!data || data.length === 0) {
    return (
      <div className={cn(cardVariants(), 'p-6', className)}>
        <div className="flex h-[300px] items-center justify-center">
          <p className="text-muted-foreground">{t('charts.noData')}</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => {
            const [value, name] = formatTooltip 
              ? formatTooltip(entry.value, entry.name)
              : [entry.value, entry.name];
            
            return (
              <p key={index} style={{ color: entry.color }}>
                {name}: {value}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn(cardVariants(), 'p-6', className)}>
      {title && (
        <div className="mb-4">
          <h3 className={text.h4}>{title}</h3>
        </div>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
          
          <XAxis 
            dataKey={xKey} 
            tickFormatter={formatXAxis}
            stroke="#64748b"
            fontSize={12}
          />
          
          <YAxis 
            tickFormatter={formatYAxis}
            stroke="#64748b"
            fontSize={12}
          />
          
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          
          {showLegend && <Legend />}
          
          {yKeys.map((yKey, index) => (
            <Line
              key={yKey.key}
              type="monotone"
              dataKey={yKey.key}
              stroke={yKey.color}
              strokeWidth={2}
              dot={{ fill: yKey.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: yKey.color, strokeWidth: 2 }}
              name={yKey.label}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Predefined chart configurations
export const chartConfigs = {
  revenue: {
    xKey: 'date',
    yKeys: [
      { key: 'revenue', color: '#10b981', label: 'Revenue' },
      { key: 'profit', color: '#3b82f6', label: 'Profit' }
    ],
    formatYAxis: (value: number) => `$${value.toLocaleString()}`,
    formatTooltip: (value: number, name: string) => [`$${value.toLocaleString()}`, name]
  },
  users: {
    xKey: 'date',
    yKeys: [
      { key: 'users', color: '#8b5cf6', label: 'Users' },
      { key: 'activeUsers', color: '#f59e0b', label: 'Active Users' }
    ],
    formatYAxis: (value: number) => value.toLocaleString(),
    formatTooltip: (value: number, name: string) => [value.toLocaleString(), name]
  },
  orders: {
    xKey: 'date',
    yKeys: [
      { key: 'orders', color: '#ef4444', label: 'Orders' },
      { key: 'completed', color: '#10b981', label: 'Completed' }
    ],
    formatYAxis: (value: number) => value.toLocaleString(),
    formatTooltip: (value: number, name: string) => [value.toLocaleString(), name]
  }
};