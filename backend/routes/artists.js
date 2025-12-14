const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all artists
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM artists ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching artists:", err);
    res.status(500).json({ error: "Failed to fetch artists" });
  }
});

// GET single artist
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM artists WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Artist not found" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching artist:", err);
    res.status(500).json({ error: "Failed to fetch artist" });
  }
});

// POST new artist
router.post("/", async (req, res) => {
  try {
    const { name, role, image, description } = req.body;
    const result = await db.query(
      "INSERT INTO artists (name, role, image, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, role, image, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating artist:", err);
    res.status(500).json({ error: "Failed to create artist" });
  }
});

module.exports = router;