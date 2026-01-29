// backend/index.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: __dirname + '/.env' });

const { connectDB, sequelize } = require("./db/db");

const app = express();

// Configure CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow any localhost port and specific domains
    if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Load routes
const artistRoutes = require("./routes/artists");
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/bookings");
const venueRoutes = require("./routes/venues");

app.use("/api/artists", artistRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/venues", venueRoutes);

app.get("/", (req, res) => res.send("EventEase API is running"));

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend API is working! ✅" });
});

// Sync database models and start server
const startServer = async () => {
  // Skip initialization during tests
  if (process.env.NODE_ENV === "test") {
    return;
  }

  try {
    console.log("🔄 Connecting to database...");
    await connectDB();
    console.log("✅ Database connected");
    
    console.log("🔄 Syncing models...");
    await sequelize.sync({ alter: true });
    console.log("✅ Models synced with database");
    
    // Create admin user if it doesn't exist
    try {
      const User = require("./models/User");
      const bcrypt = require("bcryptjs");
      const adminExists = await User.findOne({ where: { email: "admin@eventease.com" } });
      if (!adminExists) {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await User.create({
          fullName: "Admin User",
          email: "admin@eventease.com",
          phone: "+977 9800000000",
          password: hashedPassword,
          userType: "admin",
          accountType: "admin",
          location: "Kathmandu",
        });
        console.log("✅ Default admin user created (admin@eventease.com / admin123)");
      }
    } catch (error) {
      console.log("⚠️ Could not create admin user:", error.message);
    }
    
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📍 API endpoint: http://localhost:${PORT}/api/auth/signup`);
    });

    // Handle server errors
    server.on('error', (error) => {
      console.error("❌ Server error:", error.message);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Error starting server:");
    console.error("Error message:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

// Handle uncaught errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error.message);
  console.error(error);
  process.exit(1);
});

startServer();

module.exports = app;