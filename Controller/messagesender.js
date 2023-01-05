const { removeSchemaField } = require("mongoose-dynamic-schemas");
const Contacts = require("../Controller/contacts");
const Templates = require("../Controller/templates");

module.exports.sendMessage = async (req, res) => {
  const contacts = await Contacts.getSelectedContacts();

  for (let i = 0; i < contacts.length; i++) {
    const selectedTemplate = await Templates.getSelectedTemplate(
      contacts[i]["templateNo"]
    );
    let msg = await evalBody(selectedTemplate["templatesBody"], contacts[i]);
    let status = await sendWhatsapp1(
      `${contacts[i]["mobile"]}`,
      msg,
      selectedTemplate["Attachment"]
    );
    res.send("status");
  }
};

module.exports.sendWhatsapp1 = async (req, res) => {
  var driveFiles = [];
  var messageBody = {
    //  username: "Gauravdembla26",
    //  password: "Shree1983",
    receiverMobileNo: "9871324442",
    message: "Hello",
  };
  var URL =
    "https://app.messageautosender.com/api/v1/message/create?username=Gauravdembla26&password=Shree1983";
  var options = {
    method: "post",
    contentType: "application/json",
    payload: messageBody,
  };
  // console.log(options);
  const status = await fetch(URL, options);
  // const parsedStatus = await status.json();
  console.log(status);

  res.send(status);
  removeSchemaField;
};

const evalBody = (body, vars) => {
  const keys = Object.keys(vars.toJSON());
  for (let i = 0; i < keys.length; i++) {
    body = body.replaceAll("{{" + keys[i] + "}}", vars[keys[i]]);
  }
  return body;
};
