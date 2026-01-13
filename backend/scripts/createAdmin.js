// Script to create an admin user
// Run with: node backend/scripts/createAdmin.js

require("dotenv").config({ path: __dirname + '/../.env' });
const { connectDB, sequelize } = require("../db/db");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createAdmin = async () => {
  try {
    console.log("🔄 Connecting to database...");
    await connectDB();
    console.log("✅ Database connected");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: "admin@eventease.com" } });
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists!");
      console.log("Email: admin@eventease.com");
      console.log("Password: admin123");
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    const admin = await User.create({
      fullName: "Admin User",
      email: "admin@eventease.com",
      phone: "+977 9800000000",
      password: hashedPassword,
      userType: "admin",
      accountType: "admin",
      location: "Kathmandu",
    });

    console.log("✅ Admin user created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email: admin@eventease.com");
    console.log("🔑 Password: admin123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
