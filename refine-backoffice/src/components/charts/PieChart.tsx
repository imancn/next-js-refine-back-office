'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { cn, cardVariants, text } from '@/lib/utils';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PieChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  title?: string;
  height?: number;
  className?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  formatTooltip?: (value: any, name: string) => [string, string];
  innerRadius?: number;
  outerRadius?: number;
  colors?: string[];
}

export function PieChart({
  data,
  title,
  height = 300,
  className,
  showLegend = true,
  showTooltip = true,
  formatTooltip,
  innerRadius = 0,
  outerRadius = 80,
  colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#84cc16', '#f97316']
}: PieChartProps) {
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

  const chartData = data.map((item, index) => ({
    ...item,
    color: item.color || colors[index % colors.length]
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const [value, name] = formatTooltip 
        ? formatTooltip(data.value, data.name)
        : [data.value, data.name];
      
      return (
        <div className="rounded-lg border bg-background p-3 shadow-lg">
          <p className="font-medium">{name}</p>
          <p style={{ color: data.payload.color }}>Value: {value}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    if (!showLegend) return null;

    return (
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn(cardVariants(), 'p-6', className)}>
      {title && (
        <div className="mb-4">
          <h3 className={text.h4}>{title}</h3>
        </div>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          {showLegend && <Legend content={<CustomLegend />} />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Predefined chart configurations
export const pieChartConfigs = {
  status: {
    colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
    formatTooltip: (value: number, name: string) => [value.toLocaleString(), name]
  },
  categories: {
    colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'],
    formatTooltip: (value: number, name: string) => [value.toLocaleString(), name]
  },
  roles: {
    colors: ['#ef4444', '#3b82f6', '#f59e0b'],
    formatTooltip: (value: number, name: string) => [value.toLocaleString(), name]
  }
};