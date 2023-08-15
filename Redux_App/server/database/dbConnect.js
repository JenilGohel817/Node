import mongoose from "mongoose";
import dotenv from "dotenv";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongodb connected ! ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
