import React from 'react';
import { AlertTriangle } from 'lucide-react';

const BusFactorAlert = ({ risks }) => {
  const criticalRisks = risks?.filter(r => r.risk_score >= 80) || [];
  
  if (criticalRisks.length === 0) return null;

  return (
    <div className="card bg-danger-50 border-danger-200">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-danger-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-danger-700 mb-2">
            Critical Bus Factor Risk Detected
          </h3>
          <p className="text-danger-600 mb-4">
            {criticalRisks.length} developer{criticalRisks.length > 1 ? 's' : ''} identified as 
            single points of failure across critical modules. Immediate action recommended.
          </p>
          <div className="space-y-2">
            {criticalRisks.map((risk, index) => (
              <div key={index} className="text-sm text-danger-700">
                <span className="font-medium">{risk.developer}</span>: {risk.reason}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusFactorAlert;

// Made with Bob
