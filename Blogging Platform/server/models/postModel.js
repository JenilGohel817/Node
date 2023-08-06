import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("post", postSchema);

export default postModel;
