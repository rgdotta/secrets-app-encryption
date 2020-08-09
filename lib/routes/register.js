const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/userSchema").User;

router.get("/", function (req, res) {
  res.render("register");
});

router.post("/", function (req, res) {
  User.register({ username: req.body.username }, req.body.password, function (
    err,
    user
  ) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
});

module.exports = router;
