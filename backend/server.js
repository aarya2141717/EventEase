require("dotenv").config();
const express = require("express");
const cors = require("cors");

const artistRoutes = require("./routes/artists");
const venueRoutes = require("./routes/venues");
const eventRoutes = require("./routes/events");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/artists", artistRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/events", eventRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "EventEase API is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});