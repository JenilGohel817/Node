const fs = require("fs");

const userData = {
  Name: "Jenil Gohel",
  Age: 18,
  Year: 2000,
};

const jsonData = JSON.stringify(userData);

const objData = JSON.parse(jsonData);

fs.writeFile("WebData.json", jsonData, (err) => {
  console.log("Done");
});

fs.readFile("WebData.json", "utf-8", (err, data) => {
  const jsonParse = JSON.parse(data);
  console.log(jsonParse);
});
