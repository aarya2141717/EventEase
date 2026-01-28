const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { authenticate, requireRole } = require("../middleware/auth");

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
router.post("/", authenticate, requireRole("vendor", "admin"), upload.array("images", 3), async (req, res) => {
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
      createdBy: req.user.id,
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

// PUT /api/venues/:id - Update a venue (Owner vendor or admin)
router.put("/:id", authenticate, requireRole("vendor", "admin"), upload.array("images", 3), async (req, res) => {
  try {
    if (!Venue) {
      return res.status(500).json({ message: "Venue model not available" });
    }

    const venue = await Venue.findByPk(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });

    const isOwner = venue.createdBy && venue.createdBy === req.user.id;
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const {
      name,
      location,
      category,
      description,
      capacity,
      amenities,
      price,
      contact,
    } = req.body;

    if (name) venue.name = name;
    if (location) venue.location = location;
    if (category) venue.category = category;
    if (description) venue.description = description;
    if (capacity) venue.capacity = capacity;
    if (price) venue.price = price;
    if (contact) venue.contact = contact;

    if (amenities) {
      venue.amenities = amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    if (req.files && req.files.length > 0) {
      const uploadedImages = req.files.map(
        (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
      venue.image = uploadedImages[0];
      venue.images = uploadedImages;
    }

    await venue.save();
    res.json({ message: "Venue updated successfully", venue });
  } catch (error) {
    console.error("❌ Update venue error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/venues/:id - Delete a venue (Owner vendor or admin)
router.delete("/:id", authenticate, requireRole("vendor", "admin"), async (req, res) => {
  try {
    if (!Venue) {
      return res.status(500).json({ message: "Venue model not available" });
    }

    const { id } = req.params;
    const venue = await Venue.findByPk(id);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    const isOwner = venue.createdBy && venue.createdBy === req.user.id;
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
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

// GET /api/venues/mine - Venues created by current vendor
router.get("/mine", authenticate, requireRole("vendor"), async (req, res) => {
  try {
    if (!Venue) return res.status(500).json({ message: "Venue model not available" });
    const venues = await Venue.findAll({
      where: { createdBy: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
