import { useQuery } from '@tanstack/react-query'
import { mockGraphs } from '../data/mockData'
import type { GraphData } from '../types'

const fetchGraph = (appId: string): Promise<GraphData> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      const graph = mockGraphs[appId]
      if (graph) resolve(graph)
      else reject(new Error('Graph not found'))
    }, 800)
  )

export const useGraph = (appId: string | null) =>
  useQuery({
    queryKey: ['graph', appId],
    queryFn: () => fetchGraph(appId!),
    enabled: !!appId,
  })