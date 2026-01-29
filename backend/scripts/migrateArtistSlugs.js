const { sequelize } = require("../db/db");
const Artist = require("../models/Artist");
require("dotenv").config({ path: __dirname + "/../.env" });

const slugMappings = {
  "Raju Lama": "raju-lama",
  "The Elements": "the-elements",
  "Kuma Sagar & The Khwopa": "kuma-sagar-khwopa",
  "Sajjan Raj Vaidya": "sajjan-raj-vaidya",
  "Sushant K.C": "sushant-kc",
  "Melina Rai": "melina-rai",
  "DJ Ashish": "dj-ashish",
  "Tenzing Sherpa": "tenzing-sherpa",
  "Kutumba": "kutumba",
};

const migrateArtistSlugs = async () => {
  try {
    console.log("🔄 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ Database connected");

    console.log("🔄 Migrating artist slugs...");
    
    for (const [name, slug] of Object.entries(slugMappings)) {
      const artist = await Artist.findOne({ where: { name } });
      
      if (artist && !artist.slug) {
        await artist.update({ slug });
        console.log(`✅ Updated: ${name} -> ${slug}`);
      } else if (artist && artist.slug) {
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

migrateArtistSlugs();
