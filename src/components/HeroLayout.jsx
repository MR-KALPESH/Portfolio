import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProfileCard from './ProfileCard'
import PhilosophyCard from './PhilosophyCard'
import ContactCard from './ContactCard'
import ShowcaseCard from './ShowcaseCard'
import AnalogClock from './AnalogClock'
import GlobalCard from './GlobalCard'

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
        },
    },
}

// Reusable Card Wrapper with hover effects
function Card({ children, className = '' }) {
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                scale: 1.02,
                boxShadow: '0 0 40px rgba(249,115,22,0.1)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`glass-card rounded-[32px] relative z-10 ${className}`}
        >
            {children}
        </motion.div>
    )
}

export default function HeroLayout() {
    // Defer clock render so it doesn't compete with hero animation
    const [showClock, setShowClock] = useState(false)
    useEffect(() => {
        const t = setTimeout(() => setShowClock(true), 400)
        return () => clearTimeout(t)
    }, [])

    return (
        <section className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-10">
            <motion.div
                className="max-w-[1400px] mx-auto relative"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Clock - deferred 400ms to not compete with hero */}
                {showClock && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:block"
                    >
                        <AnalogClock />
                    </motion.div>
                )}

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">

                    {/* ===== TOP ROW ===== */}

                    {/* Profile Card - 3 cols */}
                    <motion.div
                        className="lg:col-span-3"
                        variants={cardVariants}
                    >
                        <Card><ProfileCard /></Card>
                    </motion.div>

                    {/* Philosophy Card - 6 cols */}
                    <motion.div
                        className="lg:col-span-6 md:col-span-2"
                        variants={cardVariants}
                    >
                        <Card><PhilosophyCard /></Card>
                    </motion.div>

                    {/* Contact Card - 3 cols */}
                    <motion.div
                        className="lg:col-span-3"
                        variants={cardVariants}
                    >
                        <Card><ContactCard /></Card>
                    </motion.div>

                    {/* ===== BOTTOM ROW ===== */}

                    {/* Global Card - 6 cols - No hover zoom */}
                    <motion.div
                        className="lg:col-span-6 glass-card rounded-[32px] relative z-10"
                        variants={cardVariants}
                        viewport={{ once: true }}
                    >
                        <GlobalCard />
                    </motion.div>

                    {/* Showcase Card - 6 cols */}
                    <motion.div
                        className="lg:col-span-6"
                        variants={cardVariants}
                        viewport={{ once: true }}
                    >
                        <Card><ShowcaseCard /></Card>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
