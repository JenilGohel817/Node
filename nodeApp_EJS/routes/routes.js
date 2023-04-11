const express = require("express");
const router = express.Router();

router.get("/index", (req, res, next) => {
  res.send("This is the homepage request");
});

module.exports = router;
