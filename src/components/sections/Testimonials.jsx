import { motion } from 'motion/react'
import { testimonials } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import { FaStar } from 'react-icons/fa'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Loved by Pet Parents"
          gradientWord="Loved"
          subtitle="Don't just take our word for it. Here's what our amazing pet parents have to say."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              transition={{ duration: 0.5 }}
              className={i === 1 ? 'md:-translate-y-4' : ''}
            >
              <GlassCard
                className={`h-full flex flex-col ${
                  i === 1 ? 'border-amber/20 shadow-lg shadow-amber/10' : ''
                }`}
              >
                {/* Quote mark */}
                <span className="text-6xl leading-none font-heading font-bold bg-gradient-to-r from-amber to-coral bg-clip-text text-transparent mb-2">
                  "
                </span>

                {/* Text */}
                <p className="text-text-secondary text-base leading-relaxed italic flex-1 mb-6">
                  {testimonial.text}
                </p>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <FaStar key={j} className="text-amber text-sm" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber to-coral flex items-center justify-center">
                    <span className="font-heading font-bold text-midnight text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-text-primary text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-text-muted text-xs">
                      Pet parent of {testimonial.dogName}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
