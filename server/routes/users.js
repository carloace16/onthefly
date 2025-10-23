import express from "express";
import UsersController from "../controllers/users.js";

const router = express.Router();

router.get("/", UsersController.getUsers);
router.get("/:id", UsersController.getUser);
// ... other routes

export default router;
