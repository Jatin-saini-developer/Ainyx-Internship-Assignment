import { useAppStore } from '../../store/useAppStore'
import { useGraph } from '../../hooks/useGraph'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Input } from '../ui/input'
import type { NodeStatus } from '../../types'

const statusColor: Record<NodeStatus, string> = {
  Healthy: 'bg-green-500/20 text-green-400 border-green-500/30',
  Degraded: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Down: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export const NodeInspector = () => {
  const selectedNodeId = useAppStore((s) => s.selectedNodeId)
  const selectedAppId = useAppStore((s) => s.selectedAppId)
  const activeInspectorTab = useAppStore((s) => s.activeInspectorTab)
  const setActiveInspectorTab = useAppStore((s) => s.setActiveInspectorTab)
  const updateNodeLabel = useAppStore((s) => s.updateNodeLabel)

  const { data } = useGraph(selectedAppId)

  if (!selectedNodeId) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Select a node to inspect
      </div>
    )
  }

  const node = data?.nodes.find((n) => n.id === selectedNodeId)

  if (!node) return null

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Service Node
          </span>
          <Badge
            variant="outline"
            className={`text-xs ${statusColor[node.status]}`}
          >
            {node.status}
          </Badge>
        </div>
        <h3 className="font-semibold text-sm">{node.name}</h3>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeInspectorTab}
        onValueChange={setActiveInspectorTab}
        className="flex flex-col flex-1 overflow-hidden"
      >
        <TabsList className="mx-4 mt-3 w-auto">
          <TabsTrigger value="config" className="flex-1">Config</TabsTrigger>
          <TabsTrigger value="runtime" className="flex-1">Runtime</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Node name editable */}
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Node Name</label>
            <Input
              defaultValue={node.name}
              className="h-8 text-sm"
              onChange={(e) => updateNodeLabel(selectedNodeId, e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Description</label>
            <textarea
              className="w-full h-20 text-sm bg-background border border-input rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
              placeholder="Add a description..."
              defaultValue={node.description ?? ''}
            />
          </div>

          {/* Slider + numeric input */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Config Value</label>
            <ConfigSlider initialValue={node.configValue} />
          </div>
        </TabsContent>

        <TabsContent value="runtime" className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">CPU</span>
              <span>0.02</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-1/4 bg-primary rounded-full" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Memory</span>
              <span>0.05 GB</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-2/5 bg-blue-500 rounded-full" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Disk</span>
              <span>10.00 GB</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-purple-500 rounded-full" />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Status</span>
              <Badge
                variant="outline"
                className={`text-xs ${statusColor[node.status]}`}
              >
                {node.status}
              </Badge>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Separate component to handle slider+input sync with local state
const ConfigSlider = ({ initialValue }: { initialValue: number }) => {
  const [value, setValue] = React.useState(initialValue)

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative flex items-center">
          {/* Custom slider track */}
          <div className="relative w-full h-2 rounded-full" style={{ background: '#334155' }}>
            <div
              className="absolute h-2 rounded-full"
              style={{ width: `${value}%`, background: '#94a3b8' }}
            />
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
            />
            {/* Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-slate-300 bg-background"
              style={{ left: `calc(${value}% - 8px)` }}
            />
          </div>
        </div>
        <Input
          type="number"
          min={0}
          max={100}
          value={value}
          onChange={(e) => {
            const v = Math.min(100, Math.max(0, Number(e.target.value)))
            setValue(v)
          }}
          className="h-8 w-20 text-sm shrink-0"
        />
      </div>
      <div className="text-xs text-muted-foreground text-right">{value} / 100</div>
    </div>
  )
}

import React from 'react'