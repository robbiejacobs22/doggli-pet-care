import { motion } from 'motion/react'

export default function GlassCard({
  children,
  className = '',
  hoverable = true,
  padding = 'p-6 md:p-8',
}) {
  const base = `bg-glass backdrop-blur-xl rounded-3xl border border-glass-border ${padding}`
  const hoverClasses = hoverable
    ? 'hover:bg-glass-hover hover:border-white/20 hover:shadow-xl hover:shadow-amber/5 transition-all duration-300'
    : ''

  if (hoverable) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={`${base} ${hoverClasses} ${className}`}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={`${base} ${className}`}>
      {children}
    </div>
  )
}
