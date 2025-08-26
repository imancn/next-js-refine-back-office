# Refine Backoffice

A complete, production-ready back-office application built with **Next.js 15** (App Router), **Refine**, and **Tailwind CSS**. This application provides a fully component-driven, responsive, and multi-language back-office solution with automatic CRUD operations, history tracking, and comprehensive analytics.

## ✨ Features

### 🚀 Core Functionality
- **Automatic CRUD Operations**: Each entity is automatically configured via API prefix mapping
- **Component-Driven Architecture**: Fully reusable components for tables, forms, charts, and more
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Multi-Language Support**: English and Arabic with RTL/LTR support
- **PWA/TWA Ready**: Installable on mobile and desktop with offline support
- **History Tracking**: Automatic audit logging for all entity changes

### 🎨 UI Components
- **DataTable**: Sortable, filterable, paginated tables with search
- **EntityForm**: Auto-generated forms based on entity field configurations
- **Charts**: Line, Bar, and Pie charts using Recharts
- **HistoryViewer**: Timeline-based change history with detailed diff views
- **Layout Components**: Header, Sidebar, and responsive navigation

### 🔧 Technical Features
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Headless CSS with design system utilities
- **Form Validation**: Zod-based validation with React Hook Form
- **Internationalization**: Dynamic language switching with RTL support
- **Component Variants**: Consistent styling with class-variance-authority

## 🏗️ Architecture

### Folder Structure
```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Sidebar)
│   ├── tables/         # Data table components
│   ├── forms/          # Form components
│   ├── charts/         # Chart components
│   ├── modals/         # Modal and dialog components
│   └── history/        # History and audit components
├── pages/              # Page components
│   ├── dashboard/      # Dashboard page
│   └── entities/       # Entity management pages
├── entities/           # Entity configurations
├── lib/                # Utilities and configurations
├── locales/            # Internationalization files
├── types/              # TypeScript type definitions
└── hooks/              # Custom React hooks
```

### Entity Configuration
Entities are defined in `src/entities/index.ts` with:
- **API Prefix**: Determines all CRUD endpoints
- **Field Definitions**: Type, validation, and display options
- **Automatic Generation**: Forms, tables, and validation schemas

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd refine-backoffice

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 📱 PWA Features

The application is configured as a Progressive Web App with:
- **Manifest**: App metadata and icons
- **Service Worker**: Offline functionality
- **Installable**: Add to home screen on mobile/desktop
- **Responsive**: Optimized for all screen sizes

## 🌍 Internationalization

### Supported Languages
- **English (en)**: LTR layout
- **Arabic (ar)**: RTL layout

### Adding New Languages
1. Create translation file in `src/locales/`
2. Add language to `src/lib/i18n.ts`
3. Update language switcher in Header component

## 🎯 Usage Examples

### Creating a New Entity
```typescript
// src/entities/index.ts
export const entityConfigs: EntityConfig[] = [
  {
    name: 'customers',
    apiPrefix: '/api/customers',
    displayName: 'Customers',
    fields: [
      { name: 'name', type: 'string', label: 'Name', required: true },
      { name: 'email', type: 'email', label: 'Email', required: true },
      // ... more fields
    ]
  }
];
```

### Custom Chart Configuration
```typescript
// Using predefined chart configs
<LineChart
  data={data}
  {...chartConfigs.users}
  title="Custom Title"
  height={400}
/>
```

## 🔧 Customization

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **CSS Variables**: Design system tokens
- **Component Variants**: Consistent component styling

### Components
- **Extensible**: All components accept className props
- **Variants**: Built-in styling variants
- **Responsive**: Mobile-first responsive design

## 📊 Available Entities

### Users
- **Fields**: Email, Name, Role, Status
- **Features**: Role-based access, status management
- **Charts**: Growth trends, role distribution

### Products
- **Fields**: Name, Description, Price, Category, Stock
- **Features**: Inventory management, category organization
- **Charts**: Category distribution, stock levels

### Orders
- **Fields**: Order number, customer, items, status
- **Features**: Order lifecycle management
- **Charts**: Status distribution, monthly trends

## 🚀 Deployment

### Build
```bash
npm run build
npm start
```

### Environment Variables
- `NEXT_PUBLIC_API_URL`: API base URL
- `NEXT_PUBLIC_APP_NAME`: Application name

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔮 Roadmap

- [ ] Dark mode support
- [ ] Advanced filtering and search
- [ ] Export functionality (CSV, PDF)
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] User permissions and roles
- [ ] API rate limiting
- [ ] Caching strategies

---

Built with ❤️ using Next.js, Refine, and Tailwind CSS
