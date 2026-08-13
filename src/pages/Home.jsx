import { useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Eager — visible immediately
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import HeroLayout from '../components/HeroLayout'
import SEO from '../components/SEO';

// Lazy — loaded only when needed (below fold)
const ProjectShowcase = lazy(() => import('../components/ProjectShowcase'))
const SkillsetShowcase = lazy(() => import('../components/SkillsetShowcase'))
const RibbonStrip = lazy(() => import('../components/RibbonStrip'))
const AboutSection = lazy(() => import('../components/AboutSection'))
const CertificationSection = lazy(() => import('../components/CertificationSection'))
const DecodingLogicSection = lazy(() => import('../components/DecodingLogicSection'))
const ClosingSection = lazy(() => import('../components/ClosingSection'))

// Minimal placeholder while lazy chunks load
const SectionFallback = () => <div className="min-h-[200px]" />

export default function Home() {
    // Initialize Lenis smooth scrolling
    

    return (
        <div className="relative bg-black">
            <SEO title="Home" description="Explore the Home page of Kalpesh Katariya portfolio." />
            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 noise-texture pointer-events-none z-0" />

            {/* Navbar */}
            <Navbar />

            {/* First Section: Hero with "KALPESH KATARIYA" headline */}
            <HeroSection />

            {/* Second Section: 5-Panel Glassmorphism Grid */}
            <HeroLayout />

            {/* Section Divider - VENTURE SHOWCASE */}
            <Suspense fallback={<SectionFallback />}>
                <section className="relative py-32 px-6 sm:px-12">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.p
                            className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            Crafting Modern Experiences
                        </motion.p>
                        <motion.h2
                            className="text-6xl lg:text-7xl font-bold tracking-tight"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                        >
                            VENTURE{' '}
                            <span className="font-serif italic bg-gradient-to-r from-pink-400 via-orange-400 to-orange-500 bg-clip-text text-transparent">
                                SHOWCASE
                            </span>
                        </motion.h2>
                        <motion.div
                            className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-8"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.4, delay: 0.4 }}
                        />
                    </div>
                </section>

                {/* Third Section: Horizontal Scrolling Project Showcase */}
                <ProjectShowcase />
            </Suspense>

            {/* Fourth Section: Skillset Showcase with 3D Sculpture */}
            <Suspense fallback={<SectionFallback />}>
                <SkillsetShowcase />
            </Suspense>

            {/* Fifth Section: Cinematic Ribbon Strip */}
            <Suspense fallback={<SectionFallback />}>
                <RibbonStrip />
            </Suspense>

            {/* Sixth Section: About Section */}
            <Suspense fallback={<SectionFallback />}>
                <AboutSection />
            </Suspense>

            {/* Seventh Section: Certification Showcase */}
            <Suspense fallback={<SectionFallback />}>
                <CertificationSection />
            </Suspense>

            {/* Eighth Section: Decoding Logic - Behind the Curtains */}
            <Suspense fallback={<SectionFallback />}>
                <DecodingLogicSection />
            </Suspense>

            {/* Ninth Section: Closing / Footer */}
            <Suspense fallback={<SectionFallback />}>
                <ClosingSection />
            </Suspense>
        </div>
    )
}
