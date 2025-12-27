import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Venue.css";

const venuesData = [
  {
    id: 1,
    name: "Smart Palace",
    location: "Chabahil, Kathmandu",
    rating: 4.5,
    reviews: 977,
    category: "Villas",
    description: "3 bedroom villa with Swimming Pool",
    image: "/images/garden-plaza.jpg",
  },
  {
    id: 2,
    name: "Queen's Palace & Events",
    location: "Sukedhara Chowk",
    rating: 4.8,
    reviews: 600,
    category: "Villas",
    description: "Garden meets timeless elegance",
    image: "/images/Queen's palace.jpg",
  },
  {
    id: 3,
    name: "Silver Oak Banquet",
    location: "Gairidhara, Kathmandu",
    rating: 4.4,
    reviews: 1400,
    category: "Restaurants",
    description: "Premium banquet & dining",
    image: "/images/silveroak.jpg",
  },
  {
    id: 4,
    name: "Dorje's Resort & Spa",
    location: "Dhulikhel",
    rating: 4.6,
    reviews: 820,
    category: "Resorts",
    description: "Luxury resort with scenic views",
    image: "/images/Dorje's Resort & Spa.jpg",
  },
  {
    id: 5,
    name: "Fish Tail Lodge",
    location: "Pokhara",
    rating: 4.7,
    reviews: 1200,
    category: "Resorts",
    description: "Lakeside heritage resort",
    image: "/images/Fish Tail Lodge.jpg",
  },
  {
    id: 6,
    name: "Jimbu Thakali By Capital Grill",
    location: "Kathmandu",
    rating: 4.5,
    reviews: 900,
    category: "Restaurants",
    description: "Authentic Thakali cuisine",
    image: "/images/Jimbu Thakali By Capital Grill.jpg",
  },
  {
    id: 7,
    name: "Hotel Mystic Mountain",
    location: "Nagarkot",
    rating: 4.6,
    reviews: 1100,
    category: "Resorts",
    description: "Mountain view luxury hotel",
    image: "/images/Hotel Mystic Mountain.jpg",
  },
  {
    id: 8,
    name: "Patio - The Soaltee Kathmandu",
    location: "Soaltee Mode",
    rating: 4.4,
    reviews: 950,
    category: "Restaurants",
    description: "Premium dining experience",
    image: "/images/Patio-The Soaltee Kathmandu.jpg",
  },
  {
    id: 9,
    name: "Pinnacle Residency",
    location: "Lazimpat",
    rating: 4.3,
    reviews: 670,
    category: "Villas",
    description: "Modern luxury residency",
    image: "/images/Pinnacle Residency.jpg",
  },
  {
    id: 10,
    name: "Raksi Music Bar",
    location: "Thamel",
    rating: 4.2,
    reviews: 540,
    category: "Restaurants",
    description: "Live music & bar",
    image: "/images/Raksi Music Bar.jpg",
  },
  {
    id: 11,
    name: "Rooftop Terrace",
    location: "Kathmandu",
    rating: 4.5,
    reviews: 780,
    category: "Restaurants",
    description: "Open-air rooftop venue",
    image: "/images/rooftop-terrace.jpg",
  },
];

const Venue = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredVenues =
    activeCategory === "All"
      ? venuesData
      : venuesData.filter(v => v.category === activeCategory);

  return (
    <div className="venues-page">
      {/* NAVBAR (SAME AS ARTISTS) */}
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

      {/* MAIN CONTENT */}
      <div className="venues-content">
        <div className="page-header">
          <h1>Featured Venues</h1>
          <p>Find the perfect venue for your special event</p>
        </div>

        {/* CATEGORY BUTTONS */}
        <div className="category-tabs">
          {["All", "Villas", "Restaurants", "Resorts"].map(category => (
            <button
              key={category}
              className={`category-tab ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* VENUE GRID */}
        <div className="venues-grid">
          {filteredVenues.map(venue => (
            <div key={venue.id} className="venue-card">
              <div className="venue-image">
                <img src={venue.image} alt={venue.name} />
              </div>

              <div className="venue-details">
                <h3>{venue.name}</h3>
                <p className="venue-location">{venue.location}</p>

                <div className="venue-rating">
                  ⭐ {venue.rating} ({venue.reviews}+ reviews)
                </div>

                <p className="venue-description">{venue.description}</p>

                <div className="venue-actions">
                  <Link to={`/venue/${venue.id}`} className="profile-btn">
                    View Details
                  </Link>
                  <Link to={`/venue/${venue.id}`} className="book-btn">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER (OPTIONAL BUT MATCHING ARTISTS) */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>EventEase</h3>
            <p>Your ultimate platform for booking events and artists.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Venue;