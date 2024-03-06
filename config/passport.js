const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

let callbackURL;
if (process.env.NODE_ENV === 'production') {
  callbackURL = process.env.GOOGLE_CALLBACK_HEROKU;
} else {
  callbackURL = process.env.GOOGLE_CALLBACK;
}

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: callbackURL
    },
    async function(accessToken, refreshToken, profile, cb) {

        try {
            // user has logged in
            let user = await User.findOne({ googleId: profile.id });
            // existing user found, so provide it to passport
            if (user) return cb(null, user);
            // new user detected
            user = await User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            });
            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(async function(userId, cb) {
    cb(null, await User.findById(userId));
});