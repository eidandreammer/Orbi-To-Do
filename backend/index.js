// Import required libraries
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

// Create the Express app
const app = express();

// Basic server configuration
const port = 3000;

// Middleware
app.use(cors()); // Allows React to call this server
app.use(express.json()); // Parses JSON bodies

// Configure PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "registro",
  password: "0000",
  port: 5432,
});

// Handle new user registration
app.post("/api/register", async (req, res) => {
  const { users, password, email } = req.body;

  try {
    const evaluate1 = await pool.query("SELECT * FROM users WHERE name = $1", [
      users,
    ]);

    const evaluate2 = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (evaluate1.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    } else if (evaluate2.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already associated with a user",
      });
    }
    const newUser = await pool.query(
      "INSERT INTO users (name, password, email) VALUES ($1, $2, $3)",
      [users, password, email]
    );

    res.status(200).json({
      success: true,
      user: newUser.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
    });
    console.log("Error registering user");
  }
});

// Handle user login attempt
app.post("/api/login", async (req, res) => {
  const { users, password, email } = req.body;

  try {
    const evaluate = await pool.query("SELECT * FROM users WHERE name = $1", [
      users,
    ]);

    if (evaluate.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const login = await pool.query(
      "SELECT * FROM users WHERE name = $1 AND password = $2",
      [users, password]
    );

    if (login.rows.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Incorrect password",
      });
    }

    res.status(404).json({
      success: true,
      data: login.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server-side error",
    });
  }
});

// Validate that an email exists before allowing a password change
app.post("/api/change", async (req, res) => {
  const { email } = req.body;

  try {
    const change = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (change.rows.length === 1) {
      return res.status(200).json({
        success: true,
        data: change.rows[0],
      });
    }

    res.status(404).json({
      success: false,
      message: "Email not registered",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server-side error",
    });
  }
});

// Update the stored password for a given email
app.put("/api/pass", async (req, res) => {
  const { pass1, email } = req.body;

  try {
    const newPass = await pool.query(
      "UPDATE users SET password = $1 WHERE email = $2",
      [pass1, email]
    );

    if (!newPass) {
      return res.status(404).json({
        succes: false,
        message: "Error changing password",
      });
    }
    res.status(200).json({
      success: true,
      message: "Password changed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

// Start listening for requests
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
