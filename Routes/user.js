const express = require("express");
const router = express.Router();
const User = require("../Controller/user");
const passport = require("passport");

router.route("/register").post(User.createUser);
router.route("/login").post(
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/",
  }),
  User.login
);
router.route("/logout").get(User.logoutUser);

module.exports = router;
