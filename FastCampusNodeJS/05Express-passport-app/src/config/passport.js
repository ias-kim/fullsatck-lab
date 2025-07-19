const dotenv = require('dotenv');
dotenv.config();

const passport = require('passport');
const User = require('../models/users.model.js');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// req.login(user)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// client -> session -> requset
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const localStrategyConfig = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLocaleLowerCase() });

      if (!user) {
        return done(null, false, { msg: `Email ${email} not found` });
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);

        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: `Invalid email or password.` });
      });
    } catch (err) {
      return done(err);
    }
  },
);
passport.use('local', localStrategyConfig);

const googleClientID = process.env.GOOGLE_ID;
const googleClientSecret = process.env.GOOGLE_SECRET;
const googleStrategyConfig = new GoogleStrategy(
  {
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/api/auth/callback',
    scope: ['email', 'profile'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = new User();
      user.email = profile.email[0].values;
      user.googleId = profile.id;

      const saveUser = await user.save();
      return done(null, saveUser);
    } catch (err) {
      return done(err);
    }
  },
);
passport.use('google', googleStrategyConfig);
