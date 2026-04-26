import { useState } from "react";
import BaseNode from "../components/BaseNode";

const DelayNode = ({ id, data }) => {
  const [ms, setMs] = useState(data?.ms || 1000);

  return (
    <BaseNode
      id={id}
      type="delay"
      title="Delay"
      inputs={[{ id: "input", label: "input" }]}
      outputs={[{ id: "output", label: "output" }]}
    >
      <div className="node-field">
        <label className="node-field__label">Duration (ms)</label>
        <input
          className="node-field__input"
          type="number"
          min={0}
          value={ms}
          onChange={(e) => setMs(Number(e.target.value))}
        />
      </div>
    </BaseNode>
  );
};

export default DelayNode;