var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("../models/User");


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use("local-signup", new LocalStrategy({ 
  usernameField: 'email',
  passReqToCallback: true,
}, (req, email, password, done) => {
  email = email.toLowerCase();

  User.findOne({ email: email }, function (err, user) {
    if(err) {
      return done(err);
    }

    if(user) {
      return done(null, false, { error: { status: 409, message: "EMAIL_TAKEN" } });
    } 

    var user = new User();
    user.email = email;
    user.password = password;
    user.profile.name = req.body.name;
    user.profile.gender = req.body.gender;
    user.profile.location = req.body.location;

    user.save((err) => {
      if(err) return done(err);
      else done(null, user);
    });
  })
}));

passport.use("local-login", new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, (req, email, password, done) => {
  email = email.toLowerCase();

  User.findOne({ email: email }, function (err, user) {
    if(err) return done(err);

    if(!user) return done(null, false, { error: { status: 401, message: "INVALID_CREDENTIALS" } });

    return done(null, user);
  })
}));