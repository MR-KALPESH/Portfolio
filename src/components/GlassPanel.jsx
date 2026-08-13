import { motion } from 'framer-motion'

export default function GlassPanel({ children, className = '', delay = 0 }) {
    return (
        <motion.div
            className={`relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 group ${className}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.2,
                delay,
                ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                }
            }}
            style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.02)',
            }}
        >
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {children}

            {/* Bottom subtle glow */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
        </motion.div>
    )
}
