import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/hashPassword.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";

const registerController = async (req, res) => {
  try {
    const { name, password, email, phone, address, answer } = req.body;

    if (!name || !password || !email || !phone || !address || !answer) {
      return res.send({
        message: "All fields are required",
      });
      console.log("All fields are required");
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.send({
        success: true,
        message: "Already User Login",
      });
    }

    const bcryptPassword = await hashPassword(password);

    const newUser = await new userModel({
      name,
      email,
      phone,
      address,
      answer,
      password: bcryptPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "user register !",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Register Form !",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not found !",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(404).send({
        success: false,
        message: "password not match !",
      });
    }

    const token = await JWT.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const loginUser = {};

    res.status(200).send({
      success: true,
      message: "Login successfully !",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });

    console.log(loginUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Login Form !",
      error,
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    console.log(email, answer, newPassword);

    if (!email || !answer || !newPassword) {
      res.status(500).send({
        success: false,
        message: "All Field Requird !",
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Not added !",
      });
    }

    const hash = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, {
      password: hash,
    });

    res.status(200).send({
      success: true,
      message: "password Change !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      error,
    });
  }
};

const userprofileUpdate = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    if (password && password.length < 6) {
      return res.json({ error: "Password length Bigger" });
    }

    const hashedaPassword = password ? await hashPassword(password) : undefined;

    const update = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedaPassword || user.password,
        address: address || user.address,
        phone: phone || user.phone,
      },
      {
        new: true,
      }
    );
    res.status(201).send({
      message: "Profile Updated !",
      success: true,
      update,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Not Update Profile",
      success: false,
      error,
    });
  }
};

const orderController = async (req, res) => {
  try {
    const order = await orderModel
      .find({
        buyer: req.user._id,
      })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(order);
  } catch (error) {
    console.log(error);
  }
};

export {
  registerController,
  loginController,
  forgetPassword,
  userprofileUpdate,
  orderController,
};
