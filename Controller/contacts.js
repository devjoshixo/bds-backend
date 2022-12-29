const Contacts = require("../Models/contacts");

//To display contacts
module.exports.display = async (req, res) => {
  const contacts = await Contacts.find({});
  res.send(contacts);
};

//To add a Contact
module.exports.addContact = async (req, res) => {
  const { serialNumber, name, mobile } = req.body;
  const newContact = new Contacts({
    serialNumber,
    name,
    mobile,
  });
  await newContact.save();
  res.send(newContact);
};
