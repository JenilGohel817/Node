import authModel from "../models/authModel.js";
import { hashPassword, comparePassword } from "../middlewares/bcrypt.js";
import JWT from "jsonwebtoken";

const loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        message: "All fields are required!",
        success: false,
      });
    }

    const user = await authModel.findOne({ email });

    if (!user) {
      res.status(404).send({
        message: "User allready login!",
        success: false,
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

    const userLog = {
      name: user.name,
      email: user.email,
    };

    if (userLog) {
      res.cookie(user._id, { expire: 400000 + Date.now() });
    }

    res.status(200).send({
      success: true,
      message: "Login successfully !",
      userLog,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error In Login!",
      success: false,
      error,
    });
  }
};

const registerAuth = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(404).send({
        message: "All fields are required!",
        success: false,
      });
    }

    const userLogin = await authModel.findOne({ email });

    if (!userLogin) {
      res.status(404).send({
        message: "User allready login!",
        success: false,
      });
    }

    const bcryptPassword = await hashPassword(password);

    const userRegister = await new authModel({
      name,
      email,
      password: bcryptPassword,
    }).save();

    if (userRegister) {
      res.cookie(userLogin._id, { expire: 400000 + Date.now() });
    }

    res.status(201).send({
      success: true,
      message: "user register !",
      userRegister,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error In Login!",
      success: false,
      error,
    });
  }
};

const logoutAuth = async (req, res) => {
  try {
    const paramId = req.param.id;

    const userLogout = await authModel.findOne(paramId);

    console.log(userLogout);

    if (userLogout) {
      res.clearCookie(userLogout._id, { expire: 400000 + Date.now() });
    }

    res.status(200).send({
      message: "User logout!",
      success: true,
      userLogout,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error In Logout!",
      success: false,
      error,
    });
  }
};

export { loginAuth, registerAuth, logoutAuth };
