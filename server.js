const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "expense_tracker"
});

app.get("/expenses", (req, res) => {
    console.log("Expenses route hit");

    db.query("SELECT * FROM expenses", (err, result) => {
        if (err) {
            console.log("Fetch error:", err);
            res.status(500).send("Error fetching data");
        } else {
            res.json(result);
        }
    });
});



// ADD expense
app.post("/expenses", (req, res) => {
    const { amount, category, description, date } = req.body;

    const sql = "INSERT INTO expenses (amount, category, description, date) VALUES (?, ?, ?, ?)";

    db.query(sql, [amount, category, description, date], (err, result) => {
        if (err) {
            console.log("Insert error:", err);
            res.status(500).send("Error inserting data");
        } else {
            res.send("Expense added successfully");
        }
    });
});

// DELETE expense
app.delete("/expenses/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM expenses WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.log("Delete error:", err);
            res.status(500).send("Error deleting data");
        } else {
            res.send("Expense deleted successfully");
        }
    });
});

// CONNECT DB first, THEN start server
db.connect((err) => {
    if (err) {
        console.log("Connection failed:", err);
    } else {
        console.log("Connected to MySQL");

        app.listen(3001, () => {
            console.log("Server running on port 3001");
});

    }
});
