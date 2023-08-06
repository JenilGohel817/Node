import likeModel from "../models/likeModel.js";
import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";

const likeAdd = async (req, res) => {
  try {
    const postID = ObjectID(req.params.postID.trim());
    const userID = req.body;

    const post = await postModel.findById(postID);

    if (post) {
      post.likes++;
      await post.save();
    }

    const user = await userModel.findById(userID);
    if (user) {
      user.likes.push(postID);
      await user.save();
    }

    console.log(user, post);

    return res.status(200).send({
      message: "Like Added !",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Like Not Added !",
      error,
    });
  }
};

export { likeAdd };
