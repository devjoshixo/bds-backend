const express = require("express");
const router = express.Router();
const MessageSender = require("../Controller/templates");

router.route("/sendMessage").post(MessageSender.sendMessage);

module.exports = router;
