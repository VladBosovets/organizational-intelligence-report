import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import BlindspotCard from './BlindspotCard';

const BlindspotList = ({ blindspots }) => {
  if (!blindspots || blindspots.length === 0) {
    return (
      <div className="card bg-success-50 border-success-200">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-8 h-8 text-success-600" />
          <div>
            <h3 className="text-lg font-semibold text-success-700">
              No Coordination Blindspots Detected
            </h3>
            <p className="text-success-600 mt-1">
              Teams are well-coordinated with no conflicting work or missed collaboration opportunities.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const totalImpact = blindspots.reduce((sum, b) => {
    // Try multiple possible field names for annual impact
    const annualCost = b.recommendation?.savings_annual ||
                       b.impact_analysis?.total_cost_annual ||
                       b.impact_analysis?.rework_cost ||
                       0;
    return sum + annualCost;
  }, 0);

  const criticalCount = blindspots.filter(b =>
    b.severity === 'critical' || b.severity === 'high'
  ).length;

  return (
    <div className="space-y-6">
      <div className="card bg-warning-50 border-warning-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-warning-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-warning-700">
                Coordination Blindspots Detected
              </h3>
              <p className="text-warning-600 mt-1">
                Found {blindspots.length} coordination issue{blindspots.length !== 1 ? 's' : ''}
                {criticalCount > 0 && ` (${criticalCount} critical)`}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-warning-600">Total Annual Impact</p>
            <p className="text-2xl font-bold text-warning-700">
              {formatCurrency(totalImpact)}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {blindspots.map((blindspot, index) => (
          <BlindspotCard key={index} blindspot={blindspot} />
        ))}
      </div>
    </div>
  );
};

export default BlindspotList;

// Made with Bob
