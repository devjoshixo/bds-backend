const express = require("express");
const router = express.Router();
const templates = require("../Controller/templates");

router.route("/").get(templates.display).post(templates.add);

module.exports = router;
