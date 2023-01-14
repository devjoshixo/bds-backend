const Contacts = require("../Models/contacts");
const { aggregate } = require("../Models/customfield");
const CustomFields = require("../Models/customfield");
const mongooseDynamic = require("mongoose-dynamic-schemas");

//To display contacts
module.exports.display = async (req, res) => {
  try {
    const { startreq, endreq } = req.query;
    const contacts = await Contacts.find().skip(startreq).limit(endreq);
    console.log(contacts.length);
    res.send(contacts);
  } catch (e) {
    res
      .status(404)
      .json({ errorMessage: "Error occured while finding contact" });
  }
};

module.exports.getAllContacts = async () => {
  const contacts = await Contacts.find({
    templateNo: { $ne: "" },
  });
  return contacts;
};

//To get messages to sendMessages
module.exports.getSelectedContacts = async (templateNo) => {
  console.log("getting contacts");
  const contacts = await Contacts.find({ templateNo: `${templateNo}` });
  return contacts;
};

//To add a Contact
module.exports.addContact = async (req, res) => {
  try {
    const newContact = new Contacts({
      ...req.body,
    });
    await newContact.save();
    res.status(200).json(newContact);
  } catch (e) {
    console.log(e);
    res.status(409).json({ errorMessage: e });
  }
};

//To edit Contact
module.exports.editContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contactEdit = await Contacts.findByIdAndUpdate(id, {
      ...req.body,
    });
    await contactEdit.save();
    res.status(204).json(contactEdit);
  } catch (e) {
    res
      .status(404)
      .json({ errorMessage: "Error occured while editing contact" });
  }
};

//To delete Contact
module.exports.deleteContact = async (req, res) => {
  const contacts = await req.body;
  for (contact of contacts) {
    await Contacts.findByIdAndDelete(contact);
  }

  res.status(200).json("Successfully deleted");
};

//Deleting all the contacts
module.exports.deleteAllContacts = async (req, res) => {
  try {
    await Contacts.deleteMany({});
    res.status(204).json({ successMessage: "All contacts deleted" });
  } catch (e) {
    res
      .status(404)
      .json({ errorMessage: "Error occured while deleting contacts" });
  }
};

//Adding a custom field to contacts
module.exports.addCustomField = async (req, res) => {
  try {
    const { title, description, type } = req.body;
    const newCustomField = new CustomFields({
      title,
      description,
      type,
    });
    await newCustomField.save();
    if (type == "Text" || type == "Select") var customtype = "String";
    if (type == "MultiSelect") var customtype = "Array";
    await mongooseDynamic.addSchemaField(Contacts, title, {
      type: customtype,
      default: null,
    });
    res.status(200).json(newCustomField);
  } catch (e) {
    console.log(e);
    res.status(409).json({ errorMessage: "Try again after some time" });
  }
};

//Deleting a custom field from contacts
module.exports.deleteCustomField = async (req, res) => {
  try {
    const { id } = await req.params;
    const deleteCustomField = await CustomFields.findByIdAndDelete(id);
    await mongooseDynamic.removeSchemaField(Contacts, deleteCustomField.title);
    return res.status(204).json(deleteCustomField);
  } catch (e) {
    res
      .status(400)
      .json({ errorMessage: "Error occured while deleting custom field" });
  }
};
