import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import Navbar from '../components/Navbar'
import SEO from '../components/SEO';

const socialLinks = [
    { number: '01', name: 'GITHUB', url: 'https://github.com/MR-KALPESH' },
    { number: '02', name: 'LINKEDIN', url: 'https://www.linkedin.com/in/kalpesh-katariya01/' },
    { number: '03', name: 'EMAIL', url: 'mailto:mr.kalpesh03@gmail.com' },
    { number: '04', name: 'PHONE', url: 'tel:+919512832665' },
]

export default function Links() {
    // Initialize Lenis smooth scrolling
    

    return (
        <div className="relative bg-black min-h-screen">
            <SEO title="Links" description="Explore the Links page of Kalpesh Katariya portfolio." />
            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 noise-texture pointer-events-none z-0" />

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-end pb-16 px-6 sm:px-12 lg:px-20 pt-32">
                <div className="max-w-7xl mx-auto w-full">
                    {/* Label */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-8"
                    >
                        Connect / Follow / Chat
                    </motion.p>

                    {/* Giant text with photo */}
                    <div className="relative">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-[10vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] font-black tracking-tighter leading-[0.85] text-white"
                            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                        >
                            MY
                        </motion.h1>

                        <div className="flex items-center gap-8">
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-[10vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] font-black tracking-tighter leading-[0.85] text-gray-600"
                                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                            >
                                DIGITAL
                            </motion.h1>

                            {/* Profile Photo */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="hidden lg:block w-40 h-40 xl:w-48 xl:h-48 rounded-full overflow-hidden border-4 border-white/10 flex-shrink-0"
                            >
                                <img
                                    src="/images/kalpesh-5.png"
                                    alt="Kalpesh Katariya"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-[10vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] font-black tracking-tighter leading-[0.85] text-white"
                            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                        >
                            PRESENCE
                        </motion.h1>
                    </div>
                </div>
            </section>

            {/* Divider Line */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-px bg-white/10 origin-left"
                />
            </div>

            {/* Links List */}
            <section className="py-16 px-6 sm:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    {socialLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                            className="group flex items-center justify-between py-8 border-b border-white/10 hover:border-white/20 transition-colors"
                        >
                            {/* Left side - Number and Name */}
                            <div className="flex items-center gap-8 lg:gap-16">
                                <span className="text-xs text-gray-600 font-mono">{link.number}</span>
                                <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-white group-hover:text-gray-300 transition-colors">
                                    {link.name}
                                </h2>
                            </div>

                            {/* Right side - Arrow */}
                            <motion.div
                                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors"
                                whileHover={{ scale: 1.1 }}
                            >
                                <svg
                                    className="w-5 h-5 text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 17L17 7M17 7H7M17 7v10"
                                    />
                                </svg>
                            </motion.div>
                        </motion.a>
                    ))}
                </div>
            </section>

            {/* Bottom Spacing */}
            <div className="h-32" />
        </div>
    )
}
