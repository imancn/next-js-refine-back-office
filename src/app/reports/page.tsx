'use client';

import React, { useState } from 'react';
import { 
  Download, 
  Calendar, 
  FileText, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  Filter,
  Plus,
  Eye,
  Share2,
  Trash2
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: string;
  description: string;
  lastGenerated: string;
  nextScheduled: string;
  status: 'active' | 'inactive' | 'draft';
  format: 'pdf' | 'excel' | 'csv';
  size: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Monthly Sales Report',
    type: 'Sales',
    description: 'Comprehensive monthly sales analysis with revenue breakdown',
    lastGenerated: '2024-02-01',
    nextScheduled: '2024-03-01',
    status: 'active',
    format: 'pdf',
    size: '2.4 MB'
  },
  {
    id: '2',
    name: 'Customer Analytics',
    type: 'Customer',
    description: 'Customer behavior analysis and segmentation insights',
    lastGenerated: '2024-02-15',
    nextScheduled: '2024-03-15',
    status: 'active',
    format: 'excel',
    size: '1.8 MB'
  },
  {
    id: '3',
    name: 'Inventory Status',
    type: 'Inventory',
    description: 'Current inventory levels and stock movement tracking',
    lastGenerated: '2024-02-20',
    nextScheduled: '2024-03-20',
    status: 'active',
    format: 'csv',
    size: '856 KB'
  },
  {
    id: '4',
    name: 'Order Fulfillment',
    type: 'Operations',
    description: 'Order processing efficiency and delivery performance',
    lastGenerated: '2024-02-18',
    nextScheduled: '2024-03-18',
    status: 'active',
    format: 'pdf',
    size: '3.2 MB'
  },
  {
    id: '5',
    name: 'Financial Summary',
    type: 'Finance',
    description: 'Monthly financial overview and profitability analysis',
    lastGenerated: '2024-02-01',
    nextScheduled: '2024-03-01',
    status: 'active',
    format: 'excel',
    size: '1.5 MB'
  },
  {
    id: '6',
    name: 'Marketing Performance',
    type: 'Marketing',
    description: 'Campaign effectiveness and ROI analysis',
    lastGenerated: '2024-02-10',
    nextScheduled: '2024-03-10',
    status: 'inactive',
    format: 'pdf',
    size: '2.1 MB'
  }
];

const reportTypes = [
  { id: 'sales', name: 'Sales', icon: DollarSign, color: 'bg-green-100 text-green-800' },
  { id: 'customer', name: 'Customer', icon: Users, color: 'bg-blue-100 text-blue-800' },
  { id: 'inventory', name: 'Inventory', icon: Package, color: 'bg-purple-100 text-purple-800' },
  { id: 'operations', name: 'Operations', icon: ShoppingCart, color: 'bg-yellow-100 text-yellow-800' },
  { id: 'finance', name: 'Finance', icon: TrendingUp, color: 'bg-red-100 text-red-800' },
  { id: 'marketing', name: 'Marketing', icon: BarChart3, color: 'bg-indigo-100 text-indigo-800' },
];

const quickReports = [
  { name: 'Daily Sales Summary', type: 'Sales', icon: DollarSign, color: 'bg-green-500' },
  { name: 'Customer Registration', type: 'Customer', icon: Users, color: 'bg-blue-500' },
  { name: 'Low Stock Alert', type: 'Inventory', icon: Package, color: 'bg-purple-500' },
  { name: 'Pending Orders', type: 'Operations', icon: ShoppingCart, color: 'bg-yellow-500' },
];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const filteredReports = mockReports.filter(report => {
    const matchesType = selectedType === 'all' || report.type.toLowerCase() === selectedType;
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    
    return matchesType && matchesSearch && matchesStatus;
  });

  const handleGenerateReport = (reportId: string) => {
    // Simulate report generation
    alert(`Generating report: ${mockReports.find(r => r.id === reportId)?.name}`);
  };

  const handleBulkGenerate = () => {
    if (selectedReports.length === 0) return;
    alert(`Generating ${selectedReports.length} reports...`);
  };

  const handleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map(report => report.id));
    }
  };

  const handleSelectReport = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return '📄';
      case 'excel': return '📊';
      case 'csv': return '📋';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Generate and manage business reports</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Plus className="h-4 w-4 mr-2" />
          Create Report
        </button>
      </div>

      {/* Quick reports */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Reports</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickReports.map((report) => (
            <button
              key={report.name}
              className="relative group bg-gray-50 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <div>
                <span className={`rounded-lg inline-flex p-3 text-white`} style={{ backgroundColor: report.color }}>
                  <report.icon className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  {report.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{report.type}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Report types overview */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Report Categories</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reportTypes.map((type) => (
            <div
              key={type.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedType === type.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedType(selectedType === type.id ? 'all' : type.id)}
            >
              <div className="flex items-center">
                <span className={`rounded-lg inline-flex p-2 ${type.color}`}>
                  <type.icon className="h-5 w-5" />
                </span>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">{type.name}</h4>
                  <p className="text-xs text-gray-500">
                    {mockReports.filter(r => r.type.toLowerCase() === type.id).length} reports
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Reports
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          
          <div className="flex items-end space-x-2">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Filter className="h-4 w-4 mr-2" />
              Advanced
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Reports table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                onChange={handleSelectAll}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                {selectedReports.length} of {filteredReports.length} selected
              </span>
            </div>
            
            {selectedReports.length > 0 && (
              <button
                onClick={handleBulkGenerate}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Generate Selected
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Generated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Scheduled
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Format
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedReports.includes(report.id)}
                          onChange={() => handleSelectReport(report.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{report.name}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{report.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.lastGenerated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.nextScheduled).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{getFormatIcon(report.format)}</span>
                        <span className="text-sm text-gray-900 uppercase">{report.format}</span>
                        <span className="text-xs text-gray-500 ml-2">({report.size})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleGenerateReport(report.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Generate Report"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900" title="View Report">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900" title="Share Report">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900" title="Delete Report">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Report insights */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Report Insights</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-900">Total Reports</p>
                <p className="text-2xl font-bold text-blue-900">{mockReports.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-900">Active Reports</p>
                <p className="text-2xl font-bold text-green-900">
                  {mockReports.filter(r => r.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-900">Scheduled</p>
                <p className="text-2xl font-bold text-purple-900">
                  {mockReports.filter(r => r.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-900">This Month</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {mockReports.filter(r => new Date(r.lastGenerated).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}