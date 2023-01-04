const express = require("express");
const router = express.Router();
const templates = require("../Controller/templates");

router.route("/").get(templates.display);

module.exports = router;
