import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const tagData = [
    {
        id: 'motion',
        label: 'Motion',
        title: 'Micro-interactions',
        description: 'Subtle movement that confirms intent — never distracting.',
        color: 'purple',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/50',
        textClass: 'text-purple-400',
        glowClass: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
    },
    {
        id: 'type',
        label: 'Type',
        title: 'Typography',
        description: 'Clean hierarchy and rhythm for effortless scanning.',
        color: 'emerald',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/50',
        textClass: 'text-emerald-400',
        glowClass: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
    },
    {
        id: 'feedback',
        label: 'Feedback',
        title: 'Responsiveness',
        description: 'Every hover, click, and focus gets a crisp response.',
        color: 'blue',
        bgClass: 'bg-blue-500/10',
        borderClass: 'border-blue-500/50',
        textClass: 'text-blue-400',
        glowClass: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
    },
    {
        id: 'craft',
        label: 'Craft',
        title: 'Attention to detail',
        description: 'Polish lives in the edges: spacing, timing, and states.',
        color: 'orange',
        bgClass: 'bg-orange-500/10',
        borderClass: 'border-orange-500/50',
        textClass: 'text-orange-400',
        glowClass: 'shadow-[0_0_20px_rgba(249,115,22,0.3)]',
    },
]

export default function PhilosophyCard() {
    const [activeTag, setActiveTag] = useState(tagData[0]) // Default to Motion

    const handleTagClick = (tag) => {
        setActiveTag(activeTag?.id === tag.id ? null : tag)
    }

    return (
        <div className="p-8 min-h-[420px] flex flex-col">
            {/* Top Bar */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Detail-driven UI
                </div>
                <div className="text-[10px] tracking-[0.3em] text-gray-600 uppercase flex items-center gap-2">
                    Philosophy
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
            </div>

            {/* Main Headline */}
            <div className="mt-8">
                <h2 className="text-6xl font-bold leading-none tracking-tight">
                    Interfaces
                </h2>
                <h2 className="text-6xl font-serif italic font-normal text-gray-400 leading-none mt-1">
                    you can feel.
                </h2>
            </div>

            {/* Tags - at top right area like reference */}
            <div className="flex flex-wrap gap-2 mt-6 justify-end">
                {tagData.map((tag) => {
                    const isActive = activeTag?.id === tag.id
                    return (
                        <motion.button
                            key={tag.id}
                            onClick={() => handleTagClick(tag)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border-2 cursor-pointer ${isActive
                                ? `${tag.borderClass} ${tag.textClass} ${tag.bgClass} ${tag.glowClass}`
                                : 'border-white/10 text-gray-400 bg-white/5 hover:bg-white/10 hover:border-white/20'
                                }`}
                        >
                            {tag.label}
                        </motion.button>
                    )
                })}
            </div>

            {/* Active Tag Info Box - below tags */}
            <AnimatePresence mode="wait">
                {activeTag && (
                    <motion.div
                        key={activeTag.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="mt-3 text-right"
                    >
                        <h4 className={`text-sm font-bold ${activeTag.textClass}`}>
                            {activeTag.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-[280px] ml-auto">
                            {activeTag.description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer — bottom area is kept clear for the clock overlap */}
            <div className="flex-1" />
        </div>
    )
}
