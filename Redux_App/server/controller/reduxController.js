import { reduxModel } from "../model/reduxModel.js";

const reduxCreate = async (req, res) => {
  const { name, email } = req.body;
  const photo = req.file.filename;

  const reduxUser = await new reduxModel({
    name,
    email,
    photo: photo,
  }).save();

  return res.status(201).send({
    message: "redux create !",
    success: true,
    reduxUser,
  });
};

const reduxFetch = async (req, res) => {
  try {
    const fetch = await reduxModel.find({});

    return res.status(200).send({
      message: "redux fetch !",
      success: true,
      fetch,
    });
  } catch (error) {
    return res.status(200).send({
      message: "redux not fetch !",
      success: false,
      error,
    });
  }
};

const reduxDelete = async (req, res) => {
  try {
    const findId = req.params.id;

    const findRedux = await reduxModel.findByIdAndDelete(findId);

    return res.status(200).send({
      message: "redux Delete",
      success: true,
      findRedux,
    });
  } catch (error) {}
};

const reduxUpdate = async (req, res) => {
  const paramId = req.params.id;

  const { name, email } = req.body;

  let updateData = {
    name: name,
    email: email,
  };

  if (req.file !== undefined && req.file.filename !== undefined) {
    updateData.photo = req.file.filename;
    console.log(updateData.photo);
  }

  const reduxUpdate = await reduxModel.findByIdAndUpdate(paramId, updateData, {
    new: true,
  });

  const reduxU = await reduxUpdate.save();

  res.status(201).send({
    message: "Redux Update !",
    success: true,
    reduxU,
  });
};

const reduxGetSingle = async (req, res) => {
  const findId = req.params.id;

  const user = await reduxModel.findById(findId);

  return res.status(200).send({
    message: "Redux Single Fetch !",
    success: true,
    user,
  });
};

export { reduxCreate, reduxFetch, reduxDelete, reduxUpdate, reduxGetSingle };
