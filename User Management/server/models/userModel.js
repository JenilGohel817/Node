import mongoose, { model } from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      contentType: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model("user", userSchema);

export { userModel };
