import { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageTransition from './components/PageTransition'
import Preloader from './components/Preloader'
import './index.css'

// ─── Lazy-loaded pages (code split per route) ──────────────────────
const Home      = lazy(() => import('./pages/Home'))
const About     = lazy(() => import('./pages/About'))
const Work      = lazy(() => import('./pages/Work'))
const Links     = lazy(() => import('./pages/Links'))
const Guestbook = lazy(() => import('./pages/Guestbook'))
const Labs      = lazy(() => import('./pages/Labs'))
const Uses      = lazy(() => import('./pages/Uses'))
const BookCall  = lazy(() => import('./pages/BookCall'))
const Resume    = lazy(() => import('./pages/Resume'))

// Minimal inline fallback — no spinner, just bg color matches portfolio
const PageFallback = () => (
  <div className="fixed inset-0 bg-black" aria-hidden="true" />
)

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <Suspense fallback={<PageFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
          <Route path="/links" element={<PageTransition><Links /></PageTransition>} />
          <Route path="/guestbook" element={<PageTransition><Guestbook /></PageTransition>} />
          <Route path="/labs" element={<PageTransition><Labs /></PageTransition>} />
          <Route path="/uses" element={<PageTransition><Uses /></PageTransition>} />
          <Route path="/book" element={<PageTransition><BookCall /></PageTransition>} />
          <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  // Quick fix: Set a CSS variable globally for the Lenis scroll if needed, 
  // but mostly we want to ensure the scrollbar is hidden during load
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [loading])

  // Global Smooth Scroll (Lenis) Context Setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Instantiate Singleton Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Sync GSAP ticker with Lenis requestAnimationFrame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Prevent GSAP's own lag smoothing from fighting Lenis
    gsap.ticker.lagSmoothing(0)

    // Ensure we scroll to top manually on load if needed
    window.scrollTo(0, 0)

    return () => {
      // Complete cleanup so we don't leak timers
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      lenis.destroy()
    }
  }, [])

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div 
            key="routes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedRoutes />
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App
