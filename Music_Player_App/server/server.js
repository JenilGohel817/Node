import { connectDB } from "./database/db.js";
import { app, PORT } from "./app.js";
import mongoose from "mongoose";

connectDB();

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Started On Port Number : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`${error} Not Connect`);
  });
