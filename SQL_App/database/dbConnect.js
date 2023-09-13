import mysql from "mysql2";

const dbConnect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sql",
  port: "3307",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default dbConnect;
