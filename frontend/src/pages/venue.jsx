import { useState, useEffect } from "react";

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/venues");
      const data = await response.json();
      setVenues(data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // Use default data
      setVenues([
        { id: 1, name: "Soaltee Crowne Plaza", location: "Tahachal, Kathmandu", image: "venue1.jpg", price: "Rs. 150,000", rating: "4.8" },
        { id: 2, name: "Hotel Annapurna", location: "Durbar Marg, Kathmandu", image: "venue2.jpg", price: "Rs. 120,000", rating: "4.7" },
        { id: 3, name: "Hyatt Regency", location: "Boudha, Kathmandu", image: "venue3.jpg", price: "Rs. 180,000", rating: "4.9" },
        { id: 4, name: "Radisson Hotel", location: "Lazimpat, Kathmandu", image: "venue4.jpg", price: "Rs. 140,000", rating: "4.6" },
        { id: 5, name: "Yak & Yeti", location: "Durbar Marg, Kathmandu", image: "venue5.jpg", price: "Rs. 160,000", rating: "4.8" },
        { id: 6, name: "The Everest Hotel", location: "New Baneshwor, Kathmandu", image: "venue6.jpg", price: "Rs. 130,000", rating: "4.7" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="artists-page-exact">
      {/* Simple Page Title */}
      <div className="artists-title-section">
        <h1>Venues</h1>
      </div>

      {/* Venues Grid - 3 Columns, Same as Home Page Featured Artists */}
      <div className="section">
        {loading ? (
          <div className="loading-simple">Loading...</div>
        ) : (
          <div className="grid-3">
            {venues.map((venue) => (
              <div key={venue.id} className="card">
                <img src={`/images/${venue.image}`} alt={venue.name} />
                <div className="card-info">
                  <h3>{venue.name}</h3>
                  <p className="role">{venue.location}</p>
                </div>
                <div className="card-bottom">
                  <div className="rating">{venue.price}</div>
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
          We connect you with the best venues in Nepal. Every venue on our platform is verified, 
          professional, and ready to make your event unforgettable.
        </p>

        <div className="why-features">
          <div className="why-item">
            <span className="why-check">✓</span>
            <div>
              <h4>Verified Venues</h4>
              <p>All venues are professionally vetted and reviewed by our team</p>
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