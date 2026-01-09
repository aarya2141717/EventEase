import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const UserDashboard = () => {
  const { user, logout } = useAuth();

  const myBookings = [
    { id: 1, venue: "Smart Palace", artist: "Raju Lama", date: "2025-01-20", status: "Confirmed", type: "Venue" },
    { id: 2, venue: "Queen's Palace", date: "2025-01-25", status: "Pending", type: "Venue" },
    { id: 3, artist: "The Elements", date: "2025-02-01", status: "Confirmed", type: "Artist" },
  ];

  const upcomingEvents = myBookings.filter(booking => booking.status === "Confirmed");

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title-section">
          <img src="/images/logos-removebg-preview.png" alt="EventEase" className="dashboard-logo" />
          <div>
            <h1>My Dashboard</h1>
            <p>Welcome back, {user?.fullName || "User"}!</p>
          </div>
        </div>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>

      <div className="dashboard-content">
        {/* User Info Card */}
        <div className="dashboard-section">
          <div className="user-info-card">
            <div className="user-avatar">
              <span>{user?.fullName?.charAt(0) || "U"}</span>
            </div>
            <div className="user-details">
              <h2>{user?.fullName || "User"}</h2>
              <p>📧 {user?.email || "user@example.com"}</p>
              {user?.phone && <p>📱 {user.phone}</p>}
              {user?.location && <p>📍 {user.location}</p>}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid user-stats">
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: "#ff5a1f20", color: "#ff5a1f" }}>
              <span className="stat-icon-emoji">📅</span>
            </div>
            <div className="stat-info">
              <div className="stat-value">{myBookings.length}</div>
              <div className="stat-label">Total Bookings</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: "#10b98120", color: "#10b981" }}>
              <span className="stat-icon-emoji">✓</span>
            </div>
            <div className="stat-info">
              <div className="stat-value">{upcomingEvents.length}</div>
              <div className="stat-label">Upcoming Events</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: "#ffa50020", color: "#ffa500" }}>
              <span className="stat-icon-emoji">⏳</span>
            </div>
            <div className="stat-info">
              <div className="stat-value">
                {myBookings.filter(b => b.status === "Pending").length}
              </div>
              <div className="stat-label">Pending</div>
            </div>
          </div>
        </div>

        {/* My Bookings */}
        <div className="dashboard-section">
          <h2>My Bookings</h2>
          {myBookings.length === 0 ? (
            <div className="empty-state">
              <p>No bookings yet. Start exploring venues and artists!</p>
              <Link to="/venue" className="explore-btn">Explore Venues</Link>
              <Link to="/artists" className="explore-btn">Explore Artists</Link>
            </div>
          ) : (
            <div className="bookings-grid">
              {myBookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <h3>{booking.venue || booking.artist}</h3>
                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="booking-info">
                    <p className="booking-type">📌 {booking.type}</p>
                    <p className="booking-date">📅 {booking.date}</p>
                    {booking.venue && booking.artist && (
                      <p className="booking-venue">🎤 Artist: {booking.artist}</p>
                    )}
                  </div>
                  <div className="booking-actions">
                    <button className="action-btn">View Details</button>
                    {booking.status === "Pending" && (
                      <button className="action-btn cancel">Cancel</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/venue" className="action-card">
              <span className="action-icon">🏢</span>
              <span>Browse Venues</span>
            </Link>
            <Link to="/artists" className="action-card">
              <span className="action-icon">🎤</span>
              <span>Browse Artists</span>
            </Link>
            <button className="action-card">
              <span className="action-icon">📧</span>
              <span>Contact Support</span>
            </button>
            <button className="action-card">
              <span className="action-icon">⚙️</span>
              <span>Account Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
