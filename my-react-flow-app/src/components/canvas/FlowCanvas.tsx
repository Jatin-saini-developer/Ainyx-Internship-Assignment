import { useCallback, useEffect } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  BackgroundVariant,
  useReactFlow,
  type Node,
  type Edge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useAppStore } from '../../store/useAppStore'
import { useGraph } from '../../hooks/useGraph'

const toFlowNodes = (nodes: { id: string; name: string; status: string; configValue: number }[]): Node[] =>
  nodes.map((n, i) => ({
    id: n.id,
    position: { x: 150 + (i % 2) * 350, y: 100 + Math.floor(i / 2) * 250 },
    data: { label: n.name, status: n.status, configValue: n.configValue },
    type: 'default',
    style: {
      background: '#1e1e2e',
      color: '#e2e8f0',
      border: '1px solid #334155',
      borderRadius: '8px',
      padding: '10px 16px',
      fontSize: '13px',
      fontWeight: 500,
      minWidth: '140px',
    },
  }))

const toFlowEdges = (edges: { id: string; source: string; target: string }[]): Edge[] =>
  edges.map((e) => ({
    ...e,
    animated: true,
    style: { stroke: '#475569' },
  }))

export const FlowCanvas = () => {
  const selectedAppId = useAppStore((s) => s.selectedAppId)
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId)
  const storeNodes = useAppStore((s) => s.nodes)
  const storeEdges = useAppStore((s) => s.edges)
  const setStoreNodes = useAppStore((s) => s.setNodes)
  const setStoreEdges = useAppStore((s) => s.setEdges)

  const { data, isLoading, isError } = useGraph(selectedAppId)

  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges)
  const { fitView } = useReactFlow()

  useEffect(() => {
    if (data) {
      const flowNodes = toFlowNodes(data.nodes)
      const flowEdges = toFlowEdges(data.edges)
      setNodes(flowNodes)
      setEdges(flowEdges)
      setStoreNodes(flowNodes)
      setStoreEdges(flowEdges)
      setTimeout(() => fitView({ padding: 0.2 }), 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  // Sync store node updates (e.g. label changes) back to local state
  useEffect(() => {
    setNodes(storeNodes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeNodes])

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  )

  if (!selectedAppId) {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
        Select an app to view its graph
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
        Loading graph...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center text-destructive text-sm">
        Failed to load graph. Please try again.
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
        deleteKeyCode={['Delete', 'Backspace']}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#334155" />
        <Controls />
        <MiniMap style={{ background: '#0f172a' }} nodeColor="#334155" />
      </ReactFlow>
    </div>
  )
}