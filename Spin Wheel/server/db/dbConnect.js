import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("db Connected!");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
