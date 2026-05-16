import React from 'react';
import { Network, GitBranch, AlertCircle, Link } from 'lucide-react';

const GraphStats = ({ data }) => {
  const stats = [
    {
      icon: Network,
      label: 'Total Modules',
      value: data.nodes?.length || 0,
      color: 'primary'
    },
    {
      icon: Link,
      label: 'Dependencies',
      value: data.edges?.length || 0,
      color: 'accent'
    },
    {
      icon: AlertCircle,
      label: 'Critical Modules',
      value: data.critical_modules?.length || 0,
      color: 'danger'
    },
    {
      icon: GitBranch,
      label: 'Cross-Repo Links',
      value: data.cross_repo_connections?.length || 0,
      color: 'warning'
    }
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colorClasses = {
          primary: 'text-primary-600 bg-primary-50',
          accent: 'text-accent-500 bg-accent-50',
          danger: 'text-danger-500 bg-danger-50',
          warning: 'text-warning-500 bg-warning-50'
        };
        
        return (
          <div key={index} className="metric-card">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[stat.color]}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className={`metric-value ${colorClasses[stat.color].split(' ')[0]}`}>
              {stat.value}
            </div>
            <div className="metric-label">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default GraphStats;

// Made with Bob
