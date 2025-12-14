import { useState, useEffect } from "react";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/artists");
      const data = await response.json();
      setArtists(data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // Use default data
      setArtists([
        { id: 1, name: "The Elements", role: "Band", image: "elements.jpg", rating: "4.8" },
        { id: 2, name: "Bartika Eam Rai", role: "Singer", image: "bartika.jpg", rating: "4.9" },
        { id: 3, name: "Albatross", role: "Band", image: "albatross.jpg", rating: "4.7" },
        { id: 4, name: "Sajan Raj Vaidya", role: "Singer", image: "sajan.jpg", rating: "4.8" },
        { id: 5, name: "John and The Locals", role: "Band", image: "johnlocals.jpg", rating: "4.9" },
        { id: 6, name: "Swoopna Suman", role: "Singer", image: "swoopna.jpg", rating: "4.6" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="artists-page-exact">
      {/* Simple Page Title */}
      <div className="artists-title-section">
        <h1>Artists</h1>
      </div>

      {/* Artists Grid - 3 Columns, Same as Home Page Featured Artists */}
      <div className="section">
        {loading ? (
          <div className="loading-simple">Loading...</div>
        ) : (
          <div className="grid-3">
            {artists.map((artist) => (
              <div key={artist.id} className="card">
                <img src={`/images/${artist.image}`} alt={artist.name} />
                <div className="card-info">
                  <h3>{artist.name}</h3>
                  <p className="role">{artist.role}</p>
                </div>
                <div className="card-bottom">
                  <div className="rating">⭐ {artist.rating}</div>
                  <button className="view-btn">View</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* About Us Section with Images */}
      <div className="about-us-artists">
        <div className="about-left-images">
          <img src="/images/venue.jpg" alt="Venue" className="about-img-1" />
          <div className="about-badge">
            <div className="badge-number">145</div>
            <div className="badge-text">VENUES</div>
          </div>
          <img src="/images/singer.jpg" alt="Singer" className="about-img-2" />
        </div>

        <div className="about-right-content">
          <h2>ABOUT US</h2>
          <p>
            EventEase connects you with Nepal's finest artists and venues. 
            We make event planning seamless and stress-free.
          </p>
          <button className="contact-us-btn">Contact Us</button>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="why-choose-artists">
        <h2>Why Choose EventEase?</h2>
        <p className="why-subtitle">
          We connect you with the best artists in Nepal. Every performer on our platform is verified, 
          professional, and ready to make your event unforgettable.
        </p>

        <div className="why-features">
          <div className="why-item">
            <span className="why-check">✓</span>
            <div>
              <h4>Excellent Sessions & Advices</h4>
              <p>All artists are professionally vetted and reviewed by our team</p>
            </div>
          </div>

          <div className="why-item">
            <span className="why-check">✓</span>
            <div>
              <h4>Easy Booking</h4>
              <p>Simple booking process with instant confirmation and support</p>
            </div>
          </div>

          <div className="why-item">
            <span className="why-check">✓</span>
            <div>
              <h4>24/7 Support</h4>
              <p>Our dedicated team is always available to help you succeed</p>
            </div>
          </div>
        </div>

        <button className="book-artist-btn">Book Now</button>
      </div>
    </div>
  );
}