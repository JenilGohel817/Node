import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../middleware/hashPassword.js";
import jwt from "jsonwebtoken";

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const photo = req.file;

    if (!username || !email || !password || !photo) {
      res.status(400).send({
        success: false,
        message: "All Fields Are Required !",
      });
    }

    const allreadyLogin = await userModel.findOne({ email });

    if (allreadyLogin) {
      res.status(400).send({
        success: false,
        message: "User Is Already Login !",
      });
    }

    const hashedPassword = await hashPassword(password);

    // Transfer Buffer Data Into Base64
    // const fileData = photo.buffer.toString("base64");

    const registerUser = await new userModel({
      username,
      email,
      password: hashedPassword,
      photo: photo.path,
    }).save();

    res.status(201).send({
      success: true,
      message: "user register !",
      registerUser,
    });

    console.log(registerUser);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error In User Register !",
      error,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "All Fields Are Required !",
        success: false,
      });
    }

    const findEmail = await userModel.findOne({ email });

    console.log(findEmail);

    if (!findEmail) {
      return res.status(400).send({
        message: "Email is not found !",
        success: false,
      });
    }

    const matchPassword = comparePassword(password, findEmail.password);

    if (!matchPassword) {
      return res.status(404).send({
        success: false,
        message: "password not match !",
      });
    }

    const token = await jwt.sign(
      {
        _id: findEmail._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    console.log(token);

    return res.status(201).send({
      success: true,
      message: "Login successfully !",
      user: {
        email: email,
        password: password,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Login User !",
      error,
    });
  }
};

const userFetch = async (Req, res) => {
  try {
    const fetch = await userModel.find({});

    if (!fetch) {
      return res.status(400).send({
        success: false,
        message: "No Data Found !",
      });
    }

    return res.status(200).send({
      message: "All User Fetch !",
      success: true,
      fetch,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error In Fetching User !",
      error,
    });
  }
};

const userImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const product = await userModel
      .findById(req.params.imageId)
      .select("photo");

    res.status(200).send({
      success: true,
      message: "Image Founded !",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Image Not Fetch !",
      success: false,
      error,
    });
  }
};

const userDelete = async (req, res) => {
  try {
    const userFind = req.params.id;

    const userDel = await userModel.findByIdAndDelete({ _id: userFind });

    if (!userDel) {
      return res.status(400).send({
        message: "Not Deleted User !",
        success: false,
      });
    }

    return res.status(200).send({
      userDel,
      message: "User Deleted !",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "User Not Deleted !",
      error,
      success: false,
    });
  }
};

const userUpdate = async (req, res) => {
  try {
    const userFind = req.params.id;

    const { username, password, email } = req.body;
    const photo = req.file;

    const hashedPassword = await hashPassword(password);

    const findUpdateUser = await userModel.findByIdAndUpdate(
      userFind,
      {
        username: username,
        password: hashedPassword,
        email: email,
        photo: photo.path,
      },
      {
        new: true,
      }
    );

    res.status(200).send({
      message: "User Updated !",
      success: true,
      findUpdateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error,
      message: "Error In Update !",
      success: false,
    });
  }
};

export {
  userRegister,
  userLogin,
  userFetch,
  userImage,
  userDelete,
  userUpdate,
};
