import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { simulateAnalysis, extractRepoName } from '../utils/simulateAnalysis';

const AnalyzeProgress = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    // Get repos from sessionStorage
    const storedRepos = sessionStorage.getItem('analyzingRepos');
    if (storedRepos) {
      const repoUrls = JSON.parse(storedRepos);
      setRepos(repoUrls.map(url => extractRepoName(url)));
    } else {
      // Fallback to example repos
      setRepos(['IBM/mcp-context-forge', 'IBM/ibm-watsonx-orchestrate-adk']);
    }

    // Start the simulated analysis
    simulateAnalysis(({ progress, message }) => {
      setProgress(progress);
      setMessage(message);
      
      // Navigate to dashboard when complete
      if (progress === 100) {
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      }
    });
  }, [navigate]);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-secondary-900">
          Analyzing Repositories
        </h1>
        <p className="text-xl text-secondary-600">
          Bob is analyzing your code...
        </p>
      </div>

      {/* Repositories Being Analyzed */}
      <div className="card">
        <h3 className="font-semibold mb-3">Repositories:</h3>
        <div className="space-y-2">
          {repos.map((repo, index) => (
            <div key={index} className="flex items-center space-x-2 text-secondary-700">
              <CheckCircle className="w-4 h-4 text-success-500" />
              <span className="font-mono text-sm">{repo}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bob Animation with Progress */}
      <div className="card">
        <div className="flex flex-col items-center justify-center py-12 space-y-8">
          {/* Bob's Head - Bouncing Animation */}
          <div className="relative">
            <div className="animate-bounce">
              <img 
                src="/bob.svg" 
                alt="Bob analyzing" 
                className="w-32 h-32"
              />
            </div>
          </div>

          {/* Progress Percentage */}
          <div className="text-center space-y-2">
            <div className="text-6xl font-bold text-primary-600">
              {progress}%
            </div>
            <p className="text-lg text-secondary-600">{message}</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md">
            <div className="w-full bg-secondary-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center text-sm text-secondary-600">
        <p>This takes about 5 seconds. Please don't close this window.</p>
      </div>
    </div>
  );
};

export default AnalyzeProgress;

// Made with Bob