import { useRef, useEffect, useState, memo } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const projects = [
    {
        id: 1,
        name: 'Flomiz SaaS Platform',
        title: 'Flomiz SaaS Platform',
        description: 'A premium multi-module SaaS Business Management Platform covering CRM, Accounting, HRMS, and Asset Management. Features custom sales/purchase workflows, parent-child asset structures, and real-time interactive business components.',
        features: [
            'SaaS CRM, Accounting, and HRMS Modules',
            'Dynamic parent-child asset tracking workflows',
            'Sales order, invoice, and payment processing pipelines'
        ],
        tech: ['React', 'Next.js', 'Tailwind CSS', 'SaaS', 'REST APIs'],
        links: { live: '#', code: '#' },
        gradient: 'from-purple-600 to-indigo-500',
        gradientColor: 'rgba(124, 58, 237, 0.8)',
        avatar: 'https://i.pravatar.cc/150?img=11',
        phones: [
            '/projects/flomiz-saas.png',
            '/projects/flomiz-saas.png'
        ],
        desktop: '/projects/flomiz-saas.png',
    },
    {
        id: 2,
        name: 'Syspro ERP Web and App',
        title: 'Syspro ERP Web and App',
        description: 'A robust, multi-user ERP Web & Mobile system engineered for Textile, Retail, and Wholesale businesses. Incorporates a secure 5-tier role-based access control, ledger reporting, and live order configuration workflows.',
        features: [
            'Secure 5-tier Role-Based Access Control (RBAC)',
            'Dynamic web and mobile portals for items and config',
            'Global state management for complex accounting ledgers'
        ],
        tech: ['React', 'React Native', 'Redux', 'ERP Systems', 'Mobile Development'],
        links: { live: '#', code: '#' },
        gradient: 'from-emerald-600 to-teal-400',
        gradientColor: 'rgba(5, 150, 105, 0.8)',
        avatar: 'https://i.pravatar.cc/150?img=12',
        phones: [
            '/projects/syspro-erp.png',
            '/projects/syspro-erp.png'
        ],
        desktop: '/projects/syspro-erp.png',
    },
    {
        id: 3,
        name: 'Snepitech E-commerce App',
        title: 'Snepishop E-commerce',
        description: 'A responsive, high-performance e-commerce shopping platform (Snepishop) featuring optimized loading speeds, fluid transition micro-animations, and a mobile-first user shopping experience.',
        features: [
            'High-performance dynamic e-commerce frontend',
            'Optimized page loading and image response rates',
            'Mobile-first layout and responsive grid components'
        ],
        tech: ['React.js', 'E-commerce', 'Web Performance', 'CSS3', 'Git'],
        links: { live: '#', code: '#' },
        gradient: 'from-orange-500 to-rose-500',
        gradientColor: 'rgba(249, 115, 22, 0.8)',
        avatar: 'https://i.pravatar.cc/150?img=13',
        phones: [
            '/projects/snepishop-ecommerce.png',
            '/projects/snepishop-ecommerce.png'
        ],
        desktop: '/projects/snepishop-ecommerce.png',
    },
]

export default function ProjectShowcase() {
    const sectionRef = useRef(null)
    const containerRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const section = sectionRef.current
        const container = containerRef.current
        if (!section || !container) return

        let ctx

        // Increased to 400ms so the page is fully settled before GSAP pins
        const timeout = setTimeout(() => {
            ctx = gsap.context(() => {
                const panels = gsap.utils.toArray('.project-panel')

                gsap.to(container, {
                    y: () => -(container.scrollHeight - window.innerHeight),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        pin: true,
                        anticipatePin: 1,   // prevents layout-shift scroll jump
                        scrub: 1,
                        start: 'top top',
                        snap: {
                            snapTo: 1 / (panels.length - 1),
                            duration: { min: 0.2, max: 0.5 },
                            ease: 'power1.inOut'
                        },
                        end: () => '+=' + (container.scrollHeight - window.innerHeight),
                        onUpdate: (self) => {
                            const idx = Math.round(self.progress * (panels.length - 1))
                            setActiveIndex(idx)
                        }
                    }
                })
                // Do NOT call ScrollTrigger.refresh() here — it causes a page scroll jump
            }, section)
        }, 400)

        return () => {
            clearTimeout(timeout)
            if (ctx) ctx.revert()
        }
    }, [])


    // Click timeline to jump to a project
    const scrollToProject = (index) => {
        const triggers = ScrollTrigger.getAll()
        const st = triggers.find(t => t.trigger === sectionRef.current)
        if (st) {
            const progress = index / (projects.length - 1)
            const scrollY = st.start + (st.end - st.start) * progress
            gsap.to(window, {
                scrollTo: { y: scrollY, autoKill: false },
                duration: 0.8,
                ease: 'power2.inOut'
            })
        }
    }

    return (
        <section
            ref={sectionRef}
            className="relative bg-black overflow-hidden"
            style={{ height: '100vh' }}
        >
            {/* Timeline Rail — Premium vertical nav */}
            <div className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center gap-4">
                {/* Vertical rail */}
                <div className="relative flex flex-col items-center" style={{ height: '280px' }}>
                    {/* Background rail line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.08]" />

                    {/* Animated fill line */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-white/60 to-white/20 transition-all duration-700 ease-out"
                        style={{ height: `${(activeIndex / (projects.length - 1)) * 100}%` }}
                    />

                    {/* Dots */}
                    <div className="relative h-full flex flex-col justify-between py-0">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="relative cursor-pointer group flex items-center"
                                onClick={() => scrollToProject(index)}
                            >
                                {/* Dot */}
                                <div className="relative flex items-center justify-center w-5 h-5">
                                    {/* Active ring */}
                                    {activeIndex === index && (
                                        <div className="absolute inset-0 rounded-full border border-white/40 scale-[2] animate-ping opacity-30" />
                                    )}
                                    <div
                                        className={`rounded-full transition-all duration-500 ${activeIndex === index
                                            ? 'w-2 h-2 bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.35)]'
                                            : 'w-1.5 h-1.5 bg-white/25 group-hover:bg-white/50 group-hover:scale-125'
                                            }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project name label — shown beside active dot */}
                <div className="flex flex-col justify-between py-0" style={{ height: '280px' }}>
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="flex items-center h-5 cursor-pointer"
                            onClick={() => scrollToProject(index)}
                        >
                            <span
                                className={`text-[9px] font-semibold tracking-[0.2em] uppercase transition-all duration-400 ${activeIndex === index
                                    ? 'text-white/80 opacity-100 translate-x-0'
                                    : 'text-white/20 opacity-60 -translate-x-1'
                                    }`}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vertically stacked panels container — GSAP animates y */}
            <div ref={containerRef} className="will-change-transform">
                {projects.map((project, index) => (
                    <ProjectPanel key={project.id} project={project} index={index} />
                ))}

                {/* See More Projects — at the bottom of last panel */}
                <div className="h-20 flex items-center justify-center">
                    <a
                        href="https://github.com/MR-KALPESH"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <span className="text-sm tracking-wider">See more projects on GitHub</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}

const ProjectPanel = memo(function ProjectPanel({ project, index: _index }) {
    return (
        <div className="project-panel min-h-screen py-12 lg:py-0 w-full flex items-center px-4 sm:px-8 lg:pl-32 lg:pr-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-7xl mx-auto">
                {/* Left — Text */}
                <div className="flex flex-col justify-center">
                    {/* Colored Dash + Title */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-10 h-1 rounded-full bg-gradient-to-r ${project.gradient}`} />
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">{project.title}</h2>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
                        🚀 {project.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                        {project.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                                <span className="text-yellow-400 text-sm mt-0.5">✦</span>
                                <span className="text-xs text-gray-300 leading-relaxed">{feat}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                        {project.tech.map((t, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-gray-300">
                                {t}
                            </span>
                        ))}
                    </div>


                </div>

                {/* Right — Device Mockups with solid gradient frame */}
                <div className="relative flex items-center justify-center">
                    {/* Solid gradient background panel */}
                    <div
                        className={`relative w-full h-[480px] lg:h-[560px] rounded-[32px] p-5 lg:p-6 bg-gradient-to-br ${project.gradient}`}
                        style={{ opacity: 0.85 }}
                    >
                        <div className="relative w-full h-full flex gap-4 lg:gap-5">
                            {/* Left — Stacked Phones */}
                            <div className="flex-shrink-0 w-[30%] flex flex-col gap-3 lg:gap-4 justify-center">
                                {project.phones.map((phone, i) => (
                                    <div
                                        key={i}
                                        className="w-full aspect-[9/16] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border-2 border-black/40"
                                    >
                                        <img
                                            src={phone}
                                            alt={`${project.title} phone ${i + 1}`}
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Right — Large Desktop */}
                            <div className="flex-1 rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border-2 border-black/40">
                                <img
                                    src={project.desktop}
                                    alt={`${project.title} desktop`}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Soft glow underneath */}
                    <div
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-24 blur-2xl rounded-full"
                        style={{ background: project.gradientColor, opacity: 0.3 }}
                    />
                </div>
            </div>
        </div>
    )
})
