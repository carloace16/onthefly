import { pool } from "../config/database.js";

// Placeholder - Get all users (usually not needed like this)
const getUsers = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT id, username, avatarurl FROM users ORDER BY id ASC"
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Placeholder - Get user by ID
const getUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(
      "SELECT id, username, avatarurl FROM users WHERE id = $1",
      [id]
    );
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// ... other functions (create, update, delete) would go here, often tied to authentication

export default {
  getUsers,
  getUser,
  // ... other exports
};
