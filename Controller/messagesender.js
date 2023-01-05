const fetches = require("node-fetch");
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
    let status = await sendWhatsapp1(
      `${contacts[i]["mobile"]}`,
      msg,
      selectedTemplate["Attachment"]
    );
    res.send("status");
  }
};

module.exports.sendWhatsapp1 = async (req, res) => {
  const messageBody = {
    username: "Gauravdembla26",
    password: "Shree1983",
    receiverMobileNo: "9871324442",
    message: ["Hello"],
  };

  // fetch("https://app.messageautosender.com/api/v1/message/create", {
  //   method: "POST",
  //   body: messageBody,
  // })
  //   .then((response) => {
  //     response.json();
  //     console.log(response);
  //   })
  //   .then((json) => console.log(json));
  const msg = JSON.stringify(messageBody);
  console.log(msg);
  var URL = "https://app.messageautosender.com/api/v1/message/create";
  // var URL = "https://api.adviceslip.com/advice";
  const options = {
    method: "POST",
    contentType: "application/json",
    payload: msg,
  };
  const opt = JSON.stringify(options);
  try {
    console.log(options);
    var sendStatus = await fetches(URL, options);
    // console.log(sendStatus);
    res.send(sendStatus);
  } catch (e) {
    var sendStatus = e;
    res.send(sendStatus);
  }
  // console.log(status);
  // const stat = await fetch(URL);
  // console.log(status);
  res.send(sendStatus);
};

const evalBody = (body, vars) => {
  const keys = Object.keys(vars.toJSON());
  for (let i = 0; i < keys.length; i++) {
    body = body.replaceAll("{{" + keys[i] + "}}", vars[keys[i]]);
  }
  return body;
};
