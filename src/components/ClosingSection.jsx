import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ContactModal from './ContactModal'

// Route mapping for internal & external links
const linkRoutes = {
    'Home': '/',
    'Labs': '/labs',
    'Guestbook': '/guestbook',
    'Uses': '/uses',
    'About Me': '/about',
    'Projects': '/work',
    'Contact': '/book',
    'Resume': '/resume',
    'Flomize': 'https://flomiz.com',
    'Galaxy': 'https://galaxyinfotech.com',
}

const navLinks = {
    General: ['Home', 'Labs', 'Guestbook', 'Uses'],
    About: ['About Me', 'Projects', 'Contact', 'Resume'],
    Ventures: ['Flomize', 'Galaxy'],
    Legal: ['Privacy Policy', 'Terms & Conditions'],
}

function SocialIcon({ children, href, delay }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, scale: 1.1, color: '#FFFFFF' }} // Enhanced hover
            className="w-9 h-9 flex items-center justify-center text-gray-500 transition-all duration-300 relative group"
        >
            <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100" /> {/* Background glow */}
            <div className="relative z-10">{children}</div>
        </motion.a>
    )
}

// ── Main Section ───────────────────────────────────────────────────
export default function ClosingSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
    const [modalOpen, setModalOpen] = useState(false)
    const [legalModal, setLegalModal] = useState(null)

    return (
        <section ref={sectionRef} className="relative pt-32 pb-12 px-6 sm:px-12 lg:px-20 bg-black overflow-hidden">
            {/* Noise grain texture */}
            <div className="absolute inset-0 noise-texture opacity-5" />

            <div className="max-w-7xl mx-auto">
                {/* Top CTA Area */}
                <div className="relative mb-32">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
                        {/* Left - Avatar + Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                            className="flex items-start gap-6"
                        >
                            {/* Avatar */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.6, delay: 0.12 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0"
                                style={{ boxShadow: '0 0 30px rgba(255,255,255,0.1)' }}
                            >
                                <img
                                    src="/images/kalpesh-4.jpg"
                                    alt="Kalpesh Katariya"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Headline */}
                            <div>
                                <h2 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                                    <span className="text-white">Let's create</span>
                                    <br />
                                    <span className="text-gray-500">something real.</span>
                                </h2>
                            </div>
                        </motion.div>

                        {/* Right — Let's Connect Button */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="hidden lg:flex flex-col items-end gap-4"
                        >
                            {/* Rainbow border wrapper as the interactive button */}
                            <motion.button
                                onClick={() => setModalOpen(true)}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="relative p-[2px] rounded-full outline-none group"
                                style={{
                                    background: 'conic-gradient(from 0deg, #ff0000, #ff7700, #ffff00, #00ff00, #0099ff, #9900ff, #ff0099, #ff0000)',
                                    animation: 'spin 3s linear infinite',
                                    willChange: 'transform'
                                }}
                            >
                                <style>{`
                                    @keyframes spin {
                                        from { filter: hue-rotate(0deg); }
                                        to   { filter: hue-rotate(360deg); }
                                    }
                                `}</style>
                                {/* Inner black fill */}
                                <div className="relative flex items-center gap-3 px-9 py-4 rounded-full bg-black text-white font-bold text-lg tracking-wide">
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    LET'S CONNECT
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </motion.button>
                            <p className="text-gray-500 text-sm font-medium tracking-wider uppercase">I'll reply within 24 hours ✦</p>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Container Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="rounded-[28px] bg-white/[0.02] border border-white/[0.06] p-8 lg:p-12"
                    style={{ boxShadow: '0 -20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)' }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Left - Brand Block */}
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">KALPESH</h3>
                            <p className="text-gray-500 leading-relaxed max-w-md text-sm">
                                Building digital experiences that matter, one line of code at a time.
                                Crafting interfaces that feel alive, solving problems that make a difference,
                                and turning ideas into reality. Every pixel has a purpose.
                                Every interaction tells a story.
                            </p>
                        </div>

                        {/* Right - Navigation Columns */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                            {Object.entries(navLinks).map(([category, links], catIndex) => (
                                <div key={category}>
                                    <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-4">
                                        {category}
                                    </h4>
                                    <ul className="space-y-3">
                                        {links.map((link, linkIndex) => (
                                            <motion.li
                                                key={link}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                                transition={{ duration: 0.4, delay: 0.5 + catIndex * 0.1 + linkIndex * 0.05 }}
                                            >
                                                {(() => {
                                                    const target = linkRoutes[link]
                                                    const isExternal = target?.startsWith('http')
                                                    const isLegal = link === 'Privacy Policy' || link === 'Terms & Conditions'

                                                    if (isExternal) {
                                                        return (
                                                            <a
                                                                href={target}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-gray-500 text-sm hover:text-white transition-colors duration-300 relative group inline-flex items-center gap-1"
                                                            >
                                                                {link}
                                                                <span className="text-[10px] opacity-60">↗</span>
                                                                <span className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                                                            </a>
                                                        )
                                                    }

                                                    if (target) {
                                                        return (
                                                            <Link
                                                                to={target}
                                                                className="text-gray-500 text-sm hover:text-white transition-colors duration-300 relative group inline-block"
                                                            >
                                                                {link}
                                                                <span className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                                                            </Link>
                                                        )
                                                    }

                                                    if (isLegal) {
                                                        return (
                                                            <button
                                                                onClick={() => setLegalModal(link)}
                                                                className="text-gray-500 text-sm hover:text-white transition-colors duration-300 relative group inline-block text-left"
                                                            >
                                                                {link}
                                                                <span className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                                                            </button>
                                                        )
                                                    }

                                                    return (
                                                        <span className="text-gray-500 text-sm">{link}</span>
                                                    )
                                                })()}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/[0.06] my-8 lg:my-10" />

                    {/* Bottom Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        {/* Copyright */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="text-gray-600 text-xs"
                        >
                            © 2026 Kalpesh Katariya. All rights reserved.
                        </motion.p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-1">
                            <SocialIcon href="https://github.com/MR-KALPESH" delay={0.75}>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </SocialIcon>
                            <SocialIcon href="https://www.linkedin.com/in/kalpesh-katariya01/" delay={0.8}>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </SocialIcon>

                            <SocialIcon href="https://www.instagram.com/i_am__kalpesh/" delay={0.9}>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </SocialIcon>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Contact Modal */}
            <AnimatePresence>
                {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
            </AnimatePresence>

            {/* Legal Information Modal (Privacy Policy & Terms) */}
            <AnimatePresence>
                {legalModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLegalModal(null)}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#121216] border border-white/10 p-6 sm:p-8 rounded-3xl max-w-lg w-full relative shadow-2xl"
                        >
                            <button
                                onClick={() => setLegalModal(null)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                            <h3 className="text-xl font-bold text-white mb-3">{legalModal}</h3>
                            <div className="text-gray-400 text-xs leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                                {legalModal === 'Privacy Policy' ? (
                                    <>
                                        <p>Your privacy is important to us. It is Kalpesh Katariya's policy to respect your privacy regarding any information we may collect across our website.</p>
                                        <p>We only request personal information when we truly need it to provide a service to you (such as contact inquiries or guestbook messages). We collect it by fair and lawful means, with your knowledge and consent.</p>
                                        <p>We don't share any personally identifying information publicly or with third parties, except when required to by law.</p>
                                    </>
                                ) : (
                                    <>
                                        <p>By accessing this portfolio website, you agree to be bound by these Terms and Conditions of Use and agree that you are responsible for compliance with any applicable local laws.</p>
                                        <p>All materials contained in this portfolio (designs, codebase, projects) are protected by applicable copyright and trademark law unless stated otherwise.</p>
                                        <p>Permission is granted to temporarily view the materials on Kalpesh Katariya's website for personal, non-commercial transitory viewing only.</p>
                                    </>
                                )}
                            </div>
                            <button
                                onClick={() => setLegalModal(null)}
                                className="mt-6 w-full py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-gray-200 transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
