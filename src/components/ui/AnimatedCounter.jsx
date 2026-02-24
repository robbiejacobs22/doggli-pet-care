import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

export default function AnimatedCounter({ value, duration = 2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [displayValue, setDisplayValue] = useState('0')

  // Parse the value — handle "500+", "5+", "4.9", etc.
  const numericStr = value.replace(/[^0-9.]/g, '')
  const targetNum = parseFloat(numericStr)
  const suffix = value.replace(numericStr, '') // e.g. "+"
  const hasDecimal = numericStr.includes('.')
  const decimalPlaces = hasDecimal ? numericStr.split('.')[1].length : 0

  useEffect(() => {
    if (!isInView) return

    const startTime = performance.now()
    const durationMs = duration * 1000

    function animate(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / durationMs, 1)

      // Ease out cubic for satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * targetNum

      if (hasDecimal) {
        setDisplayValue(current.toFixed(decimalPlaces))
      } else {
        setDisplayValue(Math.floor(current).toString())
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, targetNum, duration, hasDecimal, decimalPlaces])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      {displayValue}{suffix}
    </motion.span>
  )
}
