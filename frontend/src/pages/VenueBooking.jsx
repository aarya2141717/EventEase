import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import './VenueBooking.css';

const VenueBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const venue = location.state?.venue || null;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    numberOfGuests: '',
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
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    } else {
      const selectedDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }
    
    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }
    
    if (!formData.numberOfGuests || formData.numberOfGuests < 1) {
      newErrors.numberOfGuests = 'Number of guests is required';
    }
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
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
        venueId: venue?.id || null,
        venueName: venue?.name || 'Unknown Venue',
      };

      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/bookings/venue', {
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
        <p>You need to be logged in to book a venue.</p>
        <button onClick={() => navigate('/login')} className="btn-primary">
          Go to Login
        </button>
      </div>
    );
  }

  if (!venue) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>No Venue Selected</h2>
        <p>Please select a venue to book.</p>
        <button onClick={() => navigate('/venue')} className="btn-primary">
          Browse Venues
        </button>
      </div>
    );
  }

  return (
    <div className="venue-booking-container">
      <div className="venue-booking-wrapper">
        <div className="booking-header">
          <h1>Book {venue.name}</h1>
          <p>Reserve your perfect venue for any occasion</p>
        </div>

        <form onSubmit={handleSubmit} className="venue-booking-form">
          {/* Contact Information */}
          <div className="form-section">
            <h3>Contact Information</h3>
            
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
            
            <div className="form-group">
              <label htmlFor="numberOfGuests">Number of Guests <span className="required">*</span></label>
              <input
                type="number"
                id="numberOfGuests"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleChange}
                className={errors.numberOfGuests ? 'error' : ''}
                placeholder="Expected number of guests"
                min="1"
                required
              />
              {errors.numberOfGuests && <span className="error-message">{errors.numberOfGuests}</span>}
            </div>
          </div>

          {/* Date and Time */}
          <div className="form-section">
            <h3>Date and Time</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date <span className="required">*</span></label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={errors.startDate ? 'error' : ''}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.startDate && <span className="error-message">{errors.startDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date <span className="required">*</span></label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={errors.endDate ? 'error' : ''}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                />
                {errors.endDate && <span className="error-message">{errors.endDate}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startTime">Start Time <span className="required">*</span></label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={errors.startTime ? 'error' : ''}
                />
                {errors.startTime && <span className="error-message">{errors.startTime}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="endTime">End Time <span className="required">*</span></label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={errors.endTime ? 'error' : ''}
                />
                {errors.endTime && <span className="error-message">{errors.endTime}</span>}
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          <div className="form-section">
            <h3>Additional Requirements</h3>
            <div className="form-group">
              <label htmlFor="specialRequirements">Special Requests or Requirements</label>
              <textarea
                id="specialRequirements"
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleChange}
                rows="4"
                placeholder="Any special arrangements, equipment needs, or additional services..."
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
              {loading ? 'Processing...' : 'Reserve Venue'}
            </button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <h2>Booking Request Submitted!</h2>
            <p>Your venue reservation for <strong>{venue.name}</strong> has been submitted successfully.</p>
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
                Your booking needs approval from both the venue owner and our admin team. 
                You'll receive notifications once they review your request. 
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

export default VenueBooking;
