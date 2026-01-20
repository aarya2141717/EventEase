import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./VenueDetails.css";
import { getImagePath, handleImageError } from "../utils/imageHelper";

// Venue data
const venuesData = {
  "smart-palace": {
    id: "smart-palace",
    name: "Smart Palace",
    location: "Chabahil / Chuchhepati area",
    category: "Banquet",
    rating: 4.5,
    reviews: 977,
    image: "/images/smart palace 1.jpg",
    description: "Smart Palace is a premier event venue offering luxurious spaces for weddings, corporate events, and celebrations. Located in the heart of Chabahil, it features state-of-the-art facilities and elegant interiors.",
    capacity: "500-1000 guests",
    amenities: ["Air Conditioning", "Parking Available", "Catering Services", "Sound System", "Stage Setup", "Decoration Services"],
    price: "NPR 150,000 - 300,000",
    contact: "+977 9812345678",
    images: [
      "/images/smart palace 1.jpg",
      "/images/smart palace.webp",
      "/images/smart palace 2.jpg",
    ]
  },
  "queens-palace-events": {
    id: "queens-palace-events",
    name: "Queen's Palace & Events",
    location: "Sukedhara Chowk",
    category: "Banquet",
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
      "/images/queens palace 1.jpg",
      "/images/queen palace 2 .jpg"
    ]
  },
  "silver-oak-banquet": {
    id: "silver-oak-banquet",
    name: "Silver Oak Banquet",
    location: "Gairidhara, Kathmandu",
    category: "Banquet",
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
      "/images/silveroak 1.jpg",
      "/images/silveroak 2.jpg"
    ]
  },
  "dorjes-resort-spa": {
    id: "dorjes-resort-spa",
    name: "Dorje's Resort & Spa",
    location: "Dhulikhel",
    category: "Resorts",
    rating: 4.6,
    reviews: 820,
    image: "/images/Dorje's Resort & Spa 1.jpg",
    description: "Dorje's Resort & Spa is a tranquil venue nestled in the scenic beauty of Dhulikhel. Ideal for weddings and retreats, it offers luxurious accommodations and top-notch amenities.",
    capacity: "200-600 guests",
    amenities: ["Resort Accommodation", "Spa Services", "Outdoor Venues", "Catering Options", "Adventure Activities", "Event Coordination"],
    price: "NPR 250,000 - 500,000",
    contact: "+977 9845678901",
    images: [
      "/images/Dorje's Resort & Spa 1.jpg",
      "/images/Dorje's Resort & Spa 2.jpg",
      "/images/Dorje's Resort & Spa 3.jpeg"
    ]
  },
  "fish-tail-lodge": {
    id: "fish-tail-lodge",
    name: "Fish Tail Lodge",
    location: "Kathmandu",
    category: "Resorts",
    rating: 4.3,
    reviews: 750,
    image: "/images/Fish Tail Lodge.jpg",
    description: "Fish Tail Lodge is a unique venue offering a rustic charm and natural surroundings. Perfect for intimate gatherings and outdoor celebrations.",
    capacity: "100-300 guests",
    amenities: ["Natural Setting", "Outdoor Fire Pit", "Catering Services", "Event Planning", "Photography Services"],
    price: "NPR 120,000 - 250,000",
    contact: "+977 9856789012",
    images: [
      "/images/fish tail lodge 1.jpg",
      "/images/fish tail lodge 2.avif",
      "/images/fish tail lodge 3.avif"
    ]
  },
  "jimbu-thakali": {
    id: "jimbu-thakali",
    name: "Jimbu Thakali By Capital Grill",
    location: "Kathmandu",
    category: "Restaurants",
    rating: 4.5,
    reviews: 900,
    image: "/images/Jimbu Thakali By Capital Grill 1.jpg",
    description: "Jimbu Thakali By Capital Grill offers an authentic Thakali dining experience with a cozy ambiance. Ideal for small gatherings and cultural events.",
    capacity: "50-150 guests",
    amenities: ["Authentic Cuisine", "Cozy Ambiance", "Catering Services", "Event Planning"],
    price: "NPR 80,000 - 150,000",
    contact: "+977 9867890123",
    images: [
      "/images/Jimbu Thakali By Capital Grill 1.jpg",
      "/images/Jimbu Thakali By Capital Grill 2.webp",
      "/images/Jimbu Thakali By Capital Grill 3.jpg"
    ]
  },
  "hotel-mystic-mountain": {
    id: "hotel-mystic-mountain",
    name: "Hotel Mystic Mountain",
    location: "Nagarkot",
    category: "Resorts",
    rating: 4.6,
    reviews: 1100,
    image: "/images/Hotel Mystic Mountain 3.jpg",
    description: "Hotel Mystic Mountain is a serene venue located in Nagarkot, perfect for weddings and corporate retreats. Enjoy breathtaking views and exceptional service.",
    capacity: "150-400 guests",
    amenities: ["Scenic Views", "Resort Accommodation", "Catering Services", "Event Planning", "Outdoor Venues"],
    price: "NPR 220,000 - 450,000",
    contact: "+977 9878901234",
    images: [
      "/images/Hotel Mystic Mountain 3.jpg",
      "/images/Hotel Mystic Mountain 1.avif",
      "/images/Hotel Mystic Mountain 2.avif"
    ]
  },
  "patio-soaltee": {
    id: "patio-soaltee",
    name: "Patio - The Soaltee Kathmandu",
    location: "Soaltee Mode",
    category: "Restaurants",
    rating: 4.4,
    reviews: 950,
    image: "/images/Patio-The Soaltee Kathmandu 2.jpg",
    description: "Patio - The Soaltee Kathmandu is a stylish venue offering a blend of modern elegance and traditional charm. Perfect for weddings and social events.",
    capacity: "250-600 guests",
    amenities: ["Elegant Interiors", "Catering Services", "Audio Visual Equipment", "Event Planning", "Bridal Room"],
    price: "NPR 200,000 - 400,000",
    contact: "+977 9889012345",
    images: [
      "/images/Patio-The Soaltee Kathmandu 2.jpg",
      "/images/Patio-The Soaltee Kathmandu 1.jpg",
      "/images/Patio-The Soaltee Kathmandu 3.jpg"
    ]
  },
 "The White House Villa": {
  id: "The White House Villa",
  name: "The White House Villa",
  location: "Tarakeshwor‑2, Kavresthali, Kathmandu, Nepal",
  category: "Villas",
  rating: 4.8,
  reviews: 10,
  image: "/images/The White House Villa 3.webp",
  description: "A spacious 8‑bedroom private villa in the lush hills north of Kathmandu with a private swimming pool, expansive indoor and outdoor spaces, and scenic valley and city views — perfect for family, group stays, and tranquil retreats.",
  capacity: "Up to 20+ guests",
  amenities: [
    "8 Bedrooms & Bathrooms",
    "Private Swimming Pool",
    "Fully Equipped Kitchen",
    "Free Wi‑Fi",
    "Garden & Terrace",
    "Parking",
    "Mountain & Valley Views"
  ],
  price: "Varies by season / contact host for current rates",
  contact: "+977‑9820150997",
  images: [
    "/images/The White House Villa 3.webp",
    "/images/The White House Villa 1.webp",
    "/images/The White House Villa 2.webp"
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
    navigate('/venue-booking', { state: { venue } });
  };

  return (
    <div className="venue-details-page">

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
            <img 
              src={getImagePath(venue.image)} 
              alt={venue.name}
              data-original-src={venue.image}
              onError={(e) => handleImageError(e)}
            />
          </div>
          <div className="thumbnail-images">
            {venue.images.slice(1).map((img, index) => (
              <img 
                key={index} 
                src={getImagePath(img)} 
                alt={`${venue.name} ${index + 2}`}
                data-original-src={img}
                onError={(e) => handleImageError(e)}
              />
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
    </div>
  );
};

export default VenueDetails;