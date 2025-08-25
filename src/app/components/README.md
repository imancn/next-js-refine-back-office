# CrudPage Component

A highly configurable, reusable CRUD (Create, Read, Update, Delete) component that can be used for both full-page CRUD operations and embedded CRUD functionality within other components.

## Features

- **Fully Configurable**: Configure with just an API mapping prefix and response data model
- **Reusable**: Use the same component across different entities (Users, Products, Orders, etc.)
- **Feature-Rich**: Built-in search, filtering, sorting, pagination, and bulk actions
- **Responsive**: Mobile-friendly design with responsive tables
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Customizable**: Extensive configuration options for all features
- **Type-Safe**: Full TypeScript support with generic types

## Basic Usage

```tsx
import { CrudPage, CrudConfig } from './components/CrudPage';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const crudConfig: CrudConfig<User> = {
  apiPrefix: '/api/users',
  title: 'Users',
  columns: [
    { key: 'name', header: 'Name', sortable: true, searchable: true },
    { key: 'email', header: 'Email', sortable: true, searchable: true },
    { key: 'role', header: 'Role', sortable: true },
  ],
  // ... other configuration options
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  
  return (
    <CrudPage
      config={crudConfig}
      data={users}
      onDataChange={setUsers}
    />
  );
}
```

## Configuration Options

### Required Configuration

- `apiPrefix`: The API endpoint prefix for CRUD operations
- `title`: The page title displayed in the header
- `columns`: Array of column definitions for the data table

### Column Configuration

```tsx
interface CrudColumn<T> {
  key: keyof T;                    // Property key from your data model
  header: string;                   // Column header text
  render?: (value: any, item: T) => React.ReactNode; // Custom render function
  sortable?: boolean;               // Enable/disable sorting (default: true)
  searchable?: boolean;             // Enable/disable search (default: true)
  width?: string;                   // CSS width (e.g., '200px', '20%')
  align?: 'left' | 'center' | 'right'; // Text alignment (default: 'left')
}
```

### Feature Flags

Control which features are enabled:

```tsx
{
  enableSearch: true,        // Global search functionality
  enableFilters: true,       // Column-specific filters
  enablePagination: true,    // Page navigation
  enableBulkActions: true,   // Multi-select and bulk operations
  enableCreate: true,        // Create new items
  enableEdit: true,          // Edit existing items
  enableDelete: true,        // Delete items
  enableView: true,          // View item details
  enableExport: true,        // Export functionality
  enableImport: true,        // Import functionality
}
```

### Filters

Configure filters for different data types:

```tsx
filters: [
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
  {
    key: 'price',
    label: 'Price Range',
    type: 'numberRange',
    placeholder: 'Enter price range',
  },
  {
    key: 'createdAt',
    label: 'Created Date',
    type: 'dateRange',
  },
]
```

Supported filter types:
- `select`: Dropdown with predefined options
- `input`: Text input field
- `date`: Date picker
- `dateRange`: Date range picker
- `number`: Numeric input
- `numberRange`: Numeric range input

### Forms

Provide custom form components for create, edit, and view operations:

```tsx
{
  createForm: CreateUserForm,    // Component for creating new items
  editForm: EditUserForm,        // Component for editing existing items
  viewForm: ViewUserForm,        // Component for viewing item details
}
```

Form components receive these props:
- `onSubmit`: Function to call when form is submitted
- `onCancel`: Function to call when form is cancelled
- `data`: The item data (for edit and view forms)

### Actions

Add custom actions for individual items:

```tsx
actions: [
  {
    key: 'approve',
    label: 'Approve',
    icon: CheckCircle,
    onClick: (item) => handleApprove(item),
    variant: 'default',
    disabled: (item) => item.status === 'approved',
  },
]
```

### Bulk Actions

Add custom bulk actions for multiple selected items:

```tsx
bulkActions: [
  {
    key: 'activate',
    label: 'Activate Selected',
    icon: Play,
    onClick: (items) => handleBulkActivate(items),
    variant: 'default',
    disabled: (items) => items.every(item => item.isActive),
  },
]
```

## Form Components

The component includes reusable form components in `CrudForms.tsx`:

- `FormWrapper`: Wrapper for forms with title and action buttons
- `FormField`: Field container with label and error handling
- `InputField`: Text, email, password, number, and URL inputs
- `SelectField`: Dropdown select field
- `TextareaField`: Multi-line text input
- `CheckboxField`: Checkbox input
- `ViewField`: Display-only field for view forms
- `ViewWrapper`: Wrapper for view-only forms

## API Integration

The component includes a mock API service that can be replaced with real API calls:

```tsx
class CrudApiService<T> {
  async getList(params): Promise<{ data: T[]; total: number; page: number; limit: number }>
  async getById(id: string): Promise<T>
  async create(data: Partial<T>): Promise<T>
  async update(id: string, data: Partial<T>): Promise<T>
  async delete(id: string): Promise<void>
  async bulkDelete(ids: string[]): Promise<void>
}
```

## Embedded Usage

The component can be embedded within other components for partial CRUD functionality:

```tsx
export function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Other dashboard content */}
      
      {/* Embedded CRUD for recent tasks */}
      <CrudPage
        config={taskCrudConfig}
        data={tasks}
        onDataChange={setTasks}
        className="mt-6"
      />
    </div>
  );
}
```

## Styling

The component uses Tailwind CSS classes and can be customized with:

- `className`: Additional CSS classes for the main container
- Custom column renderers for specialized styling
- CSS custom properties for theme customization

## Responsive Design

- Mobile-first design approach
- Responsive table with horizontal scrolling
- Collapsible filters on small screens
- Touch-friendly buttons and inputs

## Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management for modals

## Examples

See the following files for complete examples:

- `src/app/orders/page.tsx` - Full-page CRUD for Orders
- `src/app/products/page.tsx` - Full-page CRUD for Products  
- `src/app/users/page.tsx` - Full-page CRUD for Users
- `src/app/components/CrudEmbeddedExample.tsx` - Embedded CRUD example

## Migration from Custom CRUD

To migrate existing custom CRUD implementations:

1. **Extract data model**: Define your interface with proper types
2. **Create column configuration**: Map your data fields to table columns
3. **Configure filters**: Add relevant filters for your data
4. **Create form components**: Build create/edit/view forms using the provided components
5. **Replace custom implementation**: Replace your custom CRUD code with the CrudPage component

## Performance Considerations

- The component uses React.memo and useMemo for performance optimization
- Pagination is handled efficiently with slice operations
- Search and filtering are debounced to prevent excessive re-renders
- Large datasets should use server-side pagination and filtering

## Customization

For advanced customization:

- Extend the `CrudConfig` interface for additional options
- Override the default API service with your own implementation
- Create custom renderers for complex data types
- Add custom actions and bulk operations
- Implement custom validation and error handling