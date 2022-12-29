const express = require("express");
const router = express.Router();
const contacts = require("../Controller/contacts");

router.route("/").get(contacts.display);
router.route("/add").post(contacts.addContact);

module.exports = router;
