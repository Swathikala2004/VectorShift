import { DraggableNode } from "./draggableNode";

const nodes = [
  { type: "input",  label: "Input",  icon: "📥" },
  { type: "output", label: "Output", icon: "📤" },
  { type: "llm",    label: "LLM",    icon: "🤖" },
  { type: "text",   label: "Text",   icon: "📝" },
  { type: "api",    label: "API",    icon: "🌐" },
  { type: "math",   label: "Math",   icon: "🔢" },
  { type: "filter", label: "Filter", icon: "🔍" },
  { type: "delay",  label: "Delay",  icon: "⏱️" },
  { type: "logger", label: "Logger", icon: "📋" },
];

export const Toolbar = () => (
  <div className="toolbar">
    <div className="toolbar__title">Nodes</div>
    {nodes.map((n) => (
      <DraggableNode key={n.type} type={n.type} label={n.label} icon={n.icon} />
    ))}
  </div>
);