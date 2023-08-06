import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authUser from "../models/authModel.js";

const authRegister = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      friends,
      location,
      picture,
      occupation,
      viewedProfile,
      impressions,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);

    const newUser = new authUser({
      firstname,
      lastname,
      email,
      password: passwordHashed,
      picture,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(400).json({
      message: "User Not Created !",
      success: false,
    });
  }
};

const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authUser.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { authRegister, authLogin };
