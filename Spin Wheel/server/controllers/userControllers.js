import userModel from "../model/userModel.js";

const userAdd = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username Not Found!",
        success: false,
      });
    }

    const findUser = await userModel.findOne({ username });

    if (findUser) {
      return res.status(400).json({
        message: "Username already exist",
        success: false,
      });
    }

    const user = await new userModel({
      username,
    }).save();

    return res.status(201).send({
      message: "Username Added!",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Username Not Added!",
      success: false,
      error,
    });
  }
};

const userUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username Not Found!",
        success: false,
      });
    }

    if (!id) {
      return res.status(400).json({
        message: "Id not found",
        success: false,
      });
    }

    const findUser = await userModel.findOne({ username });

    if (findUser) {
      return res.status(400).json({
        message: "Username already exist",
        success: false,
      });
    }

    const userUpdate = await userModel.findByIdAndUpdate(
      id,
      {
        username: username,
      },
      {
        new: true,
      }
    );

    const user = await userUpdate.save();

    return res.status(200).send({
      message: "Username Updated!",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Username Not Updated!",
      success: false,
      error,
    });
  }
};

const userDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const userDelete = await userModel.findByIdAndDelete(id);

    if (!userDelete) {
      return res.status(401).json({
        message: "Username Not Found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Username Deleted!",
      success: true,
      userDelete,
    });
  } catch (error) {
    return res.status(400).send({
      message: "User Not Deleted!",
      success: false,
      error,
    });
  }
};

const userFind = async (req, res) => {
  try {
    const user = await userModel.find({});

    if (!user) {
      return res.status(400).json({
        message: "Username not added!",
        success: false,
        error,
      });
    }

    return res.status(200).send({
      message: "Username fetch!",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Error In Fetch!",
      success: false,
      error,
    });
  }
};

const userSingle = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(401).json({
        message: "Username Not Found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Username Fetch!",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Error In Fetch!",
      success: false,
      error,
    });
  }
};

export { userAdd, userUpdate, userFind, userDelete, userSingle };
