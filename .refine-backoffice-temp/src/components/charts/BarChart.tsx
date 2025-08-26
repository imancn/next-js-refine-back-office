'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { cn, cardVariants, text } from '@/lib/utils';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartProps {
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
  horizontal?: boolean;
}

export function BarChart({
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
  formatTooltip,
  horizontal = false
}: BarChartProps) {
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

  const ChartComponent = horizontal ? RechartsBarChart : RechartsBarChart;
  const XAxisComponent = horizontal ? YAxis : XAxis;
  const YAxisComponent = horizontal ? XAxis : YAxis;

  return (
    <div className={cn(cardVariants(), 'p-6', className)}>
      {title && (
        <div className="mb-4">
          <h3 className={text.h4}>{title}</h3>
        </div>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent 
          data={data} 
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          layout={horizontal ? 'horizontal' : 'vertical'}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
          
          <XAxisComponent 
            dataKey={xKey} 
            tickFormatter={formatXAxis}
            stroke="#64748b"
            fontSize={12}
            type={horizontal ? 'number' : 'category'}
          />
          
          <YAxisComponent 
            tickFormatter={formatYAxis}
            stroke="#64748b"
            fontSize={12}
            type={horizontal ? 'category' : 'number'}
          />
          
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          
          {showLegend && <Legend />}
          
          {yKeys.map((yKey, index) => (
            <Bar
              key={yKey.key}
              dataKey={yKey.key}
              fill={yKey.color}
              name={yKey.label}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}

// Predefined chart configurations
export const barChartConfigs = {
  sales: {
    xKey: 'month',
    yKeys: [
      { key: 'sales', color: '#10b981', label: 'Sales' },
      { key: 'target', color: '#f59e0b', label: 'Target' }
    ],
    formatYAxis: (value: number) => `$${value.toLocaleString()}`,
    formatTooltip: (value: number, name: string) => [`$${value.toLocaleString()}`, name]
  },
  categories: {
    xKey: 'category',
    yKeys: [
      { key: 'count', color: '#8b5cf6', label: 'Count' }
    ],
    formatYAxis: (value: number) => value.toLocaleString(),
    formatTooltip: (value: number, name: string) => [value.toLocaleString(), name]
  },
  performance: {
    xKey: 'metric',
    yKeys: [
      { key: 'value', color: '#3b82f6', label: 'Value' }
    ],
    formatYAxis: (value: number) => value.toLocaleString(),
    formatTooltip: (value: number, name: string) => [value.toLocaleString(), name],
    horizontal: true
  }
};