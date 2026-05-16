import React from 'react';
import { TrendingUp, Clock, DollarSign, Zap } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const priorityColors = {
  critical: 'danger',
  high: 'warning',
  medium: 'primary',
  low: 'secondary'
};

const RecommendationList = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="card">
        <p className="text-secondary-600 text-center">No recommendations available</p>
      </div>
    );
  }

  // Sort by priority and ROI
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return (b.roi || 0) - (a.roi || 0);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary-500" />
          Prioritized Recommendations
        </h3>
        <span className="text-sm text-secondary-600">
          {recommendations.length} action{recommendations.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3">
        {sortedRecommendations.map((rec, index) => {
          const colorScheme = priorityColors[rec.priority] || 'secondary';
          
          return (
            <div key={index} className="card-hover">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`badge-${colorScheme}`}>
                      {rec.priority}
                    </span>
                    <h4 className="font-semibold text-lg">
                      {rec.title}
                    </h4>
                  </div>
                  <p className="text-secondary-600 text-sm">
                    {rec.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-secondary-200">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-secondary-500" />
                  <div>
                    <p className="text-xs text-secondary-600">Effort</p>
                    <p className="font-medium text-sm">
                      {rec.effort_weeks} week{rec.effort_weeks !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-secondary-500" />
                  <div>
                    <p className="text-xs text-secondary-600">Cost</p>
                    <p className="font-medium text-sm">
                      {formatCurrency(rec.implementation_cost || 0)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-success-500" />
                  <div>
                    <p className="text-xs text-secondary-600">Annual Savings</p>
                    <p className="font-medium text-sm text-success-600">
                      {formatCurrency(rec.savings_annual || 0)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-primary-500" />
                  <div>
                    <p className="text-xs text-secondary-600">ROI</p>
                    <p className="font-medium text-sm text-primary-600">
                      {rec.roi ? `${rec.roi}x` : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {rec.action_items && rec.action_items.length > 0 && (
                <div className="mt-4 pt-4 border-t border-secondary-200">
                  <p className="text-xs font-medium text-secondary-700 mb-2">Action Items:</p>
                  <ul className="space-y-1">
                    {rec.action_items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-secondary-600 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationList;

// Made with Bob
