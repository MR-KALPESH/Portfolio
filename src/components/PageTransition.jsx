import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function PageTransition({ children }) {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1] // Custom "luxury" bezier
                }
            }}
            exit={{
                opacity: 0,
                y: -20,
                scale: 0.98,
                transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                }
            }}
            className="w-full min-h-screen"
        >
            {/* Optional: Curtain effect overlay could go here, but let's stick to pure motion first for performance */}
            {children}
        </motion.div>
    )
}
