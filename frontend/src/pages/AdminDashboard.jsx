import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [venuesRes, artistsRes] = await Promise.all([
        fetch("http://localhost:5000/api/venues"),
        fetch("http://localhost:5000/api/artists")
      ]);

      if (venuesRes.ok) {
        const venuesData = await venuesRes.json();
        setVenues(venuesData);
      }

      if (artistsRes.ok) {
        const artistsData = await artistsRes.json();
        setArtists(artistsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVenue = async (venueId, venueName) => {
    if (!window.confirm(`Are you sure you want to delete "${venueName}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/venues/${venueId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setDeleteMessage(`✓ Venue "${venueName}" deleted successfully`);
        fetchData();
        setTimeout(() => setDeleteMessage(""), 3000);
      } else {
        setDeleteMessage(`✗ Failed to delete venue`);
      }
    } catch (error) {
      console.error("Error deleting venue:", error);
      setDeleteMessage(`✗ Error deleting venue`);
    }
  };

  const handleDeleteArtist = async (artistId, artistName) => {
    if (!window.confirm(`Are you sure you want to delete "${artistName}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/artists/${artistId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setDeleteMessage(`✓ Artist "${artistName}" deleted successfully`);
        fetchData();
        setTimeout(() => setDeleteMessage(""), 3000);
      } else {
        setDeleteMessage(`✗ Failed to delete artist`);
      }
    } catch (error) {
      console.error("Error deleting artist:", error);
      setDeleteMessage(`✗ Error deleting artist`);
    }
  };

  const stats = [
    { label: "Total Users", value: "1,234", icon: "👥", color: "#ff5a1f" },
    { label: "Total Venues", value: venues.length.toString(), icon: "🏢", color: "#00bcd4" },
    { label: "Total Artists", value: artists.length.toString(), icon: "🎤", color: "#667eea" },
    { label: "Total Bookings", value: "892", icon: "📅", color: "#10b981" },
  ];

  const recentBookings = [
    { id: 1, customer: "John Doe", venue: "Smart Palace", date: "2025-01-15", status: "Confirmed" },
    { id: 2, customer: "Jane Smith", venue: "Queen's Palace", date: "2025-01-16", status: "Pending" },
    { id: 3, customer: "Mike Johnson", artist: "Raju Lama", date: "2025-01-17", status: "Confirmed" },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title-section">
          <img src="/images/logos-removebg-preview.png" alt="EventEase" className="dashboard-logo" />
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user?.fullName || "Admin"}!</p>
          </div>
        </div>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>

      <div className="dashboard-content">
        {deleteMessage && (
          <div style={{ 
            background: deleteMessage.includes("✓") ? "#d1fae5" : "#fee2e2", 
            color: deleteMessage.includes("✓") ? "#065f46" : "#dc2626", 
            padding: "16px", 
            borderRadius: "8px", 
            marginBottom: "20px" 
          }}>
            {deleteMessage}
          </div>
        )}

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <span className="stat-icon-emoji">{stat.icon}</span>
              </div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="dashboard-section">
          <h2>Recent Bookings</h2>
          <div className="table-container">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Venue/Artist</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>#{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.venue || booking.artist}</td>
                    <td>{booking.date}</td>
                    <td>
                      <span className={`status-badge ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-card" onClick={() => navigate('/vendor/add-venue')}>
              <span className="action-icon">➕</span>
              <span>Add Venue</span>
            </button>
            <button 
              className="action-card"
              onClick={() => navigate('/admin/add-artist')}
            >
              <span className="action-icon">🎤</span>
              <span>Add Artist</span>
            </button>
            <button className="action-card">
              <span className="action-icon">👥</span>
              <span>Manage Users</span>
            </button>
            <button className="action-card">
              <span className="action-icon">⚙️</span>
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Manage Venues */}
        <div className="dashboard-section">
          <h2>Manage Venues</h2>
          {loading ? (
            <p>Loading venues...</p>
          ) : venues.length === 0 ? (
            <p>No venues added yet</p>
          ) : (
            <div className="table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {venues.map((venue) => (
                    <tr key={venue.id}>
                      <td>{venue.name}</td>
                      <td>{venue.location || "N/A"}</td>
                      <td>{venue.category || "N/A"}</td>
                      <td>{venue.price || "N/A"}</td>
                      <td>
                        <button 
                          className="action-btn"
                          onClick={() => handleDeleteVenue(venue.id, venue.name)}
                          style={{ background: "#dc2626", color: "white" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Manage Artists */}
        <div className="dashboard-section">
          <h2>Manage Artists</h2>
          {loading ? (
            <p>Loading artists...</p>
          ) : artists.length === 0 ? (
            <p>No artists added yet</p>
          ) : (
            <div className="table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Genre</th>
                    <th>Experience</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {artists.map((artist) => (
                    <tr key={artist.id}>
                      <td>{artist.name}</td>
                      <td>{artist.category || "N/A"}</td>
                      <td>{artist.genre || "N/A"}</td>
                      <td>{artist.experience || "N/A"}</td>
                      <td>
                        <button 
                          className="action-btn"
                          onClick={() => handleDeleteArtist(artist.id, artist.name)}
                          style={{ background: "#dc2626", color: "white" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
