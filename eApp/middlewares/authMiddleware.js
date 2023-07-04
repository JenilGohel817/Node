import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Admin Invalide Access !",
      error,
    });
  }
};

const testController = (req, res) => {
  res.send("Protected Route");
};

export { requireSignIn, testController, isAdmin };
