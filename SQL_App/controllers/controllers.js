import dbConnect from "../database/dbConnect.js";

const sqlAdd = function (req, res) {
  try {
    const { name, email } = req.body;

    if (name || email) {
      const sql = "INSERT INTO user(name, email) VALUES ?";
      const sqlCheckEmail =
        "SELECT COUNT(*) AS count FROM user WHERE email = ?";

      const values = [[name, email]];

      dbConnect.query(sqlCheckEmail, [email], function (err, results) {
        if (err) console.log(err);
        const count = results[0].count;
        console.log(count);
        if (count > 0) {
          res.status(400).json({ message: "Email already exists" });
        } else {
          dbConnect.query(sql, [values], function (err, result) {
            if (err) console.log(err);
            return res.status(200).send(result);
          });
        }
      });
    } else {
      res.status(400).json({ message: "Name & Email cannot be null" });
    }
  } catch (error) {
    console.log(error);
  }
};

const sqlGet = function (req, res) {
  const sql = "SELECT * FROM user";
  dbConnect.query(sql, function (err, results) {
    if (err) console.log(err);
    res.status(200).send(results);
    console.log(results);
  });
};

const sqlFind = function (req, res) {
  const id = req.params.id;
  const sql = "SELECT * FROM user WHERE id = ?";
  dbConnect.query(sql, [id], function (err, results) {
    if (err) console.log(err);
    res.status(200).send(results);
    console.log(results);
  });
};

const sqlDelete = function (req, res) {
  const id = req.params.id;
  const sql = "DELETE FROM user WHERE id = ?";
  dbConnect.query(sql, [id], function (err, results) {
    if (err) console.log(err);
    res.status(200).send(results);
    console.log(results);
  });
};

const sqlUpdate = function (req, res) {
  try {
    const id = req.params.id;
    const { name, email } = req.body;

    const sql = "UPDATE user SET ? WHERE id = ?";

    const values = {
      name: name,
      email: email,
    };

    dbConnect.query(sql, [values, id], function (error, results) {
      if (error) {
        res.status(400).send(error);
        console.log(error);
      }
      res.status(200).send(results);
      console.log(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error,
    });
  }
};

const sqlSearch = function (req, res) {
  const searchTerm = req.query.find;

  const sql = "SELECT * FROM user WHERE name LIKE ? OR email LIKE ?";
  const query = "%" + searchTerm + "%";

  dbConnect.query(sql, [query, query], (err, results) => {
    if (err) {
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results);
    }
  });
};

export { sqlAdd, sqlGet, sqlFind, sqlDelete, sqlUpdate, sqlSearch };
