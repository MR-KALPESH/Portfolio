import { motion } from 'framer-motion'

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-12">
            {/* Vignette Overlay */}
            <div className="fixed inset-0 vignette pointer-events-none z-0" />

            {/* Center Hero Content */}
            <div className="relative z-10 text-center max-w-7xl mx-auto w-full px-4">
                {/* Main Headline */}
                <h1 className="leading-[0.88] text-white mb-10 overflow-visible flex flex-col items-center">
                    {/* KALPESH */}
                    <div
                        className="text-[10vw] sm:text-[12vw] lg:text-[10.5vw] flex overflow-hidden leading-[1.2] px-2 py-2"
                        style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
                    >
                        {"KALPESH".split("").map((char, index) => (
                            <motion.span
                                key={`kalpesh-${index}`}
                                className="inline-block text-white"
                                style={{ marginLeft: '-0.02em', marginRight: '-0.02em' }}
                                initial={{ y: "110%" }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 0.9,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: index * 0.06
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>

                    {/* KATARIYA */}
                    <div
                        className="text-[10vw] sm:text-[12vw] lg:text-[10.5vw] flex overflow-hidden leading-[1.2] px-2 py-2"
                        style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
                    >
                        {"KATARIYA".split("").map((char, index) => (
                            <motion.span
                                key={`katariya-${index}`}
                                className="inline-block text-white"
                                style={{ marginLeft: '-0.02em', marginRight: '-0.02em' }}
                                initial={{ y: "110%" }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 0.9,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.12 + (index * 0.06)
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                </h1>

                {/* Supporting Text */}
                <motion.div
                    className="space-y-3 mt-2 px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="text-[9px] sm:text-xs tracking-[0.2em] sm:tracking-[0.35em] uppercase text-gray-500 font-light break-words">
                        I design and build products that
                    </p>
                    <p
                        className="text-2xl sm:text-4xl lg:text-5xl text-white/90 font-normal"
                        style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                    >
                        deliver real impact.
                    </p>
                </motion.div>
            </div>

            {/* Bottom Left: Location */}
            <motion.div
                className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <div className="flex flex-col items-center text-center">
                    <span className="text-[9px] sm:text-xs text-gray-300 tracking-[0.2em] uppercase font-medium">
                        BASED IN SURAT,
                    </span>
                    <span className="text-[9px] sm:text-xs text-gray-500 tracking-[0.15em] uppercase">
                        INDIA
                    </span>
                </div>
            </motion.div>

            {/* Bottom Right: Role */}
            <motion.div
                className="absolute bottom-6 sm:bottom-10 right-6 sm:right-12 flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Stacked layers icon */}
                <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2L2 7l10 5 10-5-10-5z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2 17l10 5 10-5"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2 12l10 5 10-5"
                    />
                </svg>
                <div className="flex flex-col items-center text-center">
                    <span className="text-[9px] sm:text-xs text-gray-300 tracking-[0.2em] uppercase font-medium">
                        FULL STACK DEV,
                    </span>
                    <span className="text-[9px] sm:text-xs text-gray-500 tracking-[0.15em] uppercase">
                        & DESIGNER
                    </span>
                </div>
            </motion.div>
        </section>
    )
}
