import postModel from "../models/postModel.js";
import fs from "fs";

const productPhotoController = async (req, res) => {
  try {
    const product = await postModel.findById(req.params.pid).select("image");
    if (product.image.data) {
      res.set("Content-type", product.image.contentType);
      return res.status(200).send(product.image.data);
    }
    return res.status(200).send({
      message: "Image Fetch !",
      success: true,
      imageFetch,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

const postCreate = async (req, res) => {
  const { title, content } = req.fields;
  const { image } = req.files;

  const product = new postModel({
    ...req.fields,
  });
  if (image) {
    product.image.data = fs.readFileSync(image.path);
    product.image.contentType = image.type;
  }
  const saveProduct = await product.save();

  res.status(201).send({
    success: true,
    message: "Post Created !",
    saveProduct,
  });
};

const postUpdate = async (req, res) => {
  try {
    const paramsID = req.params.id;

    const { title, content } = req.body;
    const image = req.file;

    const update = await postModel.findByIdAndUpdate(
      paramsID,
      {
        title: title,
        content: content,
        image: image,
      },
      {
        new: true,
      }
    );

    console.log(update);

    return res.status(200).send({
      success: true,
      message: "Post Updated !",
      update,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error In Update !",
      success: false,
      error,
    });
  }
};

const postFetch = async (req, res) => {
  try {
    const find = await postModel.find({});

    return res.status(200).send({
      success: true,
      message: "All Post Fetch !",
      find,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error In Fetch !",
      success: false,
      error,
    });
  }
};

const postFetchSingle = async (req, res) => {
  try {
    const paramsID = req.params.id;

    const fetch = await postModel.findById(paramsID);

    return res.status(200).send({
      message: "Single Post Fetched !",
      success: true,
      fetch,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Single Post Fetch !",
      error,
    });
  }
};

const postDelete = async (req, res) => {
  try {
    const paramsID = req.params.id;

    console.log(paramsID);

    const deletePost = await postModel.findByIdAndDelete(paramsID);

    return res.status(200).send({
      message: "Post Deleted !",
      success: true,
      deletePost,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error In Post Delete",
      success: false,
      error,
    });
  }
};

export {
  postCreate,
  postUpdate,
  postFetch,
  postFetchSingle,
  postDelete,
  productPhotoController,
};
