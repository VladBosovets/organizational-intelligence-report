import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Loader } from 'lucide-react';
import { simulateAnalysis, ANALYSIS_STEPS, extractRepoName } from '../utils/simulateAnalysis';

const AnalyzeProgress = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [progress, setProgress] = useState(0);
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
    simulateAnalysis(
      (step, percentage) => {
        setCurrentStep(step);
        setProgress(percentage);
        setCompletedSteps(prev => {
          if (!prev.find(s => s.id === step.id)) {
            return [...prev, step];
          }
          return prev;
        });
      },
      () => {
        // Analysis complete - navigate to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    );
  }, [navigate]);

  const getStepStatus = (step) => {
    if (completedSteps.find(s => s.id === step.id && s.id !== currentStep?.id)) {
      return 'completed';
    }
    if (currentStep?.id === step.id) {
      return 'active';
    }
    return 'pending';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-500 rounded-full mb-4 relative">
          <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping opacity-75"></div>
          <Loader className="w-12 h-12 text-white animate-spin relative z-10" />
        </div>
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

      {/* Progress Bar */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-secondary-700">Overall Progress</span>
          <span className="text-2xl font-bold text-primary-600">{progress}%</span>
        </div>
        <div className="w-full bg-secondary-200 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Analysis Steps */}
      <div className="card space-y-4">
        <h3 className="font-semibold text-lg mb-4">Analysis Steps</h3>
        <div className="space-y-3">
          {ANALYSIS_STEPS.map((step) => {
            const status = getStepStatus(step);
            return (
              <div
                key={step.id}
                className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 ${
                  status === 'active'
                    ? 'bg-primary-50 border-2 border-primary-500'
                    : status === 'completed'
                    ? 'bg-success-50 border border-success-200'
                    : 'bg-secondary-50 border border-secondary-200'
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {status === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-success-600" />
                  ) : status === 'active' ? (
                    <Loader className="w-6 h-6 text-primary-600 animate-spin" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-secondary-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl">{step.icon}</span>
                    <h4
                      className={`font-semibold ${
                        status === 'active'
                          ? 'text-primary-700'
                          : status === 'completed'
                          ? 'text-success-700'
                          : 'text-secondary-600'
                      }`}
                    >
                      {step.label}
                    </h4>
                  </div>
                  {status === 'active' && (
                    <p className="text-sm text-secondary-600">{step.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center text-sm text-secondary-600">
        <p>This usually takes 20-30 seconds. Please don't close this window.</p>
      </div>
    </div>
  );
};

export default AnalyzeProgress;

// Made with Bob