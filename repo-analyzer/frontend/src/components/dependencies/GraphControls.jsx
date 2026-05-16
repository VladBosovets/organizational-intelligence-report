import React from 'react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

const GraphControls = ({ onZoomIn, onZoomOut, onReset }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onZoomIn}
        className="p-2 bg-white border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors"
        title="Zoom In"
      >
        <ZoomIn className="w-5 h-5 text-secondary-600" />
      </button>
      <button
        onClick={onZoomOut}
        className="p-2 bg-white border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors"
        title="Zoom Out"
      >
        <ZoomOut className="w-5 h-5 text-secondary-600" />
      </button>
      <button
        onClick={onReset}
        className="p-2 bg-white border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors"
        title="Reset View"
      >
        <Maximize className="w-5 h-5 text-secondary-600" />
      </button>
    </div>
  );
};

export default GraphControls;

// Made with Bob
