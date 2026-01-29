const { sequelize } = require("../db/db");
const Artist = require("../models/Artist");
require("dotenv").config({ path: __dirname + "/../.env" });

const hardcodedArtists = [
  {
    slug: "raju-lama",
    name: "Raju Lama",
    category: "Singers",
    genre: "Pop/Rock",
    image: "/images/raju.jpg",
    description: "Raju Lama is a renowned Nepali singer and composer, best known as the lead vocalist of the band 'Mongolian Heart'. He has been a prominent figure in the Nepali music industry for over two decades.",
    experience: "25+ years",
    rating: 4.8,
    reviews: 520,
    bookingFee: "NPR 200,000 - 500,000",
    contact: "+977 98XXXXXXX",
    availability: JSON.stringify(["Available for Weddings", "Corporate Events", "Concerts", "Private Parties"]),
    achievements: "Hits FM & Kantipur FM awards for best albums/songs (2002-2005)",
    popularSongs: JSON.stringify(["Mayalu", "Samjhi Baschu", "Hijo Aaja Bholi", "Parkhai Parkhai"]),
    socialMedia: JSON.stringify({
      facebook: "https://www.facebook.com/therajulamaofficial",
      youtube: "https://www.youtube.com/@RajuLamaMongolianHeart",
      instagram: "https://www.instagram.com/therajulamaofficial"
    }),
  },
  {
    slug: "the-elements",
    name: "The Elements",
    category: "Bands",
    genre: "Rock",
    image: "/images/elements.jpg",
    description: "The Elements is a popular Nepali rock band known for their unique fusion of traditional Nepali music with contemporary rock. Formed in 2005, they have gained a massive following across Nepal.",
    experience: "18+ years",
    rating: 4.7,
    reviews: 340,
    bookingFee: "NPR 300,000 - 800,000",
    contact: "+977 98XXXXXXX",
    availability: JSON.stringify(["Concerts", "Festivals", "Corporate Events", "College Events"]),
    achievements: "Best Newcomer (2006) and Best International Album (2009)",
    popularSongs: JSON.stringify(["Wave", "Elements", "Riverside", "Mountain High"]),
    socialMedia: JSON.stringify({
      facebook: "https://www.facebook.com/theelementsnepal",
      instagram: "https://www.instagram.com/theelements.nepal",
      youtube: "https://www.youtube.com/@TheElementsNepal"
    }),
  },
  {
    slug: "kuma-sagar-khwopa",
    name: "Kuma Sagar & The Khwopa",
    category: "Bands",
    genre: "Folk/Traditional",
    image: "/images/kuma.jpeg",
    description: "Kuma Sagar & The Khwopa is a traditional Nepali folk music band that preserves and promotes authentic Nepali cultural music with a modern touch.",
    experience: "10+ years",
    rating: 4.9,
    reviews: 280,
    bookingFee: "NPR 150,000 - 400,000",
    contact: "+977 98XXXXXXX",
    availability: JSON.stringify(["Cultural Events", "Weddings", "Festivals", "Government Functions"]),
    achievements: "Best band award at the National Music Award 2081",
    popularSongs: JSON.stringify(["Pahadi Lokgeet", "Basanta Ritu", "Himal Ko Chauri", "Nepali Asmita"]),
    socialMedia: JSON.stringify({
      facebook: "https://www.facebook.com/kumasagar",
      instagram: "https://www.instagram.com/kumasagar",
      youtube: "https://www.youtube.com/@kumasagar"
    }),
  },
  {
    slug: "sajjan-raj-vaidya",
    name: "Sajjan Raj Vaidya",
    category: "Singers",
    genre: "Pop/Soul",
    image: "/images/sajan.jpg",
    description: "Sajjan Raj Vaidya is one of the most popular contemporary Nepali singers, known for his soulful voice and meaningful lyrics. He rose to fame through his debut album and has since become a household name.",
    experience: "8+ years",
    rating: 4.8,
    reviews: 450,
    bookingFee: "NPR 250,000 - 600,000",
    contact: "+977 98XXXXXXX",
    availability: JSON.stringify(["Concerts", "Weddings", "Private Events", "TV Shows"]),
    achievements: "Best New Artist (2018) and Artist of the Month (March 2019)",
    popularSongs: JSON.stringify(["Aakhir Maya", "Yo Geet", "Timro Smarana", "Dil Katai"]),
    socialMedia: JSON.stringify({
      facebook: "https://www.facebook.com/sajjanrajvaidya",
      instagram: "https://www.instagram.com/sajjanrajvaidya",
      youtube: "https://www.youtube.com/@SajjanRajVaidya"
    }),
  },
  {
    slug: "sushant-kc",
    name: "Sushant K.C",
    category: "Singers",
    genre: "Pop",
    image: "/images/sushant.jpeg",
    description: "Sushant K.C is a talented Nepali pop singer known for his contemporary music style.",
    experience: "12+ years",
    rating: 4.7,
    reviews: 380,
    bookingFee: "NPR 180,000 - 450,000",
    contact: "+977 98XXXXXXX",
    availability: JSON.stringify(["Concerts", "Weddings", "Corporate Events"]),
    achievements: "Radio Kantipur National Music Awards (NMA) 2081 (2025) for his song Bardali",
    popularSongs: JSON.stringify(["Bardali", "Mayalu", "Sambandha"]),
    socialMedia: JSON.stringify({
      facebook: "https://www.facebook.com/sushantkcofficial",
      instagram: "https://www.instagram.com/sushantk.c"
    }),
  },
  {
    slug: "melina-rai",
    name: "Melina Rai",
    category: "Singers",
    genre: "Pop/Folk",
    image: "/images/melina.jpg",
    description: "Melina Rai is a renowned Nepali singer known for her powerful voice and versatile music style.",
    experience: "15+ years",
    rating: 4.6,
    reviews: 310,
    bookingFee: "NPR 200,000 - 500,000",
    contact: "+977 98XXXXXXX",
    availability: JSON.stringify(["Concerts", "Weddings", "TV Shows", "Private Events"]),
    achievements: "Filmy Khabar Annual Prize (Film Person of the Year Female in 2020)",
    popularSongs: JSON.stringify(["Taal Milaai", "Sambhrama", "Khabar"]),
    socialMedia: JSON.stringify({
      facebook: "https://www.facebook.com/melinaraiofficial",
      instagram: "https://www.instagram.com/melinarai"
    }),
  },
  {
    slug: "dj-ashish",
    name: "DJ Ashish",
    category: "DJs",
    genre: "Electronic/EDM",
    image: "/images/aashish.jpg",
    description: "DJ Ashish is a popular electronic music DJ known for high-energy performances.",
    experience: "10+ years",
    rating: 4.5,
    reviews: 290,
    bookingFee: "NPR 100,000 - 300,000",
    contact: "+977 98XXXXXXX",
    availability: JSON.stringify(["Clubs", "Parties", "Weddings", "Festivals"]),
    achievements: "Best Club DJ Award 2023",
    popularSongs: JSON.stringify(["EDM Mix", "Dance Beats", "Club Vibes"]),
    socialMedia: JSON.stringify({
      facebook: "https://www.facebook.com/djashishnepal",
      instagram: "https://www.instagram.com/dj.ashish"
    }),
  },
  {
    slug: "tenzing-sherpa",
    name: "Tenzing Sherpa",
    category: "DJs",
    genre: "Hip-Hop/Dance",
    image: "/images/tenzing.jpg",
    description: "Tenzing Sherpa is a skilled DJ specializing in hip-hop and dance music.",
    experience: "8+ years",
    rating: 4.4,
    reviews: 250,
    bookingFee: "NPR 80,000 - 250,000",
    contact: "+977 98XXXXXXX",
    availability: JSON.stringify(["Clubs", "Weddings", "Parties", "Events"]),
    achievements: "Top Wedding DJ 2024",
    popularSongs: JSON.stringify(["Hip Hop Remix", "Dance Mix", "Wedding Beats"]),
    socialMedia: JSON.stringify({
      facebook: "https://www.facebook.com/tenzingsherpadj",
      instagram: "https://www.instagram.com/tenzing.dj"
    }),
  },
  {
    slug: "kutumba",
    name: "Kutumba",
    category: "Bands",
    genre: "Classical",
    image: "/images/kutumba.jpg",
    description: "Kutumba is a classical music ensemble preserving traditional Nepali and Indian classical traditions.",
    experience: "25+ years",
    rating: 4.8,
    reviews: 180,
    bookingFee: "NPR 150,000 - 500,000",
    contact: "+977 98XXXXXXX",
    availability: JSON.stringify(["Cultural Events", "Concerts", "Government Functions"]),
    achievements: "Traditional Music Excellence Award",
    popularSongs: JSON.stringify(["Classical Raag", "Devotional Music"]),
    socialMedia: JSON.stringify({
      facebook: "https://www.facebook.com/kutumbamusic",
      instagram: "https://www.instagram.com/kutumba.music"
    }),
  },
];

const seedArtists = async () => {
  try {
    console.log("🔄 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ Database connected");

    console.log("🔄 Seeding hardcoded artists...");
    
    for (const artistData of hardcodedArtists) {
      const exists = await Artist.findOne({ where: { name: artistData.name } });
      
      if (!exists) {
        await Artist.create(artistData);
        console.log(`✅ Created: ${artistData.name}`);
      } else {
        console.log(`⏭️  Already exists: ${artistData.name}`);
      }
    }

    console.log("✅ Seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding artists:", error.message);
    process.exit(1);
  }
};

seedArtists();
