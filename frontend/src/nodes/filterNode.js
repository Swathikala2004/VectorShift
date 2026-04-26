import { useState } from "react";
import BaseNode from "../components/BaseNode";

const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || "");

  return (
    <BaseNode
      id={id}
      type="filter"
      title="Filter"
      inputs={[{ id: "input", label: "input" }]}
      outputs={[
        { id: "pass", label: "pass" },
        { id: "reject", label: "reject" },
      ]}
    >
      <div className="node-field">
        <label className="node-field__label">Condition</label>
        <input
          className="node-field__input"
          type="text"
          placeholder="e.g. value > 10"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};

export default FilterNode;