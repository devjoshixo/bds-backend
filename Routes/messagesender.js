const express = require("express");
const router = express.Router();
const MessageSender = require("../Controller/messagesender");

router.route("/").post(MessageSender.sendMessage);

module.exports = router;
