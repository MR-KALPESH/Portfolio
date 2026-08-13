import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const certifications = [
    {
        id: 1,
        title: 'Web Development Certification',
        issuer: 'Durvasa Infotech',
        year: '2024',
        credentialId: 'DURVASA-WD-2024',
        link: '#',
        certificate: '',
        accent: '#a855f7',
        tag: 'Professional',
    },
    {
        id: 2,
        title: 'Front End Development - HTML',
        issuer: 'Great Learning Academy',
        year: '2022',
        credentialId: 'GPPQWEOE',
        link: 'https://verify.mygreatlearning.com/GPPQWEOE',
        certificate: '/certificates/great-learning-html.png',
        accent: '#0ea5e9',
        tag: 'Development',
    },
    {
        id: 3,
        title: 'Cyber Sanjivani Competition',
        issuer: 'Surat City Police & Cyber Suraksha Setu',
        year: '2021',
        credentialId: 'SURAT-POLICE-CS-2021',
        link: '#',
        certificate: '/certificates/cyber-sanjivani.png',
        accent: '#f43f5e',
        tag: 'Competition',
    },
    {
        id: 4,
        title: 'AI Programming Curriculum',
        issuer: 'WhiteHat Jr',
        year: '2021',
        credentialId: 'WHITEHAT-AI-2021',
        link: '#',
        certificate: '/certificates/whitehat-jr-ai.png',
        accent: '#10b981',
        tag: 'AI Course',
    }
]

function CertCard({ cert, index, onClick }) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onClick(cert)}
            className="relative flex-none cursor-pointer select-none"
            style={{ width: 320 }}
        >
            {/* Card shell */}
            <div
                className="relative rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                    background: '#0c0c0c',
                    border: `1px solid ${hovered ? cert.accent + '40' : 'rgba(255,255,255,0.07)'}`,
                    boxShadow: hovered
                        ? `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${cert.accent}25, 0 0 40px ${cert.accent}10`
                        : '0 4px 20px rgba(0,0,0,0.4)',
                    transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                }}
            >
                {/* Certificate image */}
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                    <img
                        src={cert.certificate}
                        alt={cert.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700"
                        style={{
                            transform: hovered ? 'scale(1.06)' : 'scale(1)',
                            filter: hovered ? 'brightness(0.85)' : 'brightness(0.65)',
                        }}
                        draggable={false}
                    />

                    {/* Gradient fade */}
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to bottom, transparent 30%, #0c0c0c 100%)' }}
                    />

                    {/* Tag chip */}
                    <div
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase"
                        style={{
                            background: cert.accent + '22',
                            border: `1px solid ${cert.accent}44`,
                            color: cert.accent,
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        {cert.tag}
                    </div>

                    {/* Expand hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                            background: 'rgba(255,255,255,0.12)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.15)',
                        }}
                    >
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                    </motion.div>
                </div>

                {/* Text content */}
                <div className="px-6 pt-5 pb-6">
                    <h3
                        className="font-bold leading-snug mb-1.5 transition-colors duration-300"
                        style={{
                            fontSize: '1.02rem',
                            color: hovered ? '#ffffff' : 'rgba(255,255,255,0.92)',
                        }}
                    >
                        {cert.title}
                    </h3>

                    <p className="text-sm font-medium mb-5" style={{ color: cert.accent }}>
                        {cert.issuer}
                    </p>

                    {/* Divider */}
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 16 }} />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="tracking-wider uppercase text-[10px]">{cert.year}</span>
                        </div>

                        <span
                            className="text-[10px] font-mono tracking-wider"
                            style={{ color: 'rgba(255,255,255,0.2)' }}
                        >
                            {cert.credentialId}
                        </span>
                    </div>
                </div>

                {/* Accent bottom bar */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500"
                    style={{
                        background: hovered
                            ? `linear-gradient(to right, transparent, ${cert.accent}, transparent)`
                            : 'transparent',
                    }}
                />
            </div>
        </motion.div>
    )
}

export default function CertificationSection() {
    const sectionRef = useRef(null)
    const trackRef = useRef(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
    const [selectedCert, setSelectedCert] = useState(null)

    // Drag-to-scroll
    const drag = useRef({ active: false, startX: 0, scrollLeft: 0 })

    const onMouseDown = (e) => {
        if (!trackRef.current) return
        drag.current = { active: true, startX: e.pageX - trackRef.current.offsetLeft, scrollLeft: trackRef.current.scrollLeft }
        trackRef.current.style.cursor = 'grabbing'
    }
    const onMouseLeave = () => { if (trackRef.current) { drag.current.active = false; trackRef.current.style.cursor = 'grab' } }
    const onMouseUp   = () => { if (trackRef.current) { drag.current.active = false; trackRef.current.style.cursor = 'grab' } }
    const onMouseMove = (e) => {
        if (!drag.current.active || !trackRef.current) return
        e.preventDefault()
        const x = e.pageX - trackRef.current.offsetLeft
        const walk = (x - drag.current.startX) * 1.4
        trackRef.current.scrollLeft = drag.current.scrollLeft - walk
    }

    // Arrow scroll
    const scrollBy = (dir) => {
        if (!trackRef.current) return
        trackRef.current.scrollBy({ left: dir * 360, behavior: 'smooth' })
    }

    // Lock body scroll when modal open
    useEffect(() => {
        document.body.style.overflow = selectedCert ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [selectedCert])

    return (
        <section
            ref={sectionRef}
            className="relative py-32 bg-black"
            style={{ overflow: 'visible' }}
        >
            {/* Noise grain */}
            <div className="absolute inset-0 noise-texture opacity-5 pointer-events-none" />
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.018) 0%, transparent 70%)' }} />

            <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
                {/* Header */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-medium mb-6"
                >
                    Professional Credentials
                </motion.p>

                <div className="flex items-end justify-between mb-14 gap-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold tracking-tighter"
                    >
                        <span className="text-white">The Proof </span>
                        <span
                            className="italic bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent"
                            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                        >
                            Behind
                        </span>
                    </motion.h2>

                    {/* Navigation arrows */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-center gap-3 shrink-0"
                    >
                        <button
                            onClick={() => scrollBy(-1)}
                            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                color: 'rgba(255,255,255,0.7)',
                            }}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scrollBy(1)}
                            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                color: 'rgba(255,255,255,0.7)',
                            }}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* ── Horizontal scroll track — full-width, outside max-w container ── */}
            <div
                ref={trackRef}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                style={{
                    display: 'flex',
                    gap: 24,
                    overflowX: 'auto',
                    overflowY: 'visible',
                    paddingLeft: '5vw',
                    paddingRight: '5vw',
                    paddingBottom: 16,
                    cursor: 'grab',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {certifications.map((cert, i) => (
                    <CertCard key={cert.id} cert={cert} index={i} onClick={setSelectedCert} />
                ))}
                {/* trailing spacer */}
                <div style={{ flexShrink: 0, width: '5vw' }} />
            </div>

            {/* Fullscreen Lightbox */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-10"
                        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}
                        onClick={() => setSelectedCert(null)}
                    >
                        {/* Close */}
                        <motion.button
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.15 }}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white z-10 transition-all duration-200 hover:scale-110"
                            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}
                            onClick={(e) => { e.stopPropagation(); setSelectedCert(null) }}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        {/* Modal box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.93, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.93, y: 24 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                            className="relative w-full max-w-4xl max-h-[88vh] rounded-2xl overflow-hidden"
                            style={{
                                background: '#0c0c0c',
                                border: `1px solid ${selectedCert.accent}30`,
                                boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px ${selectedCert.accent}20`,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedCert.certificate}
                                alt={selectedCert.title}
                                className="w-full object-contain max-h-[70vh]"
                            />

                            {/* Info bar */}
                            <div
                                className="px-8 py-6 flex items-center justify-between"
                                style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                            >
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1">{selectedCert.title}</h3>
                                    <p className="text-sm font-medium" style={{ color: selectedCert.accent }}>{selectedCert.issuer} · {selectedCert.year}</p>
                                </div>
                                <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>
                                    {selectedCert.credentialId}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
