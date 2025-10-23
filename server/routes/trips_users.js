import express from "express";
import TripsUsersController from "../controllers/trips_users.js";

const router = express.Router();

router.get("/", TripsUsersController.getTripsUsers);
// ... other routes

export default router;
