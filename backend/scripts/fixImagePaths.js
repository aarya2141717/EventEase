const { sequelize } = require("../db/db");
const Venue = require("../models/Venue");
require("dotenv").config({ path: __dirname + "/../.env" });

const fixImagePaths = async () => {
  try {
    console.log("🔄 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ Database connected");

    console.log("🔄 Fixing image paths...");
    
    // Fix Dorje's Resort - use a resort image without special characters
    const dorje = await Venue.findOne({ where: { name: "Dorje's Resort & Spa" } });
    if (dorje) {
      // Use Hotel Mystic Mountain image (clean filename without special chars)
      await dorje.update({
        image: "/images/Hotel Mystic Mountain 1.avif",
        images: ["/images/Hotel Mystic Mountain 1.avif", "/images/Hotel Mystic Mountain 2.avif", "/images/Hotel Mystic Mountain 3.jpg"]
      });
      console.log("✅ Updated Dorje's Resort image to Hotel Mystic Mountain photos");
    }

    // List all venues to verify
    const allVenues = await Venue.findAll();
    console.log("\n📋 Current Venues:");
    allVenues.forEach(v => {
      console.log(`  - ${v.name}: ${v.image}`);
    });

    console.log("\n✅ Image path fixes completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error fixing image paths:", error.message);
    process.exit(1);
  }
};

fixImagePaths();
