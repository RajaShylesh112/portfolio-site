# Portfolio Website - Raja Shylesh

## Overview

This is a modern, elegant personal portfolio website for Raja Shylesh, a Computer Science student and aspiring backend developer from Coimbatore, India. The application is built as a full-stack web application with a React frontend and Express backend, designed to showcase professional skills, projects, and experience in an interactive and visually appealing manner.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth UI animations and transitions
- **Theme System**: Dark/light mode toggle with context-based theme management
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and data fetching

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: Vite for fast development and hot module replacement
- **Build System**: esbuild for production bundling

### Database Architecture
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database serverless)
- **Schema**: Shared schema definitions between frontend and backend
- **Migrations**: Drizzle Kit for database schema management

## Key Components

### User Interface Components
- **shadcn/ui Library**: Comprehensive UI component system with Radix UI primitives
- **Custom Components**: Portfolio-specific sections (Hero, About, Projects, Skills, Experience, Certifications, Contact)
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Accessibility**: ARIA-compliant components with keyboard navigation support

### Animation System
- **Framer Motion**: Sophisticated animation library for page transitions, scroll-triggered animations, and interactive elements
- **Custom Animations**: Typing animation component, parallax effects, and 3D-style interactions
- **Performance**: Optimized animations with viewport-based triggering

### Theme Management
- **CSS Variables**: Dynamic theming with CSS custom properties
- **Context Provider**: React context for theme state management
- **Persistence**: Theme preference storage (ready for localStorage implementation)

### Form Handling
- **React Hook Form**: Form state management with validation
- **Zod Integration**: Type-safe form validation schemas
- **Contact Forms**: Interactive contact section with form submission

## Data Flow

### Client-Side Data Flow
1. React components consume data through TanStack React Query
2. Theme state managed through React Context
3. Form data handled by React Hook Form with validation
4. Navigation state managed locally with smooth scrolling

### Server-Side Data Flow
1. Express routes handle API requests with proper error handling
2. Drizzle ORM provides type-safe database operations
3. Storage interface abstracts database operations
4. Middleware for request logging and error handling

### Development Flow
1. Vite provides fast development server with HMR
2. TypeScript compilation with strict type checking
3. Shared types between frontend and backend
4. Environment-based configuration

## External Dependencies

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Radix UI**: Unstyled, accessible UI primitives
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icon sets (including brand icons)

### Animation and Interaction
- **Framer Motion**: Production-ready motion library
- **Embla Carousel**: Touch-friendly carousel component
- **React Hook Form**: Performant form library with minimal re-renders

### Development Tools
- **TypeScript**: Static type checking for both frontend and backend
- **Vite**: Fast build tool with plugin ecosystem
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer

### Database and Backend
- **Drizzle ORM**: Type-safe ORM with excellent TypeScript support
- **Neon Database**: Serverless PostgreSQL with connection pooling
- **Express**: Minimal and flexible web application framework

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to static files
2. **Backend Build**: ESBuild bundles Express server with dependencies
3. **Type Checking**: TypeScript compilation ensures type safety
4. **Asset Optimization**: Automatic code splitting and optimization

### Production Configuration
- **Environment Variables**: Database URL and other configuration via environment
- **Static Serving**: Express serves built frontend assets
- **API Routes**: Backend routes prefixed with `/api`
- **Error Handling**: Comprehensive error handling with proper HTTP status codes

### Database Management
- **Schema Deployment**: `drizzle-kit push` for schema updates
- **Migration System**: File-based migrations in `/migrations` directory
- **Connection Pooling**: Neon serverless handles connection management

### Performance Considerations
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Placeholder system for profile images
- **Lazy Loading**: Viewport-based component loading for animations
- **Bundle Size**: Optimized imports and tree shaking

The application follows modern web development practices with a focus on performance, accessibility, and user experience. The architecture supports easy scaling and maintenance while providing a solid foundation for showcasing professional portfolio content.