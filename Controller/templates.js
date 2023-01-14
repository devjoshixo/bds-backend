const Templates = require("../Models/templates");

module.exports.display = async (req, res) => {
  const templates = await Templates.find({});
  res.status(200).json(templates);
};

module.exports.getSelectedTemplate = async (templateNo) => {
  const selectedTemplate = await Templates.find({ templateNo: 2 });
  return selectedTemplate[0];
};
