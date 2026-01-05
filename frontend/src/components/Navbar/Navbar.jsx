import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
  <div className="nav-container">

    <div className="brand">
      <Link to="/">
        <img src="/images/logos.jpg" className="logo-img" alt="EventEase" />
      </Link>
      <div className="brand-text">
        <span className="brand-title">EventEase</span>
        <small className="brand-tag">Book venue & artists - fast</small>
      </div>
    </div>

    <div className="nav-right">
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/venue">Venue</Link>
        <Link to="/artists">Artists</Link>
        <Link to="/eventspace">EventSpace</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Link to="/profile" className="profile-icon">
        <FaUserCircle size={30} />
      </Link>
    </div>

  </div>
</header>
  );
};

export default Navbar;
