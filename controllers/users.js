var passport = require("passport");
var User = require("../models/User");

exports.getLogin = function (req, res, next) {
  if(!req.user) res.render('login');
};

exports.getSignup = function (req, res, next) {
  if(!req.user) res.render('signup');  
};

exports.login = function (req, res, next) {
  passport.authenticate("local-login", function (err, user, info) {
    if(err) return next(err);

    if(!user) res.status(info.error.status).send(info.error.message)
    if(user) {
      req.logIn(user, (err) => {
        if(err) next(err);
        else res.redirect("/");
      });
    }
  })(req, res, next);
};

exports.signup = function (req, res, next) {
  passport.authenticate("local-signup", (err, user, info) => {
    if(err) return next(err);

    if(!user) res.status(info.error.status).send(info.error.message);
    if(user) {
      req.logIn(user, err => {
        if(err) next(err);
        else res.redirect("/");
      })
    }
  })(req, res, next);
};