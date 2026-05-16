import React from 'react';
import { useAnalysisData } from '../hooks/useAnalysisData';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import DependencyGraph from '../components/dependencies/DependencyGraph';
import GraphStats from '../components/dependencies/GraphStats';

const Dependencies = () => {
  const { data, loading, error } = useAnalysisData();

  if (loading) return <LoadingState message="Loading dependency analysis..." />;
  if (error) return <ErrorState message={error} />;
  if (!data?.dependency_web) return <ErrorState message="No dependency data available" />;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">
          Dependency Analysis
        </h2>
        <p className="text-secondary-600">
          Cross-repository dependency relationships and coupling risks
        </p>
      </div>

      <GraphStats data={data.dependency_web} />
      <DependencyGraph data={data.dependency_web} />
    </div>
  );
};

export default Dependencies;

// Made with Bob
