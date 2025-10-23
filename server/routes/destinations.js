import express from "express";
import DestinationsController from "../controllers/destinations.js";

const router = express.Router();

router.get("/", DestinationsController.getDestinations);
router.get("/:id", DestinationsController.getDestination);
router.post("/", DestinationsController.createDestination);
router.patch("/:id", DestinationsController.updateDestination); // Using PATCH for update
router.delete("/:id", DestinationsController.deleteDestination);

export default router;
