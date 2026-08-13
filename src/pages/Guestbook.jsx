import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import Navbar from '../components/Navbar'
import ClosingSection from '../components/ClosingSection'
import { db } from '../lib/firebase'
import SEO from '../components/SEO';
import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from 'firebase/firestore'

function timeAgo(date) {
    if (!date) return ''
    const seconds = Math.floor((new Date() - date) / 1000)
    if (seconds < 60) return 'just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 30) return `${days}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

const avatarGradients = [
    'from-orange-500 to-pink-500',
    'from-violet-500 to-indigo-500',
    'from-cyan-400 to-teal-500',
    'from-emerald-400 to-lime-500',
    'from-amber-400 to-rose-500',
    'from-sky-400 to-blue-600',
]
function getGradient(name) {
    return avatarGradients[name.charCodeAt(0) % avatarGradients.length]
}

export default function Guestbook() {
    const [entries, setEntries] = useState([])
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    

    useEffect(() => {
        const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'))
        const unsub = onSnapshot(q, snap => {
            setEntries(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        return () => unsub()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        const n = name.trim(), m = message.trim()
        if (!n || !m) { setError('Please fill in both fields.'); return }
        if (m.length > 280) { setError('Message must be 280 characters or less.'); return }
        setSubmitting(true)
        try {
            await addDoc(collection(db, 'guestbook'), {
                name: n, message: m, createdAt: serverTimestamp(),
            })
            setName(''); setMessage('')
            setSubmitted(true)
            setTimeout(() => setSubmitted(false), 3000)
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="relative bg-black min-h-screen">
            <SEO title="Guestbook" description="Explore the Guestbook page of Kalpesh Katariya portfolio." />
            <div className="fixed inset-0 noise-texture pointer-events-none z-0" />
            <Navbar />

            {/* ── HERO SECTION ── */}
            <section className="relative min-h-screen flex items-center px-6 sm:px-12 lg:px-20 pt-28 pb-16">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT — Giant Typography */}
                        <div>
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-500 mb-8"
                            >
                                Leave Your Signature
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <h1
                                    className="text-[22vw] sm:text-[16vw] lg:text-[13vw] font-black tracking-tighter leading-[0.82] text-white"
                                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                                >
                                    GUEST
                                </h1>
                                <h1
                                    className="text-[22vw] sm:text-[16vw] lg:text-[13vw] font-light tracking-tight leading-[0.82] text-gray-400 italic"
                                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                                >
                                    book
                                </h1>
                            </motion.div>

                            {/* Divider line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="w-20 h-px bg-white/20 mt-10 origin-left"
                            />
                        </div>

                        {/* RIGHT — Premium Sign Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="relative rounded-3xl overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
                                }}
                            >
                                {/* Subtle corner glow */}
                                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-orange-500/8 blur-3xl pointer-events-none" />
                                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-pink-500/8 blur-3xl pointer-events-none" />

                                <div className="relative z-10 p-8 lg:p-10">
                                    {/* Card heading */}
                                    <div className="mb-8">
                                        <h2 className="text-white text-3xl font-bold leading-tight mb-1">
                                            Leave your
                                        </h2>
                                        <h2 className="text-3xl font-light italic leading-tight bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent"
                                            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                                            Signature!
                                        </h2>
                                        <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                                            Drop a note and let me know you stopped by.
                                            No login needed — just your name and a message.
                                        </p>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                placeholder="Your name"
                                                maxLength={50}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm
                                                           placeholder-gray-600 focus:outline-none focus:border-orange-500/60 focus:bg-white/8
                                                           transition-all duration-300"
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                value={message}
                                                onChange={e => setMessage(e.target.value)}
                                                placeholder="Say something..."
                                                maxLength={280}
                                                rows={3}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm
                                                           placeholder-gray-600 focus:outline-none focus:border-orange-500/60 focus:bg-white/8
                                                           transition-all duration-300 resize-none"
                                            />
                                            <p className="text-right text-gray-600 text-xs mt-1">{message.length}/280</p>
                                        </div>

                                        <AnimatePresence>
                                            {error && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="text-red-400 text-xs px-1"
                                                >
                                                    {error}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>

                                        <motion.button
                                            type="submit"
                                            disabled={submitting}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-3.5 rounded-2xl font-semibold text-sm text-white
                                                       bg-gradient-to-r from-orange-500 to-pink-500
                                                       hover:shadow-[0_0_30px_rgba(249,115,22,0.35)]
                                                       disabled:opacity-50 disabled:cursor-not-allowed
                                                       transition-all duration-300 relative overflow-hidden"
                                        >
                                            <AnimatePresence mode="wait">
                                                {submitted ? (
                                                    <motion.span key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                                        className="flex items-center justify-center gap-2">
                                                        ✓ &nbsp;Signed the book!
                                                    </motion.span>
                                                ) : submitting ? (
                                                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                        className="flex items-center justify-center gap-2">
                                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Signing...
                                                    </motion.span>
                                                ) : (
                                                    <motion.span key="idle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                                                        Sign the Guestbook →
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>
                                    </form>

                                    {/* Entry count badge */}
                                    <p className="text-center text-gray-600 text-xs mt-6">
                                        {entries.length} {entries.length === 1 ? 'person has' : 'people have'} signed the book
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── RECENT SIGNATURES ── */}
            <section className="relative px-6 sm:px-12 lg:px-20 pb-32">
                <div className="max-w-7xl mx-auto">

                    {/* Section label */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-6 mb-12"
                    >
                        <div className="h-px flex-1 bg-white/8" />
                        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gray-500">
                            Recent Signatures
                        </p>
                        <div className="h-px flex-1 bg-white/8" />
                    </motion.div>

                    {/* Grid of messages */}
                    <AnimatePresence>
                        {entries.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 text-gray-600"
                            >
                                <p className="text-5xl mb-4">✍️</p>
                                <p className="text-sm">No signatures yet. Be the first to leave your mark!</p>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {entries.map((entry, i) => (
                                    <motion.div
                                        key={entry.id}
                                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                        className="group relative p-6 rounded-2xl overflow-hidden
                                                   border border-white/8 hover:border-white/16
                                                   transition-all duration-500 hover:-translate-y-1
                                                   hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
                                        }}
                                    >
                                        {/* Gradient accent top-left */}
                                        <div className={`absolute -top-10 -left-10 w-32 h-32 rounded-full blur-2xl opacity-20
                                                         bg-gradient-to-br ${getGradient(entry.name)} pointer-events-none`} />

                                        {/* Quote mark */}
                                        <div className="absolute top-4 right-5 text-5xl font-serif text-white/5 leading-none select-none">
                                            "
                                        </div>

                                        {/* Message */}
                                        <p className="text-gray-300 text-sm leading-relaxed mb-5 relative z-10 min-h-[3rem]">
                                            "{entry.message}"
                                        </p>

                                        {/* Author row */}
                                        <div className="flex items-center gap-3 relative z-10">
                                            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getGradient(entry.name)}
                                                            flex-shrink-0 flex items-center justify-center
                                                            text-white text-xs font-bold shadow-lg`}>
                                                {getInitials(entry.name)}
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold text-sm leading-tight">{entry.name}</p>
                                                <p className="text-gray-600 text-xs">{timeAgo(entry.createdAt?.toDate())}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <ClosingSection />
        </div>
    )
}
