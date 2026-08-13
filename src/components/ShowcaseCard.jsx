import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function ShowcaseCard() {
    const cardRef = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 })
    const rotateX = useTransform(mouseY, [-100, 100], [4, -4])
    const rotateY = useTransform(mouseX, [-100, 100], [-4, 4])

    function handleMouseMove(e) {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        x.set(e.clientX - rect.left - rect.width / 2)
        y.set(e.clientY - rect.top - rect.height / 2)
    }

    function handleMouseLeave() {
        x.set(0)
        y.set(0)
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="p-6 sm:p-8 min-h-[420px] relative overflow-hidden flex flex-col justify-between select-none"
        >
            {/* Ambient Background Gradient Orbs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-orange-500/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top Header Row — Right aligned to leave space for center clock on desktop */}
            <div className="relative z-10 text-right self-end max-w-full pl-0 sm:pl-24 lg:pl-32 mb-4">
                <div className="flex items-center justify-end gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-orange-400 uppercase">
                        CAREER JOURNEY
                    </span>
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400" />
                    </span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    React.js Developer at{' '}
                    <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-400 bg-clip-text text-transparent italic font-serif">
                        Flomize
                    </span>
                </h3>
                <p className="text-xs text-gray-400 font-serif italic mt-1">
                    &lt; Ex-React.js & React Native Developer @ Galaxy Infotech &gt;
                </p>
            </div>

            {/* Middle Section: Dual Bento Cards */}
            <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 my-2"
            >
                {/* 1. CURRENT VENTURE: FLOMIZE */}
                <motion.div
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-orange-500/30 hover:border-orange-500/60 transition-all shadow-xl flex flex-col justify-between group min-h-[170px]"
                >
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center shadow-md border border-orange-500/30 group-hover:scale-105 transition-transform flex-shrink-0">
                                    <span className="text-orange-400 font-extrabold text-lg">F</span>
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                                        Flomize
                                    </h4>
                                    <p className="text-[11px] text-gray-400 font-medium">React.js & Next.js Developer</p>
                                </div>
                            </div>
                            <span className="px-2 py-0.5 text-[9px] font-extrabold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full uppercase flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                NOW
                            </span>
                        </div>

                        <p className="text-[11px] text-gray-300 leading-relaxed font-light">
                            Building premium multi-module SaaS platforms covering CRM, Accounting, HRMS, and asset tracking workflows.
                        </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px]">
                        <span className="font-mono text-orange-400">flomiz.com</span>
                        <span className="text-gray-400 group-hover:translate-x-0.5 transition-transform">Active Project →</span>
                    </div>
                </motion.div>

                {/* 2. PAST EXPERIENCE: GALAXY INFOTECH */}
                <motion.div
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all shadow-xl flex flex-col justify-between group min-h-[170px]"
                >
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shadow-md border border-purple-500/30 group-hover:scale-105 transition-transform flex-shrink-0">
                                    <span className="text-purple-400 font-extrabold text-lg">G</span>
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-white group-hover:text-gray-200 transition-colors">
                                        Galaxy Infotech
                                    </h4>
                                    <p className="text-[11px] text-gray-400 font-medium">React.js & React Native Dev</p>
                                </div>
                            </div>
                            <span className="px-2 py-0.5 text-[9px] font-bold text-gray-400 bg-white/5 border border-white/10 rounded-full uppercase">
                                FORMER
                            </span>
                        </div>

                        <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                            Engineered robust ERP web and mobile portals, state management systems, and complex financial ledgers.
                        </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-500">
                        <span className="font-mono text-gray-400">galaxyinfotech.com</span>
                        <span>Experience</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Bottom Footer Quote */}
            <div className="relative z-10 flex items-center justify-between pt-2 text-[11px] text-gray-500 border-t border-white/[0.06]">
                <span className="font-serif italic text-gray-400">
                    &lt; Crafting Digital Experiences /&gt;
                </span>
                <span className="text-[9px] font-mono tracking-widest text-gray-600 uppercase">
                    SURAT, IN
                </span>
            </div>
        </div>
    )
}
