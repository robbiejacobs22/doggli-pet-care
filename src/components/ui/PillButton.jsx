import { motion } from 'motion/react'

const variantStyles = {
  primary:
    'bg-gradient-to-r from-amber to-coral text-midnight font-bold shadow-lg shadow-amber/25 hover:shadow-xl hover:shadow-amber/30',
  secondary:
    'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15',
  outline:
    'bg-transparent border-2 border-amber text-amber hover:bg-amber/10',
}

const sizeStyles = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-8 py-3.5 text-base',
  lg: 'px-10 py-4 text-lg',
}

export default function PillButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
}) {
  const classes = `inline-flex items-center justify-center rounded-full font-heading font-semibold transition-all duration-300 cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.2 },
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps}>
      {children}
    </motion.button>
  )
}
