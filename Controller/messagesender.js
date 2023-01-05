const request = require("request");
const Contacts = require("../Controller/contacts");
const Templates = require("../Controller/templates");
const http = require("http");
const { response } = require("express");

module.exports.sendMessage = async (req, res) => {
  const contacts = await Contacts.getSelectedContacts();

  for (let i = 0; i < contacts.length; i++) {
    const selectedTemplate = await Templates.getSelectedTemplate(
      contacts[i]["templateNo"]
    );
    let msg = await evalBody(selectedTemplate["templatesBody"], contacts[i]);
    const status = await sendWhatsapp1(
      `${contacts[i]["mobile"]}`,
      msg,
      selectedTemplate["Attachment"]
    );
    res.send(status);
  }
};

const sendWhatsapp1 = async (phone, msg, Attachment) => {
  var arr = [];
  var options = {
    method: "POST",
    url: "https://app.messageautosender.com/api/v1/message/create/",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Gauravdembla26",
      password: "Shree1983",
      receiverMobileNo: phone,
      message: [msg],
    }),
  };
  const status = await request(options, async (error, response) => {
    if (error) {
      throw new Error(error);
    }
    return await response.body;
  });
  return status;
};

const evalBody = (body, vars) => {
  const keys = Object.keys(vars.toJSON());
  for (let i = 0; i < keys.length; i++) {
    body = body.replaceAll("{{" + keys[i] + "}}", vars[keys[i]]);
  }
  return body;
};
