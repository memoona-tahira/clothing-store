import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from './middlewhare/passport.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import sizesRoutes from './routes/sizesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import stockRoutes from './routes/stockRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

console.log("cors enabled for : ",process.env.FE_URL )
app.use(cors({
  origin: process.env.FE_URL || 'https://clothing-store-c799.onrender.com',
  credentials: true,
}));
app.use(express.json());
app.use('/images', express.static('images'));
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI as string,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error);
    process.exit(1);
  }
}

connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/sizes', sizesRoutes);
app.use('/api/v1/users', userRoutes);

app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/cards', cardRoutes);
app.use('/api/v1/stock', stockRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});