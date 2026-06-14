import { useAppStore } from '../../store/useAppStore'

export const RightPanel = ({ children }: { children: React.ReactNode }) => {
  const isMobilePanelOpen = useAppStore((s) => s.isMobilePanelOpen)
  const setIsMobilePanelOpen = useAppStore((s) => s.setIsMobilePanelOpen)

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex w-72 border-l border-border bg-background flex-col shrink-0">
        {children}
      </div>

      {/* Mobile slide-over */}
      {isMobilePanelOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop — click to close */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobilePanelOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-background border-l border-border flex flex-col">
            {/* Close button */}
            <div className="flex justify-end p-2 border-b border-border">
              <button
                onClick={() => setIsMobilePanelOpen(false)}
                className="text-muted-foreground hover:text-foreground px-2 py-1 text-sm"
              >
                ✕ Close
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  )
}