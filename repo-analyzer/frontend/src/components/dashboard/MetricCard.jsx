import React from 'react';

const MetricCard = ({ icon: Icon, label, value, subtext, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-50',
    success: 'text-success-500 bg-success-50',
    warning: 'text-warning-500 bg-warning-50',
    danger: 'text-danger-500 bg-danger-50',
    accent: 'text-accent-500 bg-accent-50'
  };

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className={`metric-value ${colorClasses[color].split(' ')[0]}`}>
        {value}
      </div>
      <div className="metric-label">{label}</div>
      {subtext && (
        <p className="text-xs text-secondary-500 mt-2">{subtext}</p>
      )}
    </div>
  );
};

export default MetricCard;

// Made with Bob
