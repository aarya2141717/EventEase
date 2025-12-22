// frontend/src/pages/ArtistDetails.jsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ArtistDetails.css";

// Artist data from your screenshot
const artistsData = {
  "raju-lama": {
    id: "raju-lama",
    name: "Raju Lama",
    type: "Singer",
    image: "/images/artists/raju-lama.jpg",
    description: "Raju Lama is a renowned Nepali singer and composer, best known as the lead vocalist of the band 'Mongolian Heart'. He has been a prominent figure in the Nepali music industry for over two decades.",
    awards: [
      "Hits FM & Kanipur FM awards for best albums/songs (2002-2005)"
    ],
    genre: ["Pop", "Rock", "Adhunik"],
    experience: "25+ years",
    languages: ["Nepali", "Hindi", "English"],
    performances: "5000+ shows",
    bookingFee: "NPR 200,000 - 500,000",
    contact: "+977 98XXXXXXX",
    availability: ["Available for Weddings", "Corporate Events", "Concerts", "Private Parties"],
    socialMedia: {
      facebook: "https://facebook.com/rajulamamusic",
      instagram: "https://instagram.com/rajulamamusic",
      youtube: "https://youtube.com/rajulamamusic"
    },
    popularSongs: ["Mayalu", "Samjhi Baschu", "Hijo Aaja Bholi", "Parkhai Parkhai"]
  },
  "the-elements": {
    id: "the-elements",
    name: "The Elements",
    type: "Band",
    image: "/images/artists/the-elements.jpg",
    description: "The Elements is a popular Nepali rock band known for their unique fusion of traditional Nepali music with contemporary rock. Formed in 2005, they have gained a massive following across Nepal.",
    awards: [
      "Best Newcomer (2006)",
      "Best International Album (2009)"
    ],
    genre: ["Rock", "Fusion", "Alternative"],
    experience: "18+ years",
    members: ["John Doe (Vocals)", "Jane Smith (Guitar)", "Robert Brown (Bass)", "Mike Wilson (Drums)"],
    performances: "1000+ shows",
    bookingFee: "NPR 300,000 - 800,000",
    contact: "+977 98XXXXXXX",
    availability: ["Concerts", "Festivals", "Corporate Events", "College Events"],
    socialMedia: {
      facebook: "https://facebook.com/theelements",
      instagram: "https://instagram.com/theelements",
      spotify: "https://spotify.com/theelements"
    },
    popularSongs: ["Wave", "Elements", "Riverside", "Mountain High"]
  },
  "kuma-sagar-khwopa": {
    id: "kuma-sagar-khwopa",
    name: "Kuma Sagar & The Khwopa",
    type: "Band",
    image: "/images/artists/kuma-sagar.jpg",
    description: "Kuma Sagar & The Khwopa is a traditional Nepali folk music band that preserves and promotes authentic Nepali cultural music with a modern touch.",
    awards: [
      "Best band award at the National Music Award 2081"
    ],
    genre: ["Folk", "Traditional", "Cultural"],
    experience: "10+ years",
    members: ["Kuma Sagar (Lead Vocal)", "Rajesh Thapa (Sarangi)", "Sita KC (Madal)", "Hari Basnet (Flute)"],
    performances: "800+ shows",
    bookingFee: "NPR 150,000 - 400,000",
    contact: "+977 98XXXXXXX",
    availability: ["Cultural Events", "Weddings", "Festivals", "Government Functions"],
    socialMedia: {
      facebook: "https://facebook.com/kumasagar",
      instagram: "https://instagram.com/kumasagar",
      youtube: "https://youtube.com/kumasagar"
    },
    popularSongs: ["Pahadi Lokgeet", "Basanta Ritu", "Himal Ko Chauri", "Nepali Asmita"]
  },
  "saijan-raj-vaidya": {
    id: "saijan-raj-vaidya",
    name: "Saijan Raj Vaidya",
    type: "Singer",
    image: "/images/artists/saijan-raj.jpg",
    description: "Saijan Raj Vaidya is one of the most popular contemporary Nepali singers, known for his soulful voice and meaningful lyrics. He rose to fame through his debut album and has since become a household name.",
    awards: [
      "Best New Artist (2018)",
      "Artist of the Month (March 2019)"
    ],
    genre: ["Pop", "Adhunik", "Soul"],
    experience: "7+ years",
    languages: ["Nepali", "Hindi"],
    performances: "2000+ shows",
    bookingFee: "NPR 250,000 - 600,000",
    contact: "+977 98XXXXXXX",
    availability: ["Concerts", "Weddings", "Private Events", "TV Shows"],
    socialMedia: {
      facebook: "https://facebook.com/saijanraj",
      instagram: "https://instagram.com/saijanraj",
      tiktok: "https://tiktok.com/@saijanraj"
    },
    popularSongs: ["Jindagiko Gaadi", "Maile Timro", "Kaha Bhetiyela", "Birsana"]
  },
  "sushant-kc": {
    id: "sushant-kc",
    name: "Sushant K.C",
    type: "Singer",
    image: "/images/artists/sushant-kc.jpg",
    description: "Sushant K.C is a versatile Nepali playback singer and performer, known for his powerful voice and emotional renditions. He has contributed to numerous Nepali film soundtracks.",
    awards: [
      "Radio Kanipur National Music Awards (NMA) 2081 (2025) for his song 'Bardali'"
    ],
    genre: ["Playback", "Pop", "Romantic"],
    experience: "12+ years",
    languages: ["Nepali", "Hindi", "Maithili"],
    performances: "3000+ shows",
    bookingFee: "NPR 180,000 - 450,000",
    contact: "+977 98XXXXXXX",
    availability: ["Film Events", "Concerts", "Weddings", "Award Functions"],
    socialMedia: {
      facebook: "https://facebook.com/sushantkc",
      instagram: "https://instagram.com/sushantkcofficial",
      youtube: "https://youtube.com/sushantkc"
    },
    popularSongs: ["Bardali", "Malai Nasodha", "Mero Maya", "Chameli"]
  },
  "melina-rai": {
    id: "melina-rai",
    name: "Melina Rai",
    type: "Singer",
    image: "/images/artists/melina-rai.jpg",
    description: "Melina Rai is a celebrated Nepali singer and actress, known for her melodious voice and significant contributions to both music and film industries.",
    awards: [
      "Filmy Khabar Annual Prize (Film Person of the Year Female in 2020)",
      "Cine Circle Award (2075 BS)"
    ],
    genre: ["Filmi", "Pop", "Folk"],
    experience: "15+ years",
    languages: ["Nepali", "Hindi", "Bhojpuri"],
    performances: "4000+ shows",
    bookingFee: "NPR 220,000 - 550,000",
    contact: "+977 98XXXXXXX",
    availability: ["Film Events", "Concerts", "Cultural Programs", "Private Shows"],
    socialMedia: {
      facebook: "https://facebook.com/melinarai",
      instagram: "https://instagram.com/melinarai",
      twitter: "https://twitter.com/melinarai"
    },
    popularSongs: ["Resham", "Phoolko Aankhama", "Maya Lai Maya", "Sunaulo Sansar"]
  }
};

const ArtistDetails = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const artist = artistsData[artistId];

  if (!artist) {
    return (
      <div className="artist-not-found">
        <h2>Artist not found</h2>
        <Link to="/" className="back-home-btn">Back to Home</Link>
      </div>
    );
  }

  const handleBookArtist = () => {
    navigate('/booking', { state: { artist } });
  };

  return (
    <div className="artist-details-page">
      {/* Navbar - Same as VenueDetails */}
      <header className="navbar">
        <div className="nav-container">
          <div className="brand">
            <Link to="/">
              <img src="/images/logos.jpg" className="logo-img" alt="EventEase Logo" />
            </Link>
            <div className="brand-text">
              <span className="brand-title">EventEase</span>
              <small className="brand-tag">Book venue & artists - fast</small>
            </div>
          </div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/venue">Venue</Link>
            <Link to="/artists">Artists</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/booking" className="book-btn">Book Now</Link>
            <Link to="/login" className="login-btn">Log In</Link>
          </nav>
        </div>
      </header>

      {/* Artist Details Content */}
      <div className="artist-details-container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/artists">Artists</Link> / <span>{artist.name}</span>
        </div>

        <div className="artist-header">
          <div className="artist-profile">
            <div className="artist-image">
              <img src={artist.image || "/images/default-artist.jpg"} alt={artist.name} />
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
                {artist.awards.map((award, index) => (
                  <div key={index} className="award-item">
                    <span className="trophy-icon">🏆</span>
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="details-section">
              <h2>Artist Details</h2>
              <div className="detail-item">
                <strong>Genre:</strong> {artist.genre.join(", ")}
              </div>
              {artist.members && (
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
                  {artist.availability.map((item, index) => (
                    <span key={index} className="availability-tag">{item}</span>
                  ))}
                </div>
              </div>
            </section>

            <section className="songs-section">
              <h2>Popular Songs</h2>
              <div className="songs-grid">
                {artist.popularSongs.map((song, index) => (
                  <div key={index} className="song-item">
                    <span className="music-icon">🎵</span>
                    <span>{song}</span>
                  </div>
                ))}
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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>EventEase</h3>
            <p>Your ultimate platform for booking events and venues.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArtistDetails;