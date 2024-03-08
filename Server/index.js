// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database_name",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.use(bodyParser.json());

app.use(cors());
const tasks = [];

app.get("/api/tasks", (req, res) => {
  const sql = "SELECT * FROM tasks";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching tasks:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});

app.post("/api/tasks", (req, res) => {
  const { title, description, completed } = req.body;
  const sql =
    "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)";
  const values = [title, description, completed];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding task:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res
      .status(201)
      .json({ id: result.insertId, title, description, completed });
  });
});

// Update other endpoints accordingly

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
