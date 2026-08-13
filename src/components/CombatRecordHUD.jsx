import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

export function AnimatedCounter({ target, label, suffix = '', prefix = '' }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

    useEffect(() => {
        if (!isInView) return
        let start = 0
        const duration = 2000
        const increment = target / (duration / 16)
        const timer = setInterval(() => {
            start += increment
            if (start >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)
        return () => clearInterval(timer)
    }, [isInView, target])

    return (
        <div ref={ref} className="relative p-5 rounded-xl border border-white/[0.05] bg-[rgba(10,10,10,0.5)] backdrop-blur-md overflow-hidden group hover:border-orange-500/30 transition-colors duration-500">
            {/* Hover Glare inside counter */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0] to-pink-500/[0] group-hover:from-orange-500/[0.05] group-hover:to-pink-500/[0.05] transition-all duration-500" />
            
            <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2 font-mono">
                {prefix}{count}{suffix}
            </div>
            <div className="text-[9px] sm:text-[10px] tracking-[0.2em] text-gray-500 uppercase font-medium">
                {label}
            </div>
        </div>
    )
}

export default function CombatRecordHUD() {
    const cardRef = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 })
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"])
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"])

    const handleMouseMove = (e) => {
        if (!cardRef.current) return
        // Throttle via rAF — only process one event per frame
        if (handleMouseMove._rafId) cancelAnimationFrame(handleMouseMove._rafId)
        handleMouseMove._rafId = requestAnimationFrame(() => {
            const rect = cardRef.current?.getBoundingClientRect()
            if (!rect) return
            const xPct = (e.clientX - rect.left) / rect.width - 0.5
            const yPct = (e.clientY - rect.top) / rect.height - 0.5
            x.set(xPct)
            y.set(yPct)
        })
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <section className="relative py-32 px-6 border-t border-white/[0.05] overflow-hidden min-h-[90vh] flex items-center">
            {/* Cyberpunk Environment Backsplash */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/[0.03] rounded-full blur-[120px]" />
                <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-pink-500/[0.03] rounded-full blur-[100px]" />
                {/* Minimal Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
            </div>

            <div className="max-w-5xl mx-auto w-full relative z-10" style={{ perspective: 1500 }}>
                {/* Header Sequence */}
                <div className="text-center mb-16 relative">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent -z-10"
                    />
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-[10px] font-bold tracking-[0.4em] text-orange-500 uppercase mb-4 shadow-orange-500 drop-shadow-md"
                    >
                        Classified Intelligence
                    </motion.p>
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-4xl lg:text-7xl font-bold tracking-tighter"
                    >
                        OPERATOR <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 font-serif italic">DOSSIER</span>
                    </motion.h2>
                </div>

                {/* The 3D Interactive Card */}
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                        willChange: "transform",
                    }}
                    className="relative w-full rounded-3xl border border-white/10 bg-black/60 shadow-[0_0_80px_rgba(0,0,0,0.8)] cursor-crosshair"
                >
                    {/* Dynamic Moving Glare overlay inside the border bounds */}
                    <motion.div 
                        className="absolute inset-0 z-50 pointer-events-none rounded-3xl opacity-30 mix-blend-overlay"
                        style={{
                            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%)`
                        }}
                    />

                    {/* Scanlines Effect Overlay on Card */}
                    <div className="absolute inset-0 pointer-events-none opacity-10 rounded-3xl bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]" />

                    {/* Card Inner Content Panel - Pushed outward */}
                    <div 
                        className="relative w-full h-full rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent p-6 sm:p-8 lg:p-12 overflow-hidden"
                        style={{ transform: "translateZ(30px)" }}
                    >
                        {/* Internal Neon Corner Accents */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-orange-500/50 rounded-tl-3xl" />
                        <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-pink-500/50 rounded-tr-3xl" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-purple-500/50 rounded-bl-3xl" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-orange-500/50 rounded-br-3xl" />

                        {/* Top ID Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/[0.08] pb-8 mb-8 gap-6 relative z-10">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-xl bg-orange-500/10 border border-orange-500/30 p-1 flex-shrink-0 relative group">
                                    <div className="absolute inset-0 border border-orange-500/50 rounded-xl scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
                                    <div className="w-full h-full rounded-lg bg-orange-500/20 relative overflow-hidden">
                                         <div className="absolute inset-0 bg-gradient-to-b from-orange-500/40 to-pink-500/40 opacity-40 mix-blend-color-burn z-10"></div>
                                         <div className="w-full h-full bg-[url('/images/kalpesh-4.jpg')] bg-cover bg-center mix-blend-luminosity opacity-90" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 uppercase drop-shadow-md">Kalpesh Katariya</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,1)]" />
                                        <span className="text-[10px] sm:text-xs tracking-widest text-orange-400 font-mono">STATUS: GRANDMASTER BUILDER</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-left md:text-right flex-shrink-0">
                                <div className="text-[9px] sm:text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-1.5">Clearance Level</div>
                                <div className="text-lg sm:text-xl font-mono text-white/90 tracking-widest border border-white/10 px-4 py-2 rounded bg-white/5 shadow-inner">
                                    OMEGA-09
                                </div>
                            </div>
                        </div>

                        {/* Mid Section / Details & Visualization */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 items-center relative z-10">
                            {/* Abstract Hologram Module */}
                            <div className="h-56 rounded-2xl border border-white/5 bg-[rgba(0,0,0,0.4)] flex items-center justify-center relative overflow-hidden group">
                                {/* Digital noise backdrop */}
                                <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                                
                                {/* 3D Rotating Rings Simulation */}
                                <div className="absolute flex items-center justify-center">
                                    <div className="w-40 h-40 border-[1.5px] border-orange-500/30 rounded-full absolute animate-[spin_8s_linear_infinite]" style={{ borderStyle: 'dashed' }} />
                                    <div className="w-32 h-32 border border-pink-500/40 rounded-full absolute animate-[spin_6s_linear_infinite_reverse]" style={{ transform: 'rotateX(60deg)' }} />
                                    <div className="w-24 h-24 border-2 border-white/30 border-r-transparent rounded-full absolute animate-[spin_3s_linear_infinite] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                    <div className="w-10 h-10 bg-orange-500/20 rounded-full absolute blur-md animate-pulse" />
                                </div>
                                
                                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-orange-400/80 font-mono text-[9px] sm:text-[10px] tracking-[0.4em] px-3 py-1.5 rounded-full bg-black/60 border border-orange-500/20 backdrop-blur-md">
                                    NEURAL LINK ACTIVE
                                </span>
                            </div>

                            {/* Bio / Terminal Output Block */}
                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
                                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-mono">
                                    <span className="text-orange-400 animate-pulse">&gt; INITIALIZING COMBAT RECORD...</span><br/><br/>
                                    Subject identified as highly proficient in high-pressure hackathon environments. Known for rapidly deploying scalable, production-ready architecture under extreme deadlines. <br/><br/>
                                    <span className="text-pink-400">Specializations:</span> Full-Stack Engineering, Web3 Infrastructure, AI Integration, Interactive UI/UX.
                                </p>
                            </div>
                        </div>

                        {/* Bottom Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                            <AnimatedCounter target={120} label="HOURS SURVIVED" suffix="+" />
                            <AnimatedCounter target={15} label="LINES WRITTEN" suffix="k+" />
                            <AnimatedCounter target={35} label="RED BULLS" suffix="+" />
                            <AnimatedCounter target={13} label="ARENAS CLEARED" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
