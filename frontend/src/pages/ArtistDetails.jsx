import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ArtistDetails.css";
import { getImagePath, handleImageError } from "../utils/imageHelper";

// Artist data
const artistsData = {
  "raju-lama": {
    id: "raju-lama",
    name: "Raju Lama",
    type: "Singer",
    image: "/images/raju.jpg",
    description: "Raju Lama is a renowned Nepali singer and composer, best known as the lead vocalist of the band 'Mongolian Heart'. He has been a prominent figure in the Nepali music industry for over two decades.",
    awards: [
      "Hits FM & Kantipur FM awards for best albums/songs (2002-2005)",
      "Winning Coach on The Voice of Nepal Season 4",
      "Successfully summited Mt. Everest and performed at 6,574m for Climate Change (2022)"
    ],
    genre: ["Pop", "Rock", "Adhunik"],
    experience: "25+ years",
    languages: ["Nepali", "Hindi", "English"],
    performances: "5000+ shows",
    bookingFee: "NPR 200,000 - 500,000",
    contact: "+977 98XXXXXXX",
    availability: ["Available for Weddings", "Corporate Events", "Concerts", "Private Parties"],
    socialMedia: {
      facebook: "https://www.facebook.com/therajulamaofficial",
    youtube: "https://www.youtube.com/@RajuLamaMongolianHeart",
    instagram: "https://www.instagram.com/therajulamaofficial"
    },
    popularSongs: ["Mayalu", "Samjhi Baschu", "Hijo Aaja Bholi", "Parkhai Parkhai"]
  },
  "the-elements": {
    id: "the-elements",
    name: "The Elements",
    type: "Band",
    image: "/images/elements.jpg",
    description: "The Elements is a popular Nepali rock band known for their unique fusion of traditional Nepali music with contemporary rock. Formed in 2005, they have gained a massive following across Nepal.",
    awards: [
    "Best Newcomer (2006)",
      "Best International Album (2009)",
      "YouTube Silver Creator Award for reaching 100k+ subscribers"
    ],
    genre: ["Rock", "Fusion", "Alternative"],
    experience: "18+ years",
    members: ["John Doe (Vocals)", "Jane Smith (Guitar)", "Robert Brown (Bass)", "Mike Wilson (Drums)"],
    performances: "1000+ shows",
    bookingFee: "NPR 300,000 - 800,000",
    contact: "+977 98XXXXXXX",
    availability: ["Concerts", "Festivals", "Corporate Events", "College Events"],
    socialMedia: {
      facebook: "https://www.facebook.com/theelementsnepal",
      instagram: "https://www.instagram.com/theelements.nepal",
      youtube: "https://www.youtube.com/@TheElementsNepal"
    },
    popularSongs: ["Wave", "Elements", "Riverside", "Mountain High"]
  },
  "kuma-sagar-khwopa": {
    id: "kuma-sagar-khwopa",
    name: "Kuma Sagar & The Khwopa",
    type: "Band",
    image: "/images/kuma.jpeg",
    description: "Kuma Sagar & The Khwopa is a traditional Nepali folk music band that preserves and promotes authentic Nepali cultural music with a modern touch.",
    awards: [
      "Best band award at the National Music Award 2081",
      "Bhaktapur Youth Icon Award for Cultural Preservation",
      "Special Recognition at Newa Music Festival"
    ],
    genre: ["Folk", "Traditional", "Cultural"],
    experience: "10+ years",
    members: ["Kuma Sagar (Lead Vocal)", "Rajesh Thapa (Sarangi)", "Sita KC (Madal)", "Hari Basnet (Flute)"],
    performances: "800+ shows",
    bookingFee: "NPR 150,000 - 400,000",
    contact: "+977 98XXXXXXX",
    availability: ["Cultural Events", "Weddings", "Festivals", "Government Functions"],
    socialMedia: {
     facebook: "https://www.facebook.com/kumasagar",
      instagram: "https://www.instagram.com/kumasagar",
      youtube: "https://www.youtube.com/@kumasagar"
    },
    popularSongs: ["Pahadi Lokgeet", "Basanta Ritu", "Himal Ko Chauri", "Nepali Asmita"]
  },
  "sajjan-raj-vaidya": {
    id: "saijan-raj-vaidya",
    name: "Saijan Raj Vaidya",
    type: "Singer",
    image: "/images/sajan.jpg",
    description: "Saijan Raj Vaidya is one of the most popular contemporary Nepali singers, known for his soulful voice and meaningful lyrics. He rose to fame through his debut album and has since become a household name.",
    awards: [
   "Best New Artist (2018)",
      "Artist of the Month (March 2019)",
      "Most Streamed Independent Nepali Artist on Digital Platforms"
    ],
    genre: ["Pop", "Adhunik", "Soul"],
    experience: "7+ years",
    languages: ["Nepali", "Hindi"],
    performances: "2000+ shows",
    bookingFee: "NPR 250,000 - 600,000",
    contact: "+977 98XXXXXXX",
    availability: ["Concerts", "Weddings", "Private Events", "TV Shows"],
    socialMedia: {
      facebook: "https://www.facebook.com/sajjanrajvaidya",
      instagram: "https://www.instagram.com/sajjanrajvaidya",
      youtube: "https://www.youtube.com/@sajjanrajvaidya"
    },
    popularSongs: ["Jindagiko Gaadi", "Maile Timro", "Kaha Bhetiyela", "Birsana"]
  },
  "sushant-kc": {
    id: "sushant-kc",
    name: "Sushant K.C",
    type: "Singer",
    image: "/images/sushant.jpeg",
    description: "Sushant K.C is a versatile Nepali playback singer and performer, known for his powerful voice and emotional renditions. He has contributed to numerous Nepali film soundtracks.",
    awards: [
     "Radio Kantipur National Music Awards (NMA) 2081 (2025) for 'Bardali'",
      "Most Streamed Nepali Artist on Spotify with over 50M+ streams",
      "First Nepali Artist to be featured on the global T-Series YouTube channel"
    ],
    genre: ["Playback", "Pop", "Romantic"],
    experience: "12+ years",
    languages: ["Nepali", "Hindi", "Maithili"],
    performances: "3000+ shows",
    bookingFee: "NPR 180,000 - 450,000",
    contact: "+977 98XXXXXXX",
    availability: ["Film Events", "Concerts", "Weddings", "Award Functions"],
    socialMedia: {
      facebook: "hhttps://www.facebook.com/sushantkcofficial",
      instagram: "https://www.instagram.com/sushantkcofficial",
      youtube: "https://www.youtube.com/@SushantKC"
    },
    popularSongs: ["Bardali", "Malai Nasodha", "Mero Maya", "Chameli"]
  },
  "melina-rai": {
    id: "melina-rai",
    name: "Melina Rai",
    type: "Singer",
    image: "/images/melina.jpg",
    description: "Melina Rai is a celebrated Nepali singer and actress, known for her melodious voice and significant contributions to both music and film industries.",
    awards: [
    "Filmy Khabar Annual Prize (Film Person of the Year Female in 2020)",
      "Cine Circle Award (2075 BS) for Best Playback Singer",
      "Winner Coach on The Voice Kids Nepal (2025)"
    ],
    genre: ["Filmi", "Pop", "Folk"],
    experience: "15+ years",
    languages: ["Nepali", "Hindi", "Bhojpuri"],
    performances: "4000+ shows",
    bookingFee: "NPR 220,000 - 550,000",
    contact: "+977 98XXXXXXX",
    availability: ["Film Events", "Concerts", "Cultural Programs", "Private Shows"],
    socialMedia: {
      facebook: "https://www.facebook.com/melinaraiofficial",
      instagram: "https://www.instagram.com/melina.rai.official",
      youtube: "https://www.youtube.com/@melinaraiofficial"
    },
    popularSongs: ["Resham", "Phoolko Aankhama", "Maya Lai Maya", "Sunaulo Sansar"]
  },
  "DJ-ashish": {
    id: "DJ-ashish",
    name: "DJ-ashish",
    type: "DJ",
    image: "/images/aashish.jpg",
    description: "DJ Aashish is a leading figure in the Nepali EDM and club scene, known for his high-energy sets and folk-electronic fusions.",
    awards: [
      "Winner of 'Best Club DJ' at Nepal Nightlife Awards",
      "Featured Artist at Global EDM Festival Dubai",
      "Most Influential DJ in the Kathmandu Club Circuit"
    ],
    genre: ["EDM", "House", "Folk-Fusion"],
    experience: "12+ years",
    languages: ["Nepali", "English"],
    performances: "1500+ club nights",
    bookingFee: "NPR 50,000 - 150,000",
    contact: "+977 98XXXXXXX",
    availability: ["Clubs", "Private Parties", "Music Festivals"],
    socialMedia: { facebook: "https://www.facebook.com/djaashishofficial", instagram: "https://www.instagram.com/djaashish_", youtube: "https://www.youtube.com/c/DJAashish" },
    popularSongs: ["Kathmandu Night Remix", "Folk Beat Drop", "Luku Mari"]
  },
  "Tenzing Sherpa": {
    id: "Tenzing Sherpa",
    name: "Tenzing Sherpa",
    type: "DJ",
    image: "/images/tenzing.jpg",
    description: "Tenzing Sherpa is a trailblazing DJ specializing in deep house and Himalayan techno, often performing in unique high-altitude locations.",
    awards: [
      "Unofficial Record for highest altitude DJ set in the Himalayas",
      "Headliner at Echoes in the Valley Festival",
      "Pioneer of 'Himalayan Techno' genre"
    ],
    genre: ["Deep House", "Techno", "Electronic"],
    experience: "8+ years",
    languages: ["Nepali", "English", "Tibetan"],
    performances: "500+ events",
    bookingFee: "NPR 40,000 - 120,000",
    contact: "+977 98XXXXXXX",
    availability: ["Music Festivals", "Rave Parties", "Private Events"],
    socialMedia: { facebook: "https://www.facebook.com/djtenzingsherpa", instagram: "https://www.instagram.com/dj_tenzing_sherpa", youtube: "https://www.youtube.com/@tenzingsherpa" },
    popularSongs: ["Mountain Echo", "Sherpa Soul", "Lhasa Night Beat"]
  },
  "Kutumba": {
    id: "kutumba",
    name: "Kutumba",
    type: "Band",
    image: "/images/kutumba.jpg",
    description: "Kutumba is an instrumental folk ensemble dedicated to the preservation of indigenous Nepali instruments and sounds.",
    awards: [
      "Cultural Ambassadors of Nepal Award",
      "Best Instrumental Group at National Music Awards",
      "Successfully completed the 'Kutumba World Tour' across 20 countries"
    ],
    genre: ["Folk", "Instrumental", "Traditional"],
    experience: "20+ years",
    members: ["Pavit Maharjan", "Raju Maharjan", "Kiran Nepali", "Siddhartha Maharjan"],
    performances: "2500+ shows",
    bookingFee: "NPR 200,000 - 450,000",
    contact: "+977 98XXXXXXX",
    availability: ["International Tours", "Cultural Festivals", "Corporate Events"],
    socialMedia: { facebook: "https://www.facebook.com/KutumbaNepal", instagram: "https://www.instagram.com/kutumbanepal", youtube: "https://www.youtube.com/user/kutumbaband" },
    popularSongs: ["Utsav", "Sannani", "Panchai Baja", "Himalaya"]
  }
};

const ArtistDetails = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First check hardcoded data
    if (artistsData[artistId]) {
      setArtist(artistsData[artistId]);
      setLoading(false);
    } else {
      // Fetch from API if not in hardcoded data
      const fetchArtist = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/artists`);
          if (response.ok) {
            const artists = await response.json();
            const apiArtist = artists.find(a => a.id === artistId);
            if (apiArtist) {
              // Transform API artist to match expected structure
              const transformedArtist = {
                id: apiArtist.id,
                name: apiArtist.name,
                type: apiArtist.category || "Artist",
                image: apiArtist.image,
                description: apiArtist.description,
                awards: apiArtist.achievements ? apiArtist.achievements.split("\n").filter(Boolean) : [],
                genre: apiArtist.genre ? apiArtist.genre.split(",").map(g => g.trim()) : [],
                experience: apiArtist.experience || "N/A",
                languages: ["Nepali", "English"],
                performances: `${apiArtist.reviews || 0}+ shows`,
                bookingFee: apiArtist.bookingFee,
                contact: apiArtist.contact,
                availability: apiArtist.availability ? JSON.parse(apiArtist.availability) : [],
                socialMedia: apiArtist.socialMedia || {},
                popularSongs: apiArtist.popularSongs ? JSON.parse(apiArtist.popularSongs) : []
              };
              setArtist(transformedArtist);
            }
          }
        } catch (error) {
          console.error("Error fetching artist:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchArtist();
    }
  }, [artistId]);

  if (loading) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <p>Loading artist details...</p>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="artist-not-found">
        <h2>Artist not found</h2>
        <Link to="/" className="back-home-btn">Back to Home</Link>
      </div>
    );
  }

  const handleBookArtist = () => {
    navigate('/artist-booking', { state: { artist } });
  };

  return (
    <div className="artist-details-page">
      {/* Artist Details Content */}
      <div className="artist-details-container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/artists">Artists</Link> / <span>{artist.name}</span>
        </div>

        <div className="artist-header">
          <div className="artist-profile">
            <div className="artist-image">
              <img 
                src={getImagePath(artist.image || "/images/default-artist.jpg")} 
                alt={artist.name}
                onError={(e) => handleImageError(e)}
              />
            </div>
            <div className="artist-basic-info">
              <h1>{artist.name}</h1>
              <p className="artist-type">{artist.type}</p>
              <div className="artist-meta">
                <span className="experience">🎵 {artist.experience} Experience</span>
                <span className="performances">🎤 {artist.performances} Performances</span>
              </div>
              <div className="artist-genres">
                {artist.genre.map((gen, index) => (
                  <span key={index} className="genre-tag">{gen}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="artist-content">
          <div className="artist-main-info">
            <section className="description-section">
              <h2>About {artist.name}</h2>
              <p>{artist.description}</p>
            </section>

            <section className="awards-section">
              <h2>Awards & Achievements</h2>
              <div className="awards-list">
                {artist.awards && artist.awards.length > 0 ? (
                  artist.awards.map((award, index) => (
                    <div key={index} className="award-item">
                      <span className="trophy-icon">🏆</span>
                      <span>{award}</span>
                    </div>
                  ))
                ) : (
                  <p>No awards listed</p>
                )}
              </div>
            </section>

            <section className="details-section">
              <h2>Artist Details</h2>
              <div className="detail-item">
                <strong>Genre:</strong> {artist.genre ? artist.genre.join(", ") : "Various"}
              </div>
              {artist.members && artist.members.length > 0 && (
                <div className="detail-item">
                  <strong>Band Members:</strong>
                  <ul className="members-list">
                    {artist.members.map((member, index) => (
                      <li key={index}>{member}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="detail-item">
                <strong>Languages:</strong> {artist.languages ? artist.languages.join(", ") : "Nepali"}
              </div>
              <div className="detail-item">
                <strong>Availability:</strong>
                <div className="availability-tags">
                  {artist.availability && artist.availability.length > 0 ? (
                    artist.availability.map((item, index) => (
                      <span key={index} className="availability-tag">{item}</span>
                    ))
                  ) : (
                    <span>Contact for availability</span>
                  )}
                </div>
              </div>
            </section>

            <section className="songs-section">
              <h2>Popular Songs</h2>
              <div className="songs-grid">
                {artist.popularSongs && artist.popularSongs.length > 0 ? (
                  artist.popularSongs.map((song, index) => (
                    <div key={index} className="song-item">
                      <span className="music-icon">🎵</span>
                      <span>{song}</span>
                    </div>
                  ))
                ) : (
                  <p>No songs listed</p>
                )}
              </div>
            </section>

            <section className="social-section">
              <h2>Follow {artist.name.split(' ')[0]}</h2>
              <div className="social-links">
                {artist.socialMedia.facebook && (
                  <a href={artist.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-link fb">
                    Facebook
                  </a>
                )}
                {artist.socialMedia.instagram && (
                  <a href={artist.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link ig">
                    Instagram
                  </a>
                )}
                {artist.socialMedia.youtube && (
                  <a href={artist.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="social-link yt">
                    YouTube
                  </a>
                )}
                {artist.socialMedia.spotify && (
                  <a href={artist.socialMedia.spotify} target="_blank" rel="noopener noreferrer" className="social-link sp">
                    Spotify
                  </a>
                )}
              </div>
            </section>
          </div>

          <div className="artist-sidebar">
            <div className="booking-card">
              <h3>Book This Artist</h3>
              <div className="price-info">
                <span className="price-label">Starting from</span>
                <span className="price-amount">{artist.bookingFee.split('-')[0].trim()}</span>
              </div>
              <button className="book-artist-btn" onClick={handleBookArtist}>
                Book This Artist
              </button>
              <p className="booking-note">* Final price depends on event type, duration, and requirements</p>
            </div>

            <div className="contact-card">
              <h3>Contact Details</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Contact:</strong> {artist.contact}
                </div>
                <div className="contact-item">
                  <strong>Email:</strong> booking@eventease.com
                </div>
              </div>
              <button className="inquiry-btn">Send Inquiry</button>
            </div>

            <div className="availability-card">
              <h3>Quick Facts</h3>
              <ul className="facts-list">
                <li>✅ Verified Artist</li>
                <li>✅ Professional Equipment</li>
                <li>✅ Sound Check Included</li>
                <li>✅ Travel Nationwide</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArtistDetails;