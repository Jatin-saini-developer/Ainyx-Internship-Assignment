import { useState, useRef, useEffect } from 'react'
import {
  ChevronUp,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Search,
  Lightbulb,
  Settings,
  Rocket,
  Box,
  Puzzle,
} from 'lucide-react'
import { useApps } from '../../hooks/useApps'
import { useAppStore } from '../../store/useAppStore'
import type { LucideIcon } from 'lucide-react'

/* ── Per-app icon + colour mapping ──────────────────────────── */
const appMeta: Record<string, { color: string; Icon: LucideIcon }> = {
  'app-1': { color: '#6366f1', Icon: Lightbulb },
  'app-2': { color: '#ec4899', Icon: Settings },
  'app-3': { color: '#f97316', Icon: Rocket },
  'app-4': { color: '#a855f7', Icon: Box },
  'app-5': { color: '#8b5cf6', Icon: Puzzle },
}

const fallbackMeta: { color: string; Icon: LucideIcon } = { color: '#6366f1', Icon: Lightbulb }

/* ── Component ──────────────────────────────────────────────── */
export const AppSelector = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { data: apps, isLoading } = useApps()
  const selectedAppId = useAppStore((s) => s.selectedAppId)
  const setSelectedAppId = useAppStore((s) => s.setSelectedAppId)
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId)

  const containerRef = useRef<HTMLDivElement>(null)

  const selectedApp = apps?.find((a) => a.id === selectedAppId)
  const meta = selectedApp ? (appMeta[selectedApp.id] ?? fallbackMeta) : fallbackMeta

  const filteredApps = apps?.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()),
  )

  /* close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (isLoading) {
    return <div className="app-selector-skeleton" />
  }

  return (
    <div ref={containerRef} className="app-selector-root">
      {/* ── Trigger ─────────────────────────────────────────── */}
      <div
        role="button"
        tabIndex={0}
        className="app-selector-trigger"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen((v) => !v) }}
        aria-expanded={open}
      >
        <span
          className="app-selector-trigger-icon"
          style={{ background: meta.color }}
        >
          <meta.Icon size={16} color="#fff" strokeWidth={2.2} />
        </span>
        <span className="app-selector-trigger-label">
          {selectedApp ? selectedApp.name : 'Select an app…'}
        </span>
        <ChevronUp
          size={16}
          className="app-selector-trigger-chevron"
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)' }}
        />
        <span
          role="button"
          className="app-selector-dots"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          aria-label="More options"
        >
          <MoreHorizontal size={16} />
        </span>
      </div>

      {/* Backdrop for mobile */}
      {open && <div className="app-selector-backdrop" onClick={() => setOpen(false)} />}

      {/* ── Dropdown ────────────────────────────────────────── */}
      {open && (
        <div className="app-selector-dropdown">
          <div className="app-selector-drag-handle" />
          <h3 className="app-selector-heading">Application</h3>

          {/* Search row */}
          <div className="app-selector-search-row">
            <div className="app-selector-search-box">
              <Search size={14} className="app-selector-search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="app-selector-search-input"
                autoFocus
              />
            </div>
            <button className="app-selector-add-btn" aria-label="Add application">
              <Plus size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* App list */}
          <div className="app-selector-list">
            {filteredApps?.length === 0 && (
              <div className="app-selector-empty">No app found.</div>
            )}
            {filteredApps?.map((app) => {
              const m = appMeta[app.id] ?? fallbackMeta
              const isSelected = selectedAppId === app.id
              return (
                <button
                  key={app.id}
                  className={`app-selector-item${isSelected ? ' selected' : ''}`}
                  onClick={() => {
                    setSelectedAppId(app.id)
                    setSelectedNodeId(null)
                    setOpen(false)
                    setSearch('')
                  }}
                >
                  <span
                    className="app-selector-item-icon"
                    style={{ background: m.color }}
                  >
                    <m.Icon size={20} color="#fff" strokeWidth={2} />
                  </span>
                  <span className="app-selector-item-name">{app.name}</span>
                  <ChevronRight size={16} className="app-selector-item-chevron" />
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}