const Contacts = require("../Models/contacts");
const { aggregate } = require("../Models/customfield");
const CustomFields = require("../Models/customfield");
const mongooseDynamic = require("mongoose-dynamic-schemas");
const { Schema } = require("mongoose");

//
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

//
//Get all contacts
module.exports.getAllContacts = async () => {
  const contacts = await Contacts.find({
    templateNo: { $ne: "" },
  });
  return contacts;
};

//
//To get messages to sendMessages
module.exports.getSelectedContacts = async (templateNo) => {
  console.log("getting contacts");
  const contacts = await Contacts.find({ templateNo: `${templateNo}` });
  return contacts;
};

//
//To add a Contact
module.exports.addContact = async (req, res) => {
  try {
    const newContact = new Contacts({
      ...req.body,
    });
    await newContact.save();
    res.status(200).json("Done");
  } catch (e) {
    console.log(e);
    res.status(409).json({ errorMessage: e });
  }
};

//
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

//
//To delete Contact
module.exports.deleteContact = async (req, res) => {
  try {
    const contacts = await req.body;
    await Contacts.deleteMany({ _id: { $in: contacts } });

    res.status(200).json("Successfully deleted");
  } catch (e) {
    res.status(409).json({ error: "Not found" });
  }
};

//
//Get all custom field details
module.exports.getCustomFields = async (req, res) => {
  const customfields = await CustomFields.find({});
  res.status(200).json(customfields);
};

//
//To get custom field title
module.exports.getCustomFieldsDetail = async (req, res) => {
  const customfields = await CustomFields.find({}).select("title");
  const customFields = customfields.map((fields) => {
    return fields.title;
  });
  res.send(customFields);
};

//
//Adding a custom field to contacts
module.exports.addCustomField = async (req, res) => {
  try {
    const { title, description, type } = await req.body;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date = new Date();
    var date =
      date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

    const newCustomField = new CustomFields({
      title,
      description,
      type,
      createdOn: date,
    });
    await newCustomField.save();
    res.sendStatus(200);
  } catch (e) {
    res.status(409).json({ error: "Already exists" });
  }
};

//
//To edit custom fieldx
module.exports.editCustomField = async (req, res) => {
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

//
//Deleting a custom field from contacts
module.exports.deleteCustomField = async (req, res) => {
  try {
    const id = await req.body.id;
    const title = await req.body.title;
    await CustomFields.findOneAndRemove({ _id: id });
    try {
      const deleteCustomField = await mongooseDynamic.removeSchemaField(
        Contacts,
        title
      );
    } catch (e) {
      console.log(e);
    }

    res.status(204).json(deleteCustomField);
  } catch (e) {
    res
      .status(400)
      .json({ errorMessage: "Error occured while deleting custom field" });
  }
};

module.exports.deleteAllcustom = async (req, res) => {
  const customfields = await CustomFields.find({});
  customfields.map(async (deleteCustomField) => {
    await mongooseDynamic.removeSchemaField(Contacts, deleteCustomField.title);
  });
  await CustomFields.deleteMany({});
  res.send("Deleted All");
};
