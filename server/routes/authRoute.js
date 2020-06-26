const mongoose = require("mongoose");
const passport = require("passport");
const {
    generateAccessToken,
    respond,
    authenticate
  } = require("../middleware/authmiddleware");

const User = require("../models/User");

module.exports = (app) => {
  // '/account/register'   ---Register
  app.post("/account/register", (req, res) => {
    User.register(
      new User({ username: req.body.email }),
      req.body.password,
      function (err, account) {
        if (err) {
          res.send(err);
        }
        passport.authenticate("local", { session: false })(req, res, () => {
          res.status(200).send("successfull created account");
        });
      }
    );
  });

  // '/account/login' ---Login
  app.post(
    "/account/login",
    passport.authenticate("local", { session: false, scope: [] }),
    generateAccessToken,
    respond
  );

// '/account/me' -- Get the current user
  app.get("/account/me", authenticate, (req, res) => {
    res.status(200).json(req.user);
  });
};
