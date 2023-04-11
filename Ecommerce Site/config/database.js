const mongoose = require("mongoose");

const dbConnection = () => {
  try {
    const dbConnect = mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected !");
  } catch (error) {
    console.log(error, "DB Not Connected !");
  }
};

module.exports = dbConnection;
