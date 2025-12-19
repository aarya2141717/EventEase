import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, DollarSign, Users, TrendingUp } from 'lucide-react';

const VendorDashboard = () => {
  const [profile, setProfile] = useState({
    businessName: 'Elite Venues & Events',
    ownerName: 'Sarah Johnson',
    memberSince: '2023',
    venueType: 'Banquet Hall'
  });

  const [stats] = useState({
    totalBookings: 24,
    pendingRequests: 3,
    totalRevenue: 'NPR 6,00,000'
  });

  const [upcomingBookings, setUpcomingBookings] = useState([
    {
      id: 1,
      clientName: 'John Doe',
      eventType: 'Wedding Reception',
      date: '2025-12-20',
      time: '6:00 PM',
      status: 'Confirmed',
      amount: 'NPR 4,60,000'
    },
    {
      id: 2,
      clientName: 'Michael Smith',
      eventType: 'Corporate Event',
      date: '2026-01-05',
      time: '2:00 PM',
      status: 'Pending',
      amount: 'NPR 3,68,000'
    },
    {
      id: 3,
      clientName: 'Emily Brown',
      eventType: 'Birthday Party',
      date: '2026-01-15',
      time: '4:00 PM',
      status: 'Confirmed',
      amount: 'NPR 1,58,000'
    }
  ]);

  const [pastBookings] = useState([
    {
      id: 4,
      clientName: 'David Wilson',
      eventType: 'Anniversary Celebration',
      date: '2025-11-10',
      status: 'Completed',
      amount: 'NPR 3,28,000'
    }
  ]);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#FFF5E6' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#2C2416' }}>
          Vendor Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                <p className="text-3xl font-bold" style={{ color: '#FF8C42' }}>
                  {stats.totalBookings}
                </p>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: '#FFF8F0' }}>
                <Calendar className="text-orange-500" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
                <p className="text-3xl font-bold" style={{ color: '#FFB84D' }}>
                  {stats.pendingRequests}
                </p>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: '#FFF8F0' }}>
                <AlertCircle className="text-yellow-500" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold" style={{ color: '#2E7D32' }}>
                  {stats.totalRevenue}
                </p>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: '#E8F5E9' }}>
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#2C2416' }}>
            Business Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Business Name</p>
              <p className="text-gray-800 font-medium">{profile.businessName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Owner Name</p>
              <p className="text-gray-800 font-medium">{profile.ownerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Venue Type</p>
              <p className="text-gray-800 font-medium">{profile.venueType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="text-gray-800 font-medium">{profile.memberSince}</p>
            </div>
          </div>
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
                  className="p-4 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: '#FFF8F0',
                    borderLeftColor: booking.status === 'Confirmed' ? '#FF8C42' : '#FFB84D'
                  }}
                >
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        {booking.status === 'Confirmed' ? (
                          <CheckCircle className="text-green-600" size={20} />
                        ) : (
                          <AlertCircle className="text-yellow-600" size={20} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {booking.clientName} - {booking.eventType}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <p className="flex items-center gap-1">
                            <Calendar size={14} />
                            {booking.date}
                          </p>
                          <p className="flex items-center gap-1">
                            <Clock size={14} />
                            {booking.time}
                          </p>
                          <p className="flex items-center gap-1 font-semibold" style={{ color: '#2E7D32' }}>
                            <DollarSign size={14} />
                            {booking.amount}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span 
                        className="text-sm font-medium px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: booking.status === 'Confirmed' ? '#E8F5E9' : '#FFF9E6',
                          color: booking.status === 'Confirmed' ? '#2E7D32' : '#F57C00'
                        }}
                      >
                        {booking.status}
                      </span>
                      {booking.status === 'Pending' && (
                        <div className="flex gap-2">
                          <button 
                            className="text-white text-sm font-medium px-3 py-1 rounded-lg transition-colors"
                            style={{ backgroundColor: '#2E7D32' }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#1B5E20'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#2E7D32'}
                          >
                            Accept
                          </button>
                          <button 
                            className="text-white text-sm font-medium px-3 py-1 rounded-lg transition-colors"
                            style={{ backgroundColor: '#D32F2F' }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#C62828'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#D32F2F'}
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
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
                  <div className="flex items-start gap-3 flex-1">
                    <CheckCircle className="text-gray-400 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {booking.clientName} - {booking.eventType}
                      </h3>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <p className="flex items-center gap-1">
                          <Calendar size={14} />
                          {booking.date}
                        </p>
                        <p className="flex items-center gap-1 font-semibold text-gray-700">
                          <DollarSign size={14} />
                          {booking.amount}
                        </p>
                      </div>
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
              No past bookings
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;