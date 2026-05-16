import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const ROICalculator = ({ recommendations }) => {
  const [selectedRecs, setSelectedRecs] = useState(new Set());
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate totals based on selected recommendations
  const totals = useMemo(() => {
    const selected = recommendations.filter(rec => selectedRecs.has(rec.title));
    
    const totalCost = selected.reduce((sum, rec) => sum + (rec.implementation_cost || 0), 0);
    const totalSavings = selected.reduce((sum, rec) => sum + (rec.savings_annual || 0), 0);
    const totalWeeks = selected.reduce((sum, rec) => sum + (rec.effort_weeks || 0), 0);
    const roi = totalCost > 0 ? (totalSavings / totalCost).toFixed(1) : 0;
    const paybackMonths = totalSavings > 0 ? ((totalCost / totalSavings) * 12).toFixed(1) : 0;

    return {
      cost: totalCost,
      savings: totalSavings,
      weeks: totalWeeks,
      roi: parseFloat(roi),
      paybackMonths: parseFloat(paybackMonths),
      count: selected.length
    };
  }, [selectedRecs, recommendations]);

  const toggleRecommendation = (title) => {
    setSelectedRecs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    setSelectedRecs(new Set(recommendations.map(rec => rec.title)));
  };

  const clearAll = () => {
    setSelectedRecs(new Set());
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calculator className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold">"What If" ROI Calculator</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <p className="text-secondary-600 mb-6">
        Select recommendations to see the combined financial impact and ROI
      </p>

      {/* Results Summary */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="card-hover bg-primary-50 border-primary-200">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">Implementation Cost</span>
          </div>
          <div className="text-2xl font-bold text-primary-700">
            {formatCurrency(totals.cost)}
          </div>
        </div>

        <div className="card-hover bg-success-50 border-success-200">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-success-600" />
            <span className="text-sm font-medium text-success-700">Annual Savings</span>
          </div>
          <div className="text-2xl font-bold text-success-700">
            {formatCurrency(totals.savings)}
          </div>
        </div>

        <div className="card-hover bg-accent-50 border-accent-200">
          <div className="flex items-center space-x-2 mb-2">
            <Calculator className="w-5 h-5 text-accent-600" />
            <span className="text-sm font-medium text-accent-700">ROI</span>
          </div>
          <div className="text-2xl font-bold text-accent-700">
            {totals.roi > 0 ? `${totals.roi}x` : '-'}
          </div>
        </div>

        <div className="card-hover bg-warning-50 border-warning-200">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-warning-600" />
            <span className="text-sm font-medium text-warning-700">Payback Period</span>
          </div>
          <div className="text-2xl font-bold text-warning-700">
            {totals.paybackMonths > 0 ? `${totals.paybackMonths}mo` : '-'}
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      {totals.count > 0 && (
        <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success-600" />
              <span className="font-medium text-secondary-900">
                {totals.count} recommendation{totals.count !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="text-sm text-secondary-600">
              Total effort: <span className="font-semibold">{totals.weeks} weeks</span>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations List */}
      {isExpanded && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-secondary-200">
            <h4 className="font-semibold text-secondary-900">Select Recommendations</h4>
            <div className="space-x-2">
              <button
                onClick={selectAll}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Select All
              </button>
              <span className="text-secondary-400">|</span>
              <button
                onClick={clearAll}
                className="text-sm text-secondary-600 hover:text-secondary-700 font-medium"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec, index) => {
              const isSelected = selectedRecs.has(rec.title);
              return (
                <div
                  key={index}
                  onClick={() => toggleRecommendation(rec.title)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-secondary-200 bg-white hover:border-secondary-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-primary-600 border-primary-600'
                            : 'border-secondary-300 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-secondary-900 mb-1">
                        {rec.title}
                      </h5>
                      <p className="text-sm text-secondary-600 mb-3">
                        {rec.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-secondary-500" />
                          <span className="text-secondary-700">
                            {rec.effort_weeks} weeks
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4 text-secondary-500" />
                          <span className="text-secondary-700">
                            Cost: {formatCurrency(rec.implementation_cost)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-success-600" />
                          <span className="text-success-700 font-medium">
                            Saves: {formatCurrency(rec.savings_annual)}/year
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calculator className="w-4 h-4 text-accent-600" />
                          <span className="text-accent-700 font-medium">
                            ROI: {rec.roi}x
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!isExpanded && (
        <div className="text-center py-4">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Click to expand and select recommendations →
          </button>
        </div>
      )}
    </div>
  );
};

export default ROICalculator;

// Made with Bob