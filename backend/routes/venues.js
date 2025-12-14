const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all venues
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM venues ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching venues:", err);
    res.status(500).json({ error: "Failed to fetch venues" });
  }
});

// GET single venue
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM venues WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Venue not found" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching venue:", err);
    res.status(500).json({ error: "Failed to fetch venue" });
  }
});

module.exports = router;