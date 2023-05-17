const noteModel = require("../models/noteModel");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find().select("-password").lean();

  if (!users?.length) {
    return res.status(400).json({
      message: "No User Found",
    });
  }
  res.json(users);
});

const createUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !roles) {
    return res.status(400).json({
      message: "All Field Are Required",
    });
  }

  const duplicate = await userModel
    .findOne({
      username,
    })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(400).json({
      message: "Duplicate User",
    });
  }

  const hashPass = await bcrypt.hash(password, 10);

  const userObj = { username, password: hashPass, roles };

  const user = await userModel.create(userObj);

  if (!user) {
    res.status(400).json({
      message: "Invalid User Data",
    });
  }

  res.status(200).json({
    user,
    message: "User Created",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, password, active, roles } = req.body;

  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({
      message: "All Field Required !",
    });
  }

  const user = await userModel.findById(id).exec();

  if (!user) {
    return res.status(400).json({
      message: "User Not Found !",
    });
  }

  const duplicate = await userModel.findOne({ username }).lean().exec();

  if (duplicate && duplicate?._id.toHexString() !== id) {
    return res.status(409).json({
      message: "Duplicate User",
    });
  }

  user.username = username;
  user.roles = roles;
  user.password = password;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updateUser = await user.save();

  res.json({
    updateUser,
    message: "User Update",
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "User Id Required",
    });
  }

  const notes = await noteModel.findOne({ user: id }).lean().exec();

  if (notes?.length) {
    return res.status(400).json({
      message: "User has assigned notes",
    });
  }

  if (!user) {
    return res.status(400).json({
      message: "User Not Found !",
    });
  }

  const result = await user.deleteOne();

  const replay = `username ${result.username} with id ${result._id} deleted`;

  res.json({
    replay,
  });
});

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
