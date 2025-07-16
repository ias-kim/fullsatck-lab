// passport.js
import passport from 'passport';
import GoogleStrategy from './google.js';
import Strategy from './jwt.js';

passport.use('google', GoogleStrategy);

// initialize passport with Google and JWT strategies
passport.use('google', GoogleStrategy);
passport.use('jwtAuth', Strategy);

export default passport;
