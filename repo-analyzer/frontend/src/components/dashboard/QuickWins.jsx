import React from 'react';
import { TrendingUp, Clock, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const QuickWins = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Quick Wins</h3>
      <p className="text-secondary-600 mb-6">
        High-impact recommendations with best return on investment
      </p>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={rec.id || index} className="card-hover">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-lg">{rec.title}</h4>
              <span className="badge-success">
                {rec.roi}x ROI
              </span>
            </div>
            
            <p className="text-secondary-600 mb-4">{rec.impact}</p>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-secondary-400" />
                <span className="text-secondary-600">
                  {rec.effort_weeks} weeks
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-secondary-400" />
                <span className="text-secondary-600">
                  {formatCurrency(rec.cost_usd)} cost
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-success-500" />
                <span className="text-success-600 font-medium">
                  {formatCurrency(rec.savings_annual)}/year
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickWins;

// Made with Bob
