const request = require("request");
const Contacts = require("../Controller/contacts");
const Contact = require("../Models/contacts");
const Templates = require("../Controller/templates");
const http = require("http");
const { response } = require("express");

module.exports.sendScheduledMessages = async (templateNo) => {
  const contacts = await Contacts.getSelectedContacts(`${templateNo}`);
  const selectedTemplate = await Templates.getSelectedTemplate(templateNo);

  for (let i = 0; i < contacts.length; i++) {
    let msg = await evalBody(selectedTemplate["templatesBody"], contacts[i]);
    await sendWhatsapp1(
      contacts[i]["mobile"],
      msg,
      selectedTemplate["Attachment"],
      contacts[i]["_id"]
    );
  }
  return false;
};

module.exports.sendMessage = async (req, res) => {
  let startTime = new Date();
  const contacts = await Contacts.getAllContacts();

  for (let i = 0; i < contacts.length; i++) {
    const selectedTemplate = await Templates.getSelectedTemplate(
      contacts[i]["templateNo"]
    );
    let msg = await evalBody(selectedTemplate["templatesBody"], contacts[i]);
    await sendWhatsapp1(
      `${contacts[i]["mobile"]}`,
      msg,
      selectedTemplate["Attachment"],
      contacts[i]["_id"]
    );
  }
  let endTime = new Date();
  let elapsed = endTime - startTime;
  res.send(`${elapsed / 1000}`);
};

module.exports.sendWhatsapp1 = async (req, res) => {
  const messageBody = {
    username: "Gauravdembla26",
    password: "Shree1983",
    receiverMobileNo: "9871324442",
    message: ["Hello"],
  };
  messageBody = JSON.stringify(messageBody);
  var URL =
    "https://app.messageautosender.com/api/v1/message/create?username=Gauravdembla26&password=Shree1983";
  var options = {
    method: "post",
    contentType: "application/json",
    payload: msg,
  };
  await request(options, async (error, response) => {
    if (error) {
      throw new Error(error);
    }
    await statusSaver(JSON.parse(response.body), id);
  });
  return;
};

//To save status
const statusSaver = async (status, id) => {
  var userID = id.toString();
  var SentStatus = status.message;
  var SentReport = "Sent on " + new Date();
  await Contact.findOne({
    _id: userID,
  })
    .updateOne({ SentStatus: SentStatus, SentReport: SentReport })
    .then((doc) => doc)
    .catch((e) => console.log(e));
};

const evalBody = (body, vars) => {
  const keys = Object.keys(vars.toJSON());
  for (let i = 0; i < keys.length; i++) {
    body = body.replaceAll("{{" + keys[i] + "}}", vars[keys[i]]);
  }
  return body;
};
