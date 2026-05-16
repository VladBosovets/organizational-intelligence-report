import React from 'react';
import { AlertTriangle, Users, FileCode, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const RiskSummary = ({ data }) => {
  const metrics = [
    {
      icon: AlertTriangle,
      label: 'Critical Developers',
      value: data.summary?.critical_developers || data.cross_repo_critical_developers?.filter(d => d.risk_score >= 80).length || 0,
      subtext: 'High bus factor risk',
      color: 'danger'
    },
    {
      icon: FileCode,
      label: 'Single-Owner Modules',
      value: data.summary?.single_owner_modules || data.single_owner_modules?.length || 0,
      subtext: 'Need backup maintainers',
      color: 'warning'
    },
    {
      icon: Users,
      label: 'Total Risk Exposure',
      value: formatCurrency(data.summary?.total_risk_exposure || data.total_bus_factor_risk || 0),
      subtext: 'Potential impact',
      color: 'danger'
    },
    {
      icon: TrendingUp,
      label: 'Recommendations',
      value: data.summary?.recommendations || data.cross_repo_critical_developers?.length || 0,
      subtext: 'Risk mitigation actions',
      color: 'primary'
    }
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const colorClasses = {
          primary: 'text-primary-600 bg-primary-50',
          danger: 'text-danger-500 bg-danger-50',
          warning: 'text-warning-500 bg-warning-50'
        };
        
        return (
          <div key={index} className="metric-card">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[metric.color]}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className={`metric-value ${colorClasses[metric.color].split(' ')[0]}`}>
              {metric.value}
            </div>
            <div className="metric-label">{metric.label}</div>
            <p className="text-xs text-secondary-500 mt-2">{metric.subtext}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RiskSummary;

// Made with Bob
