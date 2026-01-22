const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

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
router.post("/", upload.array("images", 3), async (req, res) => {
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

    if ((!req.files || req.files.length === 0) && !image) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const uploadedImages = (req.files || []).map((file) => {
      return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    });

    const amenitiesArray = amenities
      ? amenities.split(",").map((item) => item.trim()).filter(Boolean)
      : null;

    // Prefer uploaded images; fall back to single image URL if provided
    const primaryImage = uploadedImages[0] || image || null;
    const imagesToStore = uploadedImages.length > 0 ? uploadedImages : images || null;

    // Create venue
    const newVenue = await Venue.create({
      name,
      location: location || null,
      category: category || null,
      image: primaryImage,
      images: imagesToStore,
      description: description || null,
      capacity: capacity || null,
      amenities: amenitiesArray,
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
      error: error.message,
    });
  }
});

// DELETE /api/venues/:id - Delete a venue (Admin only)
router.delete("/:id", async (req, res) => {
  try {
    if (!Venue) {
      return res.status(500).json({ message: "Venue model not available" });
    }

    const { id } = req.params;
    const venue = await Venue.findByPk(id);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    await venue.destroy();
    console.log("✅ Venue deleted:", id);

    res.json({ message: "Venue deleted successfully" });
  } catch (error) {
    console.error("❌ Delete venue error:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
