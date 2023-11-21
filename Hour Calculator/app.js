const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { totalHours: null });
});

app.post("/calculate", (req, res) => {
  const startInput = req.body.startHour;
  const endInput = req.body.endHour;

  const startHour = convertTo24HourFormat(startInput);
  const endHour = convertTo24HourFormat(endInput);

  if (startHour === null || endHour === null) {
    res.render("index", {
      totalHours: "Invalid input. Please enter valid time.",
    });
  } else {
    const totalHours = calculateTotalHours(startHour, endHour);
    res.render("index", { totalHours });
  }
});

function convertTo24HourFormat(time) {
  const [hours, minutes, period] = time.split(/[:\s]+/);

  let convertedHours = parseInt(hours);
  const isPM = period.toLowerCase() === "pm";

  if (isPM && convertedHours !== 12) {
    convertedHours += 12;
  } else if (!isPM && convertedHours === 12) {
    convertedHours = 0;
  }

  return convertedHours + parseFloat(minutes / 60);
}

function calculateTotalHours(startHour, endHour) {
  return endHour - startHour;
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
