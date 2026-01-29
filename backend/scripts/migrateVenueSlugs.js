const { sequelize } = require("../db/db");
const Venue = require("../models/Venue");
require("dotenv").config({ path: __dirname + "/../.env" });

const slugMappings = {
  "Smart Palace": "smart-palace",
  "Queen's Palace & Events": "queens-palace-events",
  "Silver Oak Banquet": "silver-oak-banquet",
  "Dorje's Resort & Spa": "dorjes-resort-spa",
  "Fish Tail Lodge": "fish-tail-lodge",
  "Jimbu Thakali By Capital Grill": "jimbu-thakali",
  "Hotel Mystic Mountain": "hotel-mystic-mountain",
  "Patio - The Soaltee Kathmandu": "patio-soaltee",
  "The White House Villa": "the-white-house-villa",
};

const migrateVenueSlugs = async () => {
  try {
    console.log("🔄 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ Database connected");

    console.log("🔄 Migrating venue slugs...");
    
    for (const [name, slug] of Object.entries(slugMappings)) {
      const venue = await Venue.findOne({ where: { name } });
      
      if (venue && !venue.slug) {
        await venue.update({ slug });
        console.log(`✅ Updated: ${name} -> ${slug}`);
      } else if (venue && venue.slug) {
        console.log(`⏭️  Already has slug: ${name}`);
      } else {
        console.log(`❌ Not found: ${name}`);
      }
    }

    console.log("✅ Migration completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error migrating slugs:", error.message);
    process.exit(1);
  }
};

migrateVenueSlugs();
