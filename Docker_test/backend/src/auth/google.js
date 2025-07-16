// google.js
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const options = {
  clientID: process.env.GOOGLE_ID || '',
  clientSecret: process.env.GOOGLE_SECRET || '',
  callbackURL: `${process.env.BE_BASE_URL}/api/auth/google/callback`,
};

async function verify(accessToken, refreshToken, profile, done) {
  try {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);

    const user = {
      id: profile.id,
      name: profile.displayName,
      email: profile.email?.[0]?.value,
      provider: profile.provider,
    };
    // let user = await User.findOne({
    //   where: {
    //     googleId: profile.id,
    //   },
    // });
    //
    //
    // if (!user) {
    //   user = await User.create({
    //     googleId: profile.id,
    //     email: profile.email?.[0]?.value,
    //     fullName: profile.displayName,
    //     jwtSecureCode: uuidv4(),
    //   });
    // }

    // auth the User
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

export default new GoogleStrategy(options, verify);
