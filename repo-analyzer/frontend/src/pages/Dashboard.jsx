import React, { useState } from 'react';
import { Download, Share2, Check } from 'lucide-react';
import { useAnalysisData } from '../hooks/useAnalysisData';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import ExecutiveSummary from '../components/dashboard/ExecutiveSummary';
import QuickWins from '../components/dashboard/QuickWins';
import RepoOverview from '../components/dashboard/RepoOverview';
import ROICalculator from '../components/dashboard/ROICalculator';
import { exportToPDF, generateShareableLink, copyToClipboard } from '../utils/exportPDF';

const Dashboard = () => {
  const { data, loading, error } = useAnalysisData();
  const [isExporting, setIsExporting] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  if (loading) return <LoadingState message="Loading dashboard..." />;
  if (error) return <ErrorState message={error} />;
  if (!data) return <ErrorState message="No analysis data available" />;

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportToPDF(data);
      setTimeout(() => setIsExporting(false), 1000);
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!shareUrl) {
      const url = generateShareableLink(data);
      setShareUrl(url);
      const success = await copyToClipboard(url);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      const success = await copyToClipboard(shareUrl);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-secondary-900 mb-2">
            Executive Dashboard
          </h2>
          <p className="text-secondary-600">
            High-level overview of organizational code health
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleShare}
            className="btn-secondary flex items-center space-x-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </>
            )}
          </button>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="btn-primary flex items-center space-x-2"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      <ExecutiveSummary data={data.executive_summary} />
      <ROICalculator recommendations={data.efficiency_analysis?.recommendations || []} />
      <QuickWins recommendations={data.actionable_recommendations?.high_priority || []} />
      <RepoOverview repositories={data.metadata?.repositories || []} />
    </div>
  );
};

export default Dashboard;

// Made with Bob
