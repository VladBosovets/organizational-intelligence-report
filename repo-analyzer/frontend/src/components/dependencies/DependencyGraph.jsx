import React, { useRef, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { GRAPH_CONFIG } from '../../utils/constants';

const DependencyGraph = ({ data }) => {
  const graphRef = useRef();

  const graphData = {
    nodes: data.nodes.map(node => ({
      id: node.id,
      name: node.id,
      type: node.type,
      size: node.size || 8,
      color: GRAPH_CONFIG.nodeColors[node.type] || GRAPH_CONFIG.nodeColors.internal
    })),
    links: data.edges.map(edge => ({
      source: edge.source,
      target: edge.target,
      type: edge.type
    }))
  };

  const handleNodeClick = useCallback((node) => {
    // Center on clicked node
    const distance = 200;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y);
    graphRef.current.centerAt(node.x, node.y, 1000);
    graphRef.current.zoom(distRatio, 1000);
  }, []);

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Dependency Network</h3>
        <p className="text-secondary-600 text-sm">
          Interactive visualization of module relationships. Click nodes to focus, drag to explore.
        </p>
      </div>
      
      <div className="border border-secondary-200 rounded-lg overflow-hidden bg-secondary-50">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeLabel="name"
          nodeColor="color"
          nodeRelSize={GRAPH_CONFIG.nodeSize}
          linkColor={() => GRAPH_CONFIG.linkColor}
          linkWidth={GRAPH_CONFIG.linkWidth}
          onNodeClick={handleNodeClick}
          width={1000}
          height={600}
          backgroundColor="#f4f4f4"
        />
      </div>
    </div>
  );
};

export default DependencyGraph;

// Made with Bob
