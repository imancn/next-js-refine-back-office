'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';
import { CrudPage, CrudConfig } from '../components/CrudPage';
import { FormWrapper, FormField, InputField, SelectField, CheckboxField } from '../components/CrudForms';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockUsers: User[] = [
  { id: '1', email: 'john.doe@example.com', firstName: 'John', lastName: 'Doe', role: 'admin', isActive: true, createdAt: '2024-01-15', updatedAt: '2024-01-15' },
  { id: '2', email: 'jane.smith@example.com', firstName: 'Jane', lastName: 'Smith', role: 'manager', isActive: true, createdAt: '2024-01-20', updatedAt: '2024-01-20' },
  { id: '3', email: 'bob.wilson@example.com', firstName: 'Bob', lastName: 'Wilson', role: 'user', isActive: false, createdAt: '2024-02-01', updatedAt: '2024-02-01' },
  { id: '4', email: 'alice.brown@example.com', firstName: 'Alice', lastName: 'Brown', role: 'user', isActive: true, createdAt: '2024-02-05', updatedAt: '2024-02-05' },
  { id: '5', email: 'charlie.davis@example.com', firstName: 'Charlie', lastName: 'Davis', role: 'manager', isActive: true, createdAt: '2024-02-10', updatedAt: '2024-02-10' },
  { id: '6', email: 'diana.evans@example.com', firstName: 'Diana', lastName: 'Evans', role: 'user', isActive: true, createdAt: '2024-02-12', updatedAt: '2024-02-12' },
  { id: '7', email: 'edward.foster@example.com', firstName: 'Edward', lastName: 'Foster', role: 'user', isActive: false, createdAt: '2024-02-15', updatedAt: '2024-02-15' },
  { id: '8', email: 'fiona.garcia@example.com', firstName: 'Fiona', lastName: 'Garcia', role: 'manager', isActive: true, createdAt: '2024-02-18', updatedAt: '2024-02-18' },
];

const roles = ['admin', 'manager', 'user'];

// Create User Form Component
function CreateUserForm({ onSubmit, onCancel }: { onSubmit: (data: Partial<User>) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: 'user',
    isActive: true,
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <FormWrapper title="Create New User" onSubmit={handleSubmit} onCancel={onCancel}>
      <FormField label="Email" required>
        <InputField
          type="email"
          value={formData.email}
          onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
          placeholder="john.doe@example.com"
        />
      </FormField>
      
      <FormField label="First Name" required>
        <InputField
          value={formData.firstName}
          onChange={(value) => setFormData(prev => ({ ...prev, firstName: value }))}
          placeholder="John"
        />
      </FormField>
      
      <FormField label="Last Name" required>
        <InputField
          value={formData.lastName}
          onChange={(value) => setFormData(prev => ({ ...prev, lastName: value }))}
          placeholder="Doe"
        />
      </FormField>
      
      <FormField label="Role" required>
        <SelectField
          value={formData.role}
          onChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
          options={roles.map(role => ({ value: role, label: role.charAt(0).toUpperCase() + role.slice(1) }))}
          placeholder="Select role"
        />
      </FormField>
      
      <FormField label="Active Status">
        <CheckboxField
          checked={formData.isActive}
          onChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
          label="User account is active"
        />
      </FormField>
    </FormWrapper>
  );
}

// Edit User Form Component
function EditUserForm({ data, onSubmit, onCancel }: { data: User; onSubmit: (data: Partial<User>) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
    isActive: data.isActive,
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <FormWrapper title="Edit User" onSubmit={handleSubmit} onCancel={onCancel}>
      <FormField label="Email" required>
        <InputField
          type="email"
          value={formData.email}
          onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
          placeholder="john.doe@example.com"
        />
      </FormField>
      
      <FormField label="First Name" required>
        <InputField
          value={formData.firstName}
          onChange={(value) => setFormData(prev => ({ ...prev, firstName: value }))}
          placeholder="John"
        />
      </FormField>
      
      <FormField label="Last Name" required>
        <InputField
          value={formData.lastName}
          onChange={(value) => setFormData(prev => ({ ...prev, lastName: value }))}
          placeholder="Doe"
        />
      </FormField>
      
      <FormField label="Role" required>
        <SelectField
          value={formData.role}
          onChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
          options={roles.map(role => ({ value: role, label: role.charAt(0).toUpperCase() + role.slice(1) }))}
          placeholder="Select role"
        />
      </FormField>
      
      <FormField label="Active Status">
        <CheckboxField
          checked={formData.isActive}
          onChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
          label="User account is active"
        />
      </FormField>
    </FormWrapper>
  );
}

// View User Component
function ViewUser({ data, onClose }: { data: User; onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">User Details</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <User className="w-5 h-5" />
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Role</dt>
            <dd className="mt-1">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {data.role.charAt(0).toUpperCase() + data.role.slice(1)}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">First Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.firstName}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Last Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.lastName}</dd>
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

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const crudConfig: CrudConfig<User> = {
    apiPrefix: '/api/users',
    title: 'Users',
    columns: [
      {
        key: 'email',
        header: 'Email',
        sortable: true,
        searchable: true,
      },
      {
        key: 'firstName',
        header: 'First Name',
        sortable: true,
        searchable: true,
      },
      {
        key: 'lastName',
        header: 'Last Name',
        sortable: true,
        searchable: true,
      },
      {
        key: 'role',
        header: 'Role',
        sortable: true,
        render: (value) => (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
          </span>
        ),
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
        key: 'role',
        label: 'Role',
        type: 'select',
        options: roles.map(role => ({ value: role, label: role.charAt(0).toUpperCase() + role.slice(1) })),
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
    createForm: CreateUserForm,
    editForm: EditUserForm,
    viewForm: ViewUser,
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
      data={users}
      onDataChange={setUsers}
    />
  );
}