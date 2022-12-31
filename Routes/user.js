const express = require("express");
const router = express.Router();
const User = require("../Controller/user");

router.route("/register").post(User.createUser);
router.route("/login").post(User.login);
router.route("/logout").get(User.logoutUser);

module.exports = router;
