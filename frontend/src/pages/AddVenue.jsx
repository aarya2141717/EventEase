import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const AddVenue = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "Banquets",
    description: "",
    capacity: "",
    price: "",
    contact: "",
    amenities: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 3);
    setSelectedImages(files);
    if (files.length === 0) {
      setError("Please select at least one image (up to 3).");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const amenitiesArray = formData.amenities
        ? formData.amenities.split(",").map((item) => item.trim())
        : [];

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("location", formData.location);
      payload.append("category", formData.category);
      payload.append("description", formData.description);
      payload.append("capacity", formData.capacity);
      payload.append("price", formData.price);
      payload.append("contact", formData.contact);
      payload.append("amenities", amenitiesArray.join(","));

      selectedImages.forEach((file) => {
        payload.append("images", file);
      });

      const response = await fetch("http://localhost:5000/api/venues", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setError(data.message || "Failed to add venue");
      }
    } catch (error) {
      console.error("Add venue error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title-section">
          <img src="/images/logos-removebg-preview.png" alt="EventEase" className="dashboard-logo" />
          <div>
            <h1>Add New Venue</h1>
            <p>Welcome back, {user?.fullName || "Vendor"}!</p>
          </div>
        </div>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <button onClick={() => navigate("/dashboard")} className="back-btn" style={{ marginBottom: "20px" }}>
            ← Back to Dashboard
          </button>

          {success && (
            <div className="success-message" style={{ 
              background: "#d1fae5", 
              color: "#065f46", 
              padding: "16px", 
              borderRadius: "8px", 
              marginBottom: "20px" 
            }}>
              ✓ Venue added successfully! Redirecting...
            </div>
          )}

          {error && (
            <div className="error-message" style={{ 
              background: "#fee2e2", 
              color: "#dc2626", 
              padding: "16px", 
              borderRadius: "8px", 
              marginBottom: "20px" 
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
            <div className="form-section" style={{ marginBottom: "30px" }}>
              <h3>Basic Information</h3>
              
              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label>Venue Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter venue name"
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input"
                    placeholder="City, Address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="Banquets">Banquets</option>
                    <option value="Resorts">Resorts</option>
                    <option value="Restaurants">Restaurants</option>
                    <option value="Villas">Villas</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label>Upload Images (up to 3)</label>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="input"
                  required
                />
                <small style={{ color: "#6b7280" }}>
                  Please choose at least 1 and up to 3 images from your computer.
                </small>
                {selectedImages.length > 0 && (
                  <div style={{ marginTop: "8px", color: "#374151" }}>
                    Selected: {selectedImages.length} file(s)
                  </div>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input"
                  rows="4"
                  placeholder="Venue description and features"
                />
              </div>
            </div>

            <div className="form-section" style={{ marginBottom: "30px" }}>
              <h3>Venue Details</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div className="form-group">
                  <label>Capacity</label>
                  <input
                    type="text"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., 500-1000 guests"
                  />
                </div>

                <div className="form-group">
                  <label>Price Range</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., NPR 150,000 - 300,000"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label>Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="input"
                  placeholder="+977 98XXXXXXX"
                />
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label>Amenities (comma-separated)</label>
                <input
                  type="text"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  className="input"
                  placeholder="Air Conditioning, Parking, Catering, Sound System"
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", marginTop: "30px" }}>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="btn-secondary"
                style={{ padding: "12px 24px" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="logout-btn"
                disabled={loading}
                style={{ padding: "12px 24px" }}
              >
                {loading ? "Adding..." : "Add Venue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVenue;
