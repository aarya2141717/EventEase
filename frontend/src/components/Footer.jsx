export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>EventEase</h3>
        <p>Your ultimate event booking platform.</p>
        <p className="tagline">Making events memorable since 2024</p>
      </div>

      <div className="footer-section">
        <h4>Services</h4>
        <ul>
          <li>Venue Booking</li>
          <li>Artist Management</li>
          <li>Photography</li>
          <li>Event Planning</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Contact</h4>
        <p>📍 Kathmandu, Nepal</p>
        <p>📧 info@eventease.com</p>
        <p>📞 +977-1-4234567</p>
      </div>

      <div className="footer-section">
        <h4>Follow Us</h4>
        <div className="social-links">
          <a href="#facebook">Facebook</a>
          <a href="#instagram">Instagram</a>
          <a href="#twitter">Twitter</a>
        </div>
      </div>
    </footer>
  );
}

