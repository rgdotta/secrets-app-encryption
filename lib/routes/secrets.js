const express = require("express");
const router = express.Router();
const User = require("../models/userSchema").User;

router.get("/", function (req, res) {
  User.find({ secret: { $ne: null } }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        res.render("secrets", { userSecret: foundUser });
      }
    }
  });
});

router.get("/submit", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

router.post("/submit", function (req, res) {
  const submittedSecret = req.body.secret;

  User.findById(req.user.id, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        user.secret = submittedSecret;
        user.save(function () {
          res.redirect("/secrets");
        });
      }
    }
  });
});

module.exports = router;
