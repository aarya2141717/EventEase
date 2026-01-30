import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import './ArtistBooking.css';

const ArtistBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const artist = location.state?.artist || null;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    eventDate: '',
    eventTime: '',
    venueName: '',
    numberOfGuests: '',
    performanceDuration: '',
    specialRequirements: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.eventDate) {
      newErrors.eventDate = 'Event date is required';
    } else {
      const selectedDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.eventDate = 'Event date cannot be in the past';
      }
    }
    
    if (!formData.eventTime) {
      newErrors.eventTime = 'Event time is required';
    }
    
    if (!formData.venueName.trim()) {
      newErrors.venueName = 'Venue name is required';
    }
    
    if (!formData.numberOfGuests || formData.numberOfGuests < 1) {
      newErrors.numberOfGuests = 'Expected number of guests is required';
    }
    
    if (!formData.performanceDuration) {
      newErrors.performanceDuration = 'Performance duration is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        artistId: artist?.id || null,
        artistName: artist?.name || 'Unknown Artist',
      };

      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/bookings/artist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccessModal(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setErrors({ submit: data.message || 'Booking failed. Please try again.' });
      }
    } catch (error) {
      console.error('Booking error:', error);
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Please log in</h2>
        <p>You need to be logged in to book an artist.</p>
        <button onClick={() => navigate('/login')} className="btn-primary">
          Go to Login
        </button>
      </div>
    );
  }

  if (!artist) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>No Artist Selected</h2>
        <p>Please select an artist to book.</p>
        <button onClick={() => navigate('/artists')} className="btn-primary">
          Browse Artists
        </button>
      </div>
    );
  }

  return (
    <div className="artist-booking-container">
      <div className="artist-booking-wrapper">
        <div className="booking-header">
          <h1>Hire {artist.name}</h1>
          <p>Fill in the details to book this artist for your event</p>
        </div>

        <form onSubmit={handleSubmit} className="artist-booking-form">
          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>
            
            <div className="form-group">
              <label htmlFor="fullName">Full Name <span className="required">*</span></label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'error' : ''}
                placeholder="Enter your full name"
                readOnly
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="your.email@example.com"
                  readOnly
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="form-section">
            <h3>Event Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="eventDate">Event Date <span className="required">*</span></label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className={errors.eventDate ? 'error' : ''}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.eventDate && <span className="error-message">{errors.eventDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="eventTime">Event Time <span className="required">*</span></label>
                <input
                  type="time"
                  id="eventTime"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  className={errors.eventTime ? 'error' : ''}
                />
                {errors.eventTime && <span className="error-message">{errors.eventTime}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="venueName">Venue Name / Location <span className="required">*</span></label>
              <input
                type="text"
                id="venueName"
                name="venueName"
                value={formData.venueName}
                onChange={handleChange}
                className={errors.venueName ? 'error' : ''}
                placeholder="Enter venue name or location"
              />
              {errors.venueName && <span className="error-message">{errors.venueName}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="numberOfGuests">Expected Number of Guests <span className="required">*</span></label>
                <input
                  type="number"
                  id="numberOfGuests"
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  className={errors.numberOfGuests ? 'error' : ''}
                  placeholder="e.g., 100"
                  min="1"
                />
                {errors.numberOfGuests && <span className="error-message">{errors.numberOfGuests}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="performanceDuration">Performance Duration <span className="required">*</span></label>
                <select
                  id="performanceDuration"
                  name="performanceDuration"
                  value={formData.performanceDuration}
                  onChange={handleChange}
                  className={errors.performanceDuration ? 'error' : ''}
                >
                  <option value="">Select duration</option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                  <option value="3 hours">3 hours</option>
                  <option value="4 hours">4 hours</option>
                  <option value="Full day">Full day</option>
                </select>
                {errors.performanceDuration && <span className="error-message">{errors.performanceDuration}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="specialRequirements">Special Requirements</label>
              <textarea
                id="specialRequirements"
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleChange}
                rows="4"
                placeholder="Any special arrangements, equipment needs, or song requests..."
              />
            </div>
          </div>

          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Send Booking Request'}
            </button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <h2>Booking Request Submitted!</h2>
            <p>Your booking request for <strong>{artist.name}</strong> has been submitted successfully.</p>
            <div style={{ 
              background: "#f0f9ff", 
              border: "1px solid #0369a1", 
              borderRadius: "8px", 
              padding: "12px", 
              margin: "15px 0",
              fontSize: "14px",
              color: "#0369a1"
            }}>
              <strong>📋 What's Next?</strong>
              <p style={{ margin: "8px 0 0 0" }}>
                Your booking is pending admin approval. Once approved, you'll be able to proceed with your event. 
                Check your dashboard for real-time status updates!
              </p>
            </div>
            <p className="redirect-text">Redirecting to dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistBooking;
