from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
async def parse_pipeline(request: Request):
    body = await request.json()

    nodes = body.get("nodes", [])
    edges = body.get("edges", [])

    num_nodes = len(nodes)
    num_edges = len(edges)

    # ---- DAG CHECK (Kahn's Algorithm) ----

    # Build adjacency list
    graph = {node["id"]: [] for node in nodes}
    in_degree = {node["id"]: 0 for node in nodes}

    for edge in edges:
        source = edge["source"]
        target = edge["target"]

        if source in graph and target in graph:
            graph[source].append(target)
            in_degree[target] += 1

    # Collect nodes with no incoming edges
    queue = [node_id for node_id in in_degree if in_degree[node_id] == 0]

    visited_count = 0

    while queue:
        current = queue.pop(0)
        visited_count += 1

        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    is_dag = visited_count == num_nodes

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }