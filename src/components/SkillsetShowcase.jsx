import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'
import ErrorBoundary from './ErrorBoundary'

const skills = [
    // Languages
    { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
    { name: 'Python', logo: 'https://cdn.simpleicons.org/python/3776AB' },
    { name: 'C++', logo: 'https://cdn.simpleicons.org/cplusplus/00599C' },
    { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6' },
    // Frontend
    { name: 'HTML5', logo: 'https://cdn.simpleicons.org/html5/E34F26' },
    { name: 'CSS3', logo: 'https://cdn.simpleicons.org/css/1572B6' },
    { name: 'ReactJS', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
    { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    { name: 'Motion', logo: 'https://cdn.simpleicons.org/framer/ffffff' },
    // Backend & APIs
    { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/339933' },
    { name: 'Express.js', logo: 'https://cdn.simpleicons.org/express/ffffff' },
    { name: 'REST APIs', logo: 'https://cdn.simpleicons.org/fastapi/009688' },
    { name: 'JWT / OAuth', logo: 'https://cdn.simpleicons.org/jsonwebtokens/ffffff' },
    // Databases
    { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/47A248' },
    { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql/4479A1' },
    { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1' },
    { name: 'Firebase', logo: 'https://cdn.simpleicons.org/firebase/FFCA28' },
    { name: 'Prisma', logo: 'https://cdn.simpleicons.org/prisma/ffffff' },
    // Tools & DevOps
    { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032' },
    { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/ffffff' },
    { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/2496ED' },
    { name: 'Postman', logo: 'https://cdn.simpleicons.org/postman/FF6C37' },
    { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
    { name: 'Figma', logo: 'https://cdn.simpleicons.org/figma/F24E1E' },
    { name: 'Linux', logo: 'https://cdn.simpleicons.org/linux/FCC624' },
    // Cloud & Deploy
    { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/ffffff' },
    { name: 'Netlify', logo: 'https://cdn.simpleicons.org/netlify/00C7B7' },
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
    // Other
    { name: 'Zustand', logo: 'https://cdn.simpleicons.org/react/8B5CF6' },
    { name: 'Expo', logo: 'https://cdn.simpleicons.org/expo/ffffff' },
    { name: 'Clerk', logo: 'https://cdn.simpleicons.org/clerk/6C47FF' },
]

function GlossySculpture({ scrollProgress }) {
    const groupRef = useRef()
    const breathingRef = useRef(0)

    useFrame((state, delta) => {
        if (!groupRef.current) return

        // Scroll-driven rotation - more responsive
        const scrollValue = scrollProgress ? scrollProgress.get() : 0
        const targetRotationY = scrollValue * Math.PI * 3  // Full 1.5 rotations during scroll
        const targetRotationX = Math.sin(scrollValue * Math.PI) * 0.4  // More tilt

        // Faster lerp for more responsive feel
        groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05
        groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05

        // Ultra-slow breathing (6-8s cycle)
        breathingRef.current += delta * 0.12
        const breathScale = 1 + Math.sin(breathingRef.current) * 0.012
        groupRef.current.scale.setScalar(breathScale * 0.5)
    })

    return (
        <group ref={groupRef} scale={0.5}>
            {/* Primary Torus Knot - Large outer */}
            <mesh>
                <torusKnotGeometry args={[1.2, 0.35, 64, 24, 2, 3]} />
                <meshPhysicalMaterial
                    color="#080810"
                    metalness={0.98}
                    roughness={0.02}
                    clearcoat={1}
                    clearcoatRoughness={0.03}
                    reflectivity={1}
                    envMapIntensity={3.5}
                />
            </mesh>

            {/* Secondary Knot - Medium, rotated */}
            <mesh rotation={[Math.PI / 3, Math.PI / 5, Math.PI / 6]} scale={0.75}>
                <torusKnotGeometry args={[1.1, 0.28, 48, 20, 3, 5]} />
                <meshPhysicalMaterial
                    color="#0a0a18"
                    metalness={0.96}
                    roughness={0.04}
                    clearcoat={1}
                    clearcoatRoughness={0.05}
                    reflectivity={1}
                    envMapIntensity={3}
                />
            </mesh>

            {/* Inner Knot - Smaller, different weave */}
            <mesh rotation={[Math.PI / 6, Math.PI / 4, 0]} scale={0.55}>
                <torusKnotGeometry args={[1.0, 0.22, 32, 16, 5, 7]} />
                <meshPhysicalMaterial
                    color="#0c0c1a"
                    metalness={0.94}
                    roughness={0.06}
                    clearcoat={1}
                    clearcoatRoughness={0.08}
                    reflectivity={1}
                    envMapIntensity={2.5}
                />
            </mesh>
        </group>
    )
}

export default function SkillsetShowcase() {
    const sectionRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.3], [50, 0])

    // Only mount the Canvas when section is near viewport to free WebGL contexts
    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { rootMargin: '1000px 0px 1000px 0px' } // Load way before it comes into view to prevent delay
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <motion.section
            ref={sectionRef} className="relative bg-black -mt-32 pb-8 overflow-hidden z-10"
            style={{ opacity }}
        >
            {/* Noise & Vignette */}
            <div className="absolute inset-0 noise-texture opacity-5" />
            <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(circle, transparent 0%, transparent 50%, black 100%)' }} />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
                {/* 3D Sculpture — only mounted when visible */}
                <div className="h-[450px] lg:h-[550px] mb-0">
                    {isVisible ? (
                        <ErrorBoundary>
                            <Suspense fallback={
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full border border-white/10 animate-pulse" />
                                </div>
                            }>
                                <Canvas
                                    camera={{ position: [0, 0, 5], fov: 50 }}
                                    dpr={[1, 1]}
                                    gl={{
                                        antialias: false,
                                        alpha: true,
                                        powerPreference: 'high-performance',
                                        preserveDrawingBuffer: false,
                                        failIfMajorPerformanceCaveat: false,
                                        toneMapping: THREE.ACESFilmicToneMapping,
                                        toneMappingExposure: 1.2,
                                    }}
                                    onCreated={({ gl }) => {
                                        gl.domElement.addEventListener('webglcontextlost', (e) => {
                                            e.preventDefault()
                                        }, false)
                                        gl.domElement.addEventListener('webglcontextrestored', () => {
                                            gl.setSize(gl.domElement.width, gl.domElement.height)
                                        }, false)
                                    }}
                                >
                                    {/* Ambient base light */}
                                    <ambientLight intensity={0.2} />

                                    {/* Key light (strong specular) */}
                                    <directionalLight position={[5, 5, 5]} intensity={2} />

                                    {/* Rim lights for edge definition */}
                                    <ambientLight intensity={0.4} />
                                    <directionalLight position={[10, 10, 5]} intensity={1.2} />
                                    <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
                                    <spotLight
                                        position={[0, 15, 10]}
                                        intensity={2}
                                        color="#f97316"
                                        angle={0.4}
                                        penumbra={1}
                                        castShadow
                                    />

                                    <GlossySculpture scrollProgress={scrollYProgress} />

                                    {/* HDR environment for realistic reflections */}
                                    <Environment preset="city" background={false} />
                                </Canvas>
                            </Suspense>
                        </ErrorBoundary>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full border border-white/10 animate-pulse" />
                        </div>
                    )}
                </div>

                {/* Typography Block */}
                <motion.div
                    className="text-center mb-12 sm:mb-16 -mt-12 sm:-mt-24"
                    style={{ y }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {/* Small Label */}
                    <p className="text-[10px] font-bold tracking-[0.4em] text-gray-500 uppercase mb-4">
                        My Skillset
                    </p>

                    {/* Main Headline */}
                    <h2 className="text-5xl lg:text-7xl font-bold tracking-tight">
                        The Magic{' '}
                        <span className="font-serif italic bg-gradient-to-r from-pink-400 via-orange-400 to-orange-500 bg-clip-text text-transparent">
                            Behind
                        </span>
                    </h2>
                </motion.div>

                {/* Tech Pills Grid */}
                <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            className="group relative px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm
                         hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
                         transition-all duration-500 cursor-pointer"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.03,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="flex items-center gap-2.5">
                                <img
                                    src={skill.logo}
                                    alt={skill.name}
                                    className="w-5 h-5 object-contain flex-shrink-0"
                                    onError={(e) => { e.target.style.display = 'none' }}
                                />
                                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors whitespace-nowrap">
                                    {skill.name}
                                </span>
                            </div>

                            {/* Inner glow on hover */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/0 via-orange-500/0 to-orange-500/0 
                            group-hover:from-pink-500/10 group-hover:via-orange-500/10 group-hover:to-orange-500/10 
                            transition-all duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}
