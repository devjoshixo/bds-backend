const jwt = require("jsonwebtoken");
const jsonSecret = "...";

module.exports = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("Please authenticate to generate a token");
  }
  try {
    const data = jwt.verify(token, jsonSecret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send("Please authenticate to generate a token");
  }
};
