import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editBooking, setEditBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/bookings/me", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      setMessage("Unable to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ status: "cancelled" }),
      });
      if (response.ok) {
        setMessage("Booking cancelled");
        fetchBookings();
      }
    } catch (error) {
      setMessage("Failed to cancel booking");
    }
  };

  const handleEditBooking = (booking) => {
    setEditBooking({
      id: booking.id,
      startDate: booking.startDate || "",
      endDate: booking.endDate || "",
      startTime: booking.startTime || "",
      endTime: booking.endTime || "",
      numberOfGuests: booking.numberOfGuests || "",
      eventDate: booking.eventDate || "",
      eventTime: booking.eventTime || "",
      numberOfTickets: booking.numberOfTickets || "",
      eventType: booking.eventType || "",
      specialRequirements: booking.specialRequirements || "",
      contactPhone: booking.contactPhone || "",
    });
  };

  const handleSaveBooking = async (e) => {
    e.preventDefault();
    if (!editBooking) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/bookings/${editBooking.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(editBooking),
      });
      if (response.ok) {
        setMessage("Booking updated");
        setEditBooking(null);
        fetchBookings();
      }
    } catch (error) {
      setMessage("Failed to save booking");
    }
  };

  const upcomingEvents = bookings.filter(booking => booking.status === "confirmed");

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
        {message && (
          <div style={{ background: "#e0f2fe", color: "#0369a1", padding: "12px", borderRadius: "8px", marginBottom: "12px" }}>
            {message}
          </div>
        )}
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
              <div className="stat-value">{bookings.length}</div>
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
                {bookings.filter(b => b.status === "pending").length}
              </div>
              <div className="stat-label">Pending</div>
            </div>
          </div>
        </div>

        {/* My Bookings */}
        <div className="dashboard-section">
          <h2>My Bookings</h2>
          {loading ? (
            <p>Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <div className="empty-state">
              <p>No bookings yet. Start exploring venues and artists!</p>
              <Link to="/venue" className="explore-btn">Explore Venues</Link>
              <Link to="/artists" className="explore-btn">Explore Artists</Link>
            </div>
          ) : (
            <div className="bookings-grid">
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <h3>{booking.itemName}</h3>
                    <div className="status-badges">
                      <span className={`status-badge ${booking.status.toLowerCase()}`}>
                        {booking.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="booking-info">
                    <p className="booking-type">📌 {booking.type.toUpperCase()}</p>
                    <p className="booking-date">📅 {booking.startDate || booking.eventDate || "-"}</p>
                    {booking.numberOfGuests && <p className="booking-guests">👥 {booking.numberOfGuests} guests</p>}
                    {booking.numberOfTickets && <p className="booking-tickets">🎫 {booking.numberOfTickets} tickets</p>}
                    
                    {/* Approval Status */}
                    <div className="approval-status" style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #e5e7eb" }}>
                      <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
                        <strong>Approval Status:</strong>
                      </p>
                      <div style={{ display: "flex", gap: "10px", fontSize: "12px" }}>
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          backgroundColor: booking.vendorApproval === "approved" ? "#d1fae5" : booking.vendorApproval === "rejected" ? "#fee2e2" : "#fef3c7",
                          color: booking.vendorApproval === "approved" ? "#065f46" : booking.vendorApproval === "rejected" ? "#7f1d1d" : "#92400e"
                        }}>
                          Vendor: {booking.vendorApproval}
                        </span>
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          backgroundColor: booking.adminApproval === "approved" ? "#d1fae5" : booking.adminApproval === "rejected" ? "#fee2e2" : "#fef3c7",
                          color: booking.adminApproval === "approved" ? "#065f46" : booking.adminApproval === "rejected" ? "#7f1d1d" : "#92400e"
                        }}>
                          Admin: {booking.adminApproval}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="booking-actions">
                    {booking.status === "pending" && (
                      <button className="action-btn" onClick={() => handleEditBooking(booking)}>Edit</button>
                    )}
                    {booking.status === "pending" && (
                      <button className="action-btn cancel" onClick={() => handleCancelBooking(booking.id)}>Cancel</button>
                    )}
                    {booking.status === "approved" && (
                      <span style={{ fontSize: "12px", color: "#10b981", fontWeight: "bold" }}>✓ Approved</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {editBooking && (
          <div className="dashboard-section">
            <h2>Edit Booking</h2>
            <form onSubmit={handleSaveBooking} className="simple-form">
              {editBooking.startDate && (
                <div className="form-row">
                  <input 
                    type="date"
                    value={editBooking.startDate} 
                    onChange={(e) => setEditBooking({ ...editBooking, startDate: e.target.value })} 
                    placeholder="Start Date" 
                  />
                  <input 
                    type="date"
                    value={editBooking.endDate} 
                    onChange={(e) => setEditBooking({ ...editBooking, endDate: e.target.value })} 
                    placeholder="End Date" 
                  />
                  <input 
                    value={editBooking.numberOfGuests} 
                    onChange={(e) => setEditBooking({ ...editBooking, numberOfGuests: e.target.value })} 
                    placeholder="Number of guests" 
                  />
                </div>
              )}
              {editBooking.eventDate && (
                <div className="form-row">
                  <input 
                    type="date"
                    value={editBooking.eventDate} 
                    onChange={(e) => setEditBooking({ ...editBooking, eventDate: e.target.value })} 
                    placeholder="Event Date" 
                  />
                  <input 
                    type="time"
                    value={editBooking.eventTime} 
                    onChange={(e) => setEditBooking({ ...editBooking, eventTime: e.target.value })} 
                    placeholder="Event Time" 
                  />
                  <input 
                    value={editBooking.numberOfTickets} 
                    onChange={(e) => setEditBooking({ ...editBooking, numberOfTickets: e.target.value })} 
                    placeholder="Number of tickets" 
                  />
                </div>
              )}
              <textarea 
                value={editBooking.specialRequirements} 
                onChange={(e) => setEditBooking({ ...editBooking, specialRequirements: e.target.value })} 
                placeholder="Special requirements" 
                rows="3"
              />
              <input 
                value={editBooking.contactPhone} 
                onChange={(e) => setEditBooking({ ...editBooking, contactPhone: e.target.value })} 
                placeholder="Contact phone" 
              />
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setEditBooking(null)}>Cancel</button>
                <button type="submit" className="logout-btn">Save Changes</button>
              </div>
            </form>
          </div>
        )}

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
