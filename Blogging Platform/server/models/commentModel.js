import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  content: {
    type: String,
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
});

const comment = mongoose.model("comment", commentSchema);

export default comment;
