import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import About from './components/sections/About'
import Testimonials from './components/sections/Testimonials'
import Gallery from './components/sections/Gallery'
import Pricing from './components/sections/Pricing'
import Contact from './components/sections/Contact'
import ScrollProgress from './components/ui/ScrollProgress'
import GradientBlob from './components/ui/GradientBlob'

export default function App() {
  return (
    <div className="relative bg-midnight min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navbar />

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <GradientBlob
          colors="from-violet to-sky"
          size="w-[600px] h-[600px]"
          position="top-[40%] -right-[200px]"
          delay={0}
          slow
        />
        <GradientBlob
          colors="from-amber to-coral"
          size="w-[500px] h-[500px]"
          position="top-[70%] -left-[200px]"
          delay={4}
          slow
        />
      </div>

      <main className="relative z-10">
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Gallery />
        <Pricing />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
