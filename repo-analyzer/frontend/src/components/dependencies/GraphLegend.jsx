import React from 'react';
import { GRAPH_CONFIG } from '../../utils/constants';

const GraphLegend = () => {
  const items = [
    { color: GRAPH_CONFIG.nodeColors.internal, label: 'Internal Module' },
    { color: GRAPH_CONFIG.nodeColors.external, label: 'External Dependency' },
    { color: GRAPH_CONFIG.nodeColors.critical, label: 'Critical Module' }
  ];

  return (
    <div className="flex items-center space-x-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-secondary-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default GraphLegend;

// Made with Bob
