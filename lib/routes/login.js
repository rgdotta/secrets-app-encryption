const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/userSchema").User;

router.get("/", function (req, res) {
  res.render("login");
});

router.post("/", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
});

module.exports = router;