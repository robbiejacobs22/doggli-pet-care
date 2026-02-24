import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { navLinks } from '../../data/content'
import useScrollSpy from '../../hooks/useScrollSpy'
import PillButton from '../ui/PillButton'
import { FaInstagram, FaFacebook, FaHome } from 'react-icons/fa'

const sectionIds = navLinks.map((link) => link.href.replace('#', ''))

const socialLinks = [
  { icon: FaInstagram, href: 'https://www.instagram.com/doggli_petcare/', label: 'Instagram' },
  { icon: FaFacebook, href: 'https://www.facebook.com/dogglipetcare/', label: 'Facebook' },
  { icon: FaHome, href: 'https://nextdoor.com/pages/doggli-pet-care-el-sobrante-ca/', label: 'Nextdoor' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const activeId = useScrollSpy(sectionIds)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight/70 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-amber to-amber-dark flex items-center justify-center shadow-lg shadow-amber/20 group-hover:shadow-amber/40 transition-shadow duration-300">
              <span className="text-lg md:text-xl leading-none">🐾</span>
            </div>
            <span className="font-nav font-bold text-xl md:text-2xl tracking-tight">
              <span className="bg-gradient-to-r from-amber to-coral bg-clip-text text-transparent">Doggli</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.replace('#', '')
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  className={`relative px-3 py-2 text-sm font-nav font-medium transition-colors duration-300 rounded-lg ${
                    isActive ? 'text-amber' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </motion.a>
              )
            })}
          </div>

          {/* Desktop CTA + Socials */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-amber hover:border-amber/30 hover:bg-amber/10 transition-all duration-300"
                >
                  <social.icon className="text-xs" />
                </motion.a>
              ))}
            </div>
            <div className="w-px h-6 bg-white/10" />
            <PillButton href="#contact" size="sm">
              Book Now
            </PillButton>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-text-primary transition-colors"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-text-primary transition-colors"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-text-primary transition-colors"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-midnight/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-nav font-medium transition-colors ${
                    activeId === link.href.replace('#', '')
                      ? 'text-amber bg-amber/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <PillButton href="#contact" size="md" className="w-full">
                  Book Now
                </PillButton>
              </div>
              <div className="flex items-center justify-center gap-3 pt-3 mt-1 border-t border-white/5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-amber hover:border-amber/30 hover:bg-amber/10 transition-all duration-300"
                  >
                    <social.icon className="text-sm" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
