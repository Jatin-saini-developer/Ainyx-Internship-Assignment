import { ReactFlowProvider } from '@xyflow/react'
import { LeftRail } from './components/layout/LeftRail'
import { RightPanel } from './components/layout/RightPanel'
import { FlowCanvas } from './components/canvas/FlowCanvas'
import { TopBar } from './components/layout/TopBar'
import { NodeInspector } from './components/inspector/NodeInspector'

function App() {
  return (
    <ReactFlowProvider>
      <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <LeftRail />
          <main className="flex-1 relative overflow-hidden">
            <FlowCanvas />
          </main>
          <RightPanel>
            <NodeInspector />
          </RightPanel>
        </div>
      </div>
    </ReactFlowProvider>
  )
}

export default App