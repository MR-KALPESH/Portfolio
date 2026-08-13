import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ─── Dispatch Data ────────────────────────────────────────────────
const dispatches = [
    {
        id: 1,
        event: 'HackNUthon 5.0',
        location: 'Nirma University, Ahmedabad',
        date: 'March 2025',
        tag: 'Top 10 Finish 🏆',
        tagColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
        caption: `36 hours. Zero sleep. 100% shipped. 🚀\n\nJust wrapped up HackNUthon 5.0 at Nirma University and what a ride it was. Our team of 4 built RuneHub — a full-stack learning platform with real-time collaboration, interactive coding challenges & AI-powered code review.\n\nThe highlight? We went from a napkin sketch to a live, deployed product in under 36 hours. Proud of every line of code, every commit past 3am, every bug we squashed before the demo.\n\nFinished in the Top 10 out of 200+ teams. The experience alone was worth every sleepless hour.\n\n#Hackathon #HackNUthon #BuildInPublic #FullStack`,
        photos: ['/images/kalpesh-1.jpg', '/images/kalpesh-4.jpg'],
        reactions: { fire: 124, rocket: 89, clap: 203 },
        comments: 34,
    },
    {
        id: 2,
        event: 'dotSlash 8.0',
        location: 'SVNIT, Surat',
        date: 'February 2025',
        tag: 'Finalist 🎯',
        tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        caption: `What happens when you combine sleep deprivation, great teammates, and an obsession with AI? You build something you're genuinely proud of. ✨\n\nAt dotSlash 8.0 — SVNIT's flagship hackathon — our team built Rune AI, an AI-powered writing assistant that handles grammar correction, tone adjustment & content generation using custom fine-tuned models.\n\nWe made it to the Finals. The demo went flawlessly. And I learned more in those 24 hours than most weeks.\n\nOnto the next one. 🔥\n\n#dotSlash #AI #NLP #Hackathon #SVNIT`,
        photos: ['/images/kalpesh-2.png', '/images/kalpesh-3.png'],
        reactions: { fire: 98, rocket: 67, clap: 176 },
        comments: 28,
    },
    {
        id: 3,
        event: 'CodeStorm 3.0',
        location: 'GEC Gandhinagar',
        date: 'January 2025',
        tag: 'Participant',
        tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        caption: `Every hackathon teaches you something new — sometimes it's a new tech stack, sometimes it's how to handle pressure, sometimes it's both. 💡\n\nAt CodeStorm 3.0 at GEC Gandhinagar, our team dove into building FleetFlow — a real-time fleet management dashboard with live vehicle tracking, route optimization via Mapbox, and predictive maintenance alerts.\n\nDid we win? No. Did we ship something real? Absolutely.\n\nThat's what matters.\n\n#CodeStorm #ReactJS #Mapbox #HackathonLife`,
        photos: ['/images/kalpesh-4.jpg', '/images/kalpesh-1.jpg'],
        reactions: { fire: 72, rocket: 45, clap: 134 },
        comments: 18,
    },
]

// ─── Photo Carousel ───────────────────────────────────────────────
function PhotoCarousel({ photos }) {
    const [current, setCurrent] = useState(0)

    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black group">
            <AnimatePresence mode="wait">
                <motion.img
                    key={current}
                    src={photos[current]}
                    alt=""
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>

            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {photos.length > 1 && (
                <>
                    {/* Prev */}
                    <button
                        onClick={() => setCurrent(i => (i - 1 + photos.length) % photos.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    {/* Next */}
                    <button
                        onClick={() => setCurrent(i => (i + 1) % photos.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {photos.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`rounded-full transition-all duration-300 ${
                                    i === current ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'
                                }`}
                            />
                        ))}
                    </div>
                    {/* Counter */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white/80 font-mono border border-white/10">
                        {current + 1} / {photos.length}
                    </div>
                </>
            )}
        </div>
    )
}

// ─── Expandable Caption ───────────────────────────────────────────
function Caption({ text }) {
    const [expanded, setExpanded] = useState(false)
    const lines = text.split('\n')
    const preview = lines.slice(0, 3).join('\n')
    const hasMore = lines.length > 3

    return (
        <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            <AnimatePresence initial={false}>
                {expanded ? (
                    <motion.span
                        key="full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {text}
                    </motion.span>
                ) : (
                    <motion.span
                        key="preview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {preview}
                        {hasMore && <span className="text-gray-600">...</span>}
                    </motion.span>
                )}
            </AnimatePresence>
            {hasMore && (
                <button
                    onClick={() => setExpanded(e => !e)}
                    className="ml-1 text-orange-400 hover:text-orange-300 text-xs font-semibold transition-colors duration-200"
                >
                    {expanded ? ' see less' : ' see more'}
                </button>
            )}
        </div>
    )
}

// ─── Single Dispatch Card ─────────────────────────────────────────
function DispatchCard({ dispatch, index }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })
    const [liked, setLiked] = useState(false)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-white/[0.08] bg-[rgba(12,12,12,0.7)] backdrop-blur-xl overflow-hidden group hover:border-white/[0.14] transition-all duration-500"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 20px 60px rgba(0,0,0,0.6)' }}
        >
            {/* Subtle hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-pink-500/0 group-hover:from-orange-500/[0.04] group-hover:to-pink-500/[0.03] transition-all duration-700 pointer-events-none" />

            <div className="relative z-10 p-6 sm:p-8">
                {/* Header — Profile Row */}
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                                <img src="/images/kalpesh-4.jpg" alt="Kalpesh" className="w-full h-full object-cover" />
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-[#0c0c0c] shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                        </div>
                        {/* Name & meta */}
                        <div>
                            <p className="text-white font-semibold text-sm leading-tight">Kalpesh Katariya</p>
                            <p className="text-gray-500 text-[11px] mt-0.5">Full-Stack Developer & Hackathon Competitor</p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-gray-600 text-[10px]">{dispatch.date}</span>
                                <span className="text-gray-700">·</span>
                                <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                                <span className="text-gray-600 text-[10px]">{dispatch.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Event tag */}
                    <span className={`flex-shrink-0 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border ${dispatch.tagColor}`}>
                        {dispatch.tag}
                    </span>
                </div>

                {/* Event Badge */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-pink-500" />
                    <span className="text-orange-400/80 text-xs font-bold tracking-widest uppercase">{dispatch.event}</span>
                </div>

                {/* Caption */}
                <div className="mb-5">
                    <Caption text={dispatch.caption} />
                </div>

                {/* Photo Carousel */}
                <div className="mb-5">
                    <PhotoCarousel photos={dispatch.photos} />
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06] mb-4" />

                {/* Reactions & Actions */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Reaction pills */}
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                            <span className="text-base">🔥</span>
                            <span>{dispatch.reactions.fire + (liked ? 1 : 0)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                            <span className="text-base">🚀</span>
                            <span>{dispatch.reactions.rocket}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                            <span className="text-base">👏</span>
                            <span>{dispatch.reactions.clap}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Like button */}
                        <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => setLiked(l => !l)}
                            className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-300 ${
                                liked
                                    ? 'text-orange-400 border-orange-500/40 bg-orange-500/10'
                                    : 'text-gray-500 border-white/[0.06] hover:border-white/10 hover:text-white'
                            }`}
                        >
                            <motion.span
                                animate={{ scale: liked ? [1, 1.4, 1] : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {liked ? '🔥' : '👍'}
                            </motion.span>
                            {liked ? 'Reacted' : 'React'}
                        </motion.button>

                        {/* Comments */}
                        <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{dispatch.comments} comments</span>
                        </div>

                        {/* View on LinkedIn arrow */}
                        <a
                            href="https://www.linkedin.com/in/kalpesh-katariya01/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-gray-600 text-xs hover:text-[#0A66C2] transition-colors duration-300 group/li"
                        >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            <span className="group-hover/li:underline">View post</span>
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// ─── Field Dispatches Section ─────────────────────────────────────
export default function FieldDispatches() {
    return (
        <section className="relative py-28 px-6 border-t border-white/[0.05] overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-orange-500/[0.03] rounded-full blur-[120px]" />
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    className="text-center mb-16"
                >
                    <p className="text-[10px] font-bold tracking-[0.4em] text-orange-500 uppercase mb-4">
                        From The Frontlines
                    </p>
                    <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter">
                        FIELD{' '}
                        <span className="font-serif italic bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                            DISPATCHES
                        </span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-4 max-w-sm mx-auto leading-relaxed">
                        Real moments. Real pressure. Documented from the arena floor.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="flex flex-col gap-8">
                    {dispatches.map((d, i) => (
                        <DispatchCard key={d.id} dispatch={d} index={i} />
                    ))}
                </div>

                {/* Footer note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://www.linkedin.com/in/kalpesh-katariya01/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-[#0A66C2] transition-colors duration-300 group"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        See all posts on LinkedIn →
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
