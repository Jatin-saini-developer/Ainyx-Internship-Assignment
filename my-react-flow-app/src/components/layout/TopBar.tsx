import { useAppStore } from '../../store/useAppStore'
import { useReactFlow } from '@xyflow/react'
import { Button } from '../ui/button'
import { AppSelector } from './AppSelector'

export const TopBar = () => {
  const setIsMobilePanelOpen = useAppStore((s) => s.setIsMobilePanelOpen)
  const isMobilePanelOpen = useAppStore((s) => s.isMobilePanelOpen)
  const { fitView } = useReactFlow()

  return (
    <div className="h-12 border-b border-border bg-background flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-primary rounded-sm" />
        <span className="font-semibold text-sm">ReactFlow Canvas</span>
        <AppSelector />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="hidden md:flex"
          onClick={() => fitView({ padding: 0.2 })}
        >
          Fit View
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMobilePanelOpen(!isMobilePanelOpen)}
        >
          Panel
        </Button>
      </div>
    </div>
  )
}