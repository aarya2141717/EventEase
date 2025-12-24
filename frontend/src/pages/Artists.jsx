import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Artists.css";

const Artists = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const artists = [
    {
      id: "raju-lama",
      name: "Raju Lama",
      category: "Singers",
      genre: "Pop/Rock",
      image: "/images/raju.jpg",
      rating: 4.8,
      reviews: 520,
      experience: "20+ years",
      achievements: "Hits FM & Kantipur FM awards for best albums/songs (2002-2005)"
    },
    {
      id: "the-elements",
      name: "The Elements",
      category: "Bands",
      genre: "Rock",
      image: "/images/elements.jpg",
      rating: 4.7,
      reviews: 340,
      experience: "18+ years",
      achievements: "Best Newcomer (2006) and Best International Album (2009)"
    },
    {
      id: "kuma-sagar-khwopa",
      name: "Kuma Sagar & The Khwopa",
      category: "Bands",
      genre: "Folk/Contemporary",
      image: "/images/kuma.jpeg",
      rating: 4.9,
      reviews: 280,
      experience: "10+ years",
      achievements: "Best band award at the National Music Award 2081"
    },
    {
      id: "sajjan-raj-vaidya",
      name: "Sajjan Raj Vaidya",
      category: "Singers",
      genre: "Pop/Soul",
      image: "/images/sajan.jpg",
      rating: 4.8,
      reviews: 450,
      experience: "8+ years",
      achievements: "Best New Artist (2018) and Artist of the Month (March 2019)"
    },
    {
      id: "sushant-kc",
      name: "Sushant K.C",
      category: "Singers",
      genre: "Pop",
      image: "/images/sushant.jpeg",
      rating: 4.7,
      reviews: 380,
      experience: "12+ years",
      achievements: "Radio Kantipur National Music Awards (NMA) 2081 (2025) for his song Bardali"
    },
    {
      id: "melina-rai",
      name: "Melina Rai",
      category: "Singers",
      genre: "Pop/Folk",
      image: "/images/melina.jpg",
      rating: 4.6,
      reviews: 310,
      experience: "15+ years",
      achievements: "Filmy Khabar Annual Prize (Film Person of the Year Female in 2020)"
    },
    {
      id: "artist-7",
      name: "DJ Ashish",
      category: "DJs",
      genre: "Electronic/EDM",
      image: "/images/artist1.jpg",
      rating: 4.5,
      reviews: 290,
      experience: "10+ years",
      achievements: "Best Club DJ Award 2023"
    },
    {
      id: "artist-8",
      name: "DJ Krish",
      category: "DJs",
      genre: "Hip-Hop/Dance",
      image: "/images/artist2.png",
      rating: 4.4,
      reviews: 250,
      experience: "8+ years",
      achievements: "Top Wedding DJ 2024"
    },
    {
      id: "artist-9",
      name: "Classical Ensemble",
      category: "Bands",
      genre: "Classical",
      image: "/images/artist3.jpg",
      rating: 4.8,
      reviews: 180,
      experience: "25+ years",
      achievements: "Traditional Music Excellence Award"
    }
  ];

  const categories = ["All", "Singers", "Bands", "DJs"];

  const filteredArtists = selectedCategory === "All" 
    ? artists 
    : artists.filter(artist => artist.category === selectedCategory);

  return (
    <div className="artists-page">
      {/* Navbar */}
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

      {/* Main Content */}
      <div className="artists-content">
        <div className="page-header">
          <h1>Featured Artists</h1>
          <p>Discover talented performers for your next event</p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              <span className="badge">Popular</span>
            </button>
          ))}
        </div>

        {/* Artists Grid */}
        <div className="artists-grid">
          {filteredArtists.map((artist) => (
            <div key={artist.id} className="artist-card">
              <div className="artist-image">
                <img src={artist.image} alt={artist.name} />
                <div className="artist-badge">{artist.category}</div>
              </div>
              <div className="artist-details">
                <h3>{artist.name}</h3>
                <p className="artist-genre">{artist.genre}</p>
                <p className="artist-experience">Experience: {artist.experience}</p>
                <div className="artist-rating">
                  <span className="stars">⭐ {artist.rating}</span>
                  <span className="reviews">({artist.reviews}+ reviews)</span>
                </div>
                <p className="artist-achievements">{artist.achievements}</p>
                <div className="artist-actions">
                  <Link to={`/artist/${artist.id}`} className="profile-btn">View Profile</Link>
                  <Link to={`/artist/${artist.id}`} className="book-artist-btn">Book Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>EventEase</h3>
            <p>Your ultimate platform for booking events and artists.</p>
          </div>
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><Link to="/venue">Venue</Link></li>
              <li><Link to="/artists">Artists</Link></li>
              <li><a href="#">Videography</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Quick Lines</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/venue">Venue</Link></li>
              <li><Link to="/booking">Book now</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact us</h3>
            <p>Kathmandu, Nepal<br />+977 9823812398<br />info@eventease.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Artists;