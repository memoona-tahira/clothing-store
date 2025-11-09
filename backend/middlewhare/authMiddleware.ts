import { Request, Response, NextFunction } from 'express';
import { IUser, ClothingUser } from '../models/userModel.js';

// Extend Express Request type to include user with IUser type
declare global {
  namespace Express {
    interface User extends IUser {} // Extend Passport's User type
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('🔍 Auth middleware - Session ID:', req.sessionID);
    console.log('🔍 Auth middleware - User:', req.user ? req.user.email : 'none');
    
    if (req.user) {
      // User is authenticated via session
      next();
    } else {
      console.log('❌ No user in session');
      res.status(401).json({ error: 'Not authenticated' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
};

// Admin middleware - checks if user is admin
export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!(req.user as IUser).isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ error: 'Authorization error' });
  }
};