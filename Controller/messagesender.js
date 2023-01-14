const request = require("request");
const Contacts = require("../Controller/contacts");
const Contact = require("../Models/contacts");
const Templates = require("../Controller/templates");

module.exports.sendScheduledMessages = async (templateNo) => {
  const contacts = await Contacts.getSelectedContacts(`${templateNo}`);
  const selectedTemplate = await Templates.getSelectedTemplate(templateNo);

  for (let i = 0; i < contacts.length; i++) {
    let msg = await evalBody(selectedTemplate["templatesBody"], contacts[i]);
    await sendWhatsapp(
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

    if (selectedTemplate["ButtonOption"]) {
      var msg = {
        title: await evalBody(selectedTemplate["Header"], contacts[i]),
        body: await evalBody(selectedTemplate["templatesBody"], contacts[i]),
        footer: await evalBody(selectedTemplate["Footer"], contacts[i]),
        templateButtons: selectedTemplate["Buttons"]["button"].map((btn) => {
          if (btn.text) {
            btn.text = evalBody(btn.text, contacts[i]);
          }
          return btn;
        }),
      };

      await sendWhatsappbutton(
        `${contacts[i]["mobile"]}`,
        msg,
        selectedTemplate["Attachment"],
        contacts[i]["_id"]
      );
    } else {
      var msg = await evalBody(selectedTemplate["templatesBody"], contacts[i]);

      await sendWhatsapp(
        `${contacts[i]["mobile"]}`,
        // JSON.stringify(msg),
        msg,
        selectedTemplate["Attachment"],
        selectedTemplate["SendType"],
        contacts[i]["_id"]
      );
    }
  }
  let endTime = new Date();
  let elapsed = endTime - startTime;
  res.send(`${elapsed / 1000}`);
};

<<<<<<< HEAD
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
=======
//to send buttons
const sendWhatsappbutton = async (phone, msg, Attachment, id) => {
  var messageBody = {
    username: "Gauravdembla26",
    password: "Shree1983",
    receiverMobileNo: phone,
    recipientIds: [""],
    message: [],
    templateButtons: [msg],
    filePathUrl: [Attachment],
  };

  var options = {
    method: "POST",
    url: "https://app.messageautosender.com/api/v1/message/create",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageBody),
>>>>>>> 335c18e851ebc782b000c4af2b0d3711bb1b9987
  };

  request(options, function (error, response) {
    if (error) {
      throw new Error(error);
    } else {
      console.log(response.body);
      statusSaver(JSON.parse(response.body), id);
    }
  });
  return;
};

//to send without buttons
const sendWhatsapp = async (phone, msg, Attachment, temtype, id) => {
  var messageBody = {
    username: "Gauravdembla26",
    password: "Shree1983",
    receiverMobileNo: phone,
    recipientIds: [""],
    message: [msg],
    filePathUrl: [Attachment],
  };
  if (temtype == "Caption") {
    messageBody.caption = [msg];
  } else {
    messageBody.message = [msg];
  }

  var options = {
    method: "POST",
    url: "https://app.messageautosender.com/api/v1/message/create",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageBody),
  };

  request(options, function (error, response) {
    if (error) {
      throw new Error(error);
    } else {
      console.log(response.body);
      statusSaver(JSON.parse(response.body), id);
    }
  });
  return;
};

//To save status
const statusSaver = async (status, id) => {
  var userID = id.toString();
  var SentStatus = status.message || status.status + " " + status.error;
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
    body = body.replaceAll("<<" + keys[i] + ">>", vars[keys[i]]);
  }
  return body;
};
