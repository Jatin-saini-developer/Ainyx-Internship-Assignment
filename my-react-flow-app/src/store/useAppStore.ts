import { create } from 'zustand'

interface AppState {
  activeInspectorTab: string
  setActiveInspectorTab: (tab: string) => void
  isMobilePanelOpen: boolean
  setIsMobilePanelOpen: (isOpen: boolean) => void
  selectedAppId: string | null
  setSelectedAppId: (id: string | null) => void
  selectedNodeId: string | null
  setSelectedNodeId: (id: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  activeInspectorTab: 'config',
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  isMobilePanelOpen: false,
  setIsMobilePanelOpen: (isOpen) => set({ isMobilePanelOpen: isOpen }),
  selectedAppId: null,
  setSelectedAppId: (id) => set({ selectedAppId: id }),
  selectedNodeId: null,
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
}))
