export default function GradientBlob({
  colors = 'from-amber to-coral',
  size = 'w-96 h-96',
  position = 'top-20 -right-40',
  delay = 0,
  slow = false,
  className = '',
}) {
  return (
    <div
      className={`absolute ${position} ${size} rounded-full opacity-20 blur-3xl bg-gradient-to-br ${colors} ${slow ? 'animate-blob-slow' : 'animate-blob'} pointer-events-none ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  )
}
