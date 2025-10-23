import express from "express";
import TripsController from "../controllers/trips.js";

const router = express.Router();

router.get("/", TripsController.getTrips); // GET /api/trips
router.get("/:id", TripsController.getTrip); // GET /api/trips/:id
router.post("/", TripsController.createTrip); // POST /api/trips
router.patch("/:id", TripsController.updateTrip); // PATCH /api/trips/:id (Using PATCH as per lab instructions for update)
router.delete("/:id", TripsController.deleteTrip); // DELETE /api/trips/:id

export default router;
