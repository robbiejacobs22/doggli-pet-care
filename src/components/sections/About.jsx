import { motion } from 'motion/react'
import { aboutStats, whyChooseUs } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import GlassCard from '../ui/GlassCard'
import GradientBlob from '../ui/GradientBlob'

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden">
      <GradientBlob colors="from-violet to-amber" size="w-[400px] h-[400px]" position="-top-20 -left-40" delay={1} slow />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Your Dog's Home Away From Home"
          gradientWord="Home Away From Home"
          subtitle="Every dog deserves a day filled with fun and plenty of tail wags."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image side */}
          <AnimatedSection variant="fadeLeft">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/dogs/about.png"
                  alt="Doggli Pet Care owner with her beloved dog"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/30 to-transparent" />
              </div>
              {/* Decorative badge */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-amber to-coral rounded-2xl px-5 py-3 shadow-xl shadow-amber/20">
                <span className="font-heading font-bold text-midnight text-lg">5+ Years</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Text side */}
          <AnimatedSection variant="fadeRight">
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-text-primary mb-6">
              We Treat Your Dog Like{' '}
              <span className="bg-gradient-to-r from-amber to-coral bg-clip-text text-transparent">
                Our Own
              </span>
            </h3>
            <div className="space-y-4 text-text-secondary text-lg leading-relaxed mb-8">
              <p>
                Doggli is your dog's home away from home. Your furry friend will get plenty of outdoor play and fun in the sun with our scenic dog walks and spacious daycare area.
              </p>
              <p>
                Our space has tons of cozy napping spots for when your pet needs to rest and relax. We'll treat your dog like our own, with love and affection every single day.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {aboutStats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-heading font-extrabold text-3xl md:text-4xl bg-gradient-to-r from-amber to-coral bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-text-muted text-sm font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Why Choose Us Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="text-center h-full">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h4 className="font-heading font-bold text-lg text-text-primary mb-2">
                  {item.title}
                </h4>
                <p className="text-text-secondary text-sm">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
