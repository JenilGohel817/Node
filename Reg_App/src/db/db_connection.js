const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/RegUser", {
    // For Not Given Deprication Error
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("db connected !");
  })
  .catch((e) => {
    console.log("db not connected !");
  });
