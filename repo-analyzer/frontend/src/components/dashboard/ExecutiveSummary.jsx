import React from 'react';
import MetricCard from './MetricCard';
import { DollarSign, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const ExecutiveSummary = ({ data }) => {
  if (!data) return null;

  const metrics = [
    {
      icon: DollarSign,
      label: 'Total Savings Potential',
      value: formatCurrency(data.total_inefficiency_cost),
      subtext: 'Annual',
      color: 'success'
    },
    {
      icon: TrendingUp,
      label: 'Quick Wins Available',
      value: data.quick_wins?.length || 0,
      subtext: 'High ROI opportunities',
      color: 'primary'
    },
    {
      icon: AlertTriangle,
      label: 'Critical Findings',
      value: data.key_findings?.length || 0,
      subtext: 'Require attention',
      color: 'warning'
    },
    {
      icon: Target,
      label: 'Average ROI',
      value: data.quick_wins?.[0]?.roi ? `${data.quick_wins[0].roi}x` : 'N/A',
      subtext: 'On recommendations',
      color: 'accent'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {data.key_findings && data.key_findings.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Key Findings</h3>
          <ul className="space-y-3">
            {data.key_findings.map((finding, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-600 text-sm font-semibold">{index + 1}</span>
                </div>
                <p className="text-secondary-700">{finding}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExecutiveSummary;

// Made with Bob
