const express = require("express");
const router = express.Router();

let Artist;
try {
  Artist = require("../models/Artist");
} catch (error) {
  console.error("❌ Error loading Artist model:", error.message);
}

// GET /api/artists - Get all artists
router.get("/", async (req, res) => {
  try {
    if (!Artist) {
      return res.status(500).json({ message: "Artist model not available" });
    }
    const artists = await Artist.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(artists);
  } catch (error) {
    console.error("❌ Error fetching artists:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/artists - Add new artist (Admin only)
router.post("/", async (req, res) => {
  try {
    if (!Artist) {
      return res.status(500).json({ message: "Artist model not available" });
    }

    console.log("📝 Add artist request received:", req.body);
    
    const {
      name,
      category,
      genre,
      image,
      description,
      experience,
      bookingFee,
      contact,
      availability,
      achievements,
      popularSongs,
      socialMedia,
    } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ message: "Artist name is required" });
    }

    // Create artist
    const newArtist = await Artist.create({
      name,
      category: category || null,
      genre: genre || null,
      image: image || null,
      description: description || null,
      experience: experience || null,
      bookingFee: bookingFee || null,
      contact: contact || null,
      availability: availability ? JSON.stringify(availability) : null,
      achievements: achievements || null,
      popularSongs: popularSongs ? JSON.stringify(popularSongs) : null,
      socialMedia: socialMedia || null,
    });

    console.log("✅ Artist created successfully:", newArtist.name);

    res.status(201).json({
      message: "Artist added successfully",
      artist: newArtist,
    });
  } catch (error) {
    console.error("❌ Add artist error:", error.message);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message
    });
  }
});

module.exports = router;
