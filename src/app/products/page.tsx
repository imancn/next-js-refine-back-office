'use client';

import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { CrudPage, CrudConfig } from '../components/CrudPage';
import { FormWrapper, FormField, InputField, SelectField, TextareaField, CheckboxField } from '../components/CrudForms';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Laptop Pro', description: 'High-performance laptop for professionals', price: 1299, category: 'Electronics', stock: 25, sku: 'LAP-001', image: 'https://example.com/laptop.jpg', isActive: true, createdAt: '2024-01-10', updatedAt: '2024-01-10' },
  { id: '2', name: 'Wireless Headphones', description: 'Noise-cancelling wireless headphones', price: 199, category: 'Electronics', stock: 50, sku: 'AUD-001', image: 'https://example.com/headphones.jpg', isActive: true, createdAt: '2024-01-12', updatedAt: '2024-01-12' },
  { id: '3', name: 'Designer T-Shirt', description: 'Premium cotton designer t-shirt', price: 49, category: 'Clothing', stock: 100, sku: 'CLO-001', image: 'https://example.com/tshirt.jpg', isActive: true, createdAt: '2024-01-15', updatedAt: '2024-01-15' },
  { id: '4', name: 'Coffee Maker', description: 'Automatic coffee maker with timer', price: 89, category: 'Home & Garden', stock: 30, sku: 'HOM-001', image: 'https://example.com/coffee.jpg', isActive: true, createdAt: '2024-01-18', updatedAt: '2024-01-18' },
  { id: '5', name: 'Fitness Tracker', description: 'Smart fitness tracker with heart rate monitor', price: 149, category: 'Sports', stock: 75, sku: 'SPO-001', image: 'https://example.com/tracker.jpg', isActive: true, createdAt: '2024-01-22', updatedAt: '2024-01-22' },
  { id: '6', name: 'Smart Watch', description: 'Feature-rich smartwatch with health monitoring', price: 299, category: 'Electronics', stock: 40, sku: 'ELE-002', image: 'https://example.com/watch.jpg', isActive: true, createdAt: '2024-01-25', updatedAt: '2024-01-25' },
  { id: '7', name: 'Running Shoes', description: 'Professional running shoes with cushioning', price: 129, category: 'Sports', stock: 60, sku: 'SPO-002', image: 'https://example.com/shoes.jpg', isActive: false, createdAt: '2024-01-28', updatedAt: '2024-01-28' },
  { id: '8', name: 'Bluetooth Speaker', description: 'Portable Bluetooth speaker with deep bass', price: 79, category: 'Electronics', stock: 35, sku: 'ELE-003', image: 'https://example.com/speaker.jpg', isActive: true, createdAt: '2024-02-01', updatedAt: '2024-02-01' },
];

const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Automotive'];

// Create Product Form Component
function CreateProductForm({ onSubmit, onCancel }: { onSubmit: (data: Partial<Product>) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    sku: '',
    image: '',
    isActive: true,
  });

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  };

  return (
    <FormWrapper title="Create New Product" onSubmit={handleSubmit} onCancel={onCancel}>
      <FormField label="Product Name" required>
        <InputField
          value={formData.name}
          onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
          placeholder="Laptop Pro"
        />
      </FormField>
      
      <FormField label="Description" required>
        <TextareaField
          value={formData.description}
          onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
          placeholder="High-performance laptop for professionals"
          rows={3}
        />
      </FormField>
      
      <FormField label="Price" required>
        <InputField
          type="number"
          value={formData.price}
          onChange={(value) => setFormData(prev => ({ ...prev, price: value }))}
          placeholder="1299"
        />
      </FormField>
      
      <FormField label="Category" required>
        <SelectField
          value={formData.category}
          onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          options={categories.map(cat => ({ value: cat, label: cat }))}
          placeholder="Select category"
        />
      </FormField>
      
      <FormField label="Stock" required>
        <InputField
          type="number"
          value={formData.stock}
          onChange={(value) => setFormData(prev => ({ ...prev, stock: value }))}
          placeholder="25"
        />
      </FormField>
      
      <FormField label="SKU" required>
        <InputField
          value={formData.sku}
          onChange={(value) => setFormData(prev => ({ ...prev, sku: value }))}
          placeholder="LAP-001"
        />
      </FormField>
      
      <FormField label="Image URL">
        <InputField
          type="url"
          value={formData.image}
          onChange={(value) => setFormData(prev => ({ ...prev, image: value }))}
          placeholder="https://example.com/image.jpg"
        />
      </FormField>
      
      <FormField label="Active Status">
        <CheckboxField
          checked={formData.isActive}
          onChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
          label="Product is active and available for purchase"
        />
      </FormField>
    </FormWrapper>
  );
}

// Edit Product Form Component
function EditProductForm({ data, onSubmit, onCancel }: { data: Product; onSubmit: (data: Partial<Product>) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: data.name,
    description: data.description,
    price: data.price.toString(),
    category: data.category,
    stock: data.stock.toString(),
    sku: data.sku,
    image: data.image,
    isActive: data.isActive,
  });

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  };

  return (
    <FormWrapper title="Edit Product" onSubmit={handleSubmit} onCancel={onCancel}>
      <FormField label="Product Name" required>
        <InputField
          value={formData.name}
          onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
          placeholder="Laptop Pro"
        />
      </FormField>
      
      <FormField label="Description" required>
        <TextareaField
          value={formData.description}
          onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
          placeholder="High-performance laptop for professionals"
          rows={3}
        />
      </FormField>
      
      <FormField label="Price" required>
        <InputField
          type="number"
          value={formData.price}
          onChange={(value) => setFormData(prev => ({ ...prev, price: value }))}
          placeholder="1299"
        />
      </FormField>
      
      <FormField label="Category" required>
        <SelectField
          value={formData.category}
          onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          options={categories.map(cat => ({ value: cat, label: cat }))}
          placeholder="Select category"
        />
      </FormField>
      
      <FormField label="Stock" required>
        <InputField
          type="number"
          value={formData.stock}
          onChange={(value) => setFormData(prev => ({ ...prev, stock: value }))}
          placeholder="25"
        />
      </FormField>
      
      <FormField label="SKU" required>
        <InputField
          value={formData.sku}
          onChange={(value) => setFormData(prev => ({ ...prev, sku: value }))}
          placeholder="LAP-001"
        />
      </FormField>
      
      <FormField label="Image URL">
        <InputField
          type="url"
          value={formData.image}
          onChange={(value) => setFormData(prev => ({ ...prev, image: value }))}
          placeholder="https://example.com/image.jpg"
        />
      </FormField>
      
      <FormField label="Active Status">
        <CheckboxField
          checked={formData.isActive}
          onChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
          label="Product is active and available for purchase"
        />
      </FormField>
    </FormWrapper>
  );
}

// View Product Component
function ViewProduct({ data, onClose }: { data: Product; onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <Package className="w-5 h-5" />
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Product Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">SKU</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.sku}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Category</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.category}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Price</dt>
            <dd className="mt-1 text-sm text-gray-900">${data.price}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Stock</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.stock}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                data.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {data.isActive ? 'Active' : 'Inactive'}
              </span>
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.description}</dd>
          </div>
          {data.image && (
            <div className="col-span-2">
              <dt className="text-sm font-medium text-gray-500">Image</dt>
              <dd className="mt-1">
                <img 
                  src={data.image} 
                  alt={data.name} 
                  className="w-20 h-20 rounded object-cover"
                />
              </dd>
            </div>
          )}
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const crudConfig: CrudConfig<Product> = {
    apiPrefix: '/api/products',
    title: 'Products',
    columns: [
      {
        key: 'name',
        header: 'Product Name',
        sortable: true,
        searchable: true,
      },
      {
        key: 'sku',
        header: 'SKU',
        sortable: true,
        searchable: true,
      },
      {
        key: 'category',
        header: 'Category',
        sortable: true,
        searchable: true,
      },
      {
        key: 'price',
        header: 'Price',
        sortable: true,
        align: 'right',
        render: (value) => `$${value}`,
      },
      {
        key: 'stock',
        header: 'Stock',
        sortable: true,
        align: 'center',
      },
      {
        key: 'isActive',
        header: 'Status',
        sortable: true,
        render: (value) => (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {value ? 'Active' : 'Inactive'}
          </span>
        ),
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
        key: 'category',
        label: 'Category',
        type: 'select',
        options: categories.map(cat => ({ value: cat, label: cat })),
      },
      {
        key: 'isActive',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'true', label: 'Active' },
          { value: 'false', label: 'Inactive' },
        ],
      },
    ],
    createForm: CreateProductForm,
    editForm: EditProductForm,
    viewForm: ViewProduct,
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
      data={products}
      onDataChange={setProducts}
    />
  );
}