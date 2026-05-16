import React from 'react';
import { useAnalysisData } from '../hooks/useAnalysisData';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import ExecutiveSummary from '../components/dashboard/ExecutiveSummary';
import QuickWins from '../components/dashboard/QuickWins';
import RepoOverview from '../components/dashboard/RepoOverview';

const Dashboard = () => {
  const { data, loading, error } = useAnalysisData();

  if (loading) return <LoadingState message="Loading dashboard..." />;
  if (error) return <ErrorState message={error} />;
  if (!data) return <ErrorState message="No analysis data available" />;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">
          Executive Dashboard
        </h2>
        <p className="text-secondary-600">
          High-level overview of organizational code health
        </p>
      </div>

      <ExecutiveSummary data={data.executive_summary} />
      <QuickWins recommendations={data.actionable_recommendations?.high_priority || []} />
      <RepoOverview repositories={data.metadata?.repositories || []} />
    </div>
  );
};

export default Dashboard;

// Made with Bob
