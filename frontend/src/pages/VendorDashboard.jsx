import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: "My Venues/Artists", value: "8", icon: "🏢", color: "#ff5a1f" },
    { label: "Total Bookings", value: "124", icon: "📅", color: "#00bcd4" },
    { label: "Pending Requests", value: "12", icon: "⏳", color: "#ffa500" },
    { label: "Revenue", value: "₹2.4L", icon: "💰", color: "#10b981" },
  ];

  const myListings = [
    { id: 1, name: "Smart Palace", type: "Venue", status: "Active", bookings: 45 },
    { id: 2, name: "Queen's Palace", type: "Venue", status: "Active", bookings: 38 },
    { id: 3, name: "Silver Oak Banquet", type: "Venue", status: "Inactive", bookings: 21 },
  ];

  const recentRequests = [
    { id: 1, customer: "John Doe", venue: "Smart Palace", date: "2025-01-20", status: "Pending" },
    { id: 2, customer: "Jane Smith", venue: "Queen's Palace", date: "2025-01-22", status: "Pending" },
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
          <div className="listings-grid">
            {myListings.map((listing) => (
              <div key={listing.id} className="listing-card">
                <div className="listing-header">
                  <h3>{listing.name}</h3>
                  <span className={`status-badge ${listing.status.toLowerCase()}`}>
                    {listing.status}
                  </span>
                </div>
                <p className="listing-type">{listing.type}</p>
                <div className="listing-footer">
                  <span className="listing-stat">📅 {listing.bookings} Bookings</span>
                  <button className="action-btn">Manage</button>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="add-listing-btn"
            onClick={() => navigate('/vendor/add-venue')}
          >
            + Add New Venue
          </button>
        </div>

        {/* Recent Booking Requests */}
        <div className="dashboard-section">
          <h2>Recent Booking Requests</h2>
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
                {recentRequests.map((request) => (
                  <tr key={request.id}>
                    <td>#{request.id}</td>
                    <td>{request.customer}</td>
                    <td>{request.venue}</td>
                    <td>{request.date}</td>
                    <td>
                      <span className={`status-badge ${request.status.toLowerCase()}`}>
                        {request.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn approve">Approve</button>
                        <button className="action-btn reject">Reject</button>
                      </div>
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
