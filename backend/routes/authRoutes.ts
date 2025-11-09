import express, { Request, Response } from 'express';
import passport from '../middlewhare/passport.js';

const router = express.Router();

// Google OAuth login
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google OAuth callback - FIXED REDIRECT URL
router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/login',
    session: true
  }),
  (req: Request, res: Response) => {
    try {
      // Successful authentication
      if (req.user) {
        const frontendURL = process.env.FE_URL || 'http://localhost:5173';
        console.log(`✅ Auth successful for user: ${req.user.email}`);
        console.log(`🔄 Redirecting to: ${frontendURL}/auth/google/callback`);
        
        // Redirect to frontend with success
        res.redirect(`${frontendURL}/auth/google/callback?success=true`);
      } else {
        console.error('❌ No user in request after auth');
        res.redirect(`${process.env.FE_URL}/login?error=no_user`);
      }
    } catch (error) {
      console.error('❌ Callback error:', error);
      res.redirect(`${process.env.FE_URL}/login?error=server_error`);
    }
  }
);

// Logout
router.post('/logout', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({ error: 'Session destruction failed' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });
});

// Get current user
router.get('/me', (req: Request, res: Response) => {
  console.log('🔍 Checking auth status, user:', req.user ? req.user.email : 'none');
  console.log('🔍 Session ID:', req.sessionID);
  
  if (req.user) {
    res.json({
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        picture: req.user.picture,
        isAdmin: req.user.isAdmin,
      },
    });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

export default router;