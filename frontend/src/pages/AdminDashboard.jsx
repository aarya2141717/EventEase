import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [artists, setArtists] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [editVenue, setEditVenue] = useState(null);
  const [editArtist, setEditArtist] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

      const [venuesRes, artistsRes, bookingsRes] = await Promise.all([
        fetch("http://localhost:5000/api/venues", { headers: authHeaders }),
        fetch("http://localhost:5000/api/artists", { headers: authHeaders }),
        fetch("http://localhost:5000/api/bookings", { headers: authHeaders }),
      ]);

      if (venuesRes.ok) {
        const venuesData = await venuesRes.json();
        setVenues(venuesData);
      }

      if (artistsRes.ok) {
        const artistsData = await artistsRes.json();
        setArtists(artistsData);
      }

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData);
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
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/venues/${venueId}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        }
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
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/artists/${artistId}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        }
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

  const handleAdminApproval = async (bookingId, approved) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/admin-approval`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ approved }),
      });

      if (response.ok) {
        setDeleteMessage(`✓ Booking ${approved ? "approved" : "rejected"} successfully`);
        fetchData();
        setTimeout(() => setDeleteMessage(""), 3000);
      } else {
        setDeleteMessage(`✗ Failed to process booking`);
      }
    } catch (error) {
      console.error("Error processing booking:", error);
      setDeleteMessage(`✗ Error processing booking`);
    }
  };

  const beginEditVenue = (venue) => {
    setEditArtist(null);
    setEditVenue({
      id: venue.id,
      name: venue.name || "",
      location: venue.location || "",
      category: venue.category || "",
      description: venue.description || "",
      capacity: venue.capacity || "",
      price: venue.price || "",
      contact: venue.contact || "",
      amenities: Array.isArray(venue.amenities) ? venue.amenities.join(",") : "",
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
        setDeleteMessage("✓ Venue updated successfully");
        setEditVenue(null);
        fetchData();
        setTimeout(() => setDeleteMessage(""), 3000);
      } else {
        const data = await response.json();
        setDeleteMessage(data.message || "✗ Failed to update venue");
      }
    } catch (error) {
      setDeleteMessage("✗ Error updating venue");
    }
  };

  const beginEditArtist = (artist) => {
    setEditVenue(null);
    setEditArtist({
      id: artist.id,
      name: artist.name || "",
      category: artist.category || "",
      genre: artist.genre || "",
      description: artist.description || "",
      experience: artist.experience || "",
      bookingFee: artist.bookingFee || "",
      contact: artist.contact || "",
      availability: artist.availability ? artist.availability.replace(/\[|\]|"/g, "") : "",
      achievements: artist.achievements || "",
      popularSongs: artist.popularSongs ? artist.popularSongs.replace(/\[|\]|"/g, "") : "",
    });
  };

  const handleArtistUpdate = async (e) => {
    e.preventDefault();
    if (!editArtist) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/artists/${editArtist.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(editArtist),
      });

      if (response.ok) {
        setDeleteMessage("✓ Artist updated successfully");
        setEditArtist(null);
        fetchData();
        setTimeout(() => setDeleteMessage(""), 3000);
      } else {
        const data = await response.json();
        setDeleteMessage(data.message || "✗ Failed to update artist");
      }
    } catch (error) {
      setDeleteMessage("✗ Error updating artist");
    }
  };

  const stats = [
    { label: "Total Venues", value: venues.length.toString(), icon: "🏢", color: "#00bcd4" },
    { label: "Total Artists", value: artists.length.toString(), icon: "🎤", color: "#667eea" },
    { label: "Total Bookings", value: bookings.length.toString(), icon: "📅", color: "#10b981" },
    { label: "Users", value: user?.fullName ? "Admin" : "-", icon: "👥", color: "#ff5a1f" },
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
          <h2>Pending Bookings for Approval</h2>
          <div className="table-container">
            {bookings.length === 0 ? (
              <p>No bookings yet</p>
            ) : (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Item</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Vendor</th>
                    <th>Admin</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.filter(b => b.adminApproval === "pending").map((booking) => (
                    <tr key={booking.id}>
                      <td>#{booking.id.slice(0, 6)}</td>
                      <td>{booking.contactName}</td>
                      <td>{booking.itemName}</td>
                      <td>{booking.startDate || booking.eventDate || "-"}</td>
                      <td>{booking.type}</td>
                      <td>
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          backgroundColor: booking.vendorApproval === "approved" ? "#d1fae5" : booking.vendorApproval === "rejected" ? "#fee2e2" : "#fef3c7",
                          color: booking.vendorApproval === "approved" ? "#065f46" : booking.vendorApproval === "rejected" ? "#7f1d1d" : "#92400e",
                          fontSize: "12px"
                        }}>
                          {booking.vendorApproval}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          backgroundColor: booking.adminApproval === "approved" ? "#d1fae5" : booking.adminApproval === "rejected" ? "#fee2e2" : "#fef3c7",
                          color: booking.adminApproval === "approved" ? "#065f46" : booking.adminApproval === "rejected" ? "#7f1d1d" : "#92400e",
                          fontSize: "12px"
                        }}>
                          {booking.adminApproval}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <button 
                            className="action-btn"
                            onClick={() => handleAdminApproval(booking.id, true)}
                            style={{ background: "#10b981", color: "white", padding: "6px 10px", fontSize: "12px" }}
                          >
                            Approve
                          </button>
                          <button 
                            className="action-btn"
                            onClick={() => handleAdminApproval(booking.id, false)}
                            style={{ background: "#dc2626", color: "white", padding: "6px 10px", fontSize: "12px" }}
                          >
                            Reject
                          </button>
                        </div>
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

        {editVenue && (
          <div className="dashboard-section">
            <h2>Edit Venue</h2>
            <form onSubmit={handleVenueUpdate} className="simple-form">
              <div className="form-row">
                <input
                  value={editVenue.name}
                  onChange={(e) => setEditVenue({ ...editVenue, name: e.target.value })}
                  placeholder="Name"
                  required
                />
                <input
                  value={editVenue.location}
                  onChange={(e) => setEditVenue({ ...editVenue, location: e.target.value })}
                  placeholder="Location"
                />
                <input
                  value={editVenue.category}
                  onChange={(e) => setEditVenue({ ...editVenue, category: e.target.value })}
                  placeholder="Category"
                />
              </div>
              <div className="form-row">
                <input
                  value={editVenue.capacity}
                  onChange={(e) => setEditVenue({ ...editVenue, capacity: e.target.value })}
                  placeholder="Capacity"
                />
                <input
                  value={editVenue.price}
                  onChange={(e) => setEditVenue({ ...editVenue, price: e.target.value })}
                  placeholder="Price"
                />
                <input
                  value={editVenue.contact}
                  onChange={(e) => setEditVenue({ ...editVenue, contact: e.target.value })}
                  placeholder="Contact"
                />
              </div>
              <textarea
                value={editVenue.description}
                onChange={(e) => setEditVenue({ ...editVenue, description: e.target.value })}
                placeholder="Description"
              />
              <input
                value={editVenue.amenities}
                onChange={(e) => setEditVenue({ ...editVenue, amenities: e.target.value })}
                placeholder="Amenities (comma separated)"
              />
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setEditVenue(null)}>
                  Cancel
                </button>
                <button type="submit" className="logout-btn">Save Venue</button>
              </div>
            </form>
          </div>
        )}

        {editArtist && (
          <div className="dashboard-section">
            <h2>Edit Artist</h2>
            <form onSubmit={handleArtistUpdate} className="simple-form">
              <div className="form-row">
                <input
                  value={editArtist.name}
                  onChange={(e) => setEditArtist({ ...editArtist, name: e.target.value })}
                  placeholder="Name"
                  required
                />
                <input
                  value={editArtist.category}
                  onChange={(e) => setEditArtist({ ...editArtist, category: e.target.value })}
                  placeholder="Category"
                />
                <input
                  value={editArtist.genre}
                  onChange={(e) => setEditArtist({ ...editArtist, genre: e.target.value })}
                  placeholder="Genre"
                />
              </div>
              <div className="form-row">
                <input
                  value={editArtist.experience}
                  onChange={(e) => setEditArtist({ ...editArtist, experience: e.target.value })}
                  placeholder="Experience"
                />
                <input
                  value={editArtist.bookingFee}
                  onChange={(e) => setEditArtist({ ...editArtist, bookingFee: e.target.value })}
                  placeholder="Booking Fee"
                />
                <input
                  value={editArtist.contact}
                  onChange={(e) => setEditArtist({ ...editArtist, contact: e.target.value })}
                  placeholder="Contact"
                />
              </div>
              <textarea
                value={editArtist.description}
                onChange={(e) => setEditArtist({ ...editArtist, description: e.target.value })}
                placeholder="Description"
              />
              <input
                value={editArtist.availability}
                onChange={(e) => setEditArtist({ ...editArtist, availability: e.target.value })}
                placeholder="Availability (comma separated)"
              />
              <input
                value={editArtist.popularSongs}
                onChange={(e) => setEditArtist({ ...editArtist, popularSongs: e.target.value })}
                placeholder="Songs (comma separated)"
              />
              <textarea
                value={editArtist.achievements}
                onChange={(e) => setEditArtist({ ...editArtist, achievements: e.target.value })}
                placeholder="Achievements"
              />
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setEditArtist(null)}>
                  Cancel
                </button>
                <button type="submit" className="logout-btn">Save Artist</button>
              </div>
            </form>
          </div>
        )}

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
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button 
                            className="action-btn"
                            onClick={() => beginEditVenue(venue)}
                          >
                            Edit
                          </button>
                          <button 
                            className="action-btn"
                            onClick={() => handleDeleteVenue(venue.id, venue.name)}
                            style={{ background: "#dc2626", color: "white" }}
                          >
                            Delete
                          </button>
                        </div>
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
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button 
                            className="action-btn"
                            onClick={() => beginEditArtist(artist)}
                          >
                            Edit
                          </button>
                          <button 
                            className="action-btn"
                            onClick={() => handleDeleteArtist(artist.id, artist.name)}
                            style={{ background: "#dc2626", color: "white" }}
                          >
                            Delete
                          </button>
                        </div>
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
