import React, { useRef, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { GRAPH_CONFIG } from '../../utils/constants';

const DependencyGraph = ({ data }) => {
  const graphRef = useRef();

  const graphData = {
    nodes: data.nodes.map(node => ({
      id: node.id,
      name: node.label || node.id,
      type: node.type,
      criticality: node.criticality,
      size: node.size || 8,
      color: node.criticality === 'critical'
        ? GRAPH_CONFIG.nodeColors.critical
        : node.type === 'repository'
        ? GRAPH_CONFIG.nodeColors.repository
        : GRAPH_CONFIG.nodeColors[node.type] || GRAPH_CONFIG.nodeColors.internal
    })),
    links: data.edges.map(edge => ({
      source: edge.source,
      target: edge.target,
      type: edge.type,
      color: edge.type === 'cross_repo' ? '#8a3ffc' : GRAPH_CONFIG.linkColor
    }))
  };

  const handleNodeClick = useCallback((node) => {
    // Center on clicked node
    const distance = 200;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y);
    graphRef.current.centerAt(node.x, node.y, 1000);
    graphRef.current.zoom(distRatio, 1000);
  }, []);

  const drawNode = useCallback((node, ctx, globalScale) => {
    const label = node.name;
    const fontSize = 12/globalScale;
    ctx.font = `${fontSize}px IBM Plex Sans, sans-serif`;
    
    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size, 0, 2 * Math.PI, false);
    ctx.fillStyle = node.color;
    ctx.fill();
    
    // Add border for critical nodes
    if (node.criticality === 'critical') {
      ctx.strokeStyle = '#da1e28';
      ctx.lineWidth = 2/globalScale;
      ctx.stroke();
    }
    
    // Draw label
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#161616';
    ctx.fillText(label, node.x, node.y + node.size + fontSize + 2);
  }, []);

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Dependency Network</h3>
        <p className="text-secondary-600 text-sm">
          Interactive visualization of module relationships. Click nodes to focus, drag to explore.
        </p>
      </div>
      
      <div className="border border-secondary-200 rounded-lg overflow-hidden bg-white">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeLabel={node => `${node.name}${node.criticality ? ` (${node.criticality})` : ''}`}
          nodeCanvasObject={drawNode}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * 1.5, 0, 2 * Math.PI, false);
            ctx.fill();
          }}
          linkColor={link => link.color}
          linkWidth={GRAPH_CONFIG.linkWidth}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={2}
          onNodeClick={handleNodeClick}
          width={1000}
          height={600}
          backgroundColor="#ffffff"
          cooldownTicks={100}
          d3VelocityDecay={0.3}
        />
      </div>
    </div>
  );
};

export default DependencyGraph;

// Made with Bob
