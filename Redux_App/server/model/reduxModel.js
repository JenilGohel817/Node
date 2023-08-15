import mongoose from "mongoose";

const reduxSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  photo: {
    type: String,
  },
});

const reduxModel = mongoose.model("redux", reduxSchema);

export { reduxModel };
