import { motion } from 'framer-motion'

export default function WorkHero() {
    return (
        <section className="relative min-h-[75vh] flex flex-col items-center justify-center overflow-hidden bg-black">
            {/* Background grain texture */}
            <div className="absolute inset-0 noise-texture opacity-[0.03]" />

            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

            {/* Central light bloom effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_40%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />

            <div className="relative z-10 text-center px-6 w-full max-w-7xl mx-auto">
                {/* Giant MY WORKS headline */}
                <h1 className="text-[14vw] md:text-[18vw] lg:text-[15vw] font-black tracking-tighter leading-[0.85] text-[#EDEDED] mb-16 overflow-hidden flex flex-wrap justify-center gap-[2vw]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    <div className="flex">
                        {"MY".split("").map((char, index) => (
                            <motion.span
                                key={`my-${index}`}
                                className="block"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: index * 0.05
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                    <div className="flex">
                        {"WORKS".split("").map((char, index) => (
                            <motion.span
                                key={`works-${index}`}
                                className="block"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.1 + (index * 0.05)
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                </h1>

                {/* Subtitle block */}
                <div className="space-y-4">
                    {/* Small label */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-gray-500 font-light"
                    >
                        Crafting Digital Experiences
                    </motion.p>

                    {/* Italic serif line */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-2xl md:text-3xl lg:text-4xl text-white italic font-light"
                        style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                    >
                        with passion & code.
                    </motion.p>
                </div>
            </div>
        </section>
    )
}
