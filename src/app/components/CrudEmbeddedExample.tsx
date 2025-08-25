'use client';

import React, { useState } from 'react';
import { CrudPage, CrudConfig } from './CrudPage';
import { FormWrapper, FormField, InputField, SelectField } from './CrudForms';

// Example data model for embedded CRUD
interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  assignedTo: string;
  dueDate: string;
}

const mockTasks: Task[] = [
  { id: '1', title: 'Review code changes', description: 'Review pull request #123', priority: 'high', status: 'todo', assignedTo: 'John Doe', dueDate: '2024-02-15' },
  { id: '2', title: 'Update documentation', description: 'Update API documentation', priority: 'medium', status: 'in-progress', assignedTo: 'Jane Smith', dueDate: '2024-02-20' },
  { id: '3', title: 'Fix bug #456', description: 'Fix authentication issue', priority: 'high', status: 'done', assignedTo: 'Bob Wilson', dueDate: '2024-02-10' },
  { id: '4', title: 'Write tests', description: 'Add unit tests for new feature', priority: 'low', status: 'todo', assignedTo: 'Alice Brown', dueDate: '2024-02-25' },
];

// Create Task Form Component
function CreateTaskForm({ onSubmit, onCancel }: { onSubmit: (data: Partial<Task>) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    status: 'todo' as Task['status'],
    assignedTo: '',
    dueDate: '',
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <FormWrapper title="Create New Task" onSubmit={handleSubmit} onCancel={onCancel}>
      <FormField label="Title" required>
        <InputField
          value={formData.title}
          onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
          placeholder="Task title"
        />
      </FormField>
      
      <FormField label="Description" required>
        <InputField
          value={formData.description}
          onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
          placeholder="Task description"
        />
      </FormField>
      
      <FormField label="Priority" required>
        <SelectField
          value={formData.priority}
          onChange={(value) => setFormData(prev => ({ ...prev, priority: value as Task['priority'] }))}
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
        />
      </FormField>
      
      <FormField label="Status" required>
        <SelectField
          value={formData.status}
          onChange={(value) => setFormData(prev => ({ ...prev, status: value as Task['status'] }))}
          options={[
            { value: 'todo', label: 'To Do' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'done', label: 'Done' },
          ]}
        />
      </FormField>
      
      <FormField label="Assigned To" required>
        <InputField
          value={formData.assignedTo}
          onChange={(value) => setFormData(prev => ({ ...prev, assignedTo: value }))}
          placeholder="Assignee name"
        />
      </FormField>
      
      <FormField label="Due Date" required>
        <InputField
          type="date"
          value={formData.dueDate}
          onChange={(value) => setFormData(prev => ({ ...prev, dueDate: value }))}
        />
      </FormField>
    </FormWrapper>
  );
}

// Edit Task Form Component
function EditTaskForm({ data, onSubmit, onCancel }: { data: Task; onSubmit: (data: Partial<Task>) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: data.title,
    description: data.description,
    priority: data.priority,
    status: data.status,
    assignedTo: data.assignedTo,
    dueDate: data.dueDate,
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <FormWrapper title="Edit Task" onSubmit={handleSubmit} onCancel={onCancel}>
      <FormField label="Title" required>
        <InputField
          value={formData.title}
          onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
          placeholder="Task title"
        />
      </FormField>
      
      <FormField label="Description" required>
        <InputField
          value={formData.description}
          onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
          placeholder="Task description"
        />
      </FormField>
      
      <FormField label="Priority" required>
        <SelectField
          value={formData.priority}
          onChange={(value) => setFormData(prev => ({ ...prev, priority: value as Task['priority'] }))}
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
        />
      </FormField>
      
      <FormField label="Status" required>
        <SelectField
          value={formData.status}
          onChange={(value) => setFormData(prev => ({ ...prev, status: value as Task['status'] }))}
          options={[
            { value: 'todo', label: 'To Do' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'done', label: 'Done' },
          ]}
        />
      </FormField>
      
      <FormField label="Assigned To" required>
        <InputField
          value={formData.assignedTo}
          onChange={(value) => setFormData(prev => ({ ...prev, assignedTo: value }))}
          placeholder="Assignee name"
        />
      </FormField>
      
      <FormField label="Due Date" required>
        <InputField
          type="date"
          value={formData.dueDate}
          onChange={(value) => setFormData(prev => ({ ...prev, dueDate: value }))}
        />
      </FormField>
    </FormWrapper>
  );
}

// View Task Component
function ViewTask({ data, onClose }: { data: Task; onClose: () => void }) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    done: 'bg-green-100 text-green-800',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Task Details</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Title</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.title}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Priority</dt>
            <dd className="mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[data.priority]}`}>
                {data.priority.charAt(0).toUpperCase() + data.priority.slice(1)}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[data.status]}`}>
                {data.status === 'in-progress' ? 'In Progress' : data.status.charAt(0).toUpperCase() + data.status.slice(1)}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.assignedTo}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.description}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Due Date</dt>
            <dd className="mt-1 text-sm text-gray-900">{data.dueDate}</dd>
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

// Example component showing how to embed CRUD in a partial page
export function CrudEmbeddedExample() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const crudConfig: CrudConfig<Task> = {
    apiPrefix: '/api/tasks',
    title: 'Project Tasks',
    columns: [
      {
        key: 'title',
        header: 'Task Title',
        sortable: true,
        searchable: true,
      },
      {
        key: 'assignedTo',
        header: 'Assigned To',
        sortable: true,
        searchable: true,
      },
      {
        key: 'priority',
        header: 'Priority',
        sortable: true,
        render: (value) => {
          const colors = {
            low: 'bg-green-100 text-green-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-red-100 text-red-800',
          };
          return (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
              {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
            </span>
          );
        },
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (value) => {
          const colors = {
            todo: 'bg-gray-100 text-gray-800',
            'in-progress': 'bg-blue-100 text-blue-800',
            done: 'bg-green-100 text-green-800',
          };
          return (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
              {value === 'in-progress' ? 'In Progress' : String(value).charAt(0).toUpperCase() + String(value).slice(1)}
            </span>
          );
        },
      },
      {
        key: 'dueDate',
        header: 'Due Date',
        sortable: true,
        render: (value) => new Date(value).toLocaleDateString(),
      },
    ],
    filters: [
      {
        key: 'priority',
        label: 'Priority',
        type: 'select',
        options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
        ],
      },
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'todo', label: 'To Do' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'done', label: 'Done' },
        ],
      },
    ],
    createForm: CreateTaskForm,
    editForm: EditTaskForm,
    viewForm: ViewTask,
    itemsPerPage: 5,
    enableSearch: true,
    enableFilters: true,
    enablePagination: true,
    enableBulkActions: false, // Disabled for embedded use
    enableCreate: true,
    enableEdit: true,
    enableDelete: true,
    enableView: true,
    enableExport: false, // Disabled for embedded use
    enableImport: false, // Disabled for embedded use
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Project Dashboard</h2>
        <p className="text-gray-600">
          This is an example of how to embed the CrudPage component in a partial page section.
          The CRUD functionality is fully contained and can be used anywhere in your application.
        </p>
      </div>
      
      {/* Embedded CRUD Component */}
      <CrudPage
        config={crudConfig}
        data={tasks}
        onDataChange={setTasks}
        className="border-t pt-6"
      />
      
      {/* Additional page content can go here */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{tasks.filter(t => t.status === 'todo').length}</div>
            <div className="text-sm text-blue-600">To Do</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{tasks.filter(t => t.status === 'in-progress').length}</div>
            <div className="text-sm text-yellow-600">In Progress</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'done').length}</div>
            <div className="text-sm text-green-600">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}