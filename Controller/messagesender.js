const Contacts = require("../Controller/contacts");
module.exports.sendMessage = async (req, res) => {
  const contacts = Contacts.display();
};
