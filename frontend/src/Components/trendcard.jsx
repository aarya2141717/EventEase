import React from 'react';

export default function BookingTrendChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Booking Trend (Last 6 Months)</h2>
      
      <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Chart Placeholder: Booking Volume vs. Month</p>
          <p className="text-gray-300 text-xs">Integrate with Recharts, Chart.js, or your preferred charting library</p>
        </div>
      </div>
    </div>
  );
}