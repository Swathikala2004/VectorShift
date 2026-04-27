import { useStore } from "./store";

const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://vectorshift-1-9tu8.onrender.com/pipelines/parse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nodes, edges }),
        }
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      alert(
        `Pipeline Analysis\n` +
        `────────────────────────────\n` +
        `Nodes:  ${data.num_nodes}\n` +
        `Edges:  ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? "✅ Yes" : "❌ No"}`
      );
    } catch (err) {
      console.error("Error:", err);
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