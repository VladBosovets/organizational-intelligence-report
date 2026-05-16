import React from 'react';
import { GitBranch, FileCode, Layers } from 'lucide-react';

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
              {repo.key_modules && repo.key_modules.length > 0 && (
                <div className="flex items-start space-x-2">
                  <Layers className="w-4 h-4 text-secondary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-secondary-600 block mb-1">Key Modules</span>
                    <div className="flex flex-wrap gap-1">
                      {repo.key_modules.map((module, idx) => (
                        <span key={idx} className="badge-primary text-xs">
                          {module}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {repo.most_active_files && repo.most_active_files.length > 0 && (
                <div className="flex items-start space-x-2 mt-3">
                  <FileCode className="w-4 h-4 text-secondary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-secondary-600 block mb-1">Most Active Files</span>
                    <ul className="text-xs text-secondary-700 space-y-0.5">
                      {repo.most_active_files.slice(0, 3).map((file, idx) => (
                        <li key={idx} className="truncate">{file}</li>
                      ))}
                    </ul>
                  </div>
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
