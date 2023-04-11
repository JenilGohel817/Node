const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asyncHandlder = require("express-async-handler");
const user = require("../models/user");

const authToken = asyncHandlder(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode?.id);
      req.user = user;
      next();
    } catch (error) {
      throw new Error("Not Authorized Token, Please Login Again");
    }
  }
});

const isAdmin = asyncHandlder(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await user.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You Are Not Admin !");
  } else {
    next();
  }
});

module.exports = { authToken, isAdmin };
