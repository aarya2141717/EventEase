// backend/index.js
const express = require("express");
const cors = require("cors");
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

// Load routes
const artistRoutes = require("./routes/artists");
const authRoutes = require("./routes/auth");

app.use("/api/artists", artistRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("EventEase API is running"));

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend API is working! ✅" });
});

// Sync database models and start server
const startServer = async () => {
  try {
    console.log("🔄 Connecting to database...");
    await connectDB();
    console.log("✅ Database connected");
    
    console.log("🔄 Syncing models...");
    await sequelize.sync({ alter: true });
    console.log("✅ Models synced with database");
    
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
