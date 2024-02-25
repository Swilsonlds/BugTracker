const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log("Received profile:", profile);
    return done(null, profile);
}
));

passport.serializeUser(function(user, done)  {
    done(null, user);
})

passport.deserializeUser(function(user, done)  {
    done(null, user);
})