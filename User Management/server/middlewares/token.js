import jwt from "jsonwebtoken";

const generateToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { generateToken };
