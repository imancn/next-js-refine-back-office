import { EntityConfig } from '@/types';

export const entityConfigs: EntityConfig[] = [
  {
    name: 'users',
    apiPrefix: '/api/users',
    displayName: 'Users',
    icon: 'Users',
    description: 'Manage system users and their roles',
    fields: [
      { name: 'id', type: 'string', label: 'ID', displayInTable: true, displayInForm: false, displayInShow: true },
      { name: 'email', type: 'email', label: 'Email', required: true, displayInTable: true, displayInForm: true, displayInShow: true },
      { name: 'firstName', type: 'string', label: 'First Name', required: true, displayInTable: true, displayInForm: true, displayInShow: true },
      { name: 'lastName', type: 'string', label: 'Last Name', required: true, displayInTable: true, displayInForm: true, displayInShow: true },
      { name: 'role', type: 'select', label: 'Role', required: true, displayInTable: true, displayInForm: true, displayInShow: true, options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
        { value: 'manager', label: 'Manager' }
      ]},
      { name: 'avatar', type: 'url', label: 'Avatar', displayInTable: false, displayInForm: true, displayInShow: true },
      { name: 'isActive', type: 'boolean', label: 'Active', displayInTable: true, displayInForm: true, displayInShow: true },
      { name: 'createdAt', type: 'date', label: 'Created At', displayInTable: true, displayInForm: false, displayInShow: true },
      { name: 'updatedAt', type: 'date', label: 'Updated At', displayInTable: false, displayInForm: false, displayInShow: true }
    ]
  },
  {
    name: 'products',
    apiPrefix: '/api/products',
    displayName: 'Products',
    icon: 'Package',
    description: 'Manage product catalog and inventory',
    fields: [
      { name: 'id', type: 'string', label: 'ID', displayInTable: true, displayInForm: false, displayInShow: true },
      { name: 'name', type: 'string', label: 'Name', required: true, displayInTable: true, displayInForm: true, displayInShow: true },
      { name: 'description', type: 'textarea', label: 'Description', required: true, displayInTable: false, displayInForm: true, displayInShow: true },
      { name: 'price', type: 'number', label: 'Price', required: true, displayInTable: true, displayInForm: true, displayInShow: true },
      { name: 'category', type: 'string', label: 'Category', required: true, displayInTable: true, displayInForm: true, displayInShow: true },
      { name: 'stock', type: 'number', label: 'Stock', required: true, displayInTable: true, displayInForm: true, displayInShow: true },
      { name: 'sku', type: 'string', label: 'SKU', required: true, displayInTable: true, displayInForm: true, displayInShow: true },
      { name: 'image', type: 'url', label: 'Image', displayInTable: false, displayInForm: true, displayInShow: true },
      { name: 'createdAt', type: 'date', label: 'Created At', displayInTable: true, displayInForm: false, displayInShow: true },
      { name: 'updatedAt', type: 'date', label: 'Updated At', displayInTable: false, displayInForm: false, displayInShow: true }
    ]
  },
  {
    name: 'orders',
    apiPrefix: '/api/orders',
    displayName: 'Orders',
    icon: 'ShoppingCart',
    description: 'Manage customer orders and fulfillment',
    fields: [
      { name: 'id', type: 'string', label: 'ID', displayInTable: true, displayInForm: false, displayInShow: true },
      { name: 'orderNumber', type: 'string', label: 'Order Number', required: true, displayInTable: true, displayInForm: true, displayInShow: true },
      { name: 'customerId', type: 'string', label: 'Customer ID', required: true, displayInTable: false, displayInForm: true, displayInShow: true },
      { name: 'customerName', type: 'string', label: 'Customer Name', required: true, displayInTable: true, displayInForm: true, displayInShow: true },
      { name: 'total', type: 'number', label: 'Total', required: true, displayInTable: true, displayInForm: true, displayInShow: true },
      { name: 'status', type: 'select', label: 'Status', required: true, displayInTable: true, displayInForm: true, displayInShow: true, options: [
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' }
      ]},
      { name: 'createdAt', type: 'date', label: 'Created At', displayInTable: true, displayInForm: false, displayInShow: true },
      { name: 'updatedAt', type: 'date', label: 'Updated At', displayInTable: false, displayInForm: false, displayInShow: true }
    ]
  }
];

export const getEntityConfig = (entityName: string): EntityConfig | undefined => {
  return entityConfigs.find(config => config.name === entityName);
};

export const getAllEntityConfigs = (): EntityConfig[] => {
  return entityConfigs;
};