# VectorShift Frontend + Backend Assessment

This project is a full-stack implementation of a node-based pipeline builder using React (frontend) and FastAPI (backend). It allows users to create pipelines, dynamically manage nodes, and validate whether the pipeline forms a Directed Acyclic Graph (DAG).

---

## 🚀 Tech Stack

* Frontend: React (JavaScript)
* Backend: FastAPI (Python)
* Styling: CSS
* API Communication: Fetch

---

## ✨ Features

### Part 1: Node Abstraction

* Created reusable node component structure
* Reduced duplication across node types
* Added 5 custom nodes to demonstrate flexibility

### Part 2: Styling

* Designed a clean and consistent UI
* Improved layout and usability

### Part 3: Text Node Logic

* Dynamic resizing of text node based on user input
* Support for variables using `{{variable}}` syntax
* Automatically generates input handles for variables

### Part 4: Backend Integration

* Connected frontend to backend using API
* Sends nodes and edges to `/pipelines/parse`
* Backend returns:

  * Number of nodes
  * Number of edges
  * Whether graph is a DAG
* Displays result in a user-friendly alert

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/VectorShift.git
cd VectorShift
```

---

### 2. Run Frontend

```bash
cd frontend
npm install
npm start
```

---

### 3. Run Backend

```bash
cd backend
pip install fastapi uvicorn
python -m uvicorn main:app --reload
```

---

## 🌐 API Endpoint

### POST `/pipelines/parse`

#### Request:

```json
{
  "nodes": [...],
  "edges": [...]
}
```

#### Response:

```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

---

## 📁 Project Structure

```
VectorShift/
│── frontend/
│── backend/
│── README.md
```

---

## 📌 Notes

* Ensure backend is running before submitting pipeline
* Frontend runs on http://localhost:3000
* Backend runs on http://127.0.0.1:8000

---

## ✅ Outcome

This project demonstrates:

* Component abstraction in React
* Dynamic UI behavior
* API integration with FastAPI
* Graph validation (DAG detection)

---
