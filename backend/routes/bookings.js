const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Venue = require("../models/Venue");
const Artist = require("../models/Artist");
const { authenticate, requireRole } = require("../middleware/auth");

// Helper function to check if a string is a valid UUID
const isValidUUID = (str) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

// Create artist booking
router.post("/artist", authenticate, async (req, res) => {
  try {
    const {
      eventDate,
      eventTime,
      numberOfTickets,
      numberOfGuests,
      venueName,
      performanceDuration,
      eventType,
      specialRequirements,
      artistId,
      artistName,
    } = req.body;

    console.log("📝 Artist booking request:", { artistId, artistName, eventDate, eventTime, userId: req.user?.id });

    if (!artistId || !eventDate || !eventTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Try to find artist by ID (UUID) first, then by slug
    let artist;
    if (isValidUUID(artistId)) {
      artist = await Artist.findByPk(artistId);
    }
    if (!artist) {
      artist = await Artist.findOne({ where: { slug: artistId } });
    }
    
    // If still not found, create booking anyway with the provided name (for static data)
    if (!artist) {
      console.log("⚠️ Artist not in database, using provided name:", artistName);
    }

    const booking = await Booking.create({
      type: "artist",
      status: "pending",
      vendorApproval: "approved", // Artists don't need vendor approval - auto approve
      adminApproval: "pending", // Admin needs to approve
      userId: req.user.id,
      ownerId: artist?.createdBy || null,
      itemId: artist?.id || artistId,
      itemName: artist?.name || artistName || 'Unknown Artist',
      contactName: req.user.fullName,
      contactEmail: req.user.email,
      contactPhone: req.user.phone || null,
      eventDate,
      eventTime,
      numberOfTickets: Number(numberOfGuests || numberOfTickets) || 1,
      eventType: eventType || null,
      specialRequirements: specialRequirements || `Venue: ${venueName || 'TBD'}, Duration: ${performanceDuration || 'TBD'}, ${specialRequirements || ''}`.trim(),
    });

    console.log("✅ Artist booking created:", booking.id);

    res.status(201).json({
      message: "Artist booking created",
      booking,
    });
  } catch (error) {
    console.error("❌ Artist booking error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create venue booking
router.post("/venue", authenticate, async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      startTime,
      endTime,
      numberOfGuests,
      specialRequirements,
      venueId,
    } = req.body;

    console.log("📝 Venue booking request:", { venueId, startDate, endDate, userId: req.user?.id });

    if (!venueId || !startDate || !endDate || !startTime || !endTime || !numberOfGuests) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Try to find venue by ID (UUID) first, then by slug
    let venue;
    if (isValidUUID(venueId)) {
      venue = await Venue.findByPk(venueId);
    }
    if (!venue) {
      venue = await Venue.findOne({ where: { slug: venueId } });
    }
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    const booking = await Booking.create({
      type: "venue",
      status: "pending",
      userId: req.user.id,
      ownerId: venue.createdBy || null,
      itemId: venue.id,
      itemName: venue.name,
      contactName: req.user.fullName,
      contactEmail: req.user.email,
      contactPhone: req.user.phone || null,
      startDate,
      endDate,
      startTime,
      endTime,
      numberOfGuests: Number(numberOfGuests) || 0,
      specialRequirements: specialRequirements || null,
    });

    console.log("✅ Venue booking created:", booking.id);

    res.status(201).json({
      message: "Venue booking created",
      booking,
    });
  } catch (error) {
    console.error("❌ Venue booking error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get bookings for logged-in customer
router.get("/me", authenticate, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get bookings for vendor-owned venues
router.get("/vendor", authenticate, requireRole("vendor"), async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { ownerId: req.user.id, type: "venue" },
      order: [["createdAt", "DESC"]],
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Admin: get all bookings
router.get("/", authenticate, requireRole("admin"), async (_req, res) => {
  try {
    const bookings = await Booking.findAll({ order: [["createdAt", "DESC"]] });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get single booking (owner / customer / admin)
router.get("/:id", authenticate, async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const isOwner = booking.ownerId && booking.ownerId === req.user.id;
    const isCustomer = booking.userId === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isCustomer && !isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update a booking (customer for their own, vendor for owned venue, admin for all)
router.put("/:id", authenticate, async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const isOwner = booking.ownerId && booking.ownerId === req.user.id;
    const isCustomer = booking.userId === req.user.id;
    const isAdmin = req.user.role === "admin" || req.user.userType === "admin";

    if (!isOwner && !isCustomer && !isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updatableFields = [
      "startDate",
      "endDate",
      "startTime",
      "endTime",
      "eventDate",
      "eventTime",
      "numberOfGuests",
      "numberOfTickets",
      "eventType",
      "specialRequirements",
      "contactPhone",
    ];

    // Only customers (booking owners) can edit details when status is pending
    if (isCustomer && booking.status !== "pending") {
      updatableFields.length = 0; // Can't edit if not in pending status
    }

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        booking[field] = req.body[field];
      }
    });

    // Allow status update for cancellation
    if (req.body.status === "cancelled" && isCustomer) {
      booking.status = req.body.status;
    }

    await booking.save();
    res.json({ message: "Booking updated", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Vendor approval endpoint
router.put("/:id/vendor-approval", authenticate, requireRole("vendor"), async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only the vendor who owns the venue can approve
    if (booking.ownerId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { approved } = req.body;
    if (approved === undefined) {
      return res.status(400).json({ message: "Missing approval status" });
    }

    booking.vendorApproval = approved ? "approved" : "rejected";
    booking.vendorApprovalDate = new Date();

    // Update main status if both vendor and admin approved
    if (booking.vendorApproval === "approved" && booking.adminApproval === "approved") {
      booking.status = "approved";
    } else if (booking.vendorApproval === "rejected" || booking.adminApproval === "rejected") {
      booking.status = "rejected";
    }

    await booking.save();
    res.json({ message: "Booking approval updated", booking });
  } catch (error) {
    console.error("❌ Vendor approval error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Admin approval endpoint
router.put("/:id/admin-approval", authenticate, requireRole("admin"), async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const { approved } = req.body;
    if (approved === undefined) {
      return res.status(400).json({ message: "Missing approval status" });
    }

    booking.adminApproval = approved ? "approved" : "rejected";
    booking.adminApprovalDate = new Date();

    // Update main status if both vendor and admin approved
    if (booking.vendorApproval === "approved" && booking.adminApproval === "approved") {
      booking.status = "approved";
    } else if (booking.vendorApproval === "rejected" || booking.adminApproval === "rejected") {
      booking.status = "rejected";
    }

    await booking.save();
    res.json({ message: "Booking approval updated", booking });
  } catch (error) {
    console.error("❌ Admin approval error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
