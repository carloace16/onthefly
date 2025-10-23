import { pool } from "../config/database.js";

// Get all activities for a specific trip
const getTripActivities = async (req, res) => {
  try {
    const trip_id = parseInt(req.params.trip_id);
    const results = await pool.query(
      "SELECT * FROM activities WHERE trip_id = $1 ORDER BY id ASC",
      [trip_id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Create a new activity for a trip
const createActivity = async (req, res) => {
  try {
    const trip_id = parseInt(req.params.trip_id);
    const { activity } = req.body; // Only need activity name, votes default to 0
    const results = await pool.query(
      `INSERT INTO activities (trip_id, activity)
             VALUES($1, $2)
             RETURNING *`,
      [trip_id, activity]
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Update activity likes (votes)
const updateActivityLikes = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // Query to increment num_votes by 1
    const results = await pool.query(
      `UPDATE activities
             SET num_votes = num_votes + 1
             WHERE id = $1
             RETURNING *`,
      [id]
    );
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Delete an activity
const deleteActivity = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(
      "DELETE FROM activities WHERE id = $1 RETURNING *",
      [id]
    );
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(results.rows[0]); // Return deleted activity
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Get all activities (as per lab instructions, though maybe less common)
const getActivities = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM activities ORDER BY id ASC"
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getTripActivities,
  createActivity,
  updateActivityLikes,
  deleteActivity,
  getActivities,
};
