import { userModel } from "../models/userModel.js";
import slugify from "slugify";

const userCreate = async (req, res) => {
  try {
    const { name, email, gender, number } = req.body;
    console.log(
      "=========================================>",
      req.file.filename
    );
    const photo = req.file.filename;

    if (!name || !email || !gender || !number || !photo) {
      return res.status(404).send({
        message: "All fields are required!",
        success: false,
      });
    }

    const findEmail = await userModel.findOne({ email });

    if (findEmail) {
      return res
        .status(404)
        .send({ message: "User Allready Login!", success: false });
    }

    if (!photo && photo.size > 1000000) {
      res.status(500).send({
        message: "photo required & less then 1mb",
        success: false,
      });
    }

    if (!["Male", "Female", "Other"].includes(req.body.gender)) {
      res.status(500).send({
        message: "Gender invalid!",
        success: false,
      });
    }

    const user = await new userModel({
      name,
      email,
      gender,
      number,
      photo: photo,
      slug: slugify(name),
    }).save();

    return res.status(200).send({
      message: "User added!",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "User error!",
      success: false,
      error,
    });
    console.log(error);
  }
};

const userUpdate = async (req, res) => {
  try {
    const paramId = req.params.id;

    const { name, email, gender, number } = req.body;

    if (!name || !email || !gender || !number) {
      return res.status(404).send({
        message: "All fields are required!",
        success: false,
      });
    }

    console.log("=========================>", "2");

    if (!["Male", "Female", "Other"].includes(req.body.gender)) {
      res.status(500).send({
        message: "Gender invalid!",
        success: false,
      });
    }

    let updateData = {
      slug: slugify(name),
      name: name,
      email: email,
      gender: gender,
      number: number,
    };

    if (req.file !== undefined && req.file.filename !== undefined) {
      updateData.photo = req.file.filename;
      console.log(updateData);
      console.log(updateData.photo);
    }

    const reduxUpdate = await userModel.findByIdAndUpdate(paramId, updateData, {
      new: true,
    });
    const reduxU = await reduxUpdate.save();
    console.log(reduxU);

    res.status(200).send({
      message: "User Updated!",
      success: true,
      reduxU,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "User Not Update!",
      success: false,
      error,
    });
    console.log(error);
  }
};

const userDelete = async (req, res) => {
  try {
    const paramId = req.params.id;

    const deleteUser = await userModel.findByIdAndDelete(paramId);

    if (!deleteUser) {
      return res
        .status(404)
        .send({ message: "User Allready Deleted!", success: false });
    }

    return res.status(200).send({
      message: "User Deleted!",
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "User Delete!",
      success: true,
      error,
    });
    console.log(error);
  }
};

const userFind = async (req, res) => {
  try {
    const findUser = await userModel.find({});

    if (!findUser) {
      return res
        .status(404)
        .send({ message: "Error In Fetch!", success: false });
    }

    res.status(200).send({
      message: "Fetch All User!",
      success: true,
      findUser,
    });
  } catch (error) {
    res.status(400).send({
      message: "Users Fetch!",
      success: true,
      error,
    });
    console.log(error);
  }
};

const userFindOne = async (req, res) => {
  try {
    const paramId = req.params.id;

    console.log(paramId);

    const user = await userModel.findById(paramId);

    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found!", success: false });
    }

    res.status(200).send({
      message: "User found!",
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).send({
      message: "User Fetch!",
      success: true,
      error,
    });
    console.log(error);
  }
};

const userSearch = async (req, res) => {
  try {
    const { keyword } = req.params;

    const results = await userModel
      .find({
        $or: [{ name: { $regex: keyword, $options: "i" } }],
      })
      .select("-photo");

    res.status(200).send({
      results,
      success: true,
      message: "search data...",
    });
  } catch (error) {
    res.status(400).send({
      message: "User not search!",
      success: false,
      error,
    });
    console.log(error);
  }
};

export {
  userCreate,
  userUpdate,
  userDelete,
  userFind,
  userFindOne,
  userSearch,
};
