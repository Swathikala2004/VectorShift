import { useState } from "react";
import BaseNode from "../components/BaseNode";

const LoggerNode = ({ id, data }) => {
  const [level, setLevel] = useState(data?.level || "info");

  return (
    <BaseNode
      id={id}
      type="logger"
      title="Logger"
      inputs={[{ id: "input", label: "input" }]}
      outputs={[]}
    >
      <div className="node-field">
        <label className="node-field__label">Level</label>
        <select
          className="node-field__select"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="debug">Debug</option>
          <option value="info">Info</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
        </select>
      </div>
      <p className="node-hint">Logs pipeline data to console.</p>
    </BaseNode>
  );
};

export default LoggerNode;