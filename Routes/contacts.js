const express = require("express");
const router = express.Router();
const contacts = require("../Controller/contacts");

router.route("/").get(contacts.displayQuery);
router.route("/:id").get(contacts.displayQuery);
router.route("/add").post(contacts.addContact);
router.route("/edit/:id").put(contacts.editContact);
router.route("/delete/:id").delete(contacts.deleteContact);
router.route("/deleteall").delete(contacts.deleteAllContacts);
router.route("/customfield/new").post(contacts.addCustomField);
router.route("/customfield/delete/:id").delete(contacts.deleteCustomField);

module.exports = router;
