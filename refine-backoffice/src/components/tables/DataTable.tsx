'use client';

import React, { useState, useMemo } from 'react';
import { useI18n } from '@/lib/i18n';
import { cn, tableVariants, buttonVariants, badgeVariants, statusColors, roleColors } from '@/lib/utils';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  Filter,
  Search
} from 'lucide-react';
import { EntityField, TableState, PaginationParams, SortParams, FilterParams } from '@/types';

interface DataTableProps<T> {
  data: T[];
  total: number;
  loading?: boolean;
  fields: EntityField[];
  onPaginationChange: (pagination: PaginationParams) => void;
  onSortChange: (sorting: SortParams[]) => void;
  onFilterChange: (filters: FilterParams[]) => void;
  onRowAction?: (action: string, row: T) => void;
  tableState: TableState;
  entityName: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  total,
  loading = false,
  fields,
  onPaginationChange,
  onSortChange,
  onFilterChange,
  onRowAction,
  tableState,
  entityName
}: DataTableProps<T>) {
  const { t, direction } = useI18n();
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterParams[]>(tableState.filters);
  const [searchTerm, setSearchTerm] = useState('');

  const tableFields = fields.filter(field => field.displayInTable);
  const totalPages = Math.ceil(total / tableState.pagination.pageSize);

  const handleSort = (fieldName: string) => {
    const currentSort = tableState.sorting.find(s => s.field === fieldName);
    let newSorting: SortParams[];

    if (currentSort) {
      if (currentSort.order === 'asc') {
        newSorting = [{ field: fieldName, order: 'desc' }];
      } else {
        newSorting = tableState.sorting.filter(s => s.field !== fieldName);
      }
    } else {
      newSorting = [...tableState.sorting, { field: fieldName, order: 'asc' }];
    }

    onSortChange(newSorting);
  };

  const handleFilterChange = (field: string, operator: string, value: any) => {
    const newFilters = localFilters.filter(f => f.field !== field);
    if (value !== '' && value !== null && value !== undefined) {
      newFilters.push({ field, operator: operator as any, value });
    }
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setLocalFilters([]);
    onFilterChange([]);
    setShowFilters(false);
  };

  const getSortIcon = (fieldName: string) => {
    const sort = tableState.sorting.find(s => s.field === fieldName);
    if (!sort) return null;
    return sort.order === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const renderCellValue = (row: T, field: EntityField) => {
    const value = row[field.name];

    if (field.type === 'boolean') {
      return (
        <span className={cn(
          badgeVariants({ variant: value ? 'success' : 'secondary' })
        )}>
          {value ? 'Yes' : 'No'}
        </span>
      );
    }

    if (field.type === 'date') {
      return new Date(value).toLocaleDateString();
    }

    if (field.name === 'status') {
      const statusColors = {
        pending: 'bg-gray-100 text-gray-800 border-gray-200',
        processing: 'bg-blue-100 text-blue-800 border-blue-200',
        shipped: 'bg-purple-100 text-purple-800 border-purple-200',
        delivered: 'bg-green-100 text-green-800 border-green-200',
        cancelled: 'bg-red-100 text-red-800 border-red-200',
      };
      return (
        <span className={cn(
          badgeVariants({ variant: 'outline' }),
          statusColors[value as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 border-gray-200'
        )}>
          {t(`${entityName}.statuses.${value}`) || value}
        </span>
      );
    }

    if (field.name === 'role') {
      const roleColor = roleColors[value as keyof typeof roleColors] || 'bg-gray-100 text-gray-800 border-gray-200';
      return (
        <span className={cn(
          badgeVariants({ variant: 'outline' }),
          roleColor
        )}>
          {t(`${entityName}.roles.${value}`) || value}
        </span>
      );
    }

    if (field.type === 'number' && field.name === 'price') {
      return `$${Number(value).toFixed(2)}`;
    }

    return value;
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(row => 
      Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table Controls */}
      <div className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
        direction === 'rtl' ? 'sm:flex-row-reverse' : 'sm:flex-row'
      )}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('common.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring sm:w-64"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'flex items-center gap-2'
            )}
          >
            <Filter className="h-4 w-4" />
            {t('common.filter')}
            {tableState.filters.length > 0 && (
              <span className={cn(
                badgeVariants({ variant: 'secondary' }),
                'ml-1'
              )}>
                {tableState.filters.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="rounded-lg border bg-card p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tableFields.map(field => (
              <div key={field.name} className="space-y-2">
                <label className="text-sm font-medium">{field.label}</label>
                <input
                  type={field.type === 'number' ? 'number' : 'text'}
                  placeholder={`Filter ${field.label}`}
                  onChange={(e) => handleFilterChange(field.name, 'contains', e.target.value)}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={applyFilters}
              className={buttonVariants({ size: 'sm' })}
            >
              {t('tables.filters.apply')}
            </button>
            <button
              onClick={clearFilters}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              {t('tables.filters.clear')}
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className={cn(tableVariants({ variant: 'default' }))}>
            <thead>
              <tr className="border-b bg-muted/50">
                {tableFields.map(field => (
                  <th
                    key={field.name}
                    className={cn(
                      'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
                      'cursor-pointer select-none hover:bg-muted/75',
                      direction === 'rtl' ? 'text-right' : 'text-left'
                    )}
                    onClick={() => handleSort(field.name)}
                  >
                    <div className={cn(
                      'flex items-center gap-2',
                      direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'
                    )}>
                      {field.label}
                      {getSortIcon(field.name)}
                    </div>
                  </th>
                ))}
                {onRowAction && (
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    {t('common.actions')}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={tableFields.length + (onRowAction ? 1 : 0)}
                    className="h-24 text-center text-muted-foreground"
                  >
                    {t('common.noData')}
                  </td>
                </tr>
              ) : (
                filteredData.map((row, index) => (
                  <tr
                    key={row.id || index}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    {tableFields.map(field => (
                      <td key={field.name} className="p-4 align-middle">
                        {renderCellValue(row, field)}
                      </td>
                    ))}
                    {onRowAction && (
                      <td className="p-4 align-middle">
                        <button
                          onClick={() => onRowAction('view', row)}
                          className={cn(
                            buttonVariants({ variant: 'ghost', size: 'sm' }),
                            'h-8 w-8 p-0'
                          )}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={cn(
          'flex items-center justify-between',
          direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'
        )}>
          <div className="text-sm text-muted-foreground">
            {t('tables.pagination.showing', {
              from: (tableState.pagination.page - 1) * tableState.pagination.pageSize + 1,
              to: Math.min(tableState.pagination.page * tableState.pagination.pageSize, total),
              total
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPaginationChange({
                ...tableState.pagination,
                page: tableState.pagination.page - 1
              })}
              disabled={tableState.pagination.page <= 1}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'h-8 w-8 p-0'
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-sm text-muted-foreground">
              {t('tables.pagination.page', {
                page: tableState.pagination.page,
                totalPages
              })}
            </span>

            <button
              onClick={() => onPaginationChange({
                ...tableState.pagination,
                page: tableState.pagination.page + 1
              })}
              disabled={tableState.pagination.page >= totalPages}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'h-8 w-8 p-0'
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}