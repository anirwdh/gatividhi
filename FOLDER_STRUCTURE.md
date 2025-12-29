# Project Folder Structure

## Complete Directory Tree

```
src/
├── assets/                    # Static assets
│   ├── images/               # Image files
│   ├── icons/                # Icon files
│   └── fonts/                # Font files
│
├── components/                # React components
│   ├── common/               # Reusable UI components
│   │   └── index.js         # (Button, Input, Card, Modal, etc.)
│   ├── layout/               # Layout components
│   │   └── index.js         # (Header, Footer, Sidebar, Navigation, etc.)
│   └── features/             # Feature-specific components
│       └── index.js         # (TourCard, BookingForm, SearchBar, etc.)
│
├── constants/                 # App constants and configuration
│   └── index.js             # API endpoints, routes, app config
│
├── context/                   # React Context providers
│   ├── AuthContext.jsx      # Authentication context
│   └── index.js
│
├── hooks/                     # Custom React hooks
│   ├── useAuth.js           # Authentication hook
│   ├── useTours.js          # Tours data hook
│   ├── useDebounce.js       # Debounce hook
│   ├── useLocalStorage.js   # LocalStorage hook
│   └── index.js
│
├── pages/                     # Page components (routes)
│   └── index.js             # (HomePage, ToursPage, TourDetailPage, etc.)
│
├── services/                  # API services layer
│   ├── api/                  # API client and exports
│   │   ├── client.js        # Centralized HTTP client
│   │   ├── auth.js          # Auth service export
│   │   ├── tours.js         # Tours service export
│   │   ├── bookings.js      # Bookings service export
│   │   └── index.js
│   ├── auth/                 # Authentication service
│   │   └── index.js         # Login, register, logout, etc.
│   ├── tours/                # Tours service
│   │   └── index.js         # Get tours, search, categories, etc.
│   └── bookings/             # Bookings service
│       └── index.js         # Create, get, cancel bookings
│
├── styles/                    # Global styles
│   ├── components/           # Component-specific styles
│   ├── pages/                # Page-specific styles
│   ├── index.css            # Main stylesheet
│   ├── variables.css        # CSS variables (colors, spacing, etc.)
│   └── reset.css            # CSS reset
│
├── types/                     # Type definitions
│   └── index.js             # JSDoc types and PropTypes
│
├── utils/                     # Utility functions
│   └── index.js             # Helpers (formatCurrency, debounce, etc.)
│
├── App.jsx                    # Main App component
└── main.jsx                   # Application entry point
```

## Folder Purposes

### 📁 `assets/`
Static files like images, icons, and fonts used throughout the application.

### 📁 `components/`
All React components organized by purpose:
- **common/**: Reusable UI components (Button, Input, Card, Modal, etc.)
- **layout/**: Layout components (Header, Footer, Navigation, Sidebar)
- **features/**: Feature-specific components (TourCard, BookingForm, SearchBar)

### 📁 `constants/`
Application-wide constants including:
- API endpoints
- Route paths
- App configuration
- Environment variables

### 📁 `context/`
React Context providers for global state management (Auth, Theme, etc.)

### 📁 `hooks/`
Custom React hooks for reusable logic:
- `useAuth`: Authentication state and methods
- `useTours`: Tours data fetching
- `useDebounce`: Debounce values
- `useLocalStorage`: LocalStorage management

### 📁 `pages/`
Page-level components that represent routes in your application.

### 📁 `services/`
API service layer separated by domain:
- **api/**: Centralized HTTP client
- **auth/**: Authentication-related API calls
- **tours/**: Tour-related API calls
- **bookings/**: Booking-related API calls

### 📁 `styles/`
Global styles organized by:
- **components/**: Component-specific styles
- **pages/**: Page-specific styles
- Global CSS files (variables, reset, main)

### 📁 `types/`
Type definitions using JSDoc for better code documentation and IDE support.

### 📁 `utils/`
Utility functions and helpers used across the application.

## Best Practices

1. **Component Organization**: Keep components in appropriate folders (common, layout, features)
2. **Service Layer**: All API calls go through the service layer, never directly in components
3. **Custom Hooks**: Extract reusable logic into custom hooks
4. **Constants**: Centralize all constants and configuration
5. **Styles**: Use CSS variables for theming and maintainability
6. **Index Files**: Use index.js files for cleaner imports

## Adding New Features

When adding a new feature (e.g., Reviews):

1. Create service: `src/services/reviews/index.js`
2. Create hook: `src/hooks/useReviews.js`
3. Create components: `src/components/features/ReviewCard.jsx`
4. Create page: `src/pages/ReviewsPage.jsx`
5. Add endpoints: Update `src/constants/index.js`
6. Add styles: `src/styles/components/ReviewCard.css`

