import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorState = ({ message = 'An error occurred', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="w-16 h-16 bg-danger-50 rounded-full flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-danger-500" />
      </div>
      <h3 className="text-xl font-semibold text-secondary-900">
        Error Loading Data
      </h3>
      <p className="text-secondary-600 text-center max-w-md">
        {message}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;

// Made with Bob
