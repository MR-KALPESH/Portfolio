import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import Navbar from '../components/Navbar'
import SEO from '../components/SEO';


const profile = {
    name: 'Kalpesh Katariya',
    title: 'Full Stack Developer & AI Engineer',
    email: 'mr.kalpesh03@gmail.com',
    phone: '+91 9512832665',
    location: 'Surat, India',
    github: 'github.com/MR-KALPESH',
}

export default function Resume() {
    

    return (
        <div className="relative bg-black min-h-screen">
            <SEO title="Resume" description="Explore the Resume page of Kalpesh Katariya portfolio." />
            <div className="fixed inset-0 noise-texture pointer-events-none z-0" />
            <Navbar />

            {/* ═══ HERO ═══ */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/[0.03] rounded-full blur-[150px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="flex items-center gap-3 mb-8"
                >
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase">
                        Interactive Resume
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter text-center leading-[0.85]"
                >
                    {profile.name.split(' ')[0]}
                    <br />
                    <span className="font-serif italic text-gray-400">
                        {profile.name.split(' ')[1]}
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="text-orange-400/80 text-sm md:text-base font-medium mt-6 tracking-wider"
                >
                    {profile.title}
                </motion.p>

                {/* Contact row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-gray-500"
                >
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {profile.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {profile.phone}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {profile.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        {profile.github}
                    </span>
                </motion.div>

                {/* Rainbow Download Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="mt-14"
                >
                    <a
                        href="/resume/resume.pdf"
                        download
                        className="rainbow-btn-wrapper group"
                    >
                        <span className="rainbow-btn-inner">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Resume
                        </span>
                    </a>
                </motion.div>
            </section>



            {/* Rainbow button styles */}
            <style>{`
                .rainbow-btn-wrapper {
                    position: relative;
                    display: inline-block;
                    padding: 3px;
                    border-radius: 9999px;
                    background: linear-gradient(
                        var(--rainbow-angle, 0deg),
                        #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #8000ff, #ff00ff, #ff0000
                    );
                    background-size: 200% 200%;
                    animation: rainbow-rotate 3s linear infinite;
                    cursor: pointer;
                    transition: transform 0.2s ease, box-shadow 0.3s ease;
                }

                .rainbow-btn-wrapper:hover {
                    transform: scale(1.05);
                    box-shadow:
                        0 0 30px rgba(255, 100, 0, 0.3),
                        0 0 60px rgba(128, 0, 255, 0.15);
                }

                .rainbow-btn-wrapper:active {
                    transform: scale(0.97);
                }

                .rainbow-btn-inner {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 40px;
                    border-radius: 9999px;
                    background: #0a0a0a;
                    color: #e0e0e0;
                    font-size: 16px;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    transition: background 0.3s ease, color 0.3s ease;
                }

                .rainbow-btn-wrapper:hover .rainbow-btn-inner {
                    background: #111;
                    color: #fff;
                }

                @keyframes rainbow-rotate {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                @property --rainbow-angle {
                    syntax: "<angle>";
                    initial-value: 0deg;
                    inherits: false;
                }

                @supports (background: conic-gradient(red, blue)) {
                    .rainbow-btn-wrapper {
                        background: conic-gradient(
                            from var(--rainbow-angle),
                            #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #8000ff, #ff00ff, #ff0000
                        );
                        animation: rainbow-spin 3s linear infinite;
                    }

                    @keyframes rainbow-spin {
                        to {
                            --rainbow-angle: 360deg;
                        }
                    }
                }
            `}</style>
        </div>
    )
}
