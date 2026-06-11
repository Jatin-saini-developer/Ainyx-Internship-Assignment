import type { AppItem, GraphData } from '../types/index'

export const mockApps: AppItem[] = [
  { id: 'app-1', name: 'supertokens-golang' },
  { id: 'app-2', name: 'supertokens-java' },
  { id: 'app-3', name: 'supertokens-python' },
  { id: 'app-4', name: 'supertokens-ruby' },
  { id: 'app-5', name: 'supertokens-go' },
]

export const mockGraphs: Record<string, GraphData> = {
  'app-1': {
    nodes: [
      { id: 'n1', name: 'Postgres', status: 'Healthy', configValue: 42 },
      { id: 'n2', name: 'Redis', status: 'Down', configValue: 78 },
      { id: 'n3', name: 'Mongodb', status: 'Degraded', configValue: 55 },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2' },
      { id: 'e2', source: 'n2', target: 'n3' },
    ],
  },
  'app-2': {
    nodes: [
      { id: 'n1', name: 'Auth Service', status: 'Healthy', configValue: 30 },
      { id: 'n2', name: 'DB Primary', status: 'Healthy', configValue: 60 },
      { id: 'n3', name: 'Cache', status: 'Degraded', configValue: 20 },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2' },
      { id: 'e2', source: 'n1', target: 'n3' },
    ],
  },
}

// fills remaining apps with same default graph
mockApps.slice(2).forEach((app) => {
  if (!mockGraphs[app.id]) {
    mockGraphs[app.id] = mockGraphs['app-1']
  }
})