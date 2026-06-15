import { useQuery } from '@tanstack/react-query'
import { mockGraphs } from '../data/mockData'
import type { GraphData } from '../types/index'
import { useAppStore } from '../store/useAppStore'

const fetchGraph = (appId: string, simulateError: boolean): Promise<GraphData> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (simulateError) {
        reject(new Error('Simulated error: Service unavailable'))
        return
      }
      const graph = mockGraphs[appId]
      if (graph) resolve(graph)
      else reject(new Error('Graph not found'))
    }, 800)
  )

export const useGraph = (appId: string | null) => {
  const simulateError = useAppStore((s) => s.simulateError)

  return useQuery({
    queryKey: ['graph', appId, simulateError],
    queryFn: () => fetchGraph(appId!, simulateError),
    enabled: !!appId,
    retry: false,
  })
}