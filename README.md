# Next.js Refine Backoffice Application

A modern backoffice application built with [Next.js 15](https://nextjs.org) and [Refine](https://refine.dev), featuring a clean dashboard interface with data visualization capabilities.

## 🚀 Features

- **Next.js 15** with App Router and Turbopack for fast development
- **Refine Framework** for rapid CRUD application development
- **TypeScript** for type safety
- **Tailwind CSS** for modern, responsive styling
- **React Hook Form** for efficient form handling
- **React Table** for data table management
- **Tremor** for beautiful dashboard components
- **Recharts** for data visualization

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm package manager

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd next-js-refine-back-office
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   # or
   yarn install
   ```

## 🚀 Available Scripts

### Development
```bash
# Start development server with Turbopack
npm run dev
# or
yarn dev
```

The development server will start at [http://localhost:3000](http://localhost:3000) with hot reloading enabled.

### Production
```bash
# Build the application
npm run build
# or
yarn build

# Start production server
npm start
# or
yarn start
```

### Code Quality
```bash
# Run ESLint
npm run lint
# or
yarn lint
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main dashboard page
│   ├── globals.css        # Global styles
│   └── favicon.ico        # App icon
├── public/                 # Static assets
└── refine-backoffice/      # Refine-specific configurations
```

## 🎨 Technologies Used

- **Frontend Framework:** Next.js 15 with React 18
- **UI Framework:** Tailwind CSS 4
- **Data Management:** Refine Core
- **Forms:** React Hook Form
- **Tables:** TanStack React Table
- **Charts:** Recharts
- **Dashboard Components:** Tremor
- **Language:** TypeScript
- **Build Tool:** Turbopack

## 🌐 Development

1. Start the development server: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000) in your browser
3. The page will auto-update as you edit files

## 📦 Building for Production

Before starting the production server, you must build the application:

```bash
# Build the app
npm run build

# Start production server
npm start
```

## 🔧 Configuration

- **Next.js Config:** `next.config.ts`
- **TypeScript Config:** `tsconfig.json`
- **ESLint Config:** `eslint.config.mjs`
- **PostCSS Config:** `postcss.config.mjs`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Refine Documentation](https://refine.dev/docs) - Learn about Refine framework
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS
- [Tremor Documentation](https://www.tremor.so/docs) - Learn about Tremor components

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 License

This project is private and proprietary.
