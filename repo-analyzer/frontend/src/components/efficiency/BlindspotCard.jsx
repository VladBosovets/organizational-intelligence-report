import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Users, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const severityColors = {
  critical: 'danger',
  high: 'warning',
  medium: 'warning',
  low: 'secondary'
};

const BlindspotCard = ({ blindspot }) => {
  const [expanded, setExpanded] = useState(false);
  const severity = blindspot.severity || 'medium';
  const colorScheme = severityColors[severity];

  return (
    <div className="card-hover">
      <div 
        className="flex items-start justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <AlertTriangle className={`w-5 h-5 text-${colorScheme}-500`} />
            <h4 className="font-semibold text-lg capitalize">
              {blindspot.type?.replace('_', ' ')}
            </h4>
            <span className={`badge-${colorScheme}`}>
              {severity}
            </span>
          </div>
          
          <p className="text-secondary-600 mb-3">
            {blindspot.description}
          </p>

          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-secondary-500" />
              <span className="text-secondary-600">
                {blindspot.affected_teams?.length || 0} teams affected
              </span>
            </div>
            <div>
              <span className="text-secondary-600">Annual Impact:</span>
              <span className={`ml-2 font-medium text-${colorScheme}-600`}>
                {formatCurrency(blindspot.impact_analysis?.total_cost_annual || 0)}
              </span>
            </div>
          </div>
        </div>

        <div className="ml-4">
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-secondary-200 space-y-4">
          {blindspot.affected_teams && blindspot.affected_teams.length > 0 && (
            <div>
              <h5 className="font-medium text-sm text-secondary-700 mb-2">Affected Teams</h5>
              <div className="flex flex-wrap gap-2">
                {blindspot.affected_teams.map((team, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                  >
                    {team}
                  </span>
                ))}
              </div>
            </div>
          )}

          {blindspot.impact_analysis && (
            <div className="bg-secondary-50 rounded-lg p-4">
              <h5 className="font-medium text-sm text-secondary-700 mb-3">Impact Analysis</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-secondary-600">Duplicate Effort:</span>
                  <span className="ml-2 font-medium">
                    {blindspot.impact_analysis.duplicate_effort_hours || 0}h
                  </span>
                </div>
                <div>
                  <span className="text-secondary-600">Rework Risk:</span>
                  <span className="ml-2 font-medium">
                    {formatCurrency(blindspot.impact_analysis.rework_cost || 0)}
                  </span>
                </div>
                <div>
                  <span className="text-secondary-600">Coordination Cost:</span>
                  <span className="ml-2 font-medium">
                    {formatCurrency(blindspot.impact_analysis.coordination_cost_monthly || 0)}/month
                  </span>
                </div>
                <div>
                  <span className="text-secondary-600">Delay Risk:</span>
                  <span className="ml-2 font-medium">
                    {blindspot.impact_analysis.delay_weeks || 0} weeks
                  </span>
                </div>
              </div>
            </div>
          )}

          {blindspot.recommendation && (
            <div className="bg-success-50 border border-success-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h5 className="font-medium text-success-700 mb-2">Recommendation</h5>
                  <p className="text-sm text-success-600 mb-3">
                    {blindspot.recommendation.action}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-success-600">Priority:</span>
                      <span className="ml-2 font-medium capitalize">
                        {blindspot.recommendation.priority}
                      </span>
                    </div>
                    <div>
                      <span className="text-success-600">Timeline:</span>
                      <span className="ml-2 font-medium">
                        {blindspot.recommendation.timeline_weeks} weeks
                      </span>
                    </div>
                    <div>
                      <span className="text-success-600">Savings:</span>
                      <span className="ml-2 font-medium">
                        {formatCurrency(blindspot.recommendation.savings_annual)}/year
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlindspotCard;

// Made with Bob
