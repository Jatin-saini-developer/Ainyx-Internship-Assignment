import { useAppStore } from '../../store/useAppStore'
import { useReactFlow } from '@xyflow/react'
import { Button } from '../ui/button'
import { AppSelector } from './AppSelector'
import { AlertTriangle, Plus } from 'lucide-react'

export const TopBar = () => {
  const setIsMobilePanelOpen = useAppStore((s) => s.setIsMobilePanelOpen)
  const isMobilePanelOpen = useAppStore((s) => s.isMobilePanelOpen)
  const simulateError = useAppStore((s) => s.simulateError)
  const setSimulateError = useAppStore((s) => s.setSimulateError)
  const selectedAppId = useAppStore((s) => s.selectedAppId)
  const addNode = useAppStore((s) => s.addNode)
  const { fitView } = useReactFlow()

  return (
    <div className="h-12 border-b border-border bg-background flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-primary rounded-sm" />
        <span className="font-semibold text-sm hidden sm:block">ReactFlow Canvas</span>
        <AppSelector />
      </div>
      <div className="flex items-center gap-2">
        {/* Add Node */}
        {selectedAppId && (
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-1.5 text-xs h-8"
            onClick={addNode}
          >
            <Plus size={13} />
            Add Node
          </Button>
        )}

        {/* Error toggle */}
        <Button
          variant={simulateError ? 'destructive' : 'outline'}
          size="sm"
          className="hidden md:flex items-center gap-1.5 text-xs h-8"
          onClick={() => setSimulateError(!simulateError)}
        >
          <AlertTriangle size={13} />
          {simulateError ? 'Error ON' : 'Simulate Error'}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="hidden md:flex text-xs h-8"
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
          ☰
        </Button>
      </div>
    </div>
  )
}