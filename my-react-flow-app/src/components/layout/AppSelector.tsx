import { useApps } from '../../hooks/useApps'
import { useAppStore } from '../../store/useAppStore'

export const AppSelector = () => {
  const { data: apps, isLoading } = useApps()
  const selectedAppId = useAppStore((s) => s.selectedAppId)
  const setSelectedAppId = useAppStore((s) => s.setSelectedAppId)
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAppId(e.target.value)
    setSelectedNodeId(null)
  }

  if (isLoading) {
    return (
      <div className="h-8 w-48 rounded bg-muted animate-pulse" />
    )
  }

  return (
    <select
      value={selectedAppId ?? ''}
      onChange={handleChange}
      className="h-8 w-52 rounded-md border border-border bg-background text-foreground text-sm px-2 focus:outline-none focus:ring-1 focus:ring-ring"
    >
      <option value="" disabled>Select an app...</option>
      {apps?.map((app) => (
        <option key={app.id} value={app.id}>
          {app.name}
        </option>
      ))}
    </select>
  )
}