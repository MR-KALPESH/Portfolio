import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

// Card 1 — Currently Building with GitHub Identity
function CurrentlyBuildingCard({ isInView, index }) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                setProgress(72)
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [isInView])

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
            className="group relative p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-500"
            style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
        >
            {/* Subtle pulsing glow */}
            <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5"
            />

            <div className="relative z-10">
                {/* GitHub Header */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/[0.06]">
                    <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-white/90 font-medium">Kalpesh's <span className="text-gray-400">GitHub</span></span>
                </div>

                {/* Label */}
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">
                    Currently Building
                </p>

                {/* Project name */}
                <h3 className="text-xl font-bold text-white mb-2">
                    Flomize SaaS
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                    A premium business management suite integrating CRM, HRMS, and asset management.
                </p>

                {/* Progress bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                        />
                    </div>
                </div>

                {/* Next milestone */}
                <p className="text-gray-500 text-xs mb-6">
                    Next milestone: <span className="text-gray-300">Production Release Q3 2026</span>
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-400 text-xs font-medium">Active development</span>
                    </span>

                    <motion.a
                        href="https://github.com/MR-KALPESH"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 text-xs font-medium hover:text-white transition-colors group/link"
                    >
                        View project <span className="inline-block group-hover/link:translate-x-1 transition-transform">→</span>
                    </motion.a>
                </div>
            </div>
        </motion.div>
    )
}

// Card 2 — Famous Thinker Portrait + Quote (Soul Card)
function ThinkerCard({ isInView, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
            className="group relative p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-500 overflow-hidden"
            style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
        >
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-amber-500/5 via-transparent to-rose-500/5" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-6">
                {/* Portrait - Steve Jobs — fixed height so it never collapses */}
                <div
                    className="w-full lg:w-36 rounded-2xl overflow-hidden flex-shrink-0 relative bg-gray-900"
                    style={{ height: '176px', minHeight: '176px' }}
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg"
                        alt="Steve Jobs"
                        className="absolute inset-0 w-full h-full object-cover object-top grayscale contrast-[1.1]"
                        onError={(e) => {
                            e.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/a9/Steve_Jobs_Headshot_2010.jpg"
                        }}
                    />
                    {/* Grain overlay */}
                    <div className="absolute inset-0 noise-texture opacity-30" />
                    {/* Rim lighting effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Quote */}
                <div className="flex-1 flex flex-col justify-center">
                    <blockquote className="text-white text-lg lg:text-xl font-light leading-relaxed mb-4">
                        <p className="mb-1">"Stay hungry.</p>
                        <p>Stay foolish."</p>
                    </blockquote>

                    <p className="text-gray-500 text-sm mb-6">
                        — Steve Jobs
                    </p>

                    <Link to="/book">
                        <motion.span
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-white text-sm font-medium hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 w-fit cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                        >
                            Start a conversation
                            <span>→</span>
                        </motion.span>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

// Card 3 — Spotify Last Played with Play Button
function SpotifyCard({ isInView, index }) {
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioUnlocked, setAudioUnlocked] = useState(false)

    // Click play button to enable and start playing
    const handlePlayClick = (e) => {
        e.stopPropagation()
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
                setIsPlaying(false)
            } else {
                audioRef.current.currentTime = 3
                audioRef.current.volume = 0.5
                audioRef.current.play()
                    .then(() => {
                        setAudioUnlocked(true)
                        setIsPlaying(true)
                    })
                    .catch((err) => console.warn('Audio playback blocked:', err.message))
            }
        }
    }

    // Hover plays the song (only after unlocked via button click)
    const handleMouseEnter = () => {
        if (audioRef.current && audioUnlocked && !isPlaying) {
            audioRef.current.currentTime = 3
            audioRef.current.volume = 0.5
            audioRef.current.play().catch((err) => console.warn('Audio playback blocked:', err.message))
            setIsPlaying(true)
        }
    }

    // Mouse leave pauses
    const handleMouseLeave = () => {
        if (audioRef.current && audioUnlocked) {
            audioRef.current.pause()
            setIsPlaying(false)
        }
    }

    // Stop playing when card leaves viewport
    useEffect(() => {
        if (!isInView && audioRef.current) {
            audioRef.current.pause()
            // Use a timeout-free update to avoid sync setState in effect body
            const timer = setTimeout(() => setIsPlaying(false), 0)
            return () => clearTimeout(timer)
        }
    }, [isInView])

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-500 overflow-hidden cursor-pointer"
            style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
        >
            {/* Hidden audio element - No Lie by Sean Paul */}
            <audio
                ref={audioRef}
                src="/audio/no-lie.mp3"
                preload="auto"
            />

            {/* Neon glow background - Enhanced when playing */}
            <motion.div
                animate={{
                    opacity: isPlaying ? [0.5, 0.8, 0.5] : [0.3, 0.5, 0.3],
                    scale: isPlaying ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: isPlaying ? 1 : 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-transparent blur-xl"
            />
            <motion.div
                animate={{ opacity: isPlaying ? [0.4, 0.6, 0.4] : [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent blur-xl"
            />

            <div className="relative z-10">
                {/* Header with Spotify icon and Play Button */}
                <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                        {isPlaying ? 'Now Playing' : 'Last Played'}
                    </span>

                    {/* Playing indicator */}
                    {isPlaying && (
                        <div className="flex items-center gap-0.5 ml-auto">
                            <motion.div animate={{ height: [4, 16, 4] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }} className="w-1 bg-green-500 rounded-full" />
                            <motion.div animate={{ height: [4, 12, 4] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} className="w-1 bg-green-500 rounded-full" />
                            <motion.div animate={{ height: [4, 18, 4] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} className="w-1 bg-green-500 rounded-full" />
                            <motion.div animate={{ height: [4, 10, 4] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }} className="w-1 bg-green-500 rounded-full" />
                        </div>
                    )}
                </div>

                {/* Song info */}
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    I recently listened to <span className="text-white font-semibold">No Lie</span> by{' '}
                    <span className="text-pink-400">Sean Paul</span> from the album{' '}
                    <span className="text-gray-200">Mad Love The Prequel</span>.
                </p>

                {/* Vinyl / Album artwork */}
                <div className="relative w-full h-48 flex items-center justify-center">
                    {/* Vinyl disc - spins faster when playing */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: isPlaying ? 3 : 12, repeat: Infinity, ease: 'linear' }}
                        className="relative w-36 h-36"
                    >
                        {/* Vinyl grooves */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black border-4 border-gray-700">
                            {/* Inner rings */}
                            <div className="absolute inset-3 rounded-full border border-gray-600/30" />
                            <div className="absolute inset-6 rounded-full border border-gray-600/20" />
                            <div className="absolute inset-9 rounded-full border border-gray-600/10" />

                            {/* Center label */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"
                                        alt="Album art"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shine effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                    </motion.div>

                    {/* Album cover behind vinyl */}
                    <div className="absolute right-2 w-28 h-28 rounded-xl overflow-hidden shadow-2xl -rotate-6 bg-gray-900">
                        <img
                            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
                            alt="Mad Love The Prequel"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                </div>

                {/* Play Button */}
                <button
                    onClick={handlePlayClick}
                    className="mt-4 mx-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 transition-all hover:scale-105"
                >
                    {isPlaying ? (
                        <>
                            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
                            <span className="text-green-400 text-sm font-medium">Pause</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            <span className="text-green-400 text-sm font-medium">Play</span>
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    )
}

export default function DecodingLogicSection() {
    const sectionRef = useRef(null)
    // once: true — cards animate in once and stay visible, never re-hide on scroll
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    return (
        <section
            ref={sectionRef}
            className="relative py-32 px-6 sm:px-12 lg:px-20 bg-black overflow-hidden"
        >
            {/* Noise grain texture */}
            <div className="absolute inset-0 noise-texture opacity-5" />

            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(100,100,255,0.03)_0%,transparent_50%)]" />

            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-20">
                    {/* Top label */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-medium mb-6"
                    >
                        Behind the Curtains
                    </motion.p>

                    {/* Main heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight"
                    >
                        <span className="text-white">Decoding logic</span>
                        <br />
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.22 }}
                            className="italic font-serif bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent"
                            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                        >
                            {'&&'} the lyrics
                        </motion.span>
                    </motion.h2>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <CurrentlyBuildingCard isInView={isInView} index={0} />
                    <ThinkerCard isInView={isInView} index={1} />
                    <SpotifyCard isInView={isInView} index={2} />
                </div>
            </div>
        </section>
    )
}
