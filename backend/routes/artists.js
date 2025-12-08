const express = require("express");
const router = express.Router();

// Temporary test data – you can replace this later with DB data
const artists = [
  {
    id: 1,
    name: "Artist One",
    genre: "Pop",
    image: "/images/artist1.jpg"
  },
  {
    id: 2,
    name: "Artist Two",
    genre: "Rock",
    image: "/images/artist2.png"
  }
];

// GET /api/artists
router.get("/", (req, res) => {
  res.json(artists);
});

module.exports = router;
