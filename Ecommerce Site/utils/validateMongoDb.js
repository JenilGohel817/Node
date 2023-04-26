const mongoose = require("mongoose");
const validateMongoId = (id) => {
  const isValid = mongoose.Schema.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("This ID Not Found !");
  }
};

module.exports = { validateMongoId };
