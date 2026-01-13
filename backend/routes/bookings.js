const express = require("express");
const router = express.Router();

// Artist Booking Route
router.post("/artist", async (req, res) => {
  try {
    console.log("📝 Artist booking request received:", req.body);
    
    const { fullName, email, phone, eventDate, eventTime, numberOfTickets, eventType, specialRequirements, artistId, artistName } = req.body;

    // Validation
    if (!fullName || !email || !phone || !eventDate || !eventTime) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // In a real app, you would save this to a bookings table
    // For now, we'll just return success
    console.log("✅ Artist booking created:", {
      artistName,
      artistId,
      customer: fullName,
      email,
      eventDate,
      eventTime,
    });

    res.status(201).json({
      message: "Artist booking request submitted successfully",
      booking: {
        artistName,
        customerName: fullName,
        eventDate,
        eventTime,
        numberOfTickets,
      },
    });
  } catch (error) {
    console.error("❌ Artist booking error:", error.message);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message
    });
  }
});

// Venue Booking Route
router.post("/venue", async (req, res) => {
  try {
    console.log("📝 Venue booking request received:", req.body);
    
    const { fullName, email, phone, startDate, endDate, startTime, endTime, numberOfGuests, specialRequirements, venueId, venueName } = req.body;

    // Validation
    if (!fullName || !email || !phone || !startDate || !endDate || !startTime || !endTime || !numberOfGuests) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // In a real app, you would save this to a bookings table
    // For now, we'll just return success
    console.log("✅ Venue booking created:", {
      venueName,
      venueId,
      customer: fullName,
      email,
      startDate,
      endDate,
      numberOfGuests,
    });

    res.status(201).json({
      message: "Venue booking request submitted successfully",
      booking: {
        venueName,
        customerName: fullName,
        startDate,
        endDate,
        numberOfGuests,
      },
    });
  } catch (error) {
    console.error("❌ Venue booking error:", error.message);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message
    });
  }
});

module.exports = router;
