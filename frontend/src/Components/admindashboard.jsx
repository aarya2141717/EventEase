import React, { useState } from 'react';
import { Home, MapPin, PlusCircle, Users, Calendar, Tag, TrendingUp, Bell } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EventEaseDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const bookingData = [
    { month: 'Jul', bookings: 180 },
    { month: 'Aug', bookings: 220 },
    { month: 'Sep', bookings: 195 },
    { month: 'Oct', bookings: 280 },
    { month: 'Nov', bookings: 310 },
    { month: 'Dec', bookings: 350 },
  ];

  const menuSections = [
    {
      title: null,
      items: [
        { id: 'dashboard', icon: Home, label: 'Dashboard' }
      ]
    },
    {
      title: 'VENUES MANAGEMENT',
      items: [
        { id: 'venues', icon: MapPin, label: 'View Venues' },
        { id: 'add-venue', icon: PlusCircle, label: 'Add New Venue' }
      ]
    },
    {
      title: 'VILLA MANAGEMENT',
      items: [
        { id: 'villas', icon: Home, label: 'View Villas' },
        { id: 'add-villa', icon: PlusCircle, label: 'Add New Villa' }
      ]
    },
    {
      title: 'ARTIST MANAGEMENT',
      items: [
        { id: 'artists', icon: Users, label: 'View Artists' },
        { id: 'add-artist', icon: PlusCircle, label: 'Add New Artist' }
      ]
    },
    {
      title: 'OPERATIONS & SETTINGS',
      items: [
        { id: 'bookings', icon: Calendar, label: 'View Bookings' },
        { id: 'categories', icon: Tag, label: 'Manage Categories' },
        { id: 'reports', icon: TrendingUp, label: 'Analytics & Reports' }
      ]
    }
  ];

  const stats = [
    { 
      label: 'Total Bookings', 
      value: '1,240', 
      change: '+18% since last month', 
      positive: true, 
      icon: '📋', 
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    { 
      label: 'Active Venues', 
      value: '85', 
      change: '+5 New', 
      positive: true, 
      icon: '🏛️', 
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Active Villas', 
      value: '42', 
      change: '+8 New', 
      positive: true, 
      icon: '🏡', 
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600'
    },
    { 
      label: 'Total Artists', 
      value: '160', 
      change: '-3% churn', 
      positive: false, 
      icon: '🎭', 
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    { 
      label: 'Revenue (Monthly)', 
      value: 'Rs 56K', 
      change: '+12% in sales', 
      positive: true, 
      icon: '💰', 
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    }
  ];

  const activities = [
    { 
      icon: '✓', 
      title: 'New Booking Confirmed', 
      desc: 'Rooftop Sunset Hall booked for 2026-03-15 by Jane D.', 
      bgColor: 'bg-green-100',
      textColor: 'text-green-700'
    },
    { 
      icon: '🏡', 
      title: 'Villa Added', 
      desc: 'Sunset Villa with pool and 5 bedrooms added to catalog.', 
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-700'
    },
    { 
      icon: '🏛️', 
      title: 'Venue Profile Updated', 
      desc: 'Buddha Palace capacity increased to 600. Needs review.', 
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700'
    },
    { 
      icon: '🎵', 
      title: 'New Artist Onboarded', 
      desc: '"The Groovy Beats" Band added to the roster.', 
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-700'
    },
    { 
      icon: '✕', 
      title: 'Booking Cancelled', 
      desc: 'Booking #E1029 was cancelled by the user.', 
      bgColor: 'bg-red-100',
      textColor: 'text-red-700'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-orange-500 to-orange-600 text-white flex flex-col shadow-xl">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-orange-400">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
            <span className="text-orange-500 font-bold text-2xl">✓</span>
          </div>
          <span className="text-xl font-bold">EventEase</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              {section.title && (
                <div className="px-6 mb-2">
                  <h3 className="text-xs font-bold text-orange-200 uppercase tracking-wider">
                    {section.title}
                  </h3>
                </div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-orange-700 text-white font-semibold shadow-lg'
                        : 'text-orange-50 hover:bg-orange-600 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
                <PlusCircle className="w-5 h-5" />
                <span>Create New Booking</span>
              </button>
              <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  AD
                </div>
                <span className="text-sm font-semibold text-gray-700">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center text-3xl shadow-sm`}>
                    {stat.icon}
                  </div>
                </div>
                <p className={`text-sm font-semibold ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Trend (Last 6 Months)</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bookingData}>
                    <defs>
                      <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#6b7280"
                      style={{ fontSize: '13px', fontWeight: 500 }}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      style={{ fontSize: '13px', fontWeight: 500 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        padding: '12px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="bookings" 
                      stroke="#f97316" 
                      strokeWidth={3}
                      fill="url(#colorBookings)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-11 h-11 rounded-xl ${activity.bgColor} ${activity.textColor} flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-sm`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 mb-1">{activity.title}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{activity.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-semibold text-sm py-2 rounded-lg transition-colors">
                View All Activity →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}