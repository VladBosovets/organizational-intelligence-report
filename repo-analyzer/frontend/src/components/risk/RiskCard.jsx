import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, FileCode, AlertTriangle } from 'lucide-react';
import { getRiskColor, getRiskLabel } from '../../utils/formatters';
import { formatCurrency } from '../../utils/formatters';

const RiskCard = ({ developer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card-hover">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-secondary-600" />
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold text-lg">{developer.developer}</h4>
            <p className="text-sm text-secondary-600">{developer.email}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className={`badge ${getRiskColor(developer.risk_score)}`}>
              {getRiskLabel(developer.risk_score)} Risk
            </span>
            <span className="text-2xl font-bold text-danger-500">
              {developer.risk_score}
            </span>
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-secondary-200 space-y-4">
          <div>
            <h5 className="font-medium mb-2 flex items-center space-x-2">
              <FileCode className="w-4 h-4" />
              <span>Critical Files ({developer.critical_files?.length || 0})</span>
            </h5>
            <ul className="space-y-1">
              {developer.critical_files?.map((file, index) => (
                <li key={index} className="text-sm text-secondary-600 font-mono">
                  {file}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-medium mb-2 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Risk Assessment</span>
            </h5>
            <p className="text-sm text-secondary-700 mb-2">{developer.reason}</p>
            {developer.impact_if_lost && (
              <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 text-sm">
                <p className="font-medium text-danger-700 mb-1">Impact if Lost:</p>
                <p className="text-danger-600">{developer.impact_if_lost.description}</p>
                <div className="mt-2 flex items-center space-x-4 text-xs">
                  <span>Cost: {formatCurrency(developer.impact_if_lost.cost_usd)}</span>
                  <span>Time: {developer.impact_if_lost.time_months} months</span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-secondary-600">Repos Involved:</span>
              <span className="ml-2 font-medium">{developer.repos_involved}</span>
            </div>
            {developer.commit_percentage && (
              <div>
                <span className="text-secondary-600">Commit %:</span>
                <span className="ml-2 font-medium">
                  {Object.values(developer.commit_percentage).join('%, ')}%
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskCard;

// Made with Bob
