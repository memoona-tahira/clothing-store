import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User, IUser } from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.BE_URL || 'http://localhost:3000'}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('🔍 Google Strategy - Profile ID:', profile.id);
        
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });
        
        if (user) {
          console.log('✅ Existing user found:', user._id);
          return done(null, user);
        }

        // Create new user
        user = await User.create({
          googleId: profile.id,
          email: profile.emails?.[0]?.value || '',
          name: profile.displayName,
          picture: profile.photos?.[0]?.value || '',
          isAdmin: false, // Default to non-admin
        });
        
        console.log('✅ New user created:', user._id);
        return done(null, user);
      } catch (error) {
        console.error('❌ Google Strategy error:', error);
        return done(error as Error, undefined);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  console.log('📝 SERIALIZE USER ID:', user._id);
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  console.log('🔍 DESERIALIZE USER ID:', id);
  try {
    const user = await User.findById(id);
    
    if (user) {
      console.log('User found during deserialize:', user.email);
      done(null, user);
    } else {
      console.log('No user found with ID:', id);
      done(null, false);
    }
  } catch (error) {
    console.error('DESERIALIZE ERROR:', error);
    done(error as Error, false);
  }
});

export default passport;