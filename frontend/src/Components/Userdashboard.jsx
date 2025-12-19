import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ArtistDashboard = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    memberSince: '2024'
  });

  const [upcomingBookings, setUpcomingBookings] = useState([
    {
      id: 1,
      venue: 'Rooftop Sunset',
      date: '2025-11-22',
      status: 'Confirmed'
    },
    {
      id: 2,
      venue: 'Grand Ballroom',
      date: '2026-01-10',
      status: 'Pending'
    }
  ]);

  const [pastBookings] = useState([]);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#FFF5E6' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#2C2416' }}>
          Dashboard
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#2C2416' }}>
            Profile
          </h2>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">{profile.name}</span>
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Member since {profile.memberSince}
          </p>
          <button 
            className="text-white font-medium py-2 px-6 rounded-lg transition-colors"
            style={{ backgroundColor: '#FF8C42' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#FF7529'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#FF8C42'}
          >
            Edit Profile
          </button>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#2C2416' }}>
            Upcoming Bookings
          </h2>
          
          {upcomingBookings.length > 0 ? (
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="p-4 rounded-lg border-l-4 flex items-center justify-between"
                  style={{ 
                    backgroundColor: '#FFF8F0',
                    borderLeftColor: booking.status === 'Confirmed' ? '#FF8C42' : '#FFB84D'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {booking.status === 'Confirmed' ? (
                        <CheckCircle className="text-green-600" size={20} />
                      ) : (
                        <AlertCircle className="text-yellow-600" size={20} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {booking.venue}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar size={14} />
                        {booking.date}
                      </p>
                    </div>
                  </div>
                  <span 
                    className="text-sm font-medium px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: booking.status === 'Confirmed' ? '#E8F5E9' : '#FFF9E6',
                      color: booking.status === 'Confirmed' ? '#2E7D32' : '#F57C00'
                    }}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No upcoming bookings
            </p>
          )}
        </div>

        {/* Past Bookings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#2C2416' }}>
            Past Bookings
          </h2>
          
          {pastBookings.length > 0 ? (
            <div className="space-y-3">
              {pastBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="p-4 rounded-lg bg-gray-50 flex items-center justify-between"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-gray-400 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {booking.venue}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar size={14} />
                        {booking.date}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    Completed
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              You have 0 past events.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;