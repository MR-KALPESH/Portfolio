import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const experiences = [
    {
        date: "WHAT'S NEXT",
        company: 'The Horizon',
        location: 'Surat, India / Remote',
        type: 'Lifelong Learner',
        title: 'The Best Work Is Ahead',
        highlights: [
            { text: 'Every version of my code is', keyword: 'better than yesterday\'s', rest: '. Quality and user experience are the metrics that matter.' },
            { text: 'Going deeper into', keyword: 'advanced Next.js architectures, AI/ML integrations, and system design', rest: '.' },
            { text: 'The goal:', keyword: 'build world-class SaaS products', rest: ' that deliver real business impact, one feature at a time.' },
        ],
        skills: ['Next.js Architecture', 'System Design', 'AI Integrations', 'SaaS Products', 'Interactive UIs'],
    },
    {
        date: 'MAY 2026 - PRESENT',
        company: 'Flomize Techno LLP',
        location: 'Surat, India',
        type: 'React.js / Next.js Developer',
        title: 'Flomize Techno LLP',
        highlights: [
            { text: 'Working on a multi-module', keyword: 'SaaS Business Management Platform', rest: ' covering CRM, Accounting, HRMS, and Asset Management.' },
            { text: 'Developed core sales and purchase workflows including', keyword: 'Sales Order, Sales Invoice, Purchase Order, and Customer Payments', rest: '.' },
            { text: 'Built custom business analytics dashboards featuring', keyword: 'Power BI-style charts and graphs', rest: ' for interactive data visualization.' },
            { text: 'Leveraged AI-assisted development tools like', keyword: 'Claude AI', rest: ' for advanced code generation, debugging, refactoring, and optimization.' },
            { text: 'Implemented complex features like', keyword: 'parent-child asset linking', rest: ' and HRMS chat/audio/screen-sharing systems.' },
        ],
        skills: ['React.js', 'Next.js', 'JavaScript', 'Tailwind CSS', 'SaaS', 'Power BI-style Dashboards', 'Claude AI', 'REST APIs'],
    },
    {
        date: 'JAN 2025 - MAR 2026',
        company: 'Galaxy Infotech',
        location: 'Surat, India',
        type: 'React.js & React Native Developer',
        title: 'Galaxy Infotech — SYSPRO ERP',
        highlights: [
            { text: 'Developed and maintained multi-user', keyword: 'ERP Web & Mobile applications', rest: ' for Textile, Retail, and Wholesale businesses.' },
            { text: 'Managed complex global application state using', keyword: 'Redux', rest: ' for ledger reports, cart management, and payment receipts.' },
            { text: 'Designed and implemented secure access control systems featuring', keyword: 'role-based access control (RBAC)', rest: '.' },
            { text: 'Engineered dynamic user and team configurations for', keyword: 'customer portals and item tracking workflows', rest: '.' },
            { text: 'Built responsive user interfaces for both', keyword: 'web and mobile platforms', rest: ' using React and React Native.' },
        ],
        skills: ['React.js', 'React Native', 'Redux', 'ERP Systems', 'RBAC', 'Mobile Development', 'API Integration'],
    },
    {
        date: 'JUN 2024 - NOV 2024',
        company: 'Snepitech IT Solution',
        location: 'Surat, India',
        type: 'React.js Developer',
        title: 'Snepitech IT Solution',
        highlights: [
            { text: 'Contributed to the development of', keyword: 'Snepishop', rest: ', a dynamic, high-performance e-commerce platform.' },
            { text: 'Optimized', keyword: 'website responsiveness and loading performance', rest: ', significantly improving overall page speed and user experience.' },
            { text: 'Focused on', keyword: 'responsive web design', rest: ' and mobile-first layout optimization across the company\'s web properties.' },
            { text: 'Collaborated in', keyword: 'agile sprint cycles', rest: ' and version control workflows using Git.' },
        ],
        skills: ['React.js', 'E-commerce', 'Responsive Design', 'Web Performance', 'Git', 'CSS3'],
    },
]

function ExperienceCard({ experience, index, isInView }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.3 + index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[268px_1fr] gap-8 lg:gap-16 relative"
        >
            {/* Left Side - Date & Company Info */}
            <div className="lg:text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
                    {experience.date}
                </p>
                <h3
                    className="text-3xl lg:text-4xl italic font-light bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent mb-4"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                    {experience.company}
                </h3>
                <div className="flex lg:justify-end items-center gap-2 text-gray-400 text-sm mb-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{experience.location}</span>
                </div>
                <div className="flex lg:justify-end items-center gap-2 text-gray-400 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{experience.type}</span>
                </div>
            </div>

            {/* Right Side - Role Details */}
            <div>
                <h4 className="text-2xl font-bold text-white mb-6">
                    {experience.title}
                </h4>

                <div className="space-y-4 mb-8">
                    {experience.highlights.map((highlight, i) => (
                        <p key={i} className="text-gray-400 text-sm leading-relaxed">
                            {highlight.text}{' '}
                            <span className="text-white font-medium">{highlight.keyword}</span>
                            {highlight.rest}
                        </p>
                    ))}
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                        <span
                            key={skill}
                            className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-gray-300 text-xs font-medium hover:bg-white/[0.1] transition-colors"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default function ExperienceSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"]
    })

    // Orb moves from 0% to 100% as user scrolls through the section
    const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section ref={sectionRef} className="relative py-32 px-6 sm:px-12 lg:px-20 bg-black overflow-hidden">
            {/* Noise grain texture */}
            <div className="absolute inset-0 noise-texture opacity-[0.03]" />

            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="text-[11px] uppercase tracking-[0.3em] text-pink-400 font-medium mb-6"
                    >
                        The Experience
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight"
                    >
                        <span className="text-white">Experience That</span>
                        <br />
                        <span className="text-white">Brings </span>
                        <span
                            className="italic font-light bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent"
                            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                        >
                            Ideas to Life
                        </span>
                    </motion.h2>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-1/2 lg:left-[300px] top-0 bottom-0 w-px transform -translate-x-1/2 lg:translate-x-0">
                        {/* Gradient line */}
                        <div className="absolute inset-0 bg-gradient-to-b from-red-500 via-red-600/50 to-gray-800" />

                        {/* Moving Orb */}
                        <motion.div
                            style={{ top: orbY }}
                            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                            <div className="relative w-10 h-10">
                                {/* Outer glow */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 blur-sm opacity-60" />
                                {/* Inner orb */}
                                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600 shadow-lg">
                                    {/* Highlight */}
                                    <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/40" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Experience Cards */}
                    <div className="space-y-24 lg:pl-0">
                        {experiences.map((exp, index) => (
                            <ExperienceCard
                                key={exp.company}
                                experience={exp}
                                index={index}
                                isInView={isInView}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
