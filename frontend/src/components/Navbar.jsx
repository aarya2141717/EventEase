import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="logo-text">
              <span className="logo-title">EventEase</span>
              <span className="logo-subtitle">Make events a party</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/venues">Venues</Link>
          <Link to="/artists">Artists</Link>
          <Link to="/event-spaces">Event Spaces</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        {/* Buttons */}
        <div className="nav-icons">
          <button className="login-btn">Login</button>
          <button className="book-btn">Book now</button>
        </div>
      </div>
    </nav>
  );
}