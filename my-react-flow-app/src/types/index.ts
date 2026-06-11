export type NodeStatus = 'Healthy' | 'Degraded' | 'Down'

export interface AppItem {
  id: string
  name: string
  icon?: string
}

export interface ServiceNode {
  id: string
  name: string
  status: NodeStatus
  configValue: number
  description?: string
}

export interface GraphData {
  nodes: ServiceNode[]
  edges: Array<{
    id: string
    source: string
    target: string
  }>
}