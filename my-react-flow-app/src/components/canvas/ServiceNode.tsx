import { Handle, Position, type NodeProps } from '@xyflow/react'
import { useState } from 'react'

const statusConfig = {
  Healthy: { label: 'Success', color: '#22c55e', bg: '#22c55e20', border: '#22c55e' },
  Degraded: { label: 'Degraded', color: '#eab308', bg: '#eab30820', border: '#eab308' },
  Down: { label: 'Error', color: '#ef4444', bg: '#ef444420', border: '#ef4444' },
}

const tabs = ['CPU', 'Memory', 'Disk', 'Region']

export const ServiceNode = ({ data, selected }: NodeProps) => {
  const [activeTab, setActiveTab] = useState('CPU')
  const status = (data.status as string) ?? 'Healthy'
  const cfg = statusConfig[status as keyof typeof statusConfig] ?? statusConfig.Healthy

  return (
    <div
      style={{
        background: '#0f1117',
        border: `1.5px solid ${selected ? cfg.border : '#1e2433'}`,
        borderRadius: '12px',
        width: '280px',
        fontFamily: 'sans-serif',
        boxShadow: selected ? `0 0 16px ${cfg.color}44` : '0 4px 24px #0008',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: '#334155' }} />

      {/* Header */}
      <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e2433' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#1e2433', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
            🗄️
          </div>
          <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>{String(data.label)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ background: '#22c55e20', color: '#22c55e', border: '1px solid #22c55e44', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>
            $0.03/HR
          </span>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: '#1e2433', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            ⚙️
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ padding: '10px 14px 0', display: 'flex', justifyContent: 'space-between' }}>
        {['0.02', '0.05 GB', '10.00 GB', '1'].map((val, i) => (
          <span key={i} style={{ color: '#94a3b8', fontSize: 11 }}>{val}</span>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ padding: '8px 14px', display: 'flex', gap: 4 }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? '#e2e8f0' : 'transparent',
              color: activeTab === tab ? '#0f1117' : '#64748b',
              border: activeTab === tab ? 'none' : '1px solid #1e2433',
              borderRadius: 6,
              padding: '4px 8px',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            {tab === 'CPU' && '🖥️'}
            {tab === 'Memory' && '💾'}
            {tab === 'Disk' && '💿'}
            {tab === 'Region' && '🗃️'}
            {tab}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div style={{ padding: '4px 14px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'linear-gradient(to right, #3b82f6, #22c55e, #ef4444)', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              right: `${100 - Number(data.configValue)}%`,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 0 4px #0006',
            }}
          />
        </div>
        <span style={{ color: '#94a3b8', fontSize: 11, minWidth: 28, textAlign: 'right' }}>
          {Number(data.configValue).toFixed(2)}
        </span>
      </div>

      {/* Footer */}
      <div style={{ padding: '8px 14px', borderTop: '1px solid #1e2433', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}44`, borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>
          {cfg.label === 'Success' ? '✅' : '⚠️'} {cfg.label}
        </span>
        <span style={{ color: '#f97316', fontWeight: 800, fontSize: 13, fontStyle: 'italic' }}>aws</span>
      </div>

      <Handle type="source" position={Position.Bottom} style={{ background: '#334155' }} />
    </div>
  )
}