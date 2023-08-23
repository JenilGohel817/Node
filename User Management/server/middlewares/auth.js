import userModel from "../models/authModel.js";

const auth = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decode?.id);
      req.user = user;
      next();
    } catch (error) {
      throw new Error("Not Authorized Token, Please Login Again");
    }
  }
  next();
};

export { auth };
