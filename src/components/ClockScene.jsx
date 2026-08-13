import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import ErrorBoundary from './ErrorBoundary'

import { useFrame } from '@react-three/fiber'

function Clock() {
    const hourHandRef = useRef()
    const minuteHandRef = useRef()
    const secondHandRef = useRef()

    useFrame(() => {
        const time = new Date()
        
        // Convert to IST (UTC+5:30)
        const istOffset = 5.5 * 60 * 60 * 1000
        const istTime = new Date(time.getTime() + istOffset)

        const hours = istTime.getUTCHours() % 12
        const minutes = istTime.getUTCMinutes()
        const seconds = istTime.getUTCSeconds()
        const milliseconds = istTime.getUTCMilliseconds()

        // Smooth second hand
        const secondAngle = -((seconds + milliseconds / 1000) / 60) * Math.PI * 2
        const minuteAngle = -((minutes + seconds / 60) / 60) * Math.PI * 2
        const hourAngle = -((hours + minutes / 60) / 12) * Math.PI * 2

        if (hourHandRef.current) {
            hourHandRef.current.rotation.z = hourAngle
        }
        if (minuteHandRef.current) {
            minuteHandRef.current.rotation.z = minuteAngle
        }
        if (secondHandRef.current) {
            secondHandRef.current.rotation.z = secondAngle
        }
    })

    return (
        <group>
            {/* Clock face */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[2, 2, 0.1, 64]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Hour markers */}
            {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2
                const x = Math.sin(angle) * 1.6
                const y = Math.cos(angle) * 1.6
                return (
                    <mesh key={i} position={[x, y, 0.06]}>
                        <boxGeometry args={[0.08, 0.25, 0.05]} />
                        <meshStandardMaterial
                            color="#ffffff"
                            emissive="#ffffff"
                            emissiveIntensity={0.5}
                        />
                    </mesh>
                )
            })}

            {/* Hour hand */}
            <group ref={hourHandRef}>
                <mesh position={[0, 0.6, 0.1]}>
                    <boxGeometry args={[0.12, 1.2, 0.08]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
            </group>

            {/* Minute hand */}
            <group ref={minuteHandRef}>
                <mesh position={[0, 0.9, 0.12]}>
                    <boxGeometry args={[0.1, 1.8, 0.08]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
            </group>

            {/* Second hand */}
            <group ref={secondHandRef}>
                <mesh position={[0, 0.9, 0.14]}>
                    <boxGeometry args={[0.05, 1.8, 0.05]} />
                    <meshStandardMaterial
                        color="#00FF87"
                        emissive="#00FF87"
                        emissiveIntensity={0.5}
                    />
                </mesh>
            </group>

            {/* Center pin */}
            <mesh position={[0, 0, 0.15]}>
                <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
                <meshStandardMaterial
                    color="#ffffff"
                    metalness={1}
                    roughness={0.1}
                />
            </mesh>
        </group>
    )
}

export default function ClockScene() {
    return (
        <div className="w-full h-full">
            <ErrorBoundary>
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 50 }}
                    dpr={[1, 1]}
                    gl={{
                        antialias: false,
                        alpha: true,
                        powerPreference: 'high-performance',
                        preserveDrawingBuffer: false,
                    }}
                    onCreated={({ gl }) => {
                        gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault(), false)
                    }}
                >
                    <ambientLight intensity={0.3} />
                    <spotLight position={[10, 10, 10]} angle={0.3} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <Clock />

                    <Environment preset="city" />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.2}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 2}
                    />
                </Canvas>
            </ErrorBoundary>
        </div>
    )
}
