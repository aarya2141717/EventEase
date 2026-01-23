import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [myVenues, setMyVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editVenue, setEditVenue] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [venuesRes, bookingsRes] = await Promise.all([
        fetch("http://localhost:5000/api/venues/mine", { headers }),
        fetch("http://localhost:5000/api/bookings/vendor", { headers }),
      ]);

      if (venuesRes.ok) {
        const data = await venuesRes.json();
        setMyVenues(data);
      }

      if (bookingsRes.ok) {
        const data = await bookingsRes.json();
        setBookings(data);
      }
    } catch (error) {
      setMessage("Unable to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVenue = async (venueId, venueName) => {
    if (!window.confirm(`Delete ${venueName}?`)) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/venues/${venueId}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (response.ok) {
        setMessage("Venue removed");
        fetchData();
      } else {
        setMessage("Failed to delete venue");
      }
    } catch (error) {
      setMessage("Error deleting venue");
    }
  };

  const beginEditVenue = (venue) => {
    setEditVenue({
      id: venue.id,
      name: venue.name,
      location: venue.location || "",
      category: venue.category || "",
      capacity: venue.capacity || "",
      price: venue.price || "",
      contact: venue.contact || "",
      amenities: Array.isArray(venue.amenities) ? venue.amenities.join(",") : "",
      description: venue.description || "",
    });
  };

  const handleVenueUpdate = async (e) => {
    e.preventDefault();
    if (!editVenue) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/venues/${editVenue.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(editVenue),
      });
      if (response.ok) {
        setMessage("Venue updated");
        setEditVenue(null);
        fetchData();
      } else {
        setMessage("Failed to update venue");
      }
    } catch (error) {
      setMessage("Error updating venue");
    }
  };

  const stats = [
    { label: "My Venues", value: myVenues.length.toString(), icon: "🏢", color: "#ff5a1f" },
    { label: "Bookings", value: bookings.length.toString(), icon: "📅", color: "#00bcd4" },
    { label: "Pending", value: bookings.filter(b => b.status === "pending").length.toString(), icon: "⏳", color: "#ffa500" },
    { label: "Confirmed", value: bookings.filter(b => b.status === "confirmed").length.toString(), icon: "✓", color: "#10b981" },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title-section">
          <img src="/images/logos-removebg-preview.png" alt="EventEase" className="dashboard-logo" />
          <div>
            <h1>Vendor Dashboard</h1>
            <p>Welcome back, {user?.fullName || "Vendor"}!</p>
          </div>
        </div>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>

      <div className="dashboard-content">
        {message && (
          <div style={{ background: "#e0f2fe", color: "#0369a1", padding: "12px", borderRadius: "8px", marginBottom: "12px" }}>
            {message}
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

        {/* My Listings */}
        <div className="dashboard-section">
          <h2>My Listings</h2>
          {loading ? (
            <p>Loading...</p>
          ) : myVenues.length === 0 ? (
            <div className="empty-state">
              <p>No venues yet. Add your first venue.</p>
              <button className="add-listing-btn" onClick={() => navigate('/vendor/add-venue')}>
                + Add New Venue
              </button>
            </div>
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
                  {myVenues.map((venue) => (
                    <tr key={venue.id}>
                      <td>{venue.name}</td>
                      <td>{venue.location || "-"}</td>
                      <td>{venue.category || "-"}</td>
                      <td>{venue.price || "-"}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn" onClick={() => beginEditVenue(venue)}>Edit</button>
                          <button className="action-btn reject" onClick={() => handleDeleteVenue(venue.id, venue.name)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button 
                className="add-listing-btn"
                onClick={() => navigate('/vendor/add-venue')}
              >
                + Add New Venue
              </button>
            </div>
          )}
        </div>

        {editVenue && (
          <div className="dashboard-section">
            <h2>Edit Venue</h2>
            <form onSubmit={handleVenueUpdate} className="simple-form">
              <div className="form-row">
                <input value={editVenue.name} onChange={(e) => setEditVenue({ ...editVenue, name: e.target.value })} placeholder="Name" required />
                <input value={editVenue.location} onChange={(e) => setEditVenue({ ...editVenue, location: e.target.value })} placeholder="Location" />
                <input value={editVenue.category} onChange={(e) => setEditVenue({ ...editVenue, category: e.target.value })} placeholder="Category" />
              </div>
              <div className="form-row">
                <input value={editVenue.capacity} onChange={(e) => setEditVenue({ ...editVenue, capacity: e.target.value })} placeholder="Capacity" />
                <input value={editVenue.price} onChange={(e) => setEditVenue({ ...editVenue, price: e.target.value })} placeholder="Price" />
                <input value={editVenue.contact} onChange={(e) => setEditVenue({ ...editVenue, contact: e.target.value })} placeholder="Contact" />
              </div>
              <textarea value={editVenue.description} onChange={(e) => setEditVenue({ ...editVenue, description: e.target.value })} placeholder="Description" />
              <input value={editVenue.amenities} onChange={(e) => setEditVenue({ ...editVenue, amenities: e.target.value })} placeholder="Amenities (comma separated)" />
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setEditVenue(null)}>Cancel</button>
                <button type="submit" className="logout-btn">Save</button>
              </div>
            </form>
          </div>
        )}

        {/* Recent Booking Requests */}
        <div className="dashboard-section">
          <h2>Recent Booking Requests</h2>
          <div className="table-container">
            {bookings.length === 0 ? (
              <p>No booking requests yet</p>
            ) : (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Venue</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>#{booking.id.slice(0, 6)}</td>
                      <td>{booking.contactName}</td>
                      <td>{booking.itemName}</td>
                      <td>{booking.startDate || booking.eventDate || "-"}</td>
                      <td>
                        <span className={`status-badge ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button 
              className="action-card"
              onClick={() => navigate('/vendor/add-venue')}
            >
              <span className="action-icon">➕</span>
              <span>Add Venue</span>
            </button>
            <button className="action-card">
              <span className="action-icon">📊</span>
              <span>View Analytics</span>
            </button>
            <button className="action-card">
              <span className="action-icon">⚙️</span>
              <span>Settings</span>
            </button>
            <button className="action-card">
              <span className="action-icon">📧</span>
              <span>Messages</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
