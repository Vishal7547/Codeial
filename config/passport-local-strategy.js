const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      // find a user and establish identity
      try {
        const data = await User.findOne({ email: email });
        if (!data || data.password != password) {
          req.flash("error", "invalid username/password");
          return done(null, false);
        }
        return done(null, data);
      } catch (e) {
        req.flash("error", e);
        return done(e);
      }
    }
  )
);

// serializing the user to decide which key is to kept in the cookies
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// deserialize the user from the key in the cookies
passport.deserializeUser(async (id, done) => {
  try {
    const data = await User.findById(id);

    return done(null, data);
  } catch (e) {
    console.log("error in passport.deserializeUser", e);
    return done(e);
  }
});

// check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
  // if the user is sign-in the pass the request to the next function (controllers action)

  if (req.isAuthenticated()) {
    return next();
  }
  // if the user is nit sign-in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
