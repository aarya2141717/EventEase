import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      // If not logged in, redirect to login page
      navigate("/login");
    } else {
      // If logged in, go to dashboard
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
            <a href="#" onClick={handleDashboardClick}>Dashboard</a>
          </nav>

          {isAuthenticated() ? (
            <div className="user-menu">
              <div className="user-info">
                <FaUserCircle size={30} />
                <span className="user-name">{user?.fullName || "User"}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn-nav">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="profile-icon">
              <FaUserCircle size={30} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
