const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jsonSecret = process.env.SECRET;
module.exports.createUser = async (req, res) => {
  try {
    let success = false;
    //Refactoring body arguements
    const { username, email, password } = req.body;
    let user = await User.findOne({ email: email });

    //Checking if the user with given email already exists or not
    if (user)
      return res.status(400).json({
        success,
        errorMessage: "A user is already registered with that email address",
      });

    //Hashing password to protect it from attackers
    const salt = await bcrypt.genSalt(12);
    const securedPassword = await bcrypt.hash(password, salt);

    //Creating user
    user = await User.create({
      username: username,
      password: securedPassword,
      email: email,
    });

    //Creating auth token and sending response to the user
    const data = {
      user: {
        id: user.id,
      },
    };

    const jwtToken = jwt.sign(data, jsonSecret);
    success = true;
    res.status(200).json({ success, authToken: jwtToken });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: "Error occured while registering." });
  }
};
module.exports.login = async (req, res) => {
  try {
    //Success will be true if login is successful.
    let success = false;

    //Refactoring body arguements
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    //Checking if the user with given email already exists or not
    if (!user)
      return res
        .status(400)
        .json({ errorMessage: "Username or password may be incorrect" });

    //Comparing passwords
    const passwordCompare = await bcrypt.compare(password, user.password);

    //Checking if the password is wrong
    if (!passwordCompare)
      return res.status(400).json(success, {
        errorMessage: "Username or password may be incorrect",
      });

    //Logging in User and sending back response.
    const data = {
      user: {
        id: user.id,
      },
    };
    const jwtToken = jwt.sign(data, jsonSecret);
    success = true;
    res.status(200).json({ success, authToken: jwtToken });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: "Error occured while login." });
  }
};
module.exports.logoutUser = async (req, res) => {};
module.exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ errorMessage: "User not found" });
  }
};
