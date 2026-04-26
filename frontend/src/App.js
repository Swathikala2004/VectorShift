import { PipelineUI } from "./ui";
import { Toolbar } from "./toolbar";

function App() {
  return (
    <div className="app-layout">
      <Toolbar />
      <div className="app-canvas">
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;