import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCards() {
  const stats = [
    {
      title: 'Total Bookings',
      value: '1,240',
      change: '+18% since last month',
      trend: 'up',
      icon: '📋',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'Active Venues',
      value: '85',
      change: '+5 New',
      trend: 'up',
      icon: '🏛️',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Artists',
      value: '160',
      change: '-3% churn',
      trend: 'down',
      icon: '📱',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Revenue (Monthly)',
      value: 'Rs 56K',
      change: '+12% in sales',
      trend: 'up',
      icon: '💰',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-gray-50">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
          <p className={`text-sm flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  );
}