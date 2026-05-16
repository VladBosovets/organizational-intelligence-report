import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Plus, X, AlertCircle, Sparkles } from 'lucide-react';
import { isValidGitHubUrl, extractRepoName } from '../utils/simulateAnalysis';

const AnalyzeStart = () => {
  const navigate = useNavigate();
  const [repoUrls, setRepoUrls] = useState(['', '']);
  const [errors, setErrors] = useState({});

  const EXAMPLE_URLS = [
    'https://github.com/IBM/mcp-context-forge',
    'https://github.com/IBM/ibm-watsonx-orchestrate-adk'
  ];

  const handleUrlChange = (index, value) => {
    const newUrls = [...repoUrls];
    newUrls[index] = value;
    setRepoUrls(newUrls);
    
    // Clear error for this field
    if (errors[index]) {
      const newErrors = { ...errors };
      delete newErrors[index];
      setErrors(newErrors);
    }
  };

  const addUrlField = () => {
    if (repoUrls.length < 5) {
      setRepoUrls([...repoUrls, '']);
    }
  };

  const removeUrlField = (index) => {
    if (repoUrls.length > 1) {
      const newUrls = repoUrls.filter((_, i) => i !== index);
      setRepoUrls(newUrls);
      
      // Remove error for this field
      const newErrors = { ...errors };
      delete newErrors[index];
      setErrors(newErrors);
    }
  };

  const loadExamples = () => {
    setRepoUrls(EXAMPLE_URLS);
    setErrors({});
  };

  const validateAndAnalyze = () => {
    const newErrors = {};
    const validUrls = [];

    repoUrls.forEach((url, index) => {
      const trimmedUrl = url.trim();
      if (trimmedUrl) {
        if (!isValidGitHubUrl(trimmedUrl)) {
          newErrors[index] = 'Invalid GitHub URL format';
        } else {
          validUrls.push(trimmedUrl);
        }
      }
    });

    if (validUrls.length === 0) {
      newErrors.general = 'Please enter at least one repository URL';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Store URLs in sessionStorage for the progress page
    sessionStorage.setItem('analyzingRepos', JSON.stringify(validUrls));
    navigate('/analyze/progress');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-500 rounded-2xl mb-4">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-secondary-900">
          Analyze Your Repositories
        </h1>
        <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
          Enter GitHub repository URLs to get AI-powered insights on code health, 
          developer risks, and optimization opportunities
        </p>
      </div>

      {/* Main Form */}
      <div className="card space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <Github className="w-6 h-6" />
            <span>Repository URLs</span>
          </h2>
          <button
            onClick={loadExamples}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Load Example URLs
          </button>
        </div>

        {errors.general && (
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-danger-600 flex-shrink-0 mt-0.5" />
            <p className="text-danger-700">{errors.general}</p>
          </div>
        )}

        <div className="space-y-4">
          {repoUrls.map((url, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    placeholder="https://github.com/owner/repository"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors[index] ? 'border-danger-500' : 'border-secondary-300'
                    }`}
                  />
                  {errors[index] && (
                    <p className="text-sm text-danger-600 mt-1">{errors[index]}</p>
                  )}
                </div>
                {repoUrls.length > 1 && (
                  <button
                    onClick={() => removeUrlField(index)}
                    className="p-2 text-secondary-500 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                    title="Remove"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {url && isValidGitHubUrl(url) && (
                <p className="text-sm text-success-600 ml-4">
                  ✓ {extractRepoName(url)}
                </p>
              )}
            </div>
          ))}
        </div>

        {repoUrls.length < 5 && (
          <button
            onClick={addUrlField}
            className="w-full py-3 border-2 border-dashed border-secondary-300 rounded-lg text-secondary-600 hover:border-primary-500 hover:text-primary-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Another Repository</span>
          </button>
        )}

        <div className="pt-4 border-t border-secondary-200">
          <button
            onClick={validateAndAnalyze}
            className="btn-primary w-full text-lg py-4 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Analyze Repositories</span>
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-semibold mb-1">Fast Analysis</h3>
          <p className="text-sm text-secondary-600">Results in ~30 seconds</p>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="font-semibold mb-1">Secure</h3>
          <p className="text-sm text-secondary-600">Read-only access</p>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-2">💡</div>
          <h3 className="font-semibold mb-1">Actionable</h3>
          <p className="text-sm text-secondary-600">Clear recommendations</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeStart;

// Made with Bob