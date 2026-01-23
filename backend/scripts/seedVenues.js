const { sequelize } = require("../db/db");
const Venue = require("../models/Venue");
require("dotenv").config({ path: __dirname + "/../.env" });

const hardcodedVenues = [
  {
    name: "Smart Palace",
    location: "Chabahil, Kathmandu",
    category: "Banquets",
    description: "Perfect for weddings, parties, and corporate events.",
    image: "/images/smart palace 1.jpg",
    images: ["/images/smart palace 1.jpg"],
    capacity: "300",
    amenities: ["Catering", "Sound System", "Air Conditioning"],
    price: "50000-150000",
    contact: "9841000001",
    rating: "4.5",
    reviews: 977,
  },
  {
    name: "Queen's Palace & Events",
    location: "Sukedhara Chowk",
    category: "Banquets",
    description: "Garden meets timeless elegance",
    image: "/images/queens palace.jpg",
    images: ["/images/queens palace.jpg"],
    capacity: "350",
    amenities: ["Catering", "Sound System", "Air Conditioning", "Garden"],
    price: "60000-180000",
    contact: "9841000002",
    rating: "4.8",
    reviews: 600,
  },
  {
    name: "Silver Oak Banquet",
    location: "Gairidhara, Kathmandu",
    category: "Banquets",
    description: "Premium banquet & dining",
    image: "/images/silveroak.jpg",
    images: ["/images/silveroak.jpg"],
    capacity: "250",
    amenities: ["Catering", "Sound System", "Air Conditioning"],
    price: "40000-120000",
    contact: "9841000003",
    rating: "4.4",
    reviews: 1400,
  },
  {
    name: "Dorje's Resort & Spa",
    location: "Dhulikhel",
    category: "Resorts",
    description: "Luxury resort with scenic views",
    image: "/images/Dorje's Resort & Spa 1.jpg",
    images: ["/images/Dorje's Resort & Spa 1.jpg"],
    capacity: "200",
    amenities: ["Spa", "Swimming Pool", "Restaurant", "Air Conditioning"],
    price: "80000-250000",
    contact: "9841000004",
    rating: "4.6",
    reviews: 820,
  },
  {
    name: "Fish Tail Lodge",
    location: "Pokhara",
    category: "Resorts",
    description: "Lakeside heritage resort",
    image: "/images/Fish Tail Lodge.jpg",
    images: ["/images/Fish Tail Lodge.jpg"],
    capacity: "180",
    amenities: ["Lakeside", "Restaurant", "Water Sports", "Air Conditioning"],
    price: "70000-200000",
    contact: "9841000005",
    rating: "4.7",
    reviews: 1200,
  },
  {
    name: "Jimbu Thakali By Capital Grill",
    location: "Kathmandu",
    category: "Restaurants",
    description: "Authentic Thakali cuisine",
    image: "/images/Jimbu Thakali By Capital Grill.jpg",
    images: ["/images/Jimbu Thakali By Capital Grill.jpg"],
    capacity: "80",
    amenities: ["Restaurant", "Bar", "Air Conditioning"],
    price: "2000-5000",
    contact: "9841000006",
    rating: "4.5",
    reviews: 900,
  },
  {
    name: "Hotel Mystic Mountain",
    location: "Nagarkot",
    category: "Resorts",
    description: "Mountain view luxury hotel",
    image: "/images/Hotel Mystic Mountain.jpg",
    images: ["/images/Hotel Mystic Mountain.jpg"],
    capacity: "150",
    amenities: ["Mountain View", "Restaurant", "Spa", "Air Conditioning"],
    price: "60000-180000",
    contact: "9841000007",
    rating: "4.6",
    reviews: 1100,
  },
  {
    name: "Patio - The Soaltee Kathmandu",
    location: "Soaltee Mode",
    category: "Restaurants",
    description: "Premium dining experience",
    image: "/images/Patio-The Soaltee Kathmandu.jpg",
    images: ["/images/Patio-The Soaltee Kathmandu.jpg"],
    capacity: "120",
    amenities: ["Restaurant", "Bar", "Air Conditioning"],
    price: "3000-8000",
    contact: "9841000008",
    rating: "4.4",
    reviews: 950,
  },
  {
    name: "The White House Villa",
    location: "Tarakeshwar-2, Kavresthali, Kathmandu, Nepal",
    category: "Villas / Holiday Home",
    description: "Cozy Group Retreat and Luxury Family Stay",
    image: "/images/The White House Villa.avif",
    images: ["/images/The White House Villa.avif"],
    capacity: "25",
    amenities: ["Private Villa", "Kitchen", "Living Room"],
    price: "10000-30000",
    contact: "9841000009",
    rating: "4.4",
    reviews: 620,
  },
];

const seedVenues = async () => {
  try {
    console.log("🔄 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ Database connected");

    console.log("🔄 Seeding hardcoded venues...");
    
    for (const venueData of hardcodedVenues) {
      const exists = await Venue.findOne({ where: { name: venueData.name } });
      
      if (!exists) {
        await Venue.create(venueData);
        console.log(`✅ Created: ${venueData.name}`);
      } else {
        console.log(`⏭️  Already exists: ${venueData.name}`);
      }
    }

    console.log("✅ Seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding venues:", error.message);
    process.exit(1);
  }
};

seedVenues();
