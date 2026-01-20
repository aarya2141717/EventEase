import React, { useState } from "react";
import { Link } from "react-router-dom";
import { venuesData, artists } from "./searchData";
import "./Home.css";
import { getImagePath, handleImageError } from "../utils/imageHelper";

const Home = () => {
  // 🔍 Search state
  const [query, setQuery] = useState("");

  // 🔗 Combine venues + artists
  const allItems = [...venuesData, ...artists];

  // ⚡ Instant filter logic
  const filteredResults = query
    ? allItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <img
            src="/images/logos-removebg-preview.png"
            className="hero-logo"
            alt="EventEase Logo"
          />
          <h1>EventEase</h1>
          <p>Find venues & book artists – all in one place.</p>
          <p className="sub-text">
            Search by capacity, location, price or vibe. Preview featured venues
            and artists, check availability, and complete bookings with secure
            payments.
          </p>

          {/* 🔍 SEARCH */}
          <div className="search-container">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search venues or artists…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* SEARCH RESULTS */}
            {query && (
              <div className="search-results">
                {filteredResults.length > 0 ? (
                  filteredResults.map((item) => (
                    <Link
                      to={item.link}
                      key={item.id}
                      className="search-result-item"
                      onClick={() => setQuery("")}
                    >
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h4>{item.name}</h4>
                        <span>{item.type}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="no-result">No results found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* POPULAR VENUES */}
      <section className="section">
        <div className="section-header">
          <h2>Popular Venues</h2>
          <Link to="/venue" className="see-more">
            See More <span className="arrow">→</span>
          </Link>
        </div>

        <div className="grid-3">
          <div className="card">
            <img 
              src={getImagePath("/images/smart palace.webp")} 
              alt="Smart Palace"
              onError={(e) => handleImageError(e)}
            />
            <div className="card-info">
              <h3>Smart Palace</h3>
              <p className="address">Chabahil / Chuchhepati area</p>
            </div>
            <div className="card-bottom">
              <span className="rating">⭐ 4.5 (977+ reviews)</span>
              <Link to="/venue/smart-palace" className="view-btn">
                View
              </Link>
            </div>
          </div>

          <div className="card">
            <img src="/images/queens palace.jpg" alt="Queen's Palace" />
            <div className="card-info">
              <h3>Queen's Palace & Events</h3>
              <p className="address">Sukedhara Chowk</p>
            </div>
            <div className="card-bottom">
              <span className="rating">⭐ 4.8 (600+ reviews)</span>
              <Link to="/venue/queens-palace" className="view-btn">
                View
              </Link>
            </div>
          </div>

          <div className="card">
            <img src="/images/silveroak.jpg" alt="Silver Oak" />
            <div className="card-info">
              <h3>Silver Oak Banquet and Events</h3>
              <p className="address">Gairidhara, Kathmandu</p>
            </div>
            <div className="card-bottom">
              <span className="rating">⭐ 4.4 (1400+ reviews)</span>
              <Link to="/venue/silver-oak" className="view-btn">
                View
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTISTS */}
      <section className="section">
        <div className="section-header">
          <h2>Featured Artists</h2>
          <Link to="/artists" className="see-more">
            View All Artists <span className="arrow">→</span>
          </Link>
        </div>

        <div className="artists-grid">
          {artists.map((artist) => (
            <div className="artist-card" key={artist.id}>
              <div className="artist-img-container">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="artist-img"
                />
              </div>
              <div className="artist-info">
                <h3>{artist.name}</h3>
                <p className="artist-role">{artist.type}</p>
                <div className="card-bottom">
                  <Link to={artist.link} className="artist-view-btn">
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
