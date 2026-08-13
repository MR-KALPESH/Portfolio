import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import Navbar from '../components/Navbar'
import WorkHero from '../components/WorkHero'
import ProjectShowcase from '../components/ProjectShowcase'
import ExperienceSection from '../components/ExperienceSection'
import GitHubActivitySection from '../components/GitHubActivitySection'
import DecodingLogicSection from '../components/DecodingLogicSection'
import ClosingSection from '../components/ClosingSection'
import SEO from '../components/SEO';

export default function Work() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="relative bg-black min-h-screen">
            <SEO title="Work" description="Explore the Work page of Kalpesh Katariya portfolio." />
            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 noise-texture pointer-events-none z-0" />

            {/* Navbar */}
            <Navbar />

            {/* Work Hero */}
            <WorkHero />

            {/* VENTURE SHOWCASE Section Divider */}
            <section className="relative pt-16 pb-12 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto text-center">
                    {/* Use animate (not whileInView) so scroll-drift can't hide these */}
                    <motion.p
                        className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={mounted ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        Crafting Modern Experiences
                    </motion.p>
                    <motion.h2
                        className="text-6xl lg:text-7xl font-bold tracking-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={mounted ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.25 }}
                    >
                        VENTURE{' '}
                        <span className="font-serif italic bg-gradient-to-r from-pink-400 via-orange-400 to-orange-500 bg-clip-text text-transparent">
                            SHOWCASE
                        </span>
                    </motion.h2>
                    <motion.div
                        className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-8"
                        initial={{ scaleX: 0 }}
                        animate={mounted ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.45 }}
                    />
                </div>
            </section>

            {/* Horizontal Scrolling Project Showcase */}
            <ProjectShowcase />

            {/* Experience Timeline Section */}
            <ExperienceSection />

            {/* GitHub Activity Section */}
            <GitHubActivitySection />

            {/* Decoding Logic - Behind the Curtains */}
            <DecodingLogicSection />

            {/* Closing / Footer */}
            <ClosingSection />
        </div>
    )
}
