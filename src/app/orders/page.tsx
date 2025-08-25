'use client';

import React, { useState } from 'react';
import { 
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Package
} from 'lucide-react';
import { CrudPage, CrudConfig } from '../components/CrudPage';
import { FormWrapper, FormField, InputField, SelectField, TextareaField, CheckboxField } from '../components/CrudForms';

interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
  createdAt: string;
  updatedAt: string;
}

const mockOrders: Order[] = [
  { id: '1', orderNumber: 'ORD-001', customerId: 'CUST-001', customerName: 'John Smith', customerEmail: 'john.smith@example.com', total: 1299, status: 'delivered', items: 2, createdAt: '2024-01-15', updatedAt: '2024-01-15' },
  { id: '2', orderNumber: 'ORD-002', customerId: 'CUST-002', customerName: 'Sarah Johnson', customerEmail: 'sarah.johnson@example.com', total: 248, status: 'shipped', items: 1, createdAt: '2024-01-18', updatedAt: '2024-01-18' },
  { id: '3', orderNumber: 'ORD-003', customerId: 'CUST-003', customerName: 'Mike Wilson', customerEmail: 'mike.wilson@example.com', total: 89, status: 'processing', items: 1, createdAt: '2024-01-20', updatedAt: '2024-01-20' },
  { id: '4', orderNumber: 'ORD-004', customerId: 'CUST-004', customerName: 'Emily Davis', customerEmail: 'emily.davis@example.com', total: 198, status: 'pending', items: 3, createdAt: '2024-01-22', updatedAt: '2024-01-22' },
  { id: '5', orderNumber: 'ORD-005', customerId: 'CUST-005', customerName: 'David Brown', customerEmail: 'david.brown@example.com', total: 447, status: 'delivered', items: 2, createdAt: '2024-01-25', updatedAt: '2024-01-25' },
  { id: '6', orderNumber: 'ORD-006', customerId: 'CUST-006', customerName: 'Lisa Anderson', customerEmail: 'lisa.anderson@example.com', total: 156, status: 'cancelled', items: 1, createdAt: '2024-01-28', updatedAt: '2024-01-28' },
  { id: '7', orderNumber: 'ORD-007', customerId: 'CUST-007', customerName: 'Robert Taylor', customerEmail: 'robert.taylor@example.com', total: 789, status: 'shipped', items: 4, createdAt: '2024-02-01', updatedAt: '2024-02-01' },
  { id: '8', orderNumber: 'ORD-008', customerId: 'CUST-008', customerName: 'Jennifer Lee', customerEmail: 'jennifer.lee@example.com', total: 234, status: 'pending', items: 2, createdAt: '2024-02-03', updatedAt: '2024-02-03' },
];

const statusConfig = {
  pending: { text: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  processing: { text: 'Processing', color: 'bg-blue-100 text-blue-800', icon: Clock },
  shipped: { text: 'Shipped', color: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered: { text: 'Delivered', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { text: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
};

// Create Order Form Component
function CreateOrderForm({ onSubmit, onCancel }: { onSubmit: (data: Partial<Order>) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    orderNumber: '',
    customerId: '',
    customerName: '',
    customerEmail: '',
    total: '',
    status: 'pending' as Order['status'],
    items: '',
  });

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      total: Number(formData.total),
      items: Number(formData.items),
    });
  };

  return (
    <FormWrapper title="Create New Order" onSubmit={handleSubmit} onCancel={onCancel}>
      <FormField label="Order Number" required>
        <InputField
          value={formData.orderNumber}
          onChange={(value) => setFormData(prev => ({ ...prev, orderNumber: value }))}
          placeholder="ORD-001"
        />
      </FormField>
      
      <FormField label="Customer ID" required>
        <InputField
          value={formData.customerId}
          onChange={(value) => setFormData(prev => ({ ...prev, customerId: value }))}
          placeholder="CUST-001"
        />
      </FormField>
      
      <FormField label="Customer Name" required>
        <InputField
          value={formData.customerName}
          onChange={(value) => setFormData(prev => ({ ...prev, customerName: value }))}
          placeholder="John Smith"
        />
      </FormField>
      
      <FormField label="Customer Email" required>
        <InputField
          type="email"
          value={formData.customerEmail}
          onChange={(value) => setFormData(prev => ({ ...prev, customerEmail: value }))}
          placeholder="john.smith@example.com"
        />
      </FormField>
      
      <FormField label="Total Amount" required>
        <InputField
          type="number"
          value={formData.total}
          onChange={(value) => setFormData(prev => ({ ...prev, total: value }))}
          placeholder="1299"
        />
      </FormField>
      
      <FormField label="Status" required>
        <SelectField
          value={formData.status}
          onChange={(value) => setFormData(prev => ({ ...prev, status: value as Order['status'] }))}
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'processing', label: 'Processing' },
            { value: 'shipped', label: 'Shipped' },
            { value: 'delivered', label: 'Delivered' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
        />
      </FormField>
      
      <FormField label="Number of Items" required>
        <InputField
          type="number"
          value={formData.items}
          onChange={(value) => setFormData(prev => ({ ...prev, items: value }))}
          placeholder="2"
        />
      </FormField>
    </FormWrapper>
  );
}

// Edit Order Form Component
function EditOrderForm({ data, onSubmit, onCancel }: { data: Order; onSubmit: (data: Partial<Order>) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    orderNumber: data.orderNumber,
    customerId: data.customerId,
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    total: data.total.toString(),
    status: data.status,
    items: data.items.toString(),
  });

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      total: Number(formData.total),
      items: Number(formData.items),
    });
  };

  return (
    <FormWrapper title="Edit Order" onSubmit={handleSubmit} onCancel={onCancel}>
      <FormField label="Order Number" required>
        <InputField
          value={formData.orderNumber}
          onChange={(value) => setFormData(prev => ({ ...prev, orderNumber: value }))}
          placeholder="ORD-001"
        />
      </FormField>
      
      <FormField label="Customer ID" required>
        <InputField
          value={formData.customerId}
          onChange={(value) => setFormData(prev => ({ ...prev, customerId: value }))}
          placeholder="CUST-001"
        />
      </FormField>
      
      <FormField label="Customer Name" required>
        <InputField
          value={formData.customerName}
          onChange={(value) => setFormData(prev => ({ ...prev, customerName: value }))}
          placeholder="John Smith"
        />
      </FormField>
      
      <FormField label="Customer Email" required>
        <InputField
          type="email"
          value={formData.customerEmail}
          onChange={(value) => setFormData(prev => ({ ...prev, customerEmail: value }))}
          placeholder="john.smith@example.com"
        />
      </FormField>
      
      <FormField label="Total Amount" required>
        <InputField
          type="number"
          value={formData.total}
          onChange={(value) => setFormData(prev => ({ ...prev, total: value }))}
          placeholder="1299"
        />
      </FormField>
      
      <FormField label="Status" required>
        <SelectField
          value={formData.status}
          onChange={(value) => setFormData(prev => ({ ...prev, status: value as Order['status'] }))}
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'processing', label: 'Processing' },
            { value: 'shipped', label: 'Shipped' },
            { value: 'delivered', label: 'Delivered' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
        />
      </FormField>
      
      <FormField label="Number of Items" required>
        <InputField
          type="number"
          value={formData.items}
          onChange={(value) => setFormData(prev => ({ ...prev, items: value }))}
          placeholder="2"
        />
      </FormField>
    </FormWrapper>
  );
}

// View Order Component
function ViewOrder({ data, onClose }: { data: Order; onClose: () => void }) {
  const status = statusConfig[data.status];
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Order Number</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.orderNumber}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                <status.icon className="w-3 h-3 mr-1" />
                {status.text}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Customer Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.customerName}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Customer Email</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.customerEmail}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
            <dd className="mt-1 text-sm text-gray-900">${data.total}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Items</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.items}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.createdAt}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Updated</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.updatedAt}</dd>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-4 border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const crudConfig: CrudConfig<Order> = {
    apiPrefix: '/api/orders',
    title: 'Orders',
    columns: [
      {
        key: 'orderNumber',
        header: 'Order Number',
        sortable: true,
        searchable: true,
      },
      {
        key: 'customerName',
        header: 'Customer',
        sortable: true,
        searchable: true,
      },
      {
        key: 'customerEmail',
        header: 'Email',
        sortable: true,
        searchable: true,
      },
      {
        key: 'total',
        header: 'Total',
        sortable: true,
        align: 'right',
        render: (value) => `$${value}`,
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (value) => {
          const status = statusConfig[value as keyof typeof statusConfig];
          return (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
              <status.icon className="w-3 h-3 mr-1" />
              {status.text}
            </span>
          );
        },
      },
      {
        key: 'items',
        header: 'Items',
        sortable: true,
        align: 'center',
      },
      {
        key: 'createdAt',
        header: 'Created',
        sortable: true,
        render: (value) => new Date(value).toLocaleDateString(),
      },
    ],
    filters: [
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'pending', label: 'Pending' },
          { value: 'processing', label: 'Processing' },
          { value: 'shipped', label: 'Shipped' },
          { value: 'delivered', label: 'Delivered' },
          { value: 'cancelled', label: 'Cancelled' },
        ],
      },
    ],
    createForm: CreateOrderForm,
    editForm: EditOrderForm,
    viewForm: ViewOrder,
    itemsPerPage: 10,
    enableSearch: true,
    enableFilters: true,
    enablePagination: true,
    enableBulkActions: true,
    enableCreate: true,
    enableEdit: true,
    enableDelete: true,
    enableView: true,
    enableExport: true,
    enableImport: true,
  };

  return (
    <CrudPage
      config={crudConfig}
      data={orders}
      onDataChange={setOrders}
    />
  );
}