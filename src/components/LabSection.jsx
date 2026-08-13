import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Experiment data
const experiments = [
    {
        id: 1,
        title: 'Context-Aware Code Generation',
        hypothesis: 'LLMs with repository context produce 40% more accurate suggestions.',
        status: 'Testing',
        statusColor: '#60a5fa',
        lastUpdated: 'Feb 4, 2026',
    },
    {
        id: 2,
        title: 'Streaming Response Latency',
        hypothesis: 'Chunk buffering can reduce perceived wait time by 60%.',
        status: 'Exploring',
        statusColor: '#a78bfa',
        lastUpdated: 'Feb 2, 2026',
    },
    {
        id: 3,
        title: 'Vector Embedding Compression',
        hypothesis: 'Quantized embeddings maintain 95% semantic accuracy at 8x reduction.',
        status: 'Breakthrough',
        statusColor: '#34d399',
        lastUpdated: 'Jan 28, 2026',
    },
    {
        id: 4,
        title: 'Multi-Modal Input Processing',
        hypothesis: 'Combined image+text context improves task completion rates.',
        status: 'Exploring',
        statusColor: '#a78bfa',
        lastUpdated: 'Jan 25, 2026',
    },
]

// Failure notes data
const failureNotes = [
    'Attempted edge caching for vector embeddings — cold starts removed any latency gains.',
    'Heavy micro-animations reduced perceived speed despite improved benchmark metrics.',
    'Users ignored AI output without visible confidence scoring.',
    'Real-time collaboration sync caused memory leaks at scale beyond 50 concurrent users.',
    'WebSocket reconnection logic failed silently on mobile network switches.',
]

// Micro-tools data
const microTools = [
    { name: 'Prompt Tokenizer', description: 'Visualize token breakdown for GPT models', link: '#' },
    { name: 'Streaming Latency Tester', description: 'Measure chunk-by-chunk response times', link: '#' },
    { name: 'JSON Diff Viewer', description: 'Compare nested structures visually', link: '#' },
    { name: 'Regex Playground', description: 'Test patterns with real-time highlighting', link: '#' },
]

// Status badge component
function StatusBadge({ status, color }) {
    return (
        <div className="flex items-center gap-2">
            <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
                animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <span className="text-xs font-medium tracking-wide" style={{ color }}>
                {status}
            </span>
        </div>
    )
}

// Experiment card component
function ExperimentCard({ experiment, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            whileHover={{ scale: 1.015, y: -4 }}
            className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm group"
            style={{
                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.03)',
            }}
        >
            {/* Inner glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                {/* Header with status */}
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white leading-tight pr-4">
                        {experiment.title}
                    </h3>
                    <StatusBadge status={experiment.status} color={experiment.statusColor} />
                </div>

                {/* Hypothesis */}
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    {experiment.hypothesis}
                </p>

                {/* Footer */}
                <div className="text-[10px] uppercase tracking-widest text-gray-600">
                    Last updated: {experiment.lastUpdated}
                </div>
            </div>
        </motion.div>
    )
}

// Failure note item
function FailureNote({ note, index }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="flex items-start gap-4 py-3"
        >
            {/* Glowing dash */}
            <span className="text-gray-600 select-none mt-0.5">—</span>
            {/* Note text */}
            <p className="text-sm text-gray-500 leading-relaxed font-mono">
                {note}
            </p>
        </motion.div>
    )
}

// Micro-tool card
function MicroToolCard({ tool, index }) {
    return (
        <motion.a
            href={tool.link}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            whileHover={{ scale: 1.02 }}
            className="block p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all group"
        >
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                    {tool.name}
                </h4>
                <span className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">
                    Open →
                </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
                {tool.description}
            </p>
        </motion.a>
    )
}

export default function LabSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

    return (
        <section ref={sectionRef} className="relative py-32 px-6 sm:px-12 lg:px-20 overflow-hidden">
            {/* Blueprint grid texture */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Subtle scanning light effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.02) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                }}
                animate={{
                    backgroundPosition: ['200% 0%', '-200% 0%'],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />

            {/* Soft vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-transparent to-black/40 pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-[10px] uppercase tracking-[0.35em] text-gray-600 mb-6"
                    >
                        The Lab
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-2"
                    >
                        Where ideas are tested
                    </motion.h2>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.22 }}
                        className="text-4xl lg:text-5xl font-light italic"
                        style={{
                            fontFamily: 'Playfair Display, Georgia, serif',
                            background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        before they exist.
                    </motion.h2>
                </div>

                {/* Zone 1: Active Experiments */}
                <div className="mb-24">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-8"
                    >
                        Active Experiments
                    </motion.h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {experiments.map((exp, index) => (
                            <ExperimentCard key={exp.id} experiment={exp} index={index} />
                        ))}
                    </div>
                </div>

                {/* Zone 2: Failure Notes */}
                <div className="mb-24">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-6"
                    >
                        Failure Notes
                    </motion.h3>

                    <div className="pl-2 border-l border-white/[0.06]">
                        {failureNotes.map((note, index) => (
                            <FailureNote key={index} note={note} index={index} />
                        ))}
                    </div>
                </div>

                {/* Zone 3: Micro-Tools From the Lab */}
                <div>
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-8"
                    >
                        Micro-Tools From the Lab
                    </motion.h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {microTools.map((tool, index) => (
                            <MicroToolCard key={tool.name} tool={tool} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
