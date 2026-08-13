import { motion, useTransform } from 'framer-motion'
import { useState } from 'react'

export default function ProjectCard({ project, index, scrollProgress }) {
    const [isHovered, setIsHovered] = useState(false)

    // Parallax depth - each card moves at slightly different speed
    const cardProgress = useTransform(
        scrollProgress,
        [index * 0.25, (index + 1) * 0.25],
        [0, 1]
    )

    const opacity = useTransform(cardProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4])
    const scale = useTransform(cardProgress, [0, 0.5, 1], [0.96, 1, 0.96])

    const accentColors = {
        purple: 'from-purple-500/20 to-pink-500/20',
        orange: 'from-orange-500/20 to-red-500/20',
        blue: 'from-blue-500/20 to-cyan-500/20',
        pink: 'from-pink-500/20 to-rose-500/20',
    }

    return (
        <motion.div
            className="relative flex-shrink-0 w-[90vw] lg:w-[75vw] h-[70vh] lg:h-[75vh]"
            style={{ opacity, scale }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="glass-card rounded-[40px] h-full p-8 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 overflow-hidden relative"
                whileHover={{
                    y: -10,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                }}
            >
                {/* Hover Glow */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${accentColors[project.accent]} opacity-0 rounded-[40px]`}
                    animate={{ opacity: isHovered ? 0.15 : 0 }}
                    transition={{ duration: 0.6 }}
                />

                {/* Left Side - Content */}
                <div className="flex-1 flex flex-col justify-center relative z-10">
                    {/* Category */}
                    <motion.p
                        className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                    >
                        {project.category}
                    </motion.p>

                    {/* Title */}
                    <motion.h2
                        className="text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: index * 0.1 + 0.2 }}
                    >
                        {project.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-md mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.4 }}
                    >
                        {project.description}
                    </motion.p>

                    {/* Tech Stack Tags */}
                    <motion.div
                        className="flex flex-wrap gap-2 mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.6 }}
                    >
                        {project.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </motion.div>

                    {/* View Project Link */}
                    <motion.a
                        href="#"
                        className="group inline-flex items-center gap-2 text-sm font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.8 }}
                    >
                        <span className="relative">
                            View Project
                            <motion.span
                                className="absolute bottom-0 left-0 w-full h-px bg-white"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.4 }}
                                style={{ transformOrigin: 'left' }}
                            />
                        </span>
                        <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </motion.a>
                </div>

                {/* Right Side - Image Mockup */}
                <div className="flex-1 relative flex items-center justify-center">
                    <motion.div
                        className="relative w-full h-full max-w-2xl"
                        animate={{
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        whileHover={{
                            rotateY: 5,
                            rotateX: -5,
                            transition: { duration: 0.6 },
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Image Container */}
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Soft Glow Reflection */}
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-t ${accentColors[project.accent]} opacity-20`}
                                animate={{
                                    opacity: isHovered ? 0.4 : 0.2,
                                }}
                                transition={{ duration: 0.6 }}
                            />
                        </div>

                        {/* Bottom Reflection Glow */}
                        <div
                            className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-t ${accentColors[project.accent]} blur-3xl opacity-30`}
                        />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}
