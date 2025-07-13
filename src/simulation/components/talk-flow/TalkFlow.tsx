import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Position,
  useNodesState,
  useEdgesState,
  PanOnScrollMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./talkflow.css";
import CustomNode from "./CustomNode";

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
    sourcePosition: Position.Right,
  },
  {
    id: "n2",
    type: "input",
    position: { x: 400, y: 0 },
    data: { label: "Node 2" },
    sourcePosition: Position.Left,
  },
];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

export function TalkFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "n1",
      type: "input",
      data: { label: "  Olá doutor" },
      position: { x: 0, y: 25 },
      sourcePosition: Position.Right,
    },
    {
      id: "n2",
      type: "custom",
      data: { label: "Estou com muita dor nas costas" },
      position: { x: 250, y: -25 },
    },
    {
      id: "n3",
      type: "input",
      data: { label: "Estou com dor no abdomem" },
      position: { x: 250, y: 50 },
      sourcePosition: Position.Right,
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        zoomOnScroll={false}
        preventScrolling={false}
        panOnScrollMode={PanOnScrollMode.Vertical}
      />
    </div>
  );
}
