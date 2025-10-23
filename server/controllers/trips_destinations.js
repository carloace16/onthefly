import { pool } from "../config/database.js";

// Get all trip-destination links
const getTripsDestinations = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM trips_destinations");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Get all trips associated with a specific destination
const getAllTripsForDestination = async (req, res) => {
  try {
    const destination_id = parseInt(req.params.destination_id);
    const results = await pool.query(
      `SELECT t.* FROM trips t
             JOIN trips_destinations td ON t.id = td.trip_id
             WHERE td.destination_id = $1`,
      [destination_id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Get all destinations associated with a specific trip
const getAllDestinationsForTrip = async (req, res) => {
  try {
    const trip_id = parseInt(req.params.trip_id);
    const results = await pool.query(
      `SELECT d.* FROM destinations d
             JOIN trips_destinations td ON d.id = td.destination_id
             WHERE td.trip_id = $1`,
      [trip_id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Create a link between a trip and a destination
const createTripDestination = async (req, res) => {
  try {
    const { trip_id, destination_id } = req.body;
    const results = await pool.query(
      `INSERT INTO trips_destinations (trip_id, destination_id)
             VALUES($1, $2)
             RETURNING *`,
      [trip_id, destination_id]
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    // Handle potential duplicate entry errors if needed
    res.status(409).json({ error: error.message });
  }
};

// (Optional: Delete a link - not specified but useful)
const deleteTripDestination = async (req, res) => {
  try {
    const { trip_id, destination_id } = req.body; // Or get from params
    const results = await pool.query(
      "DELETE FROM trips_destinations WHERE trip_id = $1 AND destination_id = $2 RETURNING *",
      [trip_id, destination_id]
    );
    if (results.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Trip-Destination link not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getTripsDestinations,
  getAllTripsForDestination,
  getAllDestinationsForTrip,
  createTripDestination,
  deleteTripDestination, // Optional
};
