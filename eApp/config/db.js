import mongoose from "mongoose";
import color from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb Connected ! ${conn.connection.host}`.bgBlue.white);
  } catch (error) {
    console.log(`${error}`.bgRed.white);
  }
};

export default connectDB;
