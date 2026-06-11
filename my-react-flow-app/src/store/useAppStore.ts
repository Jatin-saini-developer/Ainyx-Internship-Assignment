import { create } from 'zustand'

interface AppState {
  isMobilePanelOpen: boolean
  setIsMobilePanelOpen: (isOpen: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  isMobilePanelOpen: false,
  setIsMobilePanelOpen: (isOpen) => set({ isMobilePanelOpen: isOpen }),
}))
