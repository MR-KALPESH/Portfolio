import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

dayjs.extend(utc)
dayjs.extend(timezone)

// Your photos
const photos = [
    '/images/kalpesh-1.jpg',
    '/images/kalpesh-2.png',
    '/images/kalpesh-4.jpg',
]

export default function ProfileCard() {
    const [currentTime, setCurrentTime] = useState(() => dayjs().tz('Asia/Kolkata'))
    const [activeIndex, setActiveIndex] = useState(0)

    // Update time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(dayjs().tz('Asia/Kolkata'))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    // Auto-rotate every 3 seconds (smoother pace)
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % photos.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    // Get visible photos (prev, current, next)
    const getVisiblePhotos = () => {
        const prev = (activeIndex - 1 + photos.length) % photos.length
        const next = (activeIndex + 1) % photos.length
        return [
            { index: prev, position: 'left' },
            { index: activeIndex, position: 'center' },
            { index: next, position: 'right' },
        ]
    }

    return (
        <div className="p-8 min-h-[420px] flex flex-col">
            {/* Header - Top Left */}
            <div>
                <h1 className="text-5xl font-bold tracking-tight">Kalpesh</h1>
                <h2 className="text-5xl font-serif italic text-gray-500">Katariya</h2>
                <div className="flex items-center gap-2 mt-4 text-[11px] font-medium uppercase tracking-widest text-gray-500">
                    <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    SURAT, IN • {currentTime.format('h:mm A')}
                </div>
            </div>

            {/* Photo Carousel - Stacked Cards */}
            <div className="flex-1 flex items-center justify-center my-4 relative">
                <div className="relative w-full h-56 flex items-center justify-center">
                    {getVisiblePhotos().map(({ index, position }) => {
                        const isCenter = position === 'center'
                        const isLeft = position === 'left'
                        const isRight = position === 'right'

                        return (
                            <motion.div
                                key={index}
                                initial={false}
                                animate={{
                                    x: isLeft ? -70 : isRight ? 70 : 0,
                                    rotate: isLeft ? -12 : isRight ? 12 : 0,
                                    scale: isCenter ? 1 : 0.75,
                                    zIndex: isCenter ? 10 : 5,
                                    opacity: isCenter ? 1 : 0.6,
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }}
                                onClick={() => setActiveIndex(index)}
                                className="absolute cursor-pointer"
                            >
                                <div
                                    className={`overflow-hidden rounded-2xl shadow-2xl border transition-all duration-300 ${isCenter
                                        ? 'w-28 h-40 border-white/20'
                                        : 'w-20 h-32 border-white/10'
                                        }`}
                                    style={{
                                        boxShadow: isCenter
                                            ? '0 25px 50px rgba(0,0,0,0.5)'
                                            : '0 15px 30px rgba(0,0,0,0.4)',
                                    }}
                                >
                                    <img
                                        src={photos[index]}
                                        alt={`Photo ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center items-center gap-8 text-gray-500 mt-auto">
                <a
                    href="https://www.instagram.com/i_am__kalpesh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200"
                    title="Instagram"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="18" cy="6" r="1.5" fill="currentColor" />
                    </svg>
                </a>
                <a
                    href="https://github.com/MR-KALPESH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200"
                    title="GitHub"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                </a>

            </div>
        </div>
    )
}
