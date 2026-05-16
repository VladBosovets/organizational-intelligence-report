import React from 'react';
import { FileCode, GitBranch } from 'lucide-react';

const CodeComparison = ({ files }) => {
  if (!files || files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h5 className="font-medium text-sm text-secondary-700 flex items-center">
        <FileCode className="w-4 h-4 mr-2" />
        Duplicate Locations
      </h5>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {files.map((file, index) => (
          <div 
            key={index}
            className="bg-secondary-50 border border-secondary-200 rounded-lg p-3"
          >
            <div className="flex items-start space-x-2 mb-2">
              <GitBranch className="w-4 h-4 text-secondary-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-secondary-700 truncate" title={file.path}>
                  {file.path}
                </p>
                <p className="text-xs text-secondary-500 mt-1">
                  Lines {file.start_line}-{file.end_line}
                  {file.function_name && (
                    <span className="ml-2">
                      in <span className="font-medium">{file.function_name}</span>
                    </span>
                  )}
                </p>
              </div>
            </div>

            {file.code_snippet && (
              <div className="mt-2 bg-white border border-secondary-200 rounded p-2 overflow-x-auto">
                <pre className="text-xs font-mono text-secondary-700 whitespace-pre">
                  {file.code_snippet}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {files.length > 2 && (
        <p className="text-xs text-secondary-500 italic">
          Showing {files.length} duplicate locations
        </p>
      )}
    </div>
  );
};

export default CodeComparison;

// Made with Bob
