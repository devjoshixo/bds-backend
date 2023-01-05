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

const sendWhatsapp1 = async (mobileno, msg, nonDriveFiles) => {
  var driveFiles = [];
  var messageBody = {
    username: "Gauravdembla26",
    password: "Shree1983",
    receiverMobileNo: mobileno,
    recipientIds: [""],
    message: [msg],
    filePathUrl: nonDriveFiles,
  };
  var URL = "https://app.autowapsender.com/api/v1/message/create";
  var options = {
    method: "post",
    contentType: "application/json",
    payload: messageBody,
  };
  const status = await fetch(URL, options);
  // const parsedStatus = await status.json();
  // console.log(parsedStatus);
  console.log(status);
  return status;
};

const evalBody = (body, vars) => {
  const keys = Object.keys(vars.toJSON());
  for (let i = 0; i < keys.length; i++) {
    body = body.replaceAll("{{" + keys[i] + "}}", vars[keys[i]]);
  }
  return body;
};
