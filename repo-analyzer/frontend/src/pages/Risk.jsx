import React from 'react';
import { useAnalysisData } from '../hooks/useAnalysisData';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import RiskSummary from '../components/risk/RiskSummary';
import DeveloperRiskHeatmap from '../components/risk/DeveloperRiskHeatmap';
import BusFactorAlert from '../components/risk/BusFactorAlert';

const Risk = () => {
  const { data, loading, error } = useAnalysisData();

  if (loading) return <LoadingState message="Loading risk analysis..." />;
  if (error) return <ErrorState message={error} />;
  if (!data?.developer_risk) return <ErrorState message="No risk data available" />;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">
          Risk Analysis
        </h2>
        <p className="text-secondary-600">
          Developer dependencies and organizational risk factors
        </p>
      </div>

      <BusFactorAlert risks={data.developer_risk.cross_repo_critical_developers || []} />
      <RiskSummary data={data.developer_risk} />
      <DeveloperRiskHeatmap developers={data.developer_risk.cross_repo_critical_developers || []} />
    </div>
  );
};

export default Risk;

// Made with Bob
