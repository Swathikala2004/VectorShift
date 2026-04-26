import { useState } from "react";
import BaseNode from "../components/BaseNode";

const InputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.name || "input_0");
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  return (
    <BaseNode
      id={id}
      type="input"
      title="Input"
      inputs={[]}
      outputs={[{ id: "output", label: "output" }]}
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
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default InputNode;