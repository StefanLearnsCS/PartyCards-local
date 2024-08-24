const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require("../models");

passport.use(new GoogleStrategy({
    clientID: id,
    clientSecret: key,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await Users.findOne({ where: { googleId: profile.id } });
      if (!user) {
        if (!profile.displayName) {
          throw new Error('Username is required');
        }
        user = await Users.create({
          username: profile.displayName,
          googleId: profile.id,
          password: null,
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
