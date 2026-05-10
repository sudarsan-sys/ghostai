import { Node, Edge } from "@xyflow/react";

export type CanvasNodeData = {
  label: string;
  color?: string;
  shape?: "rectangle" | "circle" | "diamond";
  isThinking?: boolean;
};

export type CanvasNode = Node<CanvasNodeData, "canvasNode">;
export type CanvasEdge = Edge<{ label?: string }, "canvasEdge">;

export type CanvasObjectType = "node" | "edge";
