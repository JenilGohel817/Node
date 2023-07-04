import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).send({
        success: false,
        error,
        message: "Name Required !",
      });
    }

    const existCategory = await categoryModel.findOne({ name });

    if (existCategory) {
      return res.status(401).send({
        success: false,
        error,
        message: "Name Allready Added !",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    return res.status(201).send({
      success: true,
      category,
      message: "Name Added !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Category",
    });
  }
};

const UpdateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated !",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error In Update !",
    });
  }
};

const GetAllCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All User Get",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error In Get !",
    });
  }
};

const SingleCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single Categoy Fetch",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Category Not Fetch !",
      error,
    });
  }
};

const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      message: "Category Deleted !",
      category,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Delete Not Fetch !",
      error,
    });
  }
};

export {
  CreateCategoryController,
  UpdateCategoryController,
  GetAllCategory,
  SingleCategory,
  DeleteCategory,
};
