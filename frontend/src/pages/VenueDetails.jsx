import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./VenueDetails.css";

// Venue data
const venuesData = {
  "smart-palace": {
    id: "smart-palace",
    name: "Smart Palace",
    location: "Chabahil / Chuchhepati area",
    rating: 4.5,
    reviews: 977,
    image: "/images/smart palace.webp",
    description: "Smart Palace is a premier event venue offering luxurious spaces for weddings, corporate events, and celebrations. Located in the heart of Chabahil, it features state-of-the-art facilities and elegant interiors.",
    capacity: "500-1000 guests",
    amenities: ["Air Conditioning", "Parking Available", "Catering Services", "Sound System", "Stage Setup", "Decoration Services"],
    price: "NPR 150,000 - 300,000",
    contact: "+977 9812345678",
    images: [
      "/images/smart palace.webp",
      "/images/smart palace.webp",
      "/images/smart palace.webp"
    ]
  },
  "queens-palace": {
    id: "queens-palace",
    name: "Queen's Palace & Events",
    location: "Sukedhara Chowk",
    rating: 4.8,
    reviews: 600,
    image: "/images/queens palace.jpg",
    description: "Queen's Palace & Events is an elegant venue perfect for weddings, receptions, and grand celebrations. With modern amenities and professional staff, we ensure your event is memorable.",
    capacity: "300-800 guests",
    amenities: ["Premium Interiors", "Valet Parking", "In-house Catering", "LED Screens", "Bridal Room", "Photography Services"],
    price: "NPR 200,000 - 400,000",
    contact: "+977 9823456789",
    images: [
      "/images/queens palace.jpg",
      "/images/queens palace.jpg",
      "/images/queens palace.jpg"
    ]
  },
  "silver-oak": {
    id: "silver-oak",
    name: "Silver Oak Banquet and Events",
    location: "Gairidhara, Kathmandu",
    rating: 4.4,
    reviews: 1400,
    image: "/images/silveroak.jpg",
    description: "Silver Oak Banquet offers a sophisticated setting for your special occasions. Our spacious halls and professional services make every event extraordinary.",
    capacity: "400-900 guests",
    amenities: ["Modern Architecture", "Ample Parking", "Multi-cuisine Catering", "Audio Visual Equipment", "Green Spaces", "Event Planning"],
    price: "NPR 180,000 - 350,000",
    contact: "+977 9834567890",
    images: [
      "/images/silveroak.jpg",
      "/images/silveroak.jpg",
      "/images/silveroak.jpg"
    ]
  }
};

const VenueDetails = () => {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const venue = venuesData[venueId];

  if (!venue) {
    return (
      <div className="venue-not-found">
        <h2>Venue not found</h2>
        <Link to="/" className="back-home-btn">Back to Home</Link>
      </div>
    );
  }

  const handleBookVenue = () => {
    navigate('/booking', { state: { venue } });
  };

  return (
    <div className="venue-details-page">
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

      {/* Venue Details Content */}
      <div className="venue-details-container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/venue">Venues</Link> / <span>{venue.name}</span>
        </div>

        <div className="venue-header">
          <h1>{venue.name}</h1>
          <div className="venue-meta">
            <span className="location">📍 {venue.location}</span>
            <span className="rating">⭐ {venue.rating} ({venue.reviews}+ reviews)</span>
          </div>
        </div>

        <div className="venue-images">
          <div className="main-image">
            <img src={venue.image} alt={venue.name} />
          </div>
          <div className="thumbnail-images">
            {venue.images.slice(1).map((img, index) => (
              <img key={index} src={img} alt={`${venue.name} ${index + 2}`} />
            ))}
          </div>
        </div>

        <div className="venue-content">
          <div className="venue-main-info">
            <section className="description-section">
              <h2>About this Venue</h2>
              <p>{venue.description}</p>
            </section>

            <section className="amenities-section">
              <h2>Amenities & Services</h2>
              <div className="amenities-grid">
                {venue.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span className="amenity-icon">✓</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="capacity-section">
              <h2>Venue Details</h2>
              <div className="detail-item">
                <strong>Capacity:</strong> {venue.capacity}
              </div>
              <div className="detail-item">
                <strong>Price Range:</strong> {venue.price}
              </div>
              <div className="detail-item">
                <strong>Contact:</strong> {venue.contact}
              </div>
            </section>
          </div>

          <div className="venue-sidebar">
            <div className="booking-card">
              <h3>Book This Venue</h3>
              <div className="price-info">
                <span className="price-label">Starting from</span>
                <span className="price-amount">{venue.price.split('-')[0].trim()}</span>
              </div>
              <button className="book-venue-btn" onClick={handleBookVenue}>
                Book This Venue
              </button>
              <p className="booking-note">* Final price depends on date, time, and requirements</p>
            </div>

            <div className="contact-card">
              <h3>Need Help?</h3>
              <p>Contact our support team for any queries</p>
              <button className="contact-btn">Contact Support</button>
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

export default VenueDetails;