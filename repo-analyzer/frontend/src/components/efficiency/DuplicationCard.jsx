import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, TrendingUp } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import CodeComparison from './CodeComparison';

const DuplicationCard = ({ duplication }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card-hover">
      <div 
        className="flex items-start justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <Copy className="w-5 h-5 text-warning-500" />
            <h4 className="font-semibold text-lg capitalize">
              {duplication.category?.replace('_', ' ')}
            </h4>
            <span className="badge-warning">
              {formatPercentage(duplication.similarity_score)} similar
            </span>
          </div>
          
          <p className="text-secondary-600 text-sm mb-3">
            {duplication.duplicate_lines} lines duplicated across {duplication.files?.length || 0} files
          </p>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-secondary-600">Wasted Cost:</span>
              <span className="ml-2 font-medium text-danger-600">
                {formatCurrency(duplication.cost_analysis?.total_waste_annual || 0)}/year
              </span>
            </div>
            <div>
              <span className="text-secondary-600">Dev Hours:</span>
              <span className="ml-2 font-medium">
                {duplication.cost_analysis?.development_hours_wasted || 0}h
              </span>
            </div>
            <div>
              <span className="text-secondary-600">Maintenance:</span>
              <span className="ml-2 font-medium">
                {duplication.cost_analysis?.maintenance_hours_monthly || 0}h/month
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
          <CodeComparison files={duplication.files} />

          {duplication.recommendation && (
            <div className="bg-success-50 border border-success-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h5 className="font-medium text-success-700 mb-2">Recommendation</h5>
                  <p className="text-sm text-success-600 mb-3">
                    {duplication.recommendation.action}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-success-600">Effort:</span>
                      <span className="ml-2 font-medium">{duplication.recommendation.effort_weeks} weeks</span>
                    </div>
                    <div>
                      <span className="text-success-600">Savings:</span>
                      <span className="ml-2 font-medium">
                        {formatCurrency(duplication.recommendation.savings_annual)}/year
                      </span>
                    </div>
                    <div>
                      <span className="text-success-600">ROI:</span>
                      <span className="ml-2 font-medium">{duplication.recommendation.roi}x</span>
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

export default DuplicationCard;

// Made with Bob
