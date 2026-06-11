import { useQuery } from '@tanstack/react-query'
import { mockApps } from '../data/mockData'
import type { AppItem } from '../types'

const fetchApps = (): Promise<AppItem[]> =>
  new Promise((resolve) => setTimeout(() => resolve(mockApps), 600))

export const useApps = () =>
  useQuery({
    queryKey: ['apps'],
    queryFn: fetchApps,
  })