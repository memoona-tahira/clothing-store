import express, { Request, Response } from 'express';
import passport from '../middlewhare/passport.js';
import jwt from 'jsonwebtoken';
import { ClothingUser } from '../models/userModel.js';

const router = express.Router();

// Google OAuth login
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google OAuth callback with JWT
router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/login',
    session: false // Disable session for JWT
  }),
  (req: Request, res: Response) => {
    try {
      // Type assertion for req.user
      const user = req.user as any;
      
      if (user) {
        const frontendURL = process.env.FE_URL || 'http://localhost:5173';
        console.log(`✅ Auth successful for user: ${user.email}`);
        
        // Create JWT token
        const token = jwt.sign(
          { 
            userId: user._id.toString(),
            email: user.email,
            isAdmin: user.isAdmin 
          }, 
          process.env.JWT_SECRET || 'fallback_jwt_secret', 
          { expiresIn: '7d' }
        );
        
        console.log(`🔐 JWT Token created for user: ${user.email}`);
        
        // Redirect with token
        res.redirect(`${frontendURL}/?auth_success=true&token=${token}`);
      } else {
        console.error('❌ No user in request after auth');
        res.redirect(`${process.env.FE_URL}/?error=no_user`);
      }
    } catch (error) {
      console.error('❌ Callback error:', error);
      res.redirect(`${process.env.FE_URL}/?error=server_error`);
    }
  }
);

// Logout (simple for JWT - just clear token on frontend)
router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
});

// Get current user using JWT
router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_jwt_secret') as any;
    
    // Find user by ID from token
    const user = await ClothingUser.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    console.log('✅ JWT Auth successful for user:', user.email);
    
    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('❌ JWT Auth error:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired' });
    }
    
    res.status(500).json({ error: 'Authentication error' });
  }
});

export default router;