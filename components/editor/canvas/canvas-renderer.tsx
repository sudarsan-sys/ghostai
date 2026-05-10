"use client";

import { ReactFlow, Background, BackgroundVariant, MiniMap, ConnectionMode } from "@xyflow/react";
import { useLiveblocksFlow, Cursors } from "@liveblocks/react-flow";
import "@xyflow/react/dist/style.css";
import "@liveblocks/react-flow/styles.css";

export function CanvasRenderer() {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    onDelete 
  } = useLiveblocksFlow({
    suspense: true,
    nodes: {
      initial: [],
    },
    edges: {
      initial: [],
    },
  });

  return (
    <div className="w-full h-full bg-base relative overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDelete={onDelete}
        connectionMode={ConnectionMode.Loose}
        fitView
        snapToGrid
        snapGrid={[20, 20]}
        colorMode="dark"
        className="bg-base"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="rgba(var(--brand-rgb), 0.1)" 
        />
        <MiniMap 
          className="!bg-surface !border-surface-border !rounded-xl !shadow-2xl opacity-80 hover:opacity-100 transition-opacity" 
          maskColor="rgba(0,0,0,0.2)"
          nodeColor="#3b82f6"
        />
        <Cursors />
      </ReactFlow>
      
      {/* Visual Indicator for Room Name or Sync Status could go here */}
    </div>
  );
}
