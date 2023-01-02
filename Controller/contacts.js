const Contacts = require("../Models/contacts");

//To display contacts
module.exports.display = async (req, res) => {
  const contacts = await Contacts.find({});
  res.status(200).json(contacts);
};

//To add a Contact
module.exports.addContact = async (req, res) => {
  try {
    const { name, mobile, email } = req.body;
    const newContact = new Contacts({
      name,
      mobile,
      email,
    });
    await newContact.save();
    res.status(200).json(newContact);
  } catch (e) {
    console.log(e);
    res
      .status(409)
      .json({ errorMessage: "Email is already registered with the system" });
  }
};

//To edit Contact
module.exports.editContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mobile } = req.body;
    const contactEdit = await Contacts.findByIdAndUpdate(id, {
      name,
      mobile,
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
  try {
    const { id } = await req.params;
    const deleteContact = await Contacts.findByIdAndDelete(id);
    res.status(204).json(deleteContact);
  } catch (e) {
    res
      .status(404)
      .json({ errorMessage: "Error occured while deleting contact" });
  }
};

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
