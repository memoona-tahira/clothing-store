# Backend - Clothing Store API

Node.js/Express REST API with MongoDB and Google OAuth authentication.

## Setup

```bash
npm install
npm run dev
```

Server runs on `http://localhost:3000`

## Environment Variables

Create `.env` file:

```env
MONGODB_URI=mongodb://admin:password123@localhost:27017/clothing-store?authSource=admin
PORT=3000
NODE_ENV=development

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
BE_URL=http://localhost:3000
FE_URL=http://localhost:3001
SESSION_SECRET=your_session_secret
```

## Database Setup

```bash
# Seed database with initial data
node seed.js
```

Seeds:
- Categories (Men, Women, Kids)
- Sizes (XS-XL for adults, 110-170 for kids)
- Sample products
- Stock inventory

## Tech Stack

- **Node.js** + **Express 5** - Server framework
- **MongoDB** + **Mongoose** - Database
- **Passport.js** - Google OAuth authentication
- **Express Session** + **connect-mongo** - Session management
- **TypeScript** - Type safety

## API Routes

### Auth (`/auth`)
- `GET /google` - Initiate Google OAuth
- `GET /google/callback` - OAuth callback
- `GET /me` - Get current user
- `POST /logout` - Logout

### Products (`/api/v1/products`)
- `GET /` - List products (query: `?catagory=Men|Women|Kids`)
- `GET /:id` - Get product by ID
- `GET /:id/stock` - Get product stock

### Orders (`/api/v1/orders`)
- `POST /` - Create order (checkout)
- `GET /user/:userId` - Get user orders
- `GET /admin/all` - Get all orders (admin)
- `PATCH /:id/status` - Update order status (admin)

### Cards (`/api/v1/cards`)
- `GET /user/:userId` - Get saved cards
- `POST /` - Add card
- `DELETE /:id` - Delete card
- `PATCH /:id/default` - Set default card

### Stock (`/api/v1/stock`)
- `GET /admin/all` - Get all stock (admin)
- `POST /` - Add/update stock (admin)

### Sizes (`/api/v1/sizes`)
- `GET /` - Get all sizes

## Database Models

- **User** - Google OAuth user data
- **Product** - Product info with category reference
- **Category** - Men, Women, Kids
- **Size** - Available sizes (forKids flag)
- **Stock** - Inventory by product/size/color
- **Order** - Order with items, shipping, payment
- **Card** - Saved payment methods

## Project Structure

```
src/
├── controllers/     # Route handlers
├── models/         # Mongoose schemas
├── routes/         # Express routes
├── middlewhare/    # Auth & middleware
├── config/         # Database connection
├── index.ts        # App entry point
└── seed.js         # Database seeding
```

## Scripts

```bash
npm run dev      # Development with auto-reload
npm run build    # Compile TypeScript
npm start        # Production server
node seed.js     # Seed database
```

## Notes

- Images served from `/images` static folder
- Sessions stored in MongoDB
- CORS enabled for frontend URL
- Admin users must be set manually in database (`isAdmin: true`)