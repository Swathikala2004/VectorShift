// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({


  nodes: [],
  edges: [],
  nodeIDs: {},


  getNodeID: (type) => {
    const currentIDs = { ...get().nodeIDs };

    if (!currentIDs[type]) {
      currentIDs[type] = 0;
    }

    currentIDs[type] += 1;

    set({ nodeIDs: currentIDs });

    return `${type}-${currentIDs[type]}`;
  },



  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },



  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },



  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },



  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
        get().edges
      ),
    });
  },



  updateNodeField: (nodeId, fieldName, value) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                [fieldName]: value,
              },
            }
          : node
      ),
    });
  },

}));