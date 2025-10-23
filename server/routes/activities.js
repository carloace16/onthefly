import express from "express";
import ActivitiesController from "../controllers/activities.js";

const router = express.Router();

router.get("/", ActivitiesController.getActivities); // Get all activities (optional)
router.get("/:trip_id", ActivitiesController.getTripActivities); // Get activities for a specific trip
router.post("/:trip_id", ActivitiesController.createActivity); // Create activity for a specific trip
router.patch("/:id", ActivitiesController.updateActivityLikes); // Update likes for a specific activity ID
router.delete("/:id", ActivitiesController.deleteActivity); // Delete a specific activity ID

export default router;
