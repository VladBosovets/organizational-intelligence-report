import React, { useState } from 'react';
import { Download, Share2, Check, Copy } from 'lucide-react';
import { exportToPDF, generateShareableLink, copyToClipboard } from '../../utils/exportPDF';

const ExportShare = ({ data }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportToPDF(data);
      // Show success message briefly
      setTimeout(() => setIsExporting(false), 1000);
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
    }
  };

  const handleGenerateLink = async () => {
    const url = generateShareableLink(data);
    setShareUrl(url);
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Export & Share</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Export PDF */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 mb-2">
            <Download className="w-5 h-5 text-primary-600" />
            <h4 className="font-semibold">Export as PDF</h4>
          </div>
          <p className="text-sm text-secondary-600 mb-4">
            Download a comprehensive PDF report with all findings, metrics, and recommendations.
          </p>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download PDF Report</span>
              </>
            )}
          </button>
        </div>

        {/* Share Link */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 mb-2">
            <Share2 className="w-5 h-5 text-primary-600" />
            <h4 className="font-semibold">Share Report</h4>
          </div>
          <p className="text-sm text-secondary-600 mb-4">
            Generate a shareable link to this analysis report for your team.
          </p>
          
          {!shareUrl ? (
            <button
              onClick={handleGenerateLink}
              className="btn-secondary w-full flex items-center justify-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Generate Shareable Link</span>
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-3 bg-secondary-50 rounded-lg border border-secondary-200">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 bg-transparent text-sm font-mono text-secondary-700 outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="flex-shrink-0 p-2 hover:bg-secondary-100 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-success-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-secondary-600" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-xs text-success-600 flex items-center space-x-1">
                  <Check className="w-3 h-3" />
                  <span>Link copied to clipboard!</span>
                </p>
              )}
              <p className="text-xs text-secondary-500">
                Note: This is a demo link. In production, this would be a real shareable URL.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Export Options */}
      <div className="mt-6 pt-6 border-t border-secondary-200">
        <p className="text-sm text-secondary-600 mb-3">
          <strong>What's included in the export:</strong>
        </p>
        <ul className="grid md:grid-cols-2 gap-2 text-sm text-secondary-700">
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
            <span>Executive summary with ROI metrics</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
            <span>Repository analysis details</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
            <span>Developer risk assessment</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
            <span>Code duplication findings</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
            <span>Quick wins & recommendations</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
            <span>Financial impact analysis</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExportShare;

// Made with Bob