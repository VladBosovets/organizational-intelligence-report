import React from 'react';
import { GitBranch, FileCode } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

const RepoOverview = ({ repositories }) => {
  if (!repositories || repositories.length === 0) return null;

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Repositories Analyzed</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {repositories.map((repo, index) => (
          <div key={index} className="card-hover">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-lg">{repo.name}</h4>
                <a 
                  href={repo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary-500 hover:underline"
                >
                  View on GitHub
                </a>
              </div>
              <GitBranch className="w-5 h-5 text-secondary-400" />
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-secondary-600 flex items-center space-x-2">
                  <FileCode className="w-4 h-4" />
                  <span>Python Files</span>
                </span>
                <span className="font-medium">{formatNumber(repo.python_files)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary-600 flex items-center space-x-2">
                  <FileCode className="w-4 h-4" />
                  <span>Lines of Code</span>
                </span>
                <span className="font-medium">{formatNumber(repo.python_lines)}</span>
              </div>
              {repo.analyzed_path && (
                <div className="text-xs text-secondary-500 mt-2">
                  Analyzed: {repo.analyzed_path}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoOverview;

// Made with Bob
