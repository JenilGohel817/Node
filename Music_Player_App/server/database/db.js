import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((c) => console.log(`Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export { connectDB };
