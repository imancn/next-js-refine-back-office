export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface EntityHistory extends BaseEntity {
  entityId: string;
  entityType: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  changes: Record<string, any>;
  previousValues?: Record<string, any>;
  newValues?: Record<string, any>;
}

export interface EntityConfig {
  name: string;
  apiPrefix: string;
  fields: EntityField[];
  displayName: string;
  icon?: string;
  description?: string;
}

export interface EntityField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'select' | 'textarea' | 'email' | 'url';
  label: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: any;
  displayInTable?: boolean;
  displayInForm?: boolean;
  displayInShow?: boolean;
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

export interface FilterParams {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'in';
  value: any;
}

export interface TableState {
  pagination: PaginationParams;
  sorting: SortParams[];
  filters: FilterParams[];
}

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'manager';
  avatar?: string;
  isActive: boolean;
}

export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
  image?: string;
}

export interface Order extends BaseEntity {
  orderNumber: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Order[];
  topProducts: Product[];
  userGrowth: { date: string; count: number }[];
  revenueGrowth: { date: string; amount: number }[];
}

export interface Language {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
}

export interface Translation {
  [key: string]: string | Translation;
}