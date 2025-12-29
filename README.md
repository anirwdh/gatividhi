# Gatividhi - Travel Booking Platform

A modern travel booking platform inspired by Viator.com, built with React and Vite.

## Project Structure

```
src/
├── assets/           # Static assets (images, icons, fonts)
│   ├── images/
│   ├── icons/
│   └── fonts/
├── components/       # React components
│   ├── common/      # Reusable UI components (Button, Input, Card, etc.)
│   ├── layout/      # Layout components (Header, Footer, Sidebar, etc.)
│   └── features/    # Feature-specific components (TourCard, BookingForm, etc.)
├── constants/       # App constants and configuration
├── context/         # React Context providers
├── hooks/           # Custom React hooks
├── pages/           # Page components (routes)
├── services/        # API services
│   ├── api/         # API client and service exports
│   ├── auth/        # Authentication service
│   ├── bookings/    # Booking service
│   └── tours/       # Tours service
├── styles/          # Global styles and CSS
│   ├── components/  # Component-specific styles
│   └── pages/       # Page-specific styles
├── types/           # Type definitions and PropTypes
├── utils/           # Utility functions
├── App.jsx          # Main App component
└── main.jsx         # Application entry point
```

## Features

- **Professional Folder Structure**: Organized and scalable architecture
- **API Integration Ready**: Centralized API client with authentication
- **Custom Hooks**: Reusable hooks for common functionality
- **Context Management**: React Context for global state
- **Service Layer**: Separated business logic in service files
- **Type Safety**: Type definitions for better code quality

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the API base URL in `.env`:
```
VITE_API_BASE_URL=http://localhost:3000/api
```

4. Start the development server:
```bash
npm run dev
```

## Services

### Authentication Service
Located in `src/services/auth/` - Handles user authentication, registration, and session management.

### Tours Service
Located in `src/services/tours/` - Manages tour data, search, and filtering.

### Bookings Service
Located in `src/services/bookings/` - Handles booking creation, retrieval, and cancellation.

## Custom Hooks

- `useAuth` - Authentication state and methods
- `useTours` - Tours data fetching
- `useDebounce` - Debounce values for search/input
- `useLocalStorage` - LocalStorage management

## Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL

## Development

The project is set up with:
- React 19
- Vite 7
- ESLint for code quality

## Backend Integration

The project is structured to easily integrate with a backend API. All API calls are centralized through the `apiClient` in `src/services/api/client.js`.

Update the `API_ENDPOINTS` in `src/constants/index.js` to match your backend API structure.
