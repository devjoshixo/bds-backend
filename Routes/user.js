const express = require("express");
const router = express.Router();
const User = require("../Controller/user");
const fetchuser = require("../middleware/fetchuser");

router.route("/register").post(User.createUser);
router.route("/login").post(User.login);
router.route("/getuser").get(fetchuser, User.getUserDetails);

module.exports = router;
