import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { getImagePath, handleImageError } from "../utils/imageHelper";

const Home = () => {
  
  return (
    <>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <img 
          src={getImagePath("/images/logos-removebg-preview.png")} 
          className="hero-logo" 
          alt="EventEase Logo"
          onError={(e) => handleImageError(e)}
        />
          <h1>EventEase</h1>
          <p>Find venues & book artists – all in one place.</p>
          <p className="sub-text">
            Search by capacity, location, price or vibe. Preview featured venues and artists, check availability, and complete bookings with secure payments.
          </p>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search for venues and artists…" />
          </div>
        </div>
      </section>

      {/* POPULAR VENUES */}
      <section className="section">
        <div className="section-header">
          <h2>Popular Venues</h2>
          <Link to="/venue" className="see-more">See More <span className="arrow">→</span></Link>
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
              <Link to="/venue/smart-palace" className="view-btn">View</Link>
            </div>
          </div>

          <div className="card">
            <img 
              src={getImagePath("/images/queens palace.jpg")} 
              alt="Queen's Palace & Events"
              onError={(e) => handleImageError(e)}
            />
            <div className="card-info">
              <h3>Queen's Palace & Events</h3>
              <p className="address">Sukedhara Chowk</p>
            </div>
            <div className="card-bottom">
              <span className="rating">⭐ 4.8 (600+ reviews)</span>
              <Link to="/venue/queens-palace" className="view-btn">View</Link>
            </div>
          </div>

          <div className="card">
            <img 
              src={getImagePath("/images/silveroak.jpg")} 
              alt="Silver Oak Banquet and Events"
              onError={(e) => handleImageError(e)}
            />
            <div className="card-info">
              <h3>Silver Oak Banquet and Events</h3>
              <p className="address">Gairidhara, Kathmandu</p>
            </div>
            <div className="card-bottom">
              <span className="rating">⭐ 4.4 (1400+ reviews)</span>
              <Link to="/venue/silver-oak" className="view-btn">View</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
  <div className="section-header">
    <h2>Featured Artists</h2>
    <Link to="/artists" className="see-more">View All Artists <span className="arrow">→</span></Link>
  </div>
  <div className="artists-grid">
    
    {/* Artist 1: Raju Lama */}
    <div className="artist-card">
      <div className="artist-img-container">
        <img 
          src={getImagePath("/images/raju.jpg")} 
          alt="Raju Lama" 
          className="artist-img"
          onError={(e) => handleImageError(e)}
        />
      </div>
      <div className="artist-info">
        <h3>Raju Lama</h3>
        <p className="artist-role">Singer</p>
        <p className="artist-highlights">Hits FM & Kantipur FM awards for best albums/songs (2002-2005)</p>
        <div className="card-bottom">
          <Link to="/artist/raju-lama" className="artist-view-btn">View Profile</Link>
        </div>
      </div>
    </div>

    {/* Artist 2: The Elements */}
    <div className="artist-card">
      <div className="artist-img-container">
        <img 
          src={getImagePath("/images/elements.jpg")} 
          alt="The Elements" 
          className="artist-img"
          onError={(e) => handleImageError(e)}
        />
      </div>
      <div className="artist-info">
        <h3>The Elements</h3>
        <p className="artist-role">Band</p>
        <p className="artist-highlights">Best Newcomer (2006) and Best International Album (2009)</p>
        <div className="card-bottom">
          <Link to="/artist/the-elements" className="artist-view-btn">View Profile</Link>
        </div>
      </div>
    </div>

    {/* Artist 3: Kuma Sagar & The Khwopa */}
    <div className="artist-card">
      <div className="artist-img-container">
        <img 
          src={getImagePath("/images/kuma.jpeg")} 
          alt="Kuma Sagar & The Khwopa" 
          className="artist-img"
          onError={(e) => handleImageError(e)}
        />
      </div>
      <div className="artist-info">
        <h3>Kuma Sagar & The Khwopa</h3>
        <p className="artist-role">Band</p>
        <p className="artist-highlights">Best band award at the National Music Award 2081</p>
        <div className="card-bottom">
          <Link to="/artist/kuma-sagar-khwopa" className="artist-view-btn">View Profile</Link>
        </div>
      </div>
    </div>

    {/* Artist 4: Sajjan Raj Vaidya */}
    <div className="artist-card">
      <div className="artist-img-container">
        <img 
          src={getImagePath("/images/sajan.jpg")} 
          alt="Sajjan Raj Vaidya" 
          className="artist-img"
          onError={(e) => handleImageError(e)}
        />
      </div>
      <div className="artist-info">
        <h3>Sajjan Raj Vaidya</h3>
        <p className="artist-role">Singer</p>
        <p className="artist-highlights">Best New Artist (2018) and Artist of the Month (March 2019)</p>
        <div className="card-bottom">
          <Link to="/artist/saijan-raj-vaidya" className="artist-view-btn">View Profile</Link>
        </div>
      </div>
    </div>

    {/* Artist 5: Sushant K.C */}
    <div className="artist-card">
      <div className="artist-img-container">
        <img 
          src={getImagePath("/images/sushant.jpeg")} 
          alt="Sushant K.C" 
          className="artist-img"
          onError={(e) => handleImageError(e)}
        />
      </div>
      <div className="artist-info">
        <h3>Sushant K.C</h3>
        <p className="artist-role">Singer</p>
        <p className="artist-highlights">Radio Kantipur National Music Awards (NMA) 2081 (2025) for his song "Bardali"</p>
        <div className="card-bottom">
          <Link to="/artist/sushant-kc" className="artist-view-btn">View Profile</Link>
        </div>
      </div>
    </div>

    {/* Artist 6: Melina Rai */}
    <div className="artist-card">
      <div className="artist-img-container">
        <img 
          src={getImagePath("/images/melina.jpg")} 
          alt="Melina Rai" 
          className="artist-img"
          onError={(e) => handleImageError(e)}
        />
      </div>
      <div className="artist-info">
        <h3>Melina Rai</h3>
        <p className="artist-role">Singer</p>
        <p className="artist-highlights">Filmy Khabar Annual Prize (Film Person of the Year Female in 2020), and a Cine Circle Award (2075 BS)</p>
        <div className="card-bottom">
          <Link to="/artist/melina-rai" className="artist-view-btn">View Profile</Link>
        </div>
      </div>
    </div>

  </div>
</section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-content">
          <h1>ABOUT US</h1>
          <p>EventEase makes planning events easy and stress-free. We connect you with the best venues and talented artists so you can create unforgettable moments. From parties to concerts, we help bring your vision to life.</p>
          <Link to="/about" className="explore-btn">EXPLORE MORE</Link>
        </div>
        <div className="about-images">
          <div className="image-card venue-hall">
            <img 
              src={getImagePath("/images/eventhall.webp")} 
              alt="Event Hall"
              onError={(e) => handleImageError(e)}
            />
          </div>
          <div className="image-card venue-resort">
            <img 
              src={getImagePath("/images/resort.avif")} 
              alt="Resort Venue"
              onError={(e) => handleImageError(e)}
            />
            <div className="venue-badge">
              <span className="number">10+</span>
              <span className="label">Venues</span>
            </div>
          </div>
          <div className="image-card performer">
            <img 
              src={getImagePath("/images/nepathya.jpg")} 
              alt="Performer"
              onError={(e) => handleImageError(e)}
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="why-choose-section">
        <div className="why-choose-content">
          <h1>Why Choose EventEase?</h1>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div className="feature-content">
                <h3>Curated Venues & Artists</h3>
                <p>We handpick the best venues and performers to ensure quality experiences.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div className="feature-content">
                <h3>Easy Booking</h3>
                <p>Simple and intuitive booking system with instant confirmation.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div className="feature-content">
                <h3>24/7 Support</h3>
                <p>Our team is available round-the-clock to help plan your perfect event.</p>
              </div>
            </div>
          </div>
          <Link to="/booking" className="book-now-btn">Book now</Link>
        </div>
      </section>
    </>
  );
};

export default Home;