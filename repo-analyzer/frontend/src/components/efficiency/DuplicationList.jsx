import React from 'react';
import DuplicationCard from './DuplicationCard';
import { Copy } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const DuplicationList = ({ duplications }) => {
  if (!duplications || duplications.length === 0) {
    return (
      <div className="card text-center py-12">
        <Copy className="w-12 h-12 text-success-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-success-600 mb-2">
          No Significant Duplication Found
        </h3>
        <p className="text-secondary-600">
          Code appears well-organized with minimal redundancy
        </p>
      </div>
    );
  }

  const totalCost = duplications.reduce((sum, dup) => 
    sum + (dup.cost_analysis?.total_waste_annual || 0), 0
  );

  return (
    <div className="space-y-6">
      <div className="card bg-warning-50 border-warning-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-warning-700 mb-1">
              Code Duplication Detected
            </h3>
            <p className="text-warning-600">
              {duplications.length} instance{duplications.length > 1 ? 's' : ''} of duplicate code found
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-warning-700">
              {formatCurrency(totalCost)}
            </div>
            <div className="text-sm text-warning-600">Annual waste</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {duplications.map((duplication, index) => (
          <DuplicationCard key={duplication.id || index} duplication={duplication} />
        ))}
      </div>
    </div>
  );
};

export default DuplicationList;

// Made with Bob
