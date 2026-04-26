import { useState } from "react";
import BaseNode from "../components/BaseNode";

const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.name || "output_0");
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  return (
    <BaseNode
      id={id}
      type="output"
      title="Output"
      inputs={[{ id: "input", label: "input" }]}
      outputs={[]}
    >
      <div className="node-field">
        <label className="node-field__label">Name</label>
        <input
          className="node-field__input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="node-field">
        <label className="node-field__label">Type</label>
        <select
          className="node-field__select"
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default OutputNode;