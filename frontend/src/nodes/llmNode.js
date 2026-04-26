import BaseNode from "../components/BaseNode";

const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      type="llm"
      title="LLM"
      inputs={[
        { id: "system", label: "system" },
        { id: "prompt", label: "prompt" },
      ]}
      outputs={[{ id: "response", label: "response" }]}
    >
      <p className="node-hint">This is a Large Language Model.</p>
    </BaseNode>
  );
};

export default LLMNode;