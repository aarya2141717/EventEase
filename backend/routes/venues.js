const express = require("express");
const router = express.Router();

let Venue;
try {
  Venue = require("../models/Venue");
} catch (error) {
  console.error("❌ Error loading Venue model:", error.message);
}

// GET /api/venues - Get all venues
router.get("/", async (req, res) => {
  try {
    if (!Venue) {
      return res.status(500).json({ message: "Venue model not available" });
    }
    const venues = await Venue.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(venues);
  } catch (error) {
    console.error("❌ Error fetching venues:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/venues - Add new venue (Vendor only)
router.post("/", async (req, res) => {
  try {
    if (!Venue) {
      return res.status(500).json({ message: "Venue model not available" });
    }

    console.log("📝 Add venue request received:", req.body);
    
    const {
      name,
      location,
      category,
      image,
      images,
      description,
      capacity,
      amenities,
      price,
      contact,
    } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ message: "Venue name is required" });
    }

    // Create venue
    const newVenue = await Venue.create({
      name,
      location: location || null,
      category: category || null,
      image: image || null,
      images: images || null,
      description: description || null,
      capacity: capacity || null,
      amenities: amenities || null,
      price: price || null,
      contact: contact || null,
    });

    console.log("✅ Venue created successfully:", newVenue.name);

    res.status(201).json({
      message: "Venue added successfully",
      venue: newVenue,
    });
  } catch (error) {
    console.error("❌ Add venue error:", error.message);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message
    });
  }
});

module.exports = router;
