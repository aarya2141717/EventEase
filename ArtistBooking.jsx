import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArtistBooking.css';

const ArtistBooking = () => {
  const navigate = useNavigate();
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
    }
    
    if (!formData.eventTime) {
      newErrors.eventTime = 'Event time is required';
    }
    
    if (!formData.numberOfTickets || formData.numberOfTickets < 1) {
      newErrors.numberOfTickets = 'Please select at least 1 ticket';
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
      const response = await fetch('http://localhost:5000/api/bookings/artist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccessModal(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setErrors({ submit: data.message || 'Booking failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="artist-booking-container">
      <div className="artist-booking-wrapper">
        <div className="booking-header">
          <h1>Artist Booking</h1>
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
            <p>Your tickets have been successfully reserved.</p>
            <p>Check your email for confirmation details.</p>
            <p className="redirect-text">Redirecting to home page...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistBooking;