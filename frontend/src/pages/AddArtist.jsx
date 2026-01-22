import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const AddArtist = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Singers",
    genre: "",
    description: "",
    experience: "",
    bookingFee: "",
    contact: "",
    availability: "",
    achievements: "",
    popularSongs: "",
    facebook: "",
    instagram: "",
    youtube: "",
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
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setError("");
    } else {
      setError("Please select an image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const availabilityArray = formData.availability
        ? formData.availability.split(",").map((item) => item.trim())
        : [];
      const songsArray = formData.popularSongs
        ? formData.popularSongs.split(",").map((item) => item.trim())
        : [];

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("category", formData.category);
      payload.append("genre", formData.genre);
      payload.append("description", formData.description);
      payload.append("experience", formData.experience);
      payload.append("bookingFee", formData.bookingFee);
      payload.append("contact", formData.contact);
      payload.append("availability", availabilityArray.join(","));
      payload.append("achievements", formData.achievements);
      payload.append("popularSongs", songsArray.join(","));
      payload.append("socialMedia", JSON.stringify({
        facebook: formData.facebook || null,
        instagram: formData.instagram || null,
        youtube: formData.youtube || null,
      }));

      if (selectedImage) {
        payload.append("image", selectedImage);
      }

      const response = await fetch("http://localhost:5000/api/artists", {
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
        setError(data.message || "Failed to add artist");
      }
    } catch (error) {
      console.error("Add artist error:", error);
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
            <h1>Add New Artist</h1>
            <p>Welcome back, {user?.fullName || "Admin"}!</p>
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
              ✓ Artist added successfully! Redirecting...
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
                <label>Artist Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter artist name"
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="Singers">Singers</option>
                    <option value="Bands">Bands</option>
                    <option value="DJs">DJs</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Genre</label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., Pop, Rock, EDM"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label>Upload Image *</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="input"
                  required
                />
                <small style={{ color: "#6b7280" }}>
                  Please choose an image file from your computer.
                </small>
                {selectedImage && (
                  <div style={{ marginTop: "8px", color: "#374151" }}>
                    Selected: {selectedImage.name}
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
                  placeholder="Artist biography and description"
                />
              </div>
            </div>

            <div className="form-section" style={{ marginBottom: "30px" }}>
              <h3>Professional Details</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div className="form-group">
                  <label>Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., 10+ years"
                  />
                </div>

                <div className="form-group">
                  <label>Booking Fee</label>
                  <input
                    type="text"
                    name="bookingFee"
                    value={formData.bookingFee}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., NPR 200,000 - 500,000"
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
                <label>Availability (comma-separated)</label>
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="input"
                  placeholder="Weddings, Concerts, Corporate Events"
                />
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label>Achievements</label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  className="input"
                  rows="3"
                  placeholder="List key achievements and awards"
                />
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label>Popular Songs (comma-separated)</label>
                <input
                  type="text"
                  name="popularSongs"
                  value={formData.popularSongs}
                  onChange={handleChange}
                  className="input"
                  placeholder="Song 1, Song 2, Song 3"
                />
              </div>
            </div>

            <div className="form-section" style={{ marginBottom: "30px" }}>
              <h3>Social Media</h3>
              
              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label>Facebook URL</label>
                <input
                  type="url"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="input"
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label>Instagram URL</label>
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="input"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label>YouTube URL</label>
                <input
                  type="url"
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleChange}
                  className="input"
                  placeholder="https://youtube.com/..."
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
                {loading ? "Adding..." : "Add Artist"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArtist;
