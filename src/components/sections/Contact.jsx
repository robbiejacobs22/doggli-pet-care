import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { businessInfo } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import PillButton from '../ui/PillButton'
import AnimatedSection from '../ui/AnimatedSection'
import GradientBlob from '../ui/GradientBlob'
import { FaPhone, FaEnvelope, FaClock, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData(e.target)

    try {
      const response = await fetch('https://formspree.io/f/xbdapwvq', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Something went wrong. Please try calling us instead!')
      }
    } catch {
      alert('Something went wrong. Please try calling us instead!')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden">
      <GradientBlob colors="from-amber to-violet" size="w-[400px] h-[400px]" position="-top-20 -right-40" delay={2} />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Let's Get in Touch"
          gradientWord="in Touch"
          subtitle="Ready to give your furry friend the best care? Pick up the phone or drop us a message!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Form */}
          <AnimatedSection variant="fadeUp">
            <GlassCard hoverable={false} padding="p-6 md:p-10">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-text-secondary text-sm font-medium mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Your name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-amber focus:ring-2 focus:ring-amber/30 focus:bg-white/[0.07] transition-all duration-300 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-text-secondary text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="you@email.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-amber focus:ring-2 focus:ring-amber/30 focus:bg-white/[0.07] transition-all duration-300 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-text-secondary text-sm font-medium mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="(555) 123-4567"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-amber focus:ring-2 focus:ring-amber/30 focus:bg-white/[0.07] transition-all duration-300 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-text-secondary text-sm font-medium mb-2">
                        Tell us about your pup
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        placeholder="Dog's name, breed, any special needs..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-amber focus:ring-2 focus:ring-amber/30 focus:bg-white/[0.07] transition-all duration-300 outline-none resize-none"
                      />
                    </div>

                    <PillButton type="submit" size="lg" className="w-full">
                      {submitting ? 'Sending...' : 'Send Message'}
                    </PillButton>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <FaCheckCircle className="text-amber text-6xl mb-6" />
                    </motion.div>
                    <h3 className="font-heading font-bold text-2xl text-text-primary mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-text-secondary mb-6">
                      We'll get back to you soon. Your pup is going to love it here!
                    </p>
                    <PillButton
                      variant="secondary"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another
                    </PillButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection variant="fadeUp" delay={0.2}>
            <div className="space-y-6">
              <GlassCard hoverable={false}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber/10 flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-amber" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-text-primary mb-1">Call Us</h4>
                    <p className="text-text-secondary">{businessInfo.phone}</p>
                    <p className="text-text-muted text-sm mt-1">Don't wait, pick up the phone today!</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hoverable={false}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-coral" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-text-primary mb-1">Email Us</h4>
                    <p className="text-text-secondary">{businessInfo.email}</p>
                    <p className="text-text-muted text-sm mt-1">We usually respond within a few hours</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hoverable={false}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-violet/10 flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-violet" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-text-primary mb-1">Hours</h4>
                    <p className="text-text-secondary">{businessInfo.hours}</p>
                    <p className="text-text-muted text-sm mt-1">We accommodate your schedule</p>
                  </div>
                </div>
              </GlassCard>

              {/* Location Card */}
              <GlassCard hoverable={false} padding="p-0 overflow-hidden">
                <div className="p-5 pb-3 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky/10 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-sky" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-text-primary mb-1">Find Us</h4>
                    <p className="text-text-secondary">{businessInfo.address}</p>
                    <p className="text-text-muted text-sm mt-1">Serving the greater East Bay area</p>
                  </div>
                </div>
                <div className="relative h-48 w-full">
                  <iframe
                    title="Doggli Pet Care Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.5!2d-122.3178!3d37.9595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80857e2a2a2a2a2a%3A0x1234567890abcdef!2s4317%20Santa%20Rita%20Rd%2C%20El%20Sobrante%2C%20CA%2094803!5e0!3m2!1sen!2sus!4v1700000000000"
                    className="absolute inset-0 w-full h-full border-0 opacity-80 contrast-125 grayscale-[30%]"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </GlassCard>

              {/* CTA Card */}
              <div className="bg-gradient-to-r from-amber/10 to-coral/10 border border-amber/20 rounded-3xl p-6 md:p-8">
                <h4 className="font-heading font-bold text-xl text-text-primary mb-2">
                  Going on vacation? 🏖️
                </h4>
                <p className="text-text-secondary mb-4">
                  We offer extended boarding stays so you can relax knowing your furry friend is in the best hands.
                </p>
                <PillButton href="tel:5103932881" size="sm">
                  Call Now
                </PillButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
