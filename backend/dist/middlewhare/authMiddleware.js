"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.authMiddleware = void 0;
const userModel_js_1 = require("../models/userModel.js");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const token = authHeader.substring(7);
        req.sessionStore.get(token, async (err, session) => {
            if (err || !session) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            if (session && session.passport && session.passport.user) {
                try {
                    const user = await userModel_js_1.ClothingUser.findById(session.passport.user);
                    if (user) {
                        req.user = user; // Type assertion
                        next();
                    }
                    else {
                        res.status(401).json({ error: 'User not found' });
                    }
                }
                catch (dbError) {
                    console.error('Database error:', dbError);
                    res.status(500).json({ error: 'Database error' });
                }
            }
            else {
                res.status(401).json({ error: 'Invalid session' });
            }
        });
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ error: 'Authentication error' });
    }
};
exports.authMiddleware = authMiddleware;
// Admin middleware - checks if user is admin
const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        if (!req.user.isAdmin) {
            return res.status(403).json({ error: 'Access denied. Admin only.' });
        }
        next();
    }
    catch (error) {
        console.error('Admin middleware error:', error);
        res.status(500).json({ error: 'Authorization error' });
    }
};
exports.adminMiddleware = adminMiddleware;
//# sourceMappingURL=authMiddleware.js.map