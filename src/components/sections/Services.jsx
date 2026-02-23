import { motion } from 'motion/react'
import { services } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import AnimatedSection from '../ui/AnimatedSection'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="What We Offer"
          gradientWord="Offer"
          subtitle="From daily daycare to extended boarding, we've got everything your furry friend needs to stay happy and healthy."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={service.span}
            >
              <GlassCard className="h-full flex flex-col">
                <span className="text-4xl md:text-5xl mb-4">{service.icon}</span>
                <h3 className="font-heading font-bold text-xl md:text-2xl text-text-primary mb-3">
                  {service.name}
                </h3>
                <p className="font-body text-text-secondary leading-relaxed flex-1">
                  {service.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
