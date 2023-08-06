import mongoose from "mongoose";
import color from "colors";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongodb connected ! ${conn.connection.host}`.bgBlue.white);
  } catch (error) {
    console.log(error);
  }
};

export { dbConnect };
