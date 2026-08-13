import { useState, useEffect, useRef, Suspense, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import ErrorBoundary from './ErrorBoundary'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

// Timezone data with rotation angles (longitude-based)
const timezones = [
    { id: 'uk', code: 'GB', label: 'UK', country: 'United Kingdom', tz: 'Europe/London', rotation: 0 },
    { id: 'india', code: 'IN', label: 'India', country: 'India', tz: 'Asia/Kolkata', rotation: -1.4 },
    { id: 'usa', code: 'US', label: 'USA', country: 'United States', tz: 'America/New_York', rotation: 1.3 },
]

// Generate crisp, dense continent points
function generateGlobePoints(count = 2800) {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorBright = new THREE.Color('#ffffff') // Crisp white
    const colorOrange = new THREE.Color('#f97316') // Vivid orange
    const colorDim = new THREE.Color('#94a3b8')    // Slate blue

    for (let i = 0; i < count; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / count)
        const theta = Math.PI * (1 + Math.sqrt(5)) * i

        // Slightly outer radius (1.02) so dots float clearly above sphere
        const r = 1.02
        const x = Math.cos(theta) * Math.sin(phi) * r
        const y = Math.cos(phi) * r
        const z = Math.sin(theta) * Math.sin(phi) * r

        const noise = Math.sin(x * 3) * Math.cos(y * 4) * Math.sin(z * 2.5)
        if (noise > -0.25) {
            positions[i * 3] = x
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = z

            const c = noise > 0.3 ? colorOrange : (noise > 0.1 ? colorBright : colorDim)
            colors[i * 3] = c.r
            colors[i * 3 + 1] = c.g
            colors[i * 3 + 2] = c.b
        }
    }

    return { positions, colors }
}

// 3D Globe Component
function CrispGlobe({ isVisible, targetRotation = 0 }) {
    const groupRef = useRef()
    const { mouse } = useThree()
    const baseRotation = useRef(0)

    const { positions, colors } = useMemo(() => generateGlobePoints(2800), [])

    useFrame((state, delta) => {
        if (!groupRef.current || !isVisible) return

        // Smooth rotation interpolation
        baseRotation.current = THREE.MathUtils.lerp(
            baseRotation.current,
            targetRotation,
            0.04
        )

        // Continuous spin
        groupRef.current.rotation.y = baseRotation.current + state.clock.elapsedTime * 0.04

        // Mouse parallax
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            mouse.y * 0.15,
            0.03
        )
    })

    return (
        <group position={[0, -0.15, 0]}>
            <group ref={groupRef}>
                {/* Core Sphere (Slightly smaller r=0.96 so dots at r=1.02 float clearly on top) */}
                <mesh>
                    <sphereGeometry args={[0.96, 32, 32]} />
                    <meshBasicMaterial
                        color="#0b0f19"
                        transparent
                        opacity={0.88}
                    />
                </mesh>

                {/* Subtle Inner Glow */}
                <mesh scale={0.97}>
                    <sphereGeometry args={[0.96, 32, 32]} />
                    <meshBasicMaterial
                        color="#f97316"
                        transparent
                        opacity={0.12}
                        side={THREE.BackSide}
                    />
                </mesh>

                {/* Bright, Crisp Dotted Continents */}
                <Points positions={positions} colors={colors} stride={3} frustumCulled={false}>
                    <PointMaterial
                        transparent
                        vertexColors
                        size={0.024}
                        sizeAttenuation={true}
                        depthWrite={false}
                        opacity={0.95}
                    />
                </Points>
            </group>

            {/* Subtle Outer Atmosphere Rim */}
            <mesh scale={1.05}>
                <sphereGeometry args={[0.96, 32, 32]} />
                <meshBasicMaterial
                    color="#f97316"
                    transparent
                    opacity={0.12}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    )
}

export default function GlobalCard() {
    const [activeZone, setActiveZone] = useState(timezones[1]) // Default India
    const [isVisible, setIsVisible] = useState(false)
    const cardRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        )
        if (cardRef.current) observer.observe(cardRef.current)
        return () => observer.disconnect()
    }, [])

    // Live clock update
    const [times, setTimes] = useState({})
    useEffect(() => {
        const updateTimes = () => {
            const updated = {}
            timezones.forEach(tz => {
                updated[tz.id] = dayjs().tz(tz.tz).format('HH:mm')
            })
            setTimes(updated)
        }
        updateTimes()
        const interval = setInterval(updateTimes, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            ref={cardRef}
            className="relative rounded-3xl overflow-hidden group select-none h-full"
            style={{
                background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                minHeight: '340px',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
        >
            {/* Background Glow */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none z-10" />

            {/* 3D Earth Canvas (Placed in background z-0) */}
            <div className="absolute -bottom-24 -left-20 w-[380px] h-[380px] z-0 pointer-events-none">
                <ErrorBoundary>
                    <Suspense fallback={null}>
                        <Canvas
                            camera={{ position: [0, 0, 2.3], fov: 48 }}
                            dpr={[1, 1.5]}
                            gl={{ antialias: true, powerPreference: 'high-performance' }}
                            style={{ background: 'transparent' }}
                        >
                            <CrispGlobe isVisible={isVisible} targetRotation={activeZone.rotation} />
                        </Canvas>
                    </Suspense>
                </ErrorBoundary>
            </div>

            {/* Foreground Content */}
            <div className="relative z-20 p-6 sm:p-7 flex flex-col h-full justify-between" style={{ minHeight: '340px' }}>
                {/* Top Header */}
                <div className="max-w-[220px]">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-500 mb-2">
                        AVAILABLE GLOBALLY
                    </p>
                    <h3 className="text-white text-xl sm:text-2xl font-bold leading-snug tracking-tight">
                        Adaptable across <br />
                        <span className="font-serif italic bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                            time zones
                        </span>
                    </h3>
                </div>

                {/* Right Side: Timezone Selector Buttons */}
                <div className="flex flex-col items-end gap-2.5 mt-auto">
                    {timezones.map((zone) => {
                        const isActive = zone.id === activeZone.id
                        return (
                            <motion.button
                                key={zone.id}
                                onClick={() => setActiveZone(zone)}
                                className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md transition-all duration-300 ${
                                    isActive
                                        ? 'border border-orange-500 text-white bg-orange-500/10 shadow-lg shadow-orange-500/10'
                                        : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                <span className={`text-[10px] font-mono ${isActive ? 'text-orange-400' : 'text-gray-500'}`}>
                                    {zone.code}
                                </span>
                                <span>{zone.label}</span>
                                {times[zone.id] && (
                                    <span className={`text-[11px] font-mono ml-1 ${isActive ? 'text-white/80 font-bold' : 'text-gray-600'}`}>
                                        {times[zone.id]}
                                    </span>
                                )}
                            </motion.button>
                        )
                    })}

                    {/* Remote location badge */}
                    <div className="mt-3 text-right">
                        <div className="flex items-center justify-end gap-1.5 mb-0.5">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">REMOTE</span>
                        </div>
                        <p className="text-white font-bold text-lg">{activeZone.country}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
