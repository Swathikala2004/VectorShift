import { useState } from "react";
import BaseNode from "../components/BaseNode";

const MathNode = ({ id, data }) => {
  const [op, setOp] = useState(data?.op || "add");

  return (
    <BaseNode
      id={id}
      type="math"
      title="Math"
      inputs={[
        { id: "a", label: "A" },
        { id: "b", label: "B" },
      ]}
      outputs={[{ id: "result", label: "result" }]}
    >
      <div className="node-field">
        <label className="node-field__label">Operation</label>
        <select
          className="node-field__select"
          value={op}
          onChange={(e) => setOp(e.target.value)}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (−)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default MathNode;