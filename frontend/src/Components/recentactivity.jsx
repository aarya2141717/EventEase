import React from 'react';

export default function RecentActivity() {
  const activities = [
    {
      type: 'booking',
      title: 'New Booking Confirmed',
      description: 'Rooftop Sunset Hall booked for 2026-03-15 by Jane D.',
      icon: '✓',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      type: 'venue',
      title: 'Venue Profile Updated',
      description: 'Buddha Palace capacity increased to 600. Needs review.',
      icon: '🏛️',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      type: 'artist',
      title: 'New Artist Onboarded',
      description: '"The Groovy Beats" Band added to the roster.',
      icon: '🎵',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      type: 'cancelled',
      title: 'Booking Cancelled',
      description: 'Booking #EE1029 was cancelled by the user.',
      icon: '✕',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3">
            <div className={`w-10 h-10 ${activity.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <span className={`text-lg font-bold ${activity.iconColor}`}>{activity.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 mb-1">{activity.title}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-6 text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors">
        View All Activity →
      </button>
    </div>
  );
}