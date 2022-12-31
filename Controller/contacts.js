const Contacts = require("../Models/contacts");

//To display contacts
module.exports.display = async (req, res) => {
  const contacts = await Contacts.find({});
  res.send(contacts);
};

//To add a Contact
module.exports.addContact = async (req, res) => {
  try {
    const { name, mobile, email, membership } = req.body;
    const newContact = new Contacts({
      name,
      mobile,
      email,
      membership,
    });
    await newContact.save();
    res.send(newContact);
  } catch (e) {
    console.log(e);
    res.status(400).send("Email is already registered with the system");
  }
};

//To edit Contact
module.exports.editContact = async (req, res) => {
  const { id } = req.params;
  const { name, mobile } = req.body;
  const contactEdit = await Contacts.findByIdAndUpdate(id, {
    name,
    mobile,
  });
  await contactEdit.save();
  res.send(contactEdit);
};

//To delete Contact
module.exports.deleteContact = async (req, res) => {
  const { id } = await req.params;
  await Contacts.findByIdAndDelete(id);
  res.send("Contact deleted successfully");
};

module.exports.deleteAllContacts = async (req, res) => {
  await Contacts.deleteMany({});
  res.send("All contacts deleted");
};
