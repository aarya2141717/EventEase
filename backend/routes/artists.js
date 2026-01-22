const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

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
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!Artist) {
      return res.status(500).json({ message: "Artist model not available" });
    }

    console.log("📝 Add artist request received:", req.body);
    
    const {
      name,
      category,
      genre,
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

    if (!req.file) {
      return res.status(400).json({ message: "Artist image is required" });
    }

    const uploadedImage = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const availabilityArray = availability
      ? availability.split(",").map((item) => item.trim()).filter(Boolean)
      : null;

    const songsArray = popularSongs
      ? popularSongs.split(",").map((item) => item.trim()).filter(Boolean)
      : null;

    const socialMediaObj = socialMedia ? JSON.parse(socialMedia) : null;

    // Create artist
    const newArtist = await Artist.create({
      name,
      category: category || null,
      genre: genre || null,
      image: uploadedImage,
      description: description || null,
      experience: experience || null,
      bookingFee: bookingFee || null,
      contact: contact || null,
      availability: availabilityArray ? JSON.stringify(availabilityArray) : null,
      achievements: achievements || null,
      popularSongs: songsArray ? JSON.stringify(songsArray) : null,
      socialMedia: socialMediaObj,
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

// DELETE /api/artists/:id - Delete an artist (Admin only)
router.delete("/:id", async (req, res) => {
  try {
    if (!Artist) {
      return res.status(500).json({ message: "Artist model not available" });
    }

    const { id } = req.params;
    const artist = await Artist.findByPk(id);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    await artist.destroy();
    console.log("✅ Artist deleted:", id);

    res.json({ message: "Artist deleted successfully" });
  } catch (error) {
    console.error("❌ Delete artist error:", error.message);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message
    });
  }
});

module.exports = router;
