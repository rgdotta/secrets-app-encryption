//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

//routes
const login = require("./lib/routes/login");
const logout = require("./lib/routes/logout");
const register = require("./lib/routes/register");
const secrets = require("./lib/routes/secrets");
const auth = require("./lib/routes/auth");

const app = express();

app.use(express.static("public"));

app.set("views", path.join(__dirname + "/app/views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "randomWordIsRandom",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.set("useCreateIndex", true);

require('./lib/auth/authentication');

app.get("/", function (req, res) {
  res.render("home");
});

app.use("/login", login);
app.use("/logout", logout);
app.use("/register", register);
app.use("/secrets", secrets);
app.use("/auth", auth);

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
