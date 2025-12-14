export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Plan Your Perfect Event with Ease</h1>
          <p className="subtitle">
            From venues to artists, we bring everything together to create unforgettable moments
          </p>

          {/* Search Box */}
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search for venues, artists, or services..." />
          </div>
        </div>
      </div>

      {/* Featured Venues Section */}
      <div className="section">
        <div className="section-header">
          <h2>Featured Venues</h2>
          <a href="#" className="see-more">
            See more <span className="arrow">→</span>
          </a>
        </div>

        <div className="grid-3">
          <div className="card">
            <img src="/images/venue.jpg" alt="Venue" />
            <div className="card-info">
              <h3>Grand Ballroom</h3>
              <p className="address">Kathmandu, Nepal</p>
            </div>
            <div className="card-bottom">
              <div className="rating">⭐ 4.8</div>
              <button className="view-btn">View</button>
            </div>
          </div>

          <div className="card">
            <img src="/images/garden-plaza.jpg" alt="Venue" />
            <div className="card-info">
              <h3>Garden Plaza</h3>
              <p className="address">Lalitpur, Nepal</p>
            </div>
            <div className="card-bottom">
              <div className="rating">⭐ 4.9</div>
              <button className="view-btn">View</button>
            </div>
          </div>

          <div className="card">
            <img src="/images/rooftop-terrace.jpg" alt="Venue" />
            <div className="card-info">
              <h3>Rooftop Terrace</h3>
              <p className="address">Pokhara, Nepal</p>
            </div>
            <div className="card-bottom">
              <div className="rating">⭐ 4.7</div>
              <button className="view-btn">View</button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Artists Section */}
      <div className="section">
        <div className="section-header">
          <h2>Featured Artists</h2>
          <a href="/artists" className="see-more">
            See more <span className="arrow">→</span>
          </a>
        </div>

        <div className="grid-3">
          <div className="card">
            <img src="/images/elements.jpg" alt="Artist" />
            <div className="card-info">
              <h3>The Elements</h3>
              <p className="role">Band</p>
            </div>
            <div className="card-bottom">
              <div className="rating">⭐ 4.8</div>
              <button className="view-btn">View</button>
            </div>
          </div>

          <div className="card">
            <img src="/images/bartika.jpg" alt="Artist" />
            <div className="card-info">
              <h3>Bartika Eam Rai</h3>
              <p className="role">Singer</p>
            </div>
            <div className="card-bottom">
              <div className="rating">⭐ 4.9</div>
              <button className="view-btn">View</button>
            </div>
          </div>

          <div className="card">
            <img src="/images/albatross.jpg" alt="Artist" />
            <div className="card-info">
              <h3>Albatross</h3>
              <p className="role">Band</p>
            </div>
            <div className="card-bottom">
              <div className="rating">⭐ 4.7</div>
              <button className="view-btn">View</button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <div className="about-content">
          <h1>ABOUT US</h1>
          <p>
            EventEase makes planning events easy and stress-free. We connect you with the best 
            venues and artists to make your events memorable.
          </p>
          <a href="#" className="explore-btn">Explore more</a>
        </div>

        <div className="about-images">
          <div className="image-card venue-hall">
            <img src="/images/venue.jpg" alt="Venue Hall" />
            <div className="venue-badge">
              <span className="number">200+</span>
              <span className="label">VENUES</span>
            </div>
          </div>

          <div className="image-card venue-resort">
            <img src="/images/venue.jpg" alt="Resort" />
          </div>

          <div className="image-card performer">
            <img src="/images/singer.jpg" alt="Performer" />
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="why-choose-section">
        <div className="why-choose-content">
          <h1>Why Choose EventEase?</h1>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div className="feature-content">
                <h3>Curated Venues & Artists</h3>
                <p>Hand-picked selection of the finest venues and talented artists</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div className="feature-content">
                <h3>Easy Booking</h3>
                <p>Simple booking process with instant confirmation</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div className="feature-content">
                <h3>24/7 Support</h3>
                <p>Our team is always here to help you</p>
              </div>
            </div>
          </div>

          <button className="book-now-btn">Book now</button>
        </div>
      </div>
    </div>
  );
}