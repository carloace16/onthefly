import { pool } from "../config/database.js";

// Get all destinations
const getDestinations = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM destinations ORDER BY id ASC"
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Get a single destination by ID
const getDestination = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(
      "SELECT * FROM destinations WHERE id = $1",
      [id]
    );
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Create a new destination
const createDestination = async (req, res) => {
  try {
    const { destination, description, city, country, img_url, flag_img_url } =
      req.body;
    const results = await pool.query(
      `INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url)
             VALUES($1, $2, $3, $4, $5, $6)
             RETURNING *`,
      [destination, description, city, country, img_url, flag_img_url]
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Update a destination
const updateDestination = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { destination, description, city, country, img_url, flag_img_url } =
      req.body;
    const results = await pool.query(
      `UPDATE destinations
             SET destination = $1, description = $2, city = $3, country = $4, img_url = $5, flag_img_url = $6
             WHERE id = $7 RETURNING *`,
      [destination, description, city, country, img_url, flag_img_url, id]
    );
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Delete a destination
const deleteDestination = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // You might need to delete related trips_destinations entries first if ON DELETE CASCADE isn't set
    await pool.query(
      "DELETE FROM trips_destinations WHERE destination_id = $1",
      [id]
    );
    const results = await pool.query(
      "DELETE FROM destinations WHERE id = $1 RETURNING *",
      [id]
    );
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
};
