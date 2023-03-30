const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017", {
    // For Not Given Deprication Error
    dbName: "EmpReg",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected !");
  })
  .catch((e) => {
    console.log("db not connected !");
  });
