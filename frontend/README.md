# Frontend - Clothing Store

React-based e-commerce frontend with PWA capabilities.

## Setup

```bash
npm install
npm start
```

App runs on `http://localhost:3001` (backend must run on port 3000).

## Features

- 🛍️ Product browsing by category (Men, Women, Kids)
- 🛒 Shopping cart with localStorage
- 🔐 Google OAuth authentication
- 👤 User profile & order history
- 💳 Saved payment methods
- 👑 Admin dashboard (orders, products, stock)
- 📱 PWA support with offline mode
- 🔔 Install prompt

## Tech Stack

- **React 19** - UI library
- **React Router 7** - routing
- **Axios** - HTTP client
- **Context API** - state management (Auth & Cart)

## Project Structure

```
src/
├── components/           # React components
│   ├── admin/           # Admin dashboard components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductsPage.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── UserProfile.jsx
│   └── InstallPrompt.jsx
├── context/             # State management
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── App.jsx
└── index.js
```

## Routes

- `/` → Redirects to `/products`
- `/products?cat=Men|Women|Kids` → Product listing
- `/product-detail?prd={id}` → Product details
- `/cart` → Shopping cart
- `/checkout` → Checkout page (auth required)
- `/profile` → User profile & orders (auth required)
- `/admin` → Admin dashboard (admin only)
- `/auth/callback` → OAuth callback

## Context APIs

### AuthContext
Manages user authentication state and Google OAuth flow.

```jsx
const { user, isAuthenticated, isAdmin, login, logout } = useAuth();
```

### CartContext
Manages shopping cart with localStorage persistence.

```jsx
const { cartItems, addToCart, removeFromCart, getCartTotal } = useCart();
```

## PWA Features

- Service worker for offline support
- App install prompt (dismissible for 7 days)
- Manifest for app metadata
- Network-first API caching
- Cache-first static asset caching

## Environment

Backend API expected at: `http://localhost:3000`

Configure in axios calls or use environment variables.

## Scripts

```bash
npm start       # Development server
npm test        # Run tests
npm run build   # Production build
```