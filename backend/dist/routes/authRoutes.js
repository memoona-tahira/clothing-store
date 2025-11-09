"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_js_1 = __importDefault(require("../middlewhare/passport.js"));
const router = express_1.default.Router();
// Google OAuth login
router.get('/google', passport_js_1.default.authenticate('google', {
    scope: ['profile', 'email'],
}));
// Google OAuth callback
router.get('/google/callback', passport_js_1.default.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication
    if (req.session && req.sessionID) {
        // Send session ID as token to frontend
        const frontendURL = process.env.FE_URL || 'http://localhost:5173';
        res.redirect(`${frontendURL}/auth/callback?token=${req.sessionID}`);
    }
    else {
        res.redirect('/login?error=session');
    }
});
// Logout
router.post('/logout', (req, res) => {
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
router.get('/me', (req, res) => {
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
    }
    else {
        res.status(401).json({ error: 'Not authenticated' });
    }
});
exports.default = router;
//# sourceMappingURL=authRoutes.js.map