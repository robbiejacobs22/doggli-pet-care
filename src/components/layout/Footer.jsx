import { businessInfo, navLinks, services } from '../../data/content'
import { FaInstagram, FaFacebook, FaHome } from 'react-icons/fa'

const socialLinks = [
  { icon: FaInstagram, href: 'https://www.instagram.com/doggli_petcare/', label: 'Instagram' },
  { icon: FaFacebook, href: 'https://www.facebook.com/dogglipetcare/', label: 'Facebook' },
  { icon: FaHome, href: 'https://nextdoor.com/pages/doggli-pet-care-el-sobrante-ca/', label: 'Nextdoor' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-midnight-light/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <a href="#hero" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐾</span>
              <span className="font-heading font-bold text-xl bg-gradient-to-r from-amber to-coral bg-clip-text text-transparent">
                Doggli
              </span>
            </a>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              {businessInfo.bio}
            </p>
            <div className="flex gap-3">
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

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-text-muted text-sm hover:text-amber transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-text-primary mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-text-muted text-sm hover:text-amber transition-colors duration-300"
                  >
                    {service.icon} {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-text-primary mb-4">Contact</h4>
            <ul className="space-y-2.5 text-text-muted text-sm">
              <li>
                <a href={`tel:${businessInfo.phone.replace(/[^0-9]/g, '')}`} className="hover:text-amber transition-colors">
                  📞 {businessInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${businessInfo.email}`} className="hover:text-amber transition-colors">
                  ✉️ {businessInfo.email}
                </a>
              </li>
              <li>⏰ {businessInfo.hours}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} {businessInfo.name}. All rights reserved. Made with ❤️ for every pup.
          </p>
        </div>
      </div>
    </footer>
  )
}
