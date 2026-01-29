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
    // Event Organizer Details
    organizerName: user?.fullName || '',
    organizerEmail: user?.email || '',
    organizerPhone: user?.phone || '',
    organizationName: '',
    
    // Event Type & Venue
    eventType: '',
    venueName: '',
    venueCity: '',
    eventDate: '',
    eventTime: '',
    performanceDuration: '1', // in hours
    expectedGuests: '1', // number of attendees
    
    // Event Requirements
    soundSystemAvailable: 'no',
    stageSetupRequired: 'no',
    specialSongRequests: '',
    additionalPerformers: '',
    additionalRequirements: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        organizerName: user.fullName || '',
        organizerEmail: user.email || '',
        organizerPhone: user.phone || '',
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
    
    if (!formData.organizerName.trim()) {
      newErrors.organizerName = 'Your name is required';
    }
    
    if (!formData.organizerEmail.trim()) {
      newErrors.organizerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.organizerEmail)) {
      newErrors.organizerEmail = 'Please enter a valid email address';
    }
    
    if (!formData.organizerPhone.trim()) {
      newErrors.organizerPhone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.organizerPhone.replace(/\D/g, ''))) {
      newErrors.organizerPhone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Event type is required';
    }

    if (!formData.venueName.trim()) {
      newErrors.venueName = 'Venue name is required';
    }

    if (!formData.venueCity.trim()) {
      newErrors.venueCity = 'City is required';
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
    
    if (!formData.performanceDuration || formData.performanceDuration < 1) {
      newErrors.performanceDuration = 'Performance duration is required';
    }

    if (!formData.expectedGuests || formData.expectedGuests < 1) {
      newErrors.expectedGuests = 'Expected number of guests is required';
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
          <p>Fill in your event details and booking requirements</p>
        </div>

        <form onSubmit={handleSubmit} className="artist-booking-form">
          {/* Organizer Information */}
          <div className="form-section">
            <h3>📋 Your Details</h3>
            
            <div className="form-group">
              <label htmlFor="organizerName">Your Name <span className="required">*</span></label>
              <input
                type="text"
                id="organizerName"
                name="organizerName"
                value={formData.organizerName}
                onChange={handleChange}
                className={errors.organizerName ? 'error' : ''}
                placeholder="Enter your full name"
                readOnly
              />
              {errors.organizerName && <span className="error-message">{errors.organizerName}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="organizerEmail">Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  id="organizerEmail"
                  name="organizerEmail"
                  value={formData.organizerEmail}
                  onChange={handleChange}
                  className={errors.organizerEmail ? 'error' : ''}
                  placeholder="your.email@example.com"
                  readOnly
                />
                {errors.organizerEmail && <span className="error-message">{errors.organizerEmail}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="organizerPhone">Phone Number <span className="required">*</span></label>
                <input
                  type="tel"
                  id="organizerPhone"
                  name="organizerPhone"
                  value={formData.organizerPhone}
                  onChange={handleChange}
                  className={errors.organizerPhone ? 'error' : ''}
                  placeholder="(555) 123-4567"
                  readOnly
                />
                {errors.organizerPhone && <span className="error-message">{errors.organizerPhone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="organizationName">Organization/Company Name (Optional)</label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="e.g., ABC Weddings, XYZ Corporate, etc."
              />
            </div>
          </div>

          {/* Event Information */}
          <div className="form-section">
            <h3>🎉 Event Details</h3>
            
            <div className="form-group">
              <label htmlFor="eventType">Event Type <span className="required">*</span></label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className={errors.eventType ? 'error' : ''}
              >
                <option value="">-- Select Event Type --</option>
                <option value="wedding">💒 Wedding</option>
                <option value="corporate">🏢 Corporate Event</option>
                <option value="birthday">🎂 Birthday Party</option>
                <option value="private">🏠 Private Party</option>
                <option value="conference">🎯 Conference/Seminar</option>
                <option value="festival">🎪 Festival</option>
                <option value="cultural">🎭 Cultural Event</option>
                <option value="fundraiser">❤️ Fundraiser</option>
                <option value="college">🎓 College/University Event</option>
                <option value="other">📌 Other</option>
              </select>
              {errors.eventType && <span className="error-message">{errors.eventType}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="venueName">Venue Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="venueName"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleChange}
                  className={errors.venueName ? 'error' : ''}
                  placeholder="e.g., Grand Ballroom, Hotel ABC, Community Hall"
                />
                {errors.venueName && <span className="error-message">{errors.venueName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="venueCity">City/Location <span className="required">*</span></label>
                <input
                  type="text"
                  id="venueCity"
                  name="venueCity"
                  value={formData.venueCity}
                  onChange={handleChange}
                  className={errors.venueCity ? 'error' : ''}
                  placeholder="e.g., Kathmandu, Pokhara"
                />
                {errors.venueCity && <span className="error-message">{errors.venueCity}</span>}
              </div>
            </div>

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

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="performanceDuration">Performance Duration <span className="required">*</span></label>
                <select
                  id="performanceDuration"
                  name="performanceDuration"
                  value={formData.performanceDuration}
                  onChange={handleChange}
                  className={errors.performanceDuration ? 'error' : ''}
                >
                  <option value="1">1 Hour</option>
                  <option value="2">2 Hours</option>
                  <option value="3">3 Hours</option>
                  <option value="4">4 Hours</option>
                  <option value="5">5 Hours</option>
                  <option value="6">6+ Hours (Full Day)</option>
                </select>
                {errors.performanceDuration && <span className="error-message">{errors.performanceDuration}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="expectedGuests">Expected Number of Guests <span className="required">*</span></label>
                <select
                  id="expectedGuests"
                  name="expectedGuests"
                  value={formData.expectedGuests}
                  onChange={handleChange}
                  className={errors.expectedGuests ? 'error' : ''}
                >
                  <option value="1">1-50 guests</option>
                  <option value="2">51-100 guests</option>
                  <option value="3">101-250 guests</option>
                  <option value="4">251-500 guests</option>
                  <option value="5">501-1000 guests</option>
                  <option value="6">1000+ guests</option>
                </select>
                {errors.expectedGuests && <span className="error-message">{errors.expectedGuests}</span>}
              </div>
            </div>
          </div>

          {/* Requirements Section */}
          <div className="form-section">
            <h3>🎤 Performance Requirements</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="soundSystemAvailable">Do you have Sound System? <span className="required">*</span></label>
                <select
                  id="soundSystemAvailable"
                  name="soundSystemAvailable"
                  value={formData.soundSystemAvailable}
                  onChange={handleChange}
                >
                  <option value="no">❌ No - Need to arrange</option>
                  <option value="yes">✅ Yes - Already available</option>
                  <option value="partial">⚠️ Partial - Need additional equipment</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="stageSetupRequired">Stage Setup Required?</label>
                <select
                  id="stageSetupRequired"
                  name="stageSetupRequired"
                  value={formData.stageSetupRequired}
                  onChange={handleChange}
                >
                  <option value="no">No - Simple setup</option>
                  <option value="simple">Simple - Basic stage</option>
                  <option value="professional">Professional - Full setup with lighting</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="specialSongRequests">Special Song Requests</label>
              <textarea
                id="specialSongRequests"
                name="specialSongRequests"
                value={formData.specialSongRequests}
                onChange={handleChange}
                rows="3"
                placeholder="Any specific songs you'd like the artist to perform? (Optional)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="additionalPerformers">Additional Performers Needed?</label>
              <textarea
                id="additionalPerformers"
                name="additionalPerformers"
                value={formData.additionalPerformers}
                onChange={handleChange}
                rows="2"
                placeholder="Do you need backup dancers, additional musicians, etc.? (Optional)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="additionalRequirements">Additional Requirements & Notes</label>
              <textarea
                id="additionalRequirements"
                name="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={handleChange}
                rows="3"
                placeholder="Any other specific arrangements, accommodations, or notes... (Optional)"
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
              {loading ? 'Processing...' : 'Book Tickets'}
            </button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <h2>Booking Request Submitted!</h2>
            <p><strong>{artist.name}</strong> has been sent your booking request.</p>
            <div style={{ 
              background: "#f0f9ff", 
              border: "1px solid #0369a1", 
              borderRadius: "8px", 
              padding: "12px", 
              margin: "15px 0",
              fontSize: "14px",
              color: "#0369a1"
            }}>
              <strong>📋 Booking Details:</strong>
              <p style={{ margin: "8px 0 0 0" }}>
                <strong>Artist:</strong> {artist.name}<br/>
                <strong>Event:</strong> {formData.eventType?.toUpperCase() || 'TBD'}<br/>
                <strong>Location:</strong> {formData.venueName}, {formData.venueCity}<br/>
                <strong>Date:</strong> {new Date(formData.eventDate).toLocaleDateString()} at {formData.eventTime}<br/>
                <strong>Duration:</strong> {formData.performanceDuration} hour(s)<br/>
                <strong>Expected Guests:</strong> {formData.expectedGuests}
              </p>
            </div>
            <div style={{ 
              background: "#f0fdf4", 
              border: "1px solid #16a34a", 
              borderRadius: "8px", 
              padding: "12px", 
              margin: "15px 0",
              fontSize: "14px",
              color: "#16a34a"
            }}>
              <strong>✅ What Happens Next?</strong>
              <p style={{ margin: "8px 0 0 0" }}>
                The artist will review your booking request and contact you within 24-48 hours to confirm availability, discuss final details, and confirm the booking fee.
                You'll receive confirmation details via email and can track the status in your dashboard.
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
