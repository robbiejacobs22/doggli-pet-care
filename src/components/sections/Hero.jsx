import { motion } from 'motion/react'
import PillButton from '../ui/PillButton'
import GradientBlob from '../ui/GradientBlob'
import { businessInfo } from '../../data/content'

const floatingEmojis = [
  { emoji: '🐾', x: '10%', y: '20%', delay: 0, size: 'text-4xl' },
  { emoji: '🦴', x: '85%', y: '15%', delay: 1, size: 'text-3xl' },
  { emoji: '❤️', x: '75%', y: '70%', delay: 2, size: 'text-2xl' },
  { emoji: '🐕', x: '15%', y: '75%', delay: 0.5, size: 'text-3xl' },
  { emoji: '⭐', x: '90%', y: '45%', delay: 1.5, size: 'text-2xl' },
  { emoji: '🐾', x: '50%', y: '85%', delay: 2.5, size: 'text-3xl' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Blobs */}
      <GradientBlob colors="from-amber to-coral" size="w-[500px] h-[500px]" position="top-20 -right-40" delay={0} />
      <GradientBlob colors="from-violet to-sky" size="w-[600px] h-[600px]" position="-bottom-40 -left-40" delay={2} slow />
      <GradientBlob colors="from-coral to-violet" size="w-[300px] h-[300px]" position="top-1/2 left-1/3" delay={4} />

      {/* Floating Emojis */}
      {floatingEmojis.map((item, i) => (
        <motion.span
          key={i}
          className={`absolute ${item.size} opacity-20 pointer-events-none select-none hidden md:block`}
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          {item.emoji}
        </motion.span>
      ))}

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-amber/10 border border-amber/20 text-amber text-sm font-semibold font-heading mb-6">
            🐾 Premium Pet Care Services
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-heading font-extrabold text-5xl md:text-6xl lg:text-8xl leading-tight mb-6"
        >
          Give Your Furry Friend the{' '}
          <span className="bg-gradient-to-r from-amber via-coral to-amber bg-clip-text text-transparent">
            Best Day
          </span>
          , Every Day!
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
        >
          {businessInfo.bio} We offer dog walks, daycare, boarding, and drop-in visits for your furry friends.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <PillButton href="#contact" size="lg">
            Book a Stay
          </PillButton>
          <PillButton href="#services" variant="secondary" size="lg">
            Our Services
          </PillButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex flex-col items-center gap-2 text-text-muted"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-text-muted flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-2 rounded-full bg-text-muted"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
