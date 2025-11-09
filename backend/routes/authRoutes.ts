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

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    // Successful authentication
    if (req.session && req.sessionID) {
      // Send session ID as token to frontend
      const frontendURL = process.env.FE_URL || 'http://localhost:5173';
      console.log(`redirecting to ${frontendURL}`)
      res.redirect(`${frontendURL}/auth/callback?token=${req.sessionID}`);
    } else {
      res.redirect('/login?error=session');
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