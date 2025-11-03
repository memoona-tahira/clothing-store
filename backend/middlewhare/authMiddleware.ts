import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/userModel.js';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    req.sessionStore.get(token, async (err: any, session: any) => {
      if (err || !session) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      if (session && session.passport && session.passport.user) {
        try {
          const { User } = await import('../models/userModel.js');
          const user = await User.findById(session.passport.user);
          
          if (user) {
            req.user = user; // Set user for route handlers
            next();
          } else {
            res.status(401).json({ error: 'User not found' });
          }
        } catch (dbError) {
          console.error('Database error:', dbError);
          res.status(500).json({ error: 'Database error' });
        }
      } else {
        res.status(401).json({ error: 'Invalid session' });
      }
    });
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

    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ error: 'Authorization error' });
  }
};