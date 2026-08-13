import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme()
    const [isMoreOpen, setIsMoreOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location.pathname])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [isMobileMenuOpen])

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Work', path: '/work' },
        { name: 'Resume', path: '/resume' },
        { name: 'Links', path: '/links' },
    ]

    const moreItems = [
        { name: 'Labs', description: 'Experimental playground', path: '/labs' },
        { name: 'Uses', description: 'My gear & software', path: '/uses' },
        { name: 'Guestbook', description: 'Sign my wall', path: '/guestbook' },
    ]

    return (
        <>
            {/* Top edge fade gradient to mask scrolling content above the floating nav */}
            <div className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-40" />
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-4 sm:py-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="max-w-[1600px] mx-auto glass-nav rounded-full px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
                    {/* Left: Logo + Subtitle */}
                    <div className="flex items-center gap-3 sm:gap-5">
                        <Link to="/" className="flex items-center gap-3">
                            <motion.img
                                src="/images/kalpesh-3.png"
                                alt="Kalpesh Katariya"
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover block border-2 border-white/20"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            />
                            <span className="font-bold text-white text-sm sm:hidden">Kalpesh</span>
                        </Link>
                        <div className="hidden sm:flex flex-col">
                            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-emerald-400 uppercase leading-tight">
                                CREATIVE DEVELOPER
                            </span>
                            <span className="text-[10px] sm:text-xs font-medium tracking-wider text-emerald-400/80 uppercase leading-tight">
                                BUILDING THE FUTURE
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation Pills (lg screen) */}
                    <div className="hidden lg:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
                        {navItems.map((item, index) => {
                            const isActive = location.pathname === item.path
                            return (
                                <Link key={item.name} to={item.path}>
                                    <motion.div
                                        className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                                            isActive ? 'bg-white/10 text-white font-semibold' : 'text-gray-300 hover:text-white'
                                        }`}
                                        whileHover={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            scale: 1.04,
                                        }}
                                    >
                                        {item.name}
                                    </motion.div>
                                </Link>
                            )
                        })}

                        {/* More Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsMoreOpen(true)}
                            onMouseLeave={() => setIsMoreOpen(false)}
                        >
                            <button
                                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full flex items-center gap-1.5 ${
                                    isMoreOpen ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                More
                                <svg
                                    className={`w-3 h-3 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isMoreOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                                        className="absolute top-full right-0 mt-3 p-3 rounded-2xl bg-[#121216]/95 backdrop-blur-xl border border-white/10 shadow-2xl w-64"
                                    >
                                        <div className="flex flex-col gap-1">
                                            {moreItems.map((item) => (
                                                <Link key={item.name} to={item.path} onClick={() => setIsMoreOpen(false)}>
                                                    <div className="p-2.5 rounded-xl hover:bg-white/5 transition-colors">
                                                        <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                                                        <p className="text-gray-400 text-xs mt-0.5">{item.description}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Controls: Theme Toggle + CTA + Hamburger Button */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Theme Toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            aria-label="Toggle Theme"
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isDark ? (
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </motion.button>

                        {/* Book a Call Button */}
                        <Link to="/book" className="hidden sm:block">
                            <motion.div
                                className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-bold hover:bg-gray-100 transition-all shadow-md"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Book a Call
                            </motion.div>
                        </Link>

                        {/* Mobile Hamburger Menu Button (< lg screens) */}
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Open Mobile Menu"
                            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMobileMenuOpen ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Navigation Fullscreen Overlay Menu (< lg screens) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-28 px-6 pb-10 flex flex-col justify-between overflow-y-auto lg:hidden"
                    >
                        {/* Navigation Links */}
                        <div className="flex flex-col gap-4 max-w-sm mx-auto w-full">
                            <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-500 mb-2">
                                NAVIGATION
                            </p>
                            {[...navItems, ...moreItems].map((item, i) => {
                                const isActive = location.pathname === item.path
                                return (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                    >
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                                                isActive
                                                    ? 'bg-white/10 border-white/20 text-white font-bold'
                                                    : 'bg-white/[0.03] border-white/5 text-gray-300 hover:text-white'
                                            }`}
                                        >
                                            <span className="text-base font-semibold">{item.name}</span>
                                            <span className="text-xs text-gray-500 font-mono">↗</span>
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Bottom CTA for Mobile */}
                        <div className="max-w-sm mx-auto w-full pt-6 border-t border-white/10 mt-6">
                            <Link to="/book" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-center text-sm shadow-xl">
                                    Book a Call
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
