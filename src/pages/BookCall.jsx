import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import Navbar from '../components/Navbar'
import ClosingSection from '../components/ClosingSection'
import SEO from '../components/SEO';

export default function BookCall() {
    // Initialize Lenis smooth scrolling
    

    const scrollToCalendar = () => {
        document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="relative bg-black min-h-screen">
            <SEO title="BookCall" description="Explore the BookCall page of Kalpesh Katariya portfolio." />
            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 noise-texture pointer-events-none z-0" />

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center px-6 sm:px-12 lg:px-20 pt-24">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left - Text Content */}
                        <div>
                            {/* Label */}
                            <motion.p
                                className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                Schedule / Connect / Collaborate
                            </motion.p>

                            {/* Giant Headline */}
                            <motion.h1
                                className="text-[15vw] lg:text-[8vw] font-black tracking-tighter leading-[0.9] mb-12"
                                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                            >
                                <motion.span
                                    className="block text-white"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                >
                                    BOOK A
                                </motion.span>
                                <motion.span
                                    className="block text-gray-500 italic font-light"
                                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    CALL
                                </motion.span>
                                <motion.span
                                    className="block text-white"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                >
                                    WITH ME
                                </motion.span>
                            </motion.h1>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <motion.button
                                    onClick={scrollToCalendar}
                                    className="px-8 py-4 rounded-full bg-white text-black font-semibold flex items-center gap-3 hover:bg-gray-100 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Book a Call
                                </motion.button>

                                <motion.a
                                    href="mailto:mr.kalpesh03@gmail.com"
                                    className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold flex items-center gap-3 hover:bg-white/5 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Send a Message
                                </motion.a>
                            </motion.div>
                        </div>

                        {/* Right - Profile Photo */}
                        <motion.div
                            className="flex justify-center lg:justify-end"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                                <img
                                    src="/images/kalpesh-4.jpg"
                                    alt="Kalpesh Katariya"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Calendar Section */}
            <section id="calendar" className="relative py-20 px-6 sm:px-12 lg:px-20">
                <div className="max-w-6xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="rounded-3xl bg-[#1a1a1a] border border-white/10 overflow-hidden shadow-2xl">
                            <iframe
                                src="https://cal.com/kalpesh-katariya-eqssxf/30min?embed=true&theme=dark&layout=month_view"
                                width="100%"
                                height="650"
                                frameBorder="0"
                                style={{
                                    minHeight: '650px',
                                    background: '#1a1a1a'
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <ClosingSection />
        </div>
    )
}
