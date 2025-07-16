import passport from '../auth/passport.js';

const requireJwt = passport.authenticate('jwtAuth', { session: false });

export default requireJwt;
