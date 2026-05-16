import React from 'react';
import RiskCard from './RiskCard';

const DeveloperRiskHeatmap = ({ developers }) => {
  if (!developers || developers.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-secondary-600">No critical developer risks identified</p>
      </div>
    );
  }

  // Sort by risk score descending
  const sortedDevelopers = [...developers].sort((a, b) => b.risk_score - a.risk_score);

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Developer Risk Analysis</h3>
      <p className="text-secondary-600 mb-6">
        Developers with critical dependencies across repositories
      </p>
      
      <div className="space-y-4">
        {sortedDevelopers.map((developer, index) => (
          <RiskCard key={index} developer={developer} />
        ))}
      </div>
    </div>
  );
};

export default DeveloperRiskHeatmap;

// Made with Bob
