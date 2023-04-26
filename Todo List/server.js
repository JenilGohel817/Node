const { connectDB } = require("./database/db.js");
const { app } = require("./app.js");

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on port:${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});
