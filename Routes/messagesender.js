const express = require("express");
const router = express.Router();
const MessageSender = require("../Controller/messagesender");

router.route("/").post(MessageSender.sendWhatsapp1);

module.exports = router;
