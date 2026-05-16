import React from 'react';
import { useAnalysisData } from '../hooks/useAnalysisData';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import DuplicationList from '../components/efficiency/DuplicationList';
import BlindspotList from '../components/efficiency/BlindspotList';
import RecommendationList from '../components/efficiency/RecommendationList';

const Efficiency = () => {
  const { data, loading, error } = useAnalysisData();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!data) return <ErrorState error="No data available" />;

  const efficiency = data.efficiency_analysis || {};
  const duplications = efficiency.code_duplication || [];
  const blindspots = efficiency.coordination_blindspots || [];
  const recommendations = efficiency.recommendations || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">
          Efficiency Analysis
        </h1>
        <p className="text-secondary-600">
          Code duplication, coordination blindspots, and optimization opportunities
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
            Code Duplication
          </h2>
          <DuplicationList duplications={duplications} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
            Coordination Blindspots
          </h2>
          <BlindspotList blindspots={blindspots} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
            Recommendations
          </h2>
          <RecommendationList recommendations={recommendations} />
        </section>
      </div>
    </div>
  );
};

export default Efficiency;

// Made with Bob
