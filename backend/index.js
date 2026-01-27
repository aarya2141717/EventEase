// backend/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: __dirname + '/.env' });

const { connectDB } = require("./db/db");

const app = express();
const artistRoutes = require("./routes/artists");
app.use("/api/artists", artistRoutes);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("EventEase API is running"));

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));