import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactModal({ onClose }) {
    const [form, setForm] = useState({ name: '', email: '', subject: '', company: '', message: '' })
    const [status, setStatus] = useState('idle') // idle | sending | success | error

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: 'YOUR_WEB3FORMS_KEY', // ← replace after setup
                    subject: form.subject || `New message from ${form.name} — Portfolio`,
                    from_name: form.name,
                    email: form.email,
                    message: `Company: ${form.company || 'Not provided'}\n\n${form.message}`,
                    redirect: false,
                }),
            })
            const data = await res.json()
            setStatus(data.success ? 'success' : 'error')
        } catch {
            setStatus('error')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-lg rounded-3xl overflow-hidden my-auto"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Background accents */}
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

                <div className="relative z-10 p-8 sm:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {status === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-8 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center mx-auto mb-6 text-2xl">
                                ✓
                            </div>
                            <h3 className="text-white text-2xl font-bold mb-2">Message Sent!</h3>
                            <p className="text-gray-400 text-sm">Thanks {form.name}, I&apos;ll get back to you within 24 hours.</p>
                            <button
                                onClick={onClose}
                                className="mt-8 px-6 py-2.5 rounded-full bg-white/8 border border-white/10 text-white text-sm hover:bg-white/12 transition-all"
                            >Close</button>
                        </motion.div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="mb-8">
                                <h2 className="text-white text-3xl font-bold leading-tight mb-1">Let&apos;s connect</h2>
                                <h2 className="text-3xl font-light italic bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent"
                                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                                    & build something.
                                </h2>
                                <p className="text-gray-500 text-sm mt-3">Drop me a note — I&apos;d love to hear from you.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Your name *"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/60 transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="Your email *"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/60 transition-all duration-300"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            placeholder="Subject / Purpose (Optional)"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/60 transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="company"
                                            value={form.company}
                                            onChange={handleChange}
                                            placeholder="Company Name (Optional)"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/60 transition-all duration-300"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project or idea... *"
                                        required
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/60 transition-all duration-300 resize-none"
                                    />
                                </div>

                                {status === 'error' && (
                                    <p className="text-red-400 text-xs px-1">Something went wrong. Please try again.</p>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full mt-2 py-3.5 rounded-xl font-bold tracking-wide text-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                >
                                    {status === 'sending' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    ) : 'Send Message →'}
                                </motion.button>
                            </form>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}
