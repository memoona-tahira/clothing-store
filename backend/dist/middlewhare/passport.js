"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const userModel_js_1 = require("../models/userModel.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BE_URL || 'http://localhost:3000'}/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('🔍 Google Strategy - Profile ID:', profile.id);
        // Check if user already exists
        let user = await userModel_js_1.ClothingUser.findOne({ googleId: profile.id });
        if (user) {
            console.log('✅ Existing user found:', user._id);
            return done(null, user);
        }
        // Create new user
        user = await userModel_js_1.ClothingUser.create({
            googleId: profile.id,
            email: profile.emails?.[0]?.value || '',
            name: profile.displayName,
            picture: profile.photos?.[0]?.value || '',
            isAdmin: false, // Default to non-admin
        });
        console.log('✅ New user created:', user._id);
        return done(null, user);
    }
    catch (error) {
        console.error('❌ Google Strategy error:', error);
        return done(error, undefined);
    }
}));
passport_1.default.serializeUser((user, done) => {
    console.log('📝 SERIALIZE USER ID:', user._id);
    done(null, user._id);
});
passport_1.default.deserializeUser(async (id, done) => {
    console.log('🔍 DESERIALIZE USER ID:', id);
    try {
        const user = await userModel_js_1.ClothingUser.findById(id);
        if (user) {
            console.log('User found during deserialize:', user.email);
            done(null, user);
        }
        else {
            console.log('No user found with ID:', id);
            done(null, false);
        }
    }
    catch (error) {
        console.error('DESERIALIZE ERROR:', error);
        done(error, false);
    }
});
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map