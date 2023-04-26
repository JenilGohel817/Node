const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "todo_list",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((c) => console.log(`Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};

module.exports = { connectDB };
