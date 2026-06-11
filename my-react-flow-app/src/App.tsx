import { ReactFlowProvider } from '@xyflow/react'
import { TopBar } from './components/layout/TopBar'
import { LeftRail } from './components/layout/LeftRail'
import { RightPanel } from './components/layout/RightPanel'
import { FlowCanvas } from './components/canvas/FlowCanvas'

function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftRail />
        <ReactFlowProvider>
          <main className="flex-1 relative overflow-hidden">
            <FlowCanvas />
          </main>
        </ReactFlowProvider>
        <RightPanel>
          <div className="p-4 text-sm text-muted-foreground">
            Select a node to inspect
          </div>
        </RightPanel>
      </div>
    </div>
  )
}

export default App