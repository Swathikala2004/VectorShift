// ui.js
// Displays the drag-and-drop UI



import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

import InputNode from "./nodes/inputNode";
import LLMNode from "./nodes/llmNode";
import OutputNode from "./nodes/outputNode";
import TextNode from "./nodes/textNode";
import ApiNode from "./nodes/apiNode";
import MathNode from "./nodes/mathNode";
import FilterNode from "./nodes/filterNode";
import DelayNode from "./nodes/delayNode";
import LoggerNode from "./nodes/loggerNode";
import SubmitButton from "./submit";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
  text: TextNode,
  api: ApiNode,
  math: MathNode,
  filter: FilterNode,
  delay: DelayNode,
  logger: LoggerNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const reactFlowBounds =
        reactFlowWrapper.current.getBoundingClientRect();

      const rawData =
        event.dataTransfer.getData("application/reactflow");

      if (!rawData) return;

      const appData = JSON.parse(rawData);
      const type = appData?.nodeType;

      if (!type || !nodeTypes[type]) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);

      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      };

      addNode(newNode);
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div
        ref={reactFlowWrapper}
        style={{ flex: 1 }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
          fitView
        >
          <Background gap={gridSize} color="#e2e8f0" />
          <Controls />
          <MiniMap
            nodeStrokeColor="#64748b"
            nodeColor="#f1f5f9"
            nodeBorderRadius={4}
          />
        </ReactFlow>
      </div>
      <SubmitButton />
    </>
  );
};