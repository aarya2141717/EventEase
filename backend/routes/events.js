const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all events
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM events ORDER BY event_date");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// POST new event
router.post("/", async (req, res) => {
  try {
    const { title, venue_id, artist_id, event_date, price } = req.body;
    const result = await db.query(
      "INSERT INTO events (title, venue_id, artist_id, event_date, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, venue_id, artist_id, event_date, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
});

module.exports = router;