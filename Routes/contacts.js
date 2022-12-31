const express = require("express");
const router = express.Router();
const contacts = require("../Controller/contacts");

router.route("/").get(contacts.display);
router.route("/add").post(contacts.addContact);
router.route("/edit/:id").put(contacts.editContact);
router.route("/delete/:id").delete(contacts.deleteContact);
router.route("/deleteall").delete(contacts.deleteAllContacts);

module.exports = router;
