import { motion } from 'motion/react'
import { galleryImages } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import GradientBlob from '../ui/GradientBlob'

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden">
      <GradientBlob colors="from-coral to-violet" size="w-[500px] h-[500px]" position="-bottom-40 -right-40" delay={3} slow />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Happy Tails Gallery"
          gradientWord="Happy Tails"
          subtitle="A peek at the fun, love, and adventures our furry guests enjoy every day."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              variants={cardVariants}
              transition={{ duration: 0.5 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square"
            >
              {/* Real photo */}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="font-heading font-semibold text-white text-base">
                  {image.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
