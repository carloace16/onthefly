import express from "express";
import cors from "cors";
import "./config/dotenv.js"; // Make sure dotenv is loaded

// Import ALL routers (ensure no duplicates)
import tripRoutes from "./routes/trips.js";
import activityRoutes from "./routes/activities.js";
import destinationRoutes from "./routes/destinations.js";
import tripsDestinationsRoutes from "./routes/trips_destinations.js";
import userRoutes from "./routes/users.js";
import tripsUsersRoutes from "./routes/trips_users.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test Route
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align: center; margin-top: 50px;">✈️ On the Fly API</h1>'
    );
});

// Use ALL API routers (ensure no duplicates)
app.use("/api/trips", tripRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/trips_destinations", tripsDestinationsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trips_users", tripsUsersRoutes);

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
