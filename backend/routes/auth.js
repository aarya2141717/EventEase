const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Load User model safely
let User;
try {
  User = require("../models/User");
  console.log("✅ User model loaded");
} catch (error) {
  console.error("❌ Error loading User model:", error.message);
}

// ===== SIGNUP ROUTE =====
router.post("/signup", async (req, res) => {
  try {
    console.log("📝 Signup request received:", req.body);
    
    const { fullName, email, phone, password, userType, location } = req.body;

    // Validation
    if (!fullName || !email || !password) {
      console.warn("❌ Missing required fields");
      return res.status(400).json({ message: "Please provide fullName, email, and password" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.warn("❌ Email already registered:", email);
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Normalize userType (handle "provider" from frontend)
    let normalizedUserType = userType === "provider" ? "vendor" : (userType || "customer");

    // Create user in database
    const newUser = await User.create({
      fullName,
      email,
      phone: phone || null,
      password: hashedPassword,
      userType: normalizedUserType,
      location: location || null,
    });

    console.log("✅ User created successfully:", newUser.email);

    // Return user data (without password)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        userType: newUser.userType,
      },
    });
  } catch (error) {
    console.error("❌ Signup error:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message,
      details: error.errors ? error.errors.map(e => e.message) : null
    });
  }
});

// ===== LOGIN ROUTE =====
router.post("/login", async (req, res) => {
  try {
    console.log("🔐 Login request received:", req.body.email);
    
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      console.warn("❌ Missing email or password");
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.warn("❌ User not found:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.warn("❌ Invalid password for:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("✅ Login successful:", user.email);

    // Return user data (without password)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        phone: user.phone,
        location: user.location,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message
    });
  }
});

module.exports = router;
