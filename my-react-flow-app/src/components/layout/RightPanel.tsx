import { useAppStore } from '../../store/useAppStore'

export const RightPanel = ({ children }: { children: React.ReactNode }) => {
  const isMobilePanelOpen = useAppStore((s) => s.isMobilePanelOpen)

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex w-72 border-l border-border bg-background flex-col shrink-0">
        {children}
      </div>

      {/* Mobile slide-over */}
      {isMobilePanelOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute right-0 top-0 h-full w-72 bg-background border-l border-border flex flex-col">
            {children}
          </div>
        </div>
      )}
    </>
  )
}