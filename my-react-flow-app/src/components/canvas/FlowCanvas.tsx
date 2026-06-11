import { useCallback, useEffect } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
  useReactFlow,
  Node,
  Edge,
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
  }))

const toFlowEdges = (edges: { id: string; source: string; target: string }[]): Edge[] =>
  edges.map((e) => ({ ...e, animated: true }))

export const FlowCanvas = () => {
  const selectedAppId = useAppStore((s) => s.selectedAppId)
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId)
  const { data, isLoading } = useGraph(selectedAppId)

  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { fitView } = useReactFlow()

  useEffect(() => {
    if (data) {
      setNodes(toFlowNodes(data.nodes))
      setEdges(toFlowEdges(data.edges))
      setTimeout(() => fitView({ padding: 0.2 }), 100)
    }
  }, [data])

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  )

  if (!selectedAppId) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        Select an app to view its graph
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        Loading graph...
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
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}