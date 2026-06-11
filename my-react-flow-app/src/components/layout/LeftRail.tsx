const icons = ['⬡', '🔷', '🟥', '🌿', '⬜', '▦', '⊞']

export const LeftRail = () => {
  return (
    <div className="w-12 border-r border-border bg-background flex flex-col items-center py-3 gap-4 shrink-0">
      {icons.map((icon, i) => (
        <button
          key={i}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-accent text-base"
        >
          {icon}
        </button>
      ))}
    </div>
  )
}