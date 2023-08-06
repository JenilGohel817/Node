import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    lastname: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 5,
    },
    picture: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
    },
    occupation: {
      type: String,
    },
    viewedProfile: {
      type: Number,
    },
    impressions: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const authUser = mongoose.model("authUser", authSchema);

export default authUser;
