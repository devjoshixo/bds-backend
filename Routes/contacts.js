const express = require("express");
const router = express.Router();
const contacts = require("../Controller/contacts");

router.route("/").get(contacts.display);
router.route("/add").post(contacts.addContact);
router.route("/edit/:id").put(contacts.editContact);
router.route("/delete").delete(contacts.deleteContact);
// router.route("/deleteall").delete(contacts.deleteAllContacts);
router.route("/customfield").get(contacts.getCustomFieldsDetail);
router.route("/customfield/all").get(contacts.getCustomFields);
router.route("/customfield/new").post(contacts.addCustomField);
router.route("/customfield/edit").put(contacts.editCustomField);
router.route("/customfield/delete").delete(contacts.deleteCustomField);
router.route("/customfield/deleteall").delete(contacts.deleteAllcustom);

module.exports = router;
