import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './RibbonStrip.css'

const words = [
    'READY', 'IMMERSIVE', 'PROTECTED', 'DEPENDABLE',
    'CAPTIVATING', 'USER-FRIENDLY', 'ADAPTIVE', 'FLUID', 'FUTURE-PROOF'
]

function ScrollingText() {
    // Create continuous text string with all words and stars
    const textContent = words.join(' ✦ ') + ' ✦ '

    return (
        <div className="marquee-container">
            <div className="marquee-content">
                {/* Render twice for seamless loop */}
                <span className="marquee-text">{textContent}</span>
                <span className="marquee-text">{textContent}</span>
            </div>
        </div>
    )
}

export default function RibbonStrip() {
    const sectionRef = useRef(null)
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 200, 400], [0, 1, 1])

    return (
        <motion.section
            ref={sectionRef}
            className="relative py-12 bg-black overflow-visible"
            style={{ opacity }}
        >
            {/* Noise grain texture */}
            <div className="absolute inset-0 noise-texture opacity-10" />

            {/* Container for ribbon strips */}
            <div className="relative w-full h-32 flex items-center justify-center">

                {/* Top ribbon strip - rotated +8deg */}
                <div
                    className="absolute left-0 w-[130%] h-14 lg:h-16 -ml-[15%]"
                    style={{
                        transform: 'rotate(6deg) translateY(-25px)',
                    }}
                >
                    {/* Red gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-600 to-red-900 shadow-[0_8px_30px_rgba(220,38,38,0.35)]">
                        {/* Specular highlight */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-transparent" />
                    </div>

                    {/* Scrolling text INSIDE this ribbon */}
                    <ScrollingText />
                </div>

                {/* Bottom ribbon strip - rotated -8deg (crossing) */}
                <div
                    className="absolute left-0 w-[130%] h-14 lg:h-16 -ml-[15%]"
                    style={{
                        transform: 'rotate(-6deg) translateY(25px)',
                    }}
                >
                    {/* Red gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-600 to-red-900 shadow-[0_8px_30px_rgba(220,38,38,0.35)]">
                        {/* Specular highlight */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-transparent" />

                        {/* Subtle depth overlay */}
                        <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Same scrolling text INSIDE this ribbon */}
                    <ScrollingText />
                </div>

            </div>
        </motion.section>
    )
}
