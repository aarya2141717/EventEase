import React from "react";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: "Total Users", value: "1,234", icon: "👥", color: "#ff5a1f" },
    { label: "Total Venues", value: "45", icon: "🏢", color: "#00bcd4" },
    { label: "Total Artists", value: "32", icon: "🎤", color: "#667eea" },
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
            <button className="action-card">
              <span className="action-icon">➕</span>
              <span>Add Venue</span>
            </button>
            <button className="action-card">
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
      </div>
    </div>
  );
};

export default AdminDashboard;
