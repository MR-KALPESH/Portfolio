import { useRef, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'

export default function GitHubActivitySection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
    const [selectedYear, setSelectedYear] = useState('last')

    // Green tones matching the original design intent
    const customTheme = {
        dark: ['rgba(255, 255, 255, 0.05)', 'rgba(20, 83, 45, 0.7)', 'rgba(21, 128, 61, 0.8)', 'rgba(34, 197, 94, 0.9)', '#4ade80']
    }

    const currentYear = new Date().getFullYear()
    const availableYears = useMemo(() => ['last', currentYear, currentYear - 1], [currentYear])

    return (
        <section ref={sectionRef} className="relative py-32 px-6 sm:px-12 lg:px-20 bg-black overflow-hidden">
            {/* Noise grain texture */}
            <div className="absolute inset-0 noise-texture opacity-[0.03]" />

            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="text-[11px] uppercase tracking-[0.3em] text-purple-400 font-medium mb-6"
                    >
                        My Code Journey
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight"
                    >
                        <span className="text-white">GitHub Activity</span>
                        <br />
                        <span
                            className="italic font-light bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                        >
                            && Open Source
                        </span>
                    </motion.h2>
                </div>

                {/* GitHub Contribution Graph Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 lg:p-10 overflow-hidden w-full shadow-2xl relative"
                    style={{
                        boxShadow: '0 4px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    }}
                >
                    {/* Top Controls: GitHub Logo & Year Selector */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-6 border-b border-white/[0.05] gap-4">
                        {/* GitHub Logo Header */}
                        <div className="flex items-center gap-3">
                            <svg className="w-8 h-8 text-white hover:text-green-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span className="text-white font-semibold text-lg tracking-wide">@MR-KALPESH</span>
                        </div>

                        {/* Year Selector */}
                        <div className="flex bg-white/[0.03] p-1 rounded-lg border border-white/[0.08]" style={{ scrollbarWidth: 'none' }}>
                            {availableYears.map((y) => (
                                <button
                                    key={y}
                                    onClick={() => setSelectedYear(y)}
                                    className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all duration-300 ${selectedYear === y
                                        ? 'bg-white/10 text-white shadow-sm'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {y === 'last' ? 'Last Year' : y}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto w-full flex justify-center pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                        <div className="min-w-fit pr-4">
                            <GitHubCalendar
                                username="MR-KALPESH"
                                year={selectedYear === 'last' ? undefined : selectedYear}
                                colorScheme="dark"
                                theme={customTheme}
                                blockSize={14}
                                blockMargin={5}
                                fontSize={14}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
