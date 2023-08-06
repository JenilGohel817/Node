import jwt from "jsonwebtoken";

const requiredSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
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

export default requiredSignIn;
