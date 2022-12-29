const express = require("express");
const router = express.Router();
const schedules = require("../Controller/schedules");

router.route("/").get(schedules.display).post(schedules.setup);

module.exports = router;
