import { useState } from "react";
import BaseNode from "../components/BaseNode";

const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || "");
  const [method, setMethod] = useState(data?.method || "GET");

  return (
    <BaseNode
      id={id}
      type="api"
      title="API Call"
      inputs={[{ id: "body", label: "body" }]}
      outputs={[{ id: "response", label: "response" }]}
    >
      <div className="node-field">
        <label className="node-field__label">URL</label>
        <input
          className="node-field__input"
          type="text"
          placeholder="https://api.example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="node-field">
        <label className="node-field__label">Method</label>
        <select
          className="node-field__select"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default ApiNode;