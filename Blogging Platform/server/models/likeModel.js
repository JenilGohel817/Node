import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const likeModel = mongoose.model("like", likeSchema);

export default likeModel;
