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

//To edit Contact
module.exports.editContact = async (req, res) => {
  const { id } = req.params;
  const { name, mobile } = req.body;
  const contactEdit = await Contacts.findByIdAndUpdate(id, {
    name,
    mobile,
  });
  let savingContact = await contactEdit.save();
  res.send(contactEdit);
};

//To delete Contact
module.exports.deleteContact = async (req, res) => {
  const { id } = await req.params;
  const delContact = await Contacts.findByIdAndDelete(id);
  res.send("Contact deleted successfully");
};
