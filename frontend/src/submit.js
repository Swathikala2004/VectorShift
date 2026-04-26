import { useStore } from "./store";

const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/pipelines/parse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nodes, edges }),
        }
      );

      const data = await response.json();

      alert(
        `Pipeline Analysis\n` +
        `\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n` +
        `Nodes:  ${data.num_nodes}\n` +
        `Edges:  ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? "\u2705 Yes" : "\u274c No"}`
      );
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the backend.");
    }
  };

  return (
    <div className="submit-bar">
      <button className="submit-btn" onClick={handleSubmit}>
        Submit Pipeline
      </button>
    </div>
  );
};

export default SubmitButton;