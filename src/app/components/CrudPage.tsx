'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  Check,
  X
} from 'lucide-react';

// Generic types for the CRUD component
export interface CrudConfig<T> {
  apiPrefix: string;
  title: string;
  columns: CrudColumn<T>[];
  filters?: CrudFilter[];
  actions?: CrudAction<T>[];
  bulkActions?: CrudBulkAction<T>[];
  createForm?: React.ComponentType<{ onSubmit: (data: Partial<T>) => void; onCancel: () => void }>;
  editForm?: React.ComponentType<{ data: T; onSubmit: (data: Partial<T>) => void; onCancel: () => void }>;
  viewForm?: React.ComponentType<{ data: T; onClose: () => void }>;
  itemsPerPage?: number;
  enableSearch?: boolean;
  enableFilters?: boolean;
  enablePagination?: boolean;
  enableBulkActions?: boolean;
  enableCreate?: boolean;
  enableEdit?: boolean;
  enableDelete?: boolean;
  enableView?: boolean;
  enableExport?: boolean;
  enableImport?: boolean;
}

export interface CrudColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
  searchable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface CrudFilter {
  key: string;
  label: string;
  type: 'select' | 'input' | 'date' | 'dateRange' | 'number' | 'numberRange';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface CrudAction<T> {
  key: string;
  label: string;
  icon?: React.ComponentType<any>;
  onClick: (item: T) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: (item: T) => boolean;
}

export interface CrudBulkAction<T> {
  key: string;
  label: string;
  icon?: React.ComponentType<any>;
  onClick: (items: T[]) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: (items: T[]) => boolean;
}

// Mock API service for demonstration
class CrudApiService<T> {
  constructor(private apiPrefix: string) {}

  async getList(params: {
    page?: number;
    limit?: number;
    search?: string;
    filters?: Record<string, any>;
    sort?: { field: keyof T; direction: 'asc' | 'desc' };
  }): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    // In a real implementation, this would make actual API calls
    // For now, we'll return mock data
    console.log(`API call to ${this.apiPrefix}/list with params:`, params);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      data: [],
      total: 0,
      page: params.page || 1,
      limit: params.limit || 10
    };
  }

  async getById(id: string): Promise<T> {
    console.log(`API call to ${this.apiPrefix}/${id}`);
    await new Promise(resolve => setTimeout(resolve, 100));
    throw new Error('Not implemented');
  }

  async create(data: Partial<T>): Promise<T> {
    console.log(`API call to ${this.apiPrefix}/create with data:`, data);
    await new Promise(resolve => setTimeout(resolve, 100));
    throw new Error('Not implemented');
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    console.log(`API call to ${this.apiPrefix}/${id} with data:`, data);
    await new Promise(resolve => setTimeout(resolve, 100));
    throw new Error('Not implemented');
  }

  async delete(id: string): Promise<void> {
    console.log(`API call to ${this.apiPrefix}/${id} DELETE`);
    await new Promise(resolve => setTimeout(resolve, 100));
    throw new Error('Not implemented');
  }

  async bulkDelete(ids: string[]): Promise<void> {
    console.log(`API call to ${this.apiPrefix}/bulk-delete with ids:`, ids);
    await new Promise(resolve => setTimeout(resolve, 100));
    throw new Error('Not implemented');
  }
}

interface CrudPageProps<T> {
  config: CrudConfig<T>;
  data?: T[];
  onDataChange?: (data: T[]) => void;
  className?: string;
}

export function CrudPage<T extends { id: string | number }>({ 
  config, 
  data: initialData, 
  onDataChange,
  className = ''
}: CrudPageProps<T>) {
  const [data, setData] = useState<T[]>(initialData || []);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ field: keyof T; direction: 'asc' | 'desc' } | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [viewingItem, setViewingItem] = useState<T | null>(null);

  const apiService = useMemo(() => new CrudApiService<T>(config.apiPrefix), [config.apiPrefix]);
  const itemsPerPage = config.itemsPerPage || 10;

  // Filter and search data
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply search
    if (config.enableSearch !== false && searchTerm) {
      filtered = filtered.filter(item => {
        return config.columns.some(column => {
          if (column.searchable !== false) {
            const value = item[column.key];
            if (typeof value === 'string') {
              return value.toLowerCase().includes(searchTerm.toLowerCase());
            }
            if (typeof value === 'number') {
              return value.toString().includes(searchTerm);
            }
          }
          return false;
        });
      });
    }

    // Apply filters
    if (config.enableFilters !== false) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
          filtered = filtered.filter(item => {
            const itemValue = (item as any)[key];
            if (typeof value === 'string') {
              return itemValue === value;
            }
            if (typeof value === 'number') {
              return itemValue === value;
            }
            return false;
          });
        }
      });
    }

    // Apply sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, filters, sortConfig, config]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (config.enablePagination === false) return filteredData;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage, config.enablePagination]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle sorting
  const handleSort = (field: keyof T) => {
    setSortConfig(prev => {
      if (prev?.field === field) {
        return {
          field,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { field, direction: 'asc' };
    });
  };

  // Handle item selection
  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === paginatedData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedData.map(item => item.id.toString()));
    }
  };

  // Handle CRUD operations
  const handleCreate = async (formData: Partial<T>) => {
    try {
      setLoading(true);
      const newItem = await apiService.create(formData);
      const newData = [...data, newItem];
      setData(newData);
      onDataChange?.(newData);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (formData: Partial<T>) => {
    if (!editingItem) return;
    
    try {
      setLoading(true);
      const updatedItem = await apiService.update(editingItem.id.toString(), formData);
      const newData = data.map(item => 
        item.id === editingItem.id ? updatedItem : item
      );
      setData(newData);
      onDataChange?.(newData);
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      setLoading(true);
      await apiService.delete(id);
      const newData = data.filter(item => item.id.toString() !== id);
      setData(newData);
      onDataChange?.(newData);
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) return;
    
    try {
      setLoading(true);
      await apiService.bulkDelete(selectedItems);
      const newData = data.filter(item => !selectedItems.includes(item.id.toString()));
      setData(newData);
      onDataChange?.(newData);
      setSelectedItems([]);
    } catch (error) {
      console.error('Error bulk deleting items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Render cell content
  const renderCell = (item: T, column: CrudColumn<T>) => {
    const value = item[column.key];
    
    if (column.render) {
      return column.render(value, item);
    }
    
    if (value === null || value === undefined) {
      return <span className="text-gray-400">-</span>;
    }
    
    if (typeof value === 'boolean') {
      return value ? (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Check className="w-3 h-3 mr-1" />
          Yes
        </span>
      ) : (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <X className="w-3 h-3 mr-1" />
          No
        </span>
      );
    }
    
    if (typeof value === 'string' && value.includes('http')) {
      return (
        <img 
          src={value} 
          alt="" 
          className="w-8 h-8 rounded object-cover"
        />
      );
    }
    
    return <span>{String(value)}</span>;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
          <p className="text-sm text-gray-600">
            {filteredData.length} {filteredData.length === 1 ? 'item' : 'items'} found
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {config.enableImport !== false && (
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </button>
          )}
          
          {config.enableExport !== false && (
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          )}
          
          {config.enableCreate !== false && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create
            </button>
          )}
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          {config.enableSearch !== false && (
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          )}
          
          {config.enableFilters !== false && config.filters && (
            <div className="flex flex-wrap gap-2">
              {config.filters.map(filter => (
                <div key={filter.key} className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">{filter.label}:</label>
                  {filter.type === 'select' ? (
                    <select
                      value={filters[filter.key] || 'all'}
                      onChange={(e) => setFilters(prev => ({ ...prev, [filter.key]: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="all">All</option>
                      {filter.options?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : filter.type === 'input' ? (
                    <input
                      type="text"
                      placeholder={filter.placeholder}
                      value={filters[filter.key] || ''}
                      onChange={(e) => setFilters(prev => ({ ...prev, [filter.key]: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : filter.type === 'number' ? (
                    <input
                      type="number"
                      placeholder={filter.placeholder}
                      value={filters[filter.key] || ''}
                      onChange={(e) => setFilters(prev => ({ ...prev, [filter.key]: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bulk actions */}
      {config.enableBulkActions !== false && selectedItems.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-800">
              {selectedItems.length} item{selectedItems.length === 1 ? '' : 's'} selected
            </span>
            <div className="flex items-center space-x-2">
              {config.bulkActions?.map(action => (
                <button
                  key={action.key}
                  onClick={() => action.onClick(paginatedData.filter(item => selectedItems.includes(item.id.toString())))}
                  disabled={action.disabled?.(paginatedData.filter(item => selectedItems.includes(item.id.toString())))}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    action.variant === 'destructive'
                      ? 'text-white bg-red-600 hover:bg-red-700'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {action.icon && <action.icon className="w-4 h-4 mr-2" />}
                  {action.label}
                </button>
              ))}
              <button
                onClick={handleBulkDelete}
                className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {config.enableBulkActions !== false && (
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === paginatedData.length && paginatedData.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                )}
                {config.columns.map(column => (
                  <th
                    key={String(column.key)}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      column.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''
                    } ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}`}
                    onClick={() => column.sortable !== false && handleSort(column.key)}
                  >
                    <div className="flex items-center">
                      {column.header}
                      {column.sortable !== false && sortConfig?.field === column.key && (
                        <span className="ml-1">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {(config.enableEdit !== false || config.enableDelete !== false || config.enableView !== false || config.actions) && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {config.enableBulkActions !== false && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id.toString())}
                        onChange={() => handleSelectItem(item.id.toString())}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                  )}
                  {config.columns.map(column => (
                    <td
                      key={String(column.key)}
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                        column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''
                      }`}
                    >
                      {renderCell(item, column)}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {config.actions?.map(action => (
                        <button
                          key={action.key}
                          onClick={() => action.onClick(item)}
                          disabled={action.disabled?.(item)}
                          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                            action.variant === 'destructive'
                              ? 'text-red-700 bg-red-100 hover:bg-red-200'
                              : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          {action.icon && <action.icon className="w-3 h-3 mr-1" />}
                          {action.label}
                        </button>
                      ))}
                      
                      {config.enableView !== false && (
                        <button
                          onClick={() => setViewingItem(item)}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </button>
                      )}
                      
                      {config.enableEdit !== false && (
                        <button
                          onClick={() => setEditingItem(item)}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </button>
                      )}
                      
                      {config.enableDelete !== false && (
                        <button
                          onClick={() => handleDelete(item.id.toString())}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty state */}
        {paginatedData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-sm text-gray-500">
              {searchTerm || Object.values(filters).some(v => v && v !== 'all')
                ? 'Try adjusting your search or filters'
                : 'Get started by creating a new item'
              }
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {config.enablePagination !== false && totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg border border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, filteredData.length)}
                </span>{' '}
                of <span className="font-medium">{filteredData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                        currentPage === pageNum
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showCreateForm && config.createForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <config.createForm
                onSubmit={handleCreate}
                onCancel={() => setShowCreateForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {editingItem && config.editForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <config.editForm
                data={editingItem}
                onSubmit={handleEdit}
                onCancel={() => setEditingItem(null)}
              />
            </div>
          </div>
        </div>
      )}

      {viewingItem && config.viewForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <config.viewForm
                data={viewingItem}
                onClose={() => setViewingItem(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}