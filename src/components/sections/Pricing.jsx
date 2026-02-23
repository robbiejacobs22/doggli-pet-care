import { motion } from 'motion/react'
import { pricingTiers } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import PillButton from '../ui/PillButton'
import { FaCheck } from 'react-icons/fa'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Simple, Transparent Pricing"
          gradientWord="Transparent"
          subtitle="Choose the perfect plan for your pup. No hidden fees, just pure love and care."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start"
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              transition={{ duration: 0.5 }}
              className={`relative ${tier.popular ? 'md:-translate-y-4 md:scale-105' : ''}`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber to-coral text-midnight text-xs font-heading font-bold shadow-lg shadow-amber/30">
                    Most Popular
                  </span>
                </div>
              )}

              <GlassCard
                className={`h-full flex flex-col text-center ${
                  tier.popular
                    ? 'border-amber/30 shadow-xl shadow-amber/10 bg-glass-hover'
                    : ''
                }`}
                padding="p-8"
              >
                {/* Tier name */}
                <h3 className="font-heading font-bold text-lg text-text-secondary mb-2">
                  {tier.name}
                </h3>
                <p className="text-text-muted text-sm mb-6">{tier.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="font-heading font-extrabold text-5xl bg-gradient-to-r from-amber to-coral bg-clip-text text-transparent">
                    ${tier.price}
                  </span>
                  <span className="text-text-muted text-sm ml-1">/{tier.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1 text-left">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheck className="text-amber text-xs mt-1.5 flex-shrink-0" />
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <PillButton
                  href="#contact"
                  variant={tier.popular ? 'primary' : 'secondary'}
                  size="md"
                  className="w-full"
                >
                  Get Started
                </PillButton>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
