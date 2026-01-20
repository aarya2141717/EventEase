import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Venue.css";
import { getImagePath, handleImageError } from "../utils/imageHelper";

const venuesData = [
  {
    id: "smart-palace",
    name: "Smart Palace",
    location: "Chabahil, Kathmandu",
    rating: 4.5,
    reviews: 977,
    category: "Banquets",
    description: "Perfect for weddings, parties, and corporate events.",
    image: "/images/smart palace 1.jpg",
  },
  {
    id: "queens-palace-events",
    name: "Queen's Palace & Events",
    location: "Sukedhara Chowk",
    rating: 4.8,
    reviews: 600,
    category: "Banquets",
    description: "Garden meets timeless elegance",
    image: "/images/queens palace.jpg",
  },
  {
    id: "silver-oak-banquet",
    name: "Silver Oak Banquet",
    location: "Gairidhara, Kathmandu",
    rating: 4.4,
    reviews: 1400,
    category: "Banquets",
    description: "Premium banquet & dining",
    image: "/images/silveroak.jpg",
  },
  {
    id: "dorjes-resort-spa",
    name: "Dorje's Resort & Spa",
    location: "Dhulikhel",
    rating: 4.6,
    reviews: 820,
    category: "Resorts",
    description: "Luxury resort with scenic views",
    image: "/images/Dorje's Resort & Spa 1.jpg",
  },
  {
    id: "fish-tail-lodge",
    name: "Fish Tail Lodge",
    location: "Pokhara",
    rating: 4.7,
    reviews: 1200,
    category: "Resorts",
    description: "Lakeside heritage resort",
    image: "/images/Fish Tail Lodge.jpg",
  },
  {
    id: "jimbu-thakali",
    name: "Jimbu Thakali By Capital Grill",
    location: "Kathmandu",
    rating: 4.5,
    reviews: 900,
    category: "Restaurants",
    description: "Authentic Thakali cuisine",
    image: "/images/Jimbu Thakali By Capital Grill.jpg",
  },
  {
    id: "hotel-mystic-mountain",
    name: "Hotel Mystic Mountain",
    location: "Nagarkot",
    rating: 4.6,
    reviews: 1100,
    category: "Resorts",
    description: "Mountain view luxury hotel",
    image: "/images/Hotel Mystic Mountain.jpg",
  },
  {
    id: "patio-soaltee",
    name: "Patio - The Soaltee Kathmandu",
    location: "Soaltee Mode",
    rating: 4.4,
    reviews: 950,
    category: "Restaurants",
    description: "Premium dining experience",
    image: "/images/Patio-The Soaltee Kathmandu.jpg",
  },
  {
   id: "The White House Villa",
name: "The White House Villa",
location: "Tarakeshwar‑2, Kavresthali, Kathmandu, Nepal",
rating: 4.4,
reviews: 620,
category: "Villas / Holiday Home",
description: "Cozy Group Retreat and Luxury Family Stay",
image: "/images/The White House Villa.avif"

  },
];

const Venue = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredVenues =
    activeCategory === "All"
      ? venuesData
      : venuesData.filter(
          (venue) => venue.category === activeCategory
        );

  return (
    <div className="venues-page">
      <div className="venues-content">
        {/* HEADER */}
        <div className="page-header">
          <h1>Featured Venues</h1>
          <p>Find the perfect venue for your special event</p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="category-tabs">
          {["All", "Banquets", "Villas", "Restaurants", "Resorts"].map((category) => (
            <button
              key={category}
              className={`category-tab ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* VENUE GRID */}
        <div className="venues-grid">
          {filteredVenues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <div className="venue-image">
                <img 
                  src={getImagePath(venue.image)} 
                  alt={venue.name}
                  data-original-src={venue.image}
                  onError={(e) => handleImageError(e)}
                />
              </div>

              <div className="venue-details">
                <h3>{venue.name}</h3>
                <p className="venue-location">{venue.location}</p>

                <div className="venue-rating">
                  ⭐ {venue.rating} ({venue.reviews}+ reviews)
                </div>

                <p className="venue-description">
                  {venue.description}
                </p>

                <div className="venue-actions">
                  <Link
                    to={`/venue/${venue.id}`}
                    className="profile-btn"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/venue/${venue.id}`}
                    className="book-btn"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Venue;
