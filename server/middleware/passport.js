const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require("../models");

const MAX_USERNAME_LENGTH = 17;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await Users.findOne({ where: { googleId: profile.id } });
      if (!user) {
        if (!profile.displayName) {
          throw new Error('Username is required');
        }

        const uniqueId = Math.floor(1000 + Math.random() * 9000);
        const baseUsername = profile.displayName.replace(/\s+/g, '').slice(0, MAX_USERNAME_LENGTH - 5);
        const username = `${baseUsername}#${uniqueId}`;

        const email = profile.emails && profile.emails[0] && profile.emails[0].value ? profile.emails[0].value : null;
        if (!email) {
          throw new Error('Email is required');
        }

        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
          throw new Error('Username already exists, please try again');
        }

        user = await Users.create({
          username: username,
          googleId: profile.id,
          email: email,
          password: process.env.userPasses,
        });
      }
      return done(null, user);
    } catch (error) {
      console.error('Error during user creation:', error);
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
