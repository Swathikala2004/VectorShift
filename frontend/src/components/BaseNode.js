// src/components/BaseNode.js
import { Handle, Position } from "reactflow";

const iconMap = {
  input: "📥",
  output: "📤",
  llm: "🤖",
  text: "📝",
  api: "🌐",
  math: "🔢",
  filter: "🔍",
  delay: "⏱️",
  logger: "📋",
};

const colorMap = {
  input: "#6366f1",
  output: "#f59e0b",
  llm: "#8b5cf6",
  text: "#10b981",
  api: "#3b82f6",
  math: "#ef4444",
  filter: "#14b8a6",
  delay: "#f97316",
  logger: "#64748b",
};


const BaseNode = ({
  id,
  type = "input",
  title = "Node",
  inputs = [],
  outputs = [],
  children,
  style = {},
}) => {
  const accent = colorMap[type] || "#6366f1";
  const icon = iconMap[type] || "⚡";

  // Normalise handles: allow simple strings like "input" as shorthand
  const normInputs = inputs.map((h) =>
    typeof h === "string" ? { id: h, label: h } : h
  );
  const normOutputs = outputs.map((h) =>
    typeof h === "string" ? { id: h, label: h } : h
  );

  const handleCount = Math.max(normInputs.length, normOutputs.length, 1);
  const handleZoneHeight = handleCount * 28 + 8;

  return (
    <div className="base-node" style={{ ...style }}>
      {/* ── Header ── */}
      <div
        className="base-node__header"
        style={{ background: accent }}
      >
        <span className="base-node__icon">{icon}</span>
        <span className="base-node__title">{title}</span>
      </div>

      {/* ── Body ── */}
      <div
        className="base-node__body"
        style={{ minHeight: handleZoneHeight }}
      >
        {/* Handle labels */}
        <div className="base-node__handles-row">
          {/* Left (input) labels */}
          <div className="base-node__handle-labels base-node__handle-labels--left">
            {normInputs.map((h) => (
              <span key={h.id} className="base-node__handle-label">
                {h.label}
              </span>
            ))}
          </div>

          {/* Right (output) labels */}
          <div className="base-node__handle-labels base-node__handle-labels--right">
            {normOutputs.map((h) => (
              <span key={h.id} className="base-node__handle-label">
                {h.label}
              </span>
            ))}
          </div>
        </div>

        {/* Actual React Flow handles */}
        {normInputs.map((h, i) => (
          <Handle
            key={`in-${h.id}`}
            type="target"
            position={Position.Left}
            id={`${id}-${h.id}`}
            style={{
              top: 52 + i * 28,
              background: accent,
              width: 10,
              height: 10,
              border: "2px solid #fff",
            }}
          />
        ))}
        {normOutputs.map((h, i) => (
          <Handle
            key={`out-${h.id}`}
            type="source"
            position={Position.Right}
            id={`${id}-${h.id}`}
            style={{
              top: 52 + i * 28,
              background: accent,
              width: 10,
              height: 10,
              border: "2px solid #fff",
            }}
          />
        ))}

        {/* Custom content */}
        {children && <div className="base-node__content">{children}</div>}
      </div>
    </div>
  );
};

/* 
   createNode — factory helper that
   lets you declare a node in ~10 lines
   */
export const createNode = (config) => {
  const {
    type,
    title,
    inputs = [],
    outputs = [],
    render,           // (props) => JSX  — custom body
  } = config;

  const NodeComponent = (props) => {
    const { id, data } = props;
    return (
      <BaseNode
        id={id}
        type={type}
        title={title}
        inputs={inputs}
        outputs={outputs}
      >
        {render ? render({ id, data }) : null}
      </BaseNode>
    );
  };
  NodeComponent.displayName = `${title.replace(/\s/g, "")}`;
  return NodeComponent;
};

export default BaseNode;