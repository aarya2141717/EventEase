import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ArtistBooking.css';

const ArtistBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const artist = location.state?.artist || null;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventDate: '',
    eventTime: '',
    numberOfTickets: '1',
    eventType: '',
    specialRequirements: '',
  });

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
    
    if (!formData.numberOfTickets || formData.numberOfTickets < 1) {
      newErrors.numberOfTickets = 'Please select at least 1 ticket';
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Event type is required';
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

      const response = await fetch('http://localhost:5000/api/bookings/artist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          <h1>Book {artist.name}</h1>
          <p>Reserve your tickets for an unforgettable experience</p>
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
              <label htmlFor="eventType">Event Type <span className="required">*</span></label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className={errors.eventType ? 'error' : ''}
              >
                <option value="">Select event type</option>
                <option value="Wedding">Wedding</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Concert">Concert</option>
                <option value="Private Party">Private Party</option>
                <option value="Festival">Festival</option>
                <option value="Other">Other</option>
              </select>
              {errors.eventType && <span className="error-message">{errors.eventType}</span>}
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

            <div className="form-group">
              <label htmlFor="numberOfTickets">Number of Tickets <span className="required">*</span></label>
              <select
                id="numberOfTickets"
                name="numberOfTickets"
                value={formData.numberOfTickets}
                onChange={handleChange}
                className={errors.numberOfTickets ? 'error' : ''}
              >
                <option value="1">1 Ticket</option>
                <option value="2">2 Tickets</option>
                <option value="3">3 Tickets</option>
                <option value="4">4 Tickets</option>
                <option value="5">5 Tickets</option>
                <option value="6">6 Tickets</option>
                <option value="7">7 Tickets</option>
                <option value="8">8 Tickets</option>
                <option value="9">9 Tickets</option>
                <option value="10">10 Tickets</option>
              </select>
              {errors.numberOfTickets && <span className="error-message">{errors.numberOfTickets}</span>}
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
              {loading ? 'Processing...' : 'Book Tickets'}
            </button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p>Your booking request for {artist.name} has been submitted successfully.</p>
            <p>We'll contact you shortly to confirm the details.</p>
            <p className="redirect-text">Redirecting to dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistBooking;
