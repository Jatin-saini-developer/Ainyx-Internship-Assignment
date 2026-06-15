import { create } from 'zustand'
import type { Node, Edge } from '@xyflow/react'

interface AppState {
  selectedAppId: string | null
  selectedNodeId: string | null
  isMobilePanelOpen: boolean
  activeInspectorTab: string
  simulateError: boolean
  nodes: Node[]
  edges: Edge[]

  setSelectedAppId: (id: string | null) => void
  setSelectedNodeId: (id: string | null) => void
  setIsMobilePanelOpen: (open: boolean) => void
  setActiveInspectorTab: (tab: string) => void
  setSimulateError: (val: boolean) => void
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  updateNodeLabel: (nodeId: string, label: string) => void
  addNode: () => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  simulateError: false,
  nodes: [],
  edges: [],

  setSelectedAppId: (id) => set({ selectedAppId: id }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setIsMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  setSimulateError: (val) => set({ simulateError: val }),
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  updateNodeLabel: (nodeId, label) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, label } } : n
      ),
    })),
  addNode: () =>
    set((state) => {
      const id = `node-${Date.now()}`
      const newNode: Node = {
        id,
        position: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 300 + 100,
        },
        data: {
          label: 'New Service',
          status: 'Healthy',
          configValue: 50,
        },
        type: 'serviceNode',
      }
      return { nodes: [...state.nodes, newNode] }
    }),
}))