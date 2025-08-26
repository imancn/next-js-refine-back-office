import { z } from 'zod';

// User validation schemas
export const userCreateSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'USER', 'GUEST']).default('USER'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION']).default('ACTIVE'),
});

export const userUpdateSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'USER', 'GUEST']).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION']).optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const userPhoneLoginSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
  otp: z.string().min(6, 'OTP must be 6 digits').max(6, 'OTP must be 6 digits'),
});

// Password validation schemas
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const passwordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const passwordResetConfirmSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// OTP validation schemas
export const otpRequestSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
}).refine((data) => data.email || data.phone, {
  message: 'Either email or phone is required',
});

export const otpVerifySchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
  otp: z.string().min(6, 'OTP must be 6 digits').max(6, 'OTP must be 6 digits'),
}).refine((data) => data.email || data.phone, {
  message: 'Either email or phone is required',
});

// Profile update schema
export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  avatar: z.string().url('Invalid avatar URL').optional(),
});

// Settings validation schemas
export const settingsUpdateSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteDescription: z.string().optional(),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().optional(),
  maintenanceMode: z.boolean().default(false),
  allowRegistration: z.boolean().default(true),
  requireEmailVerification: z.boolean().default(true),
  requirePhoneVerification: z.boolean().default(false),
  maxLoginAttempts: z.number().min(1).max(10).default(5),
  sessionTimeout: z.number().min(15).max(1440).default(60), // minutes
});

// Product validation schemas
export const productCreateSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  sku: z.string().min(1, 'SKU is required'),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  isActive: z.boolean().default(true),
});

export const productUpdateSchema = productCreateSchema.partial();

// Order validation schemas
export const orderCreateSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  items: z.array(z.object({
    productId: z.string().min(1, 'Product ID is required'),
    quantity: z.number().int().positive('Quantity must be positive'),
    price: z.number().positive('Price must be positive'),
  })).min(1, 'At least one item is required'),
  shippingAddress: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'ZIP code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  billingAddress: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'ZIP code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  paymentMethod: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'BANK_TRANSFER']),
  notes: z.string().optional(),
});

export const orderUpdateSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']).optional(),
  trackingNumber: z.string().optional(),
  notes: z.string().optional(),
});

// Search and pagination schemas
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

// File upload validation
export const fileUploadSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.size <= 5 * 1024 * 1024, // 5MB limit
    'File size must be less than 5MB'
  ).refine(
    (file) => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type),
    'Only image files are allowed'
  ),
});

// API response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  error: z.string().optional(),
  timestamp: z.string(),
});

export const paginatedResponseSchema = z.object({
  data: z.array(z.any()),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

// Export types
export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
export type UserPhoneLoginInput = z.infer<typeof userPhoneLoginSchema>;
export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
export type PasswordResetConfirmInput = z.infer<typeof passwordResetConfirmSchema>;
export type OtpRequestInput = z.infer<typeof otpRequestSchema>;
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type SettingsUpdateInput = z.infer<typeof settingsUpdateSchema>;
export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
export type OrderCreateInput = z.infer<typeof orderCreateSchema>;
export type OrderUpdateInput = z.infer<typeof orderUpdateSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type FileUploadInput = z.infer<typeof fileUploadSchema>;
export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type PaginatedResponse = z.infer<typeof paginatedResponseSchema>;