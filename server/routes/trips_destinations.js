import express from "express";
import TripsDestinationsController from "../controllers/trips_destinations.js";

const router = express.Router();

router.get("/", TripsDestinationsController.getTripsDestinations); // Get all links
router.get(
  "/trips/:destination_id",
  TripsDestinationsController.getAllTripsForDestination
); // Get trips for a destination
router.get(
  "/destinations/:trip_id",
  TripsDestinationsController.getAllDestinationsForTrip
); // Get destinations for a trip
router.post("/", TripsDestinationsController.createTripDestination); // Create a link
// router.delete('/', TripsDestinationsController.deleteTripDestination); // Optional delete route

export default router;
