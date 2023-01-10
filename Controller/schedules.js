const Schedules = require("../Models/schedules");
const Message = require("./messagesender");
module.exports.display = (req, res) => {
  res.send("Displaying Schedules");
};

module.exports.setup = (req, res) => {
  res.send("Setup Schedule");
};

module.exports.getsetupandsend = async () => {
  const schedules = await Schedules.find({ active: true });
  for (let i = 0; i < schedules.length; i++) {
    var d = new Date();
    if (Math.abs(d.getTime() - schedules[i]["date"].getTime()) / 1000 <= 5) {
      await Message.sendScheduledMessages(schedules[i]["templateNo"]);
      await makeScheduleInactive(false, schedules[i]["_id"]);

      console.log("schedule finding");
    }
    continue;
  }
};

const makeScheduleInactive = async (active, id) => {
  var userID = id.toString();
  await Schedules.findOne({
    _id: userID,
  })
    .updateOne({ active: active })
    .then((doc) => doc)
    .catch((e) => console.log(e));
};
