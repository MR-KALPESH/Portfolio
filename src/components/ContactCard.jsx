import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactCard() {
    const [copied, setCopied] = useState(false)
    const email = 'mr.kalpesh03@gmail.com'

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(email)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    return (
        <div className="p-8 min-h-[420px] flex flex-col justify-between">
            {/* Available Badge - Top */}
            <div className="flex justify-end">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                        Available for work
                    </span>
                </div>
            </div>

            {/* Main Text */}
            <div className="my-6">
                <h4 className="text-3xl font-bold leading-tight tracking-tight">
                    LET'S BUILD SOMETHING
                </h4>
                <p className="text-2xl font-serif italic text-gray-400 mt-1">
                    that actually works.
                </p>
            </div>

            {/* Contact Section */}
            <div>
                {/* Email */}
                <div
                    className="mb-6 group cursor-pointer"
                    onClick={copyToClipboard}
                >
                    <div className="flex items-center gap-3 text-gray-300 group-hover:text-blue-400 transition-all duration-300">
                        <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-lg font-medium">{email}</span>
                    </div>
                    <p className="text-[9px] uppercase tracking-widest text-gray-600 mt-2 ml-12 group-hover:text-blue-400/60 transition-colors">
                        {copied ? '✓ Copied to clipboard!' : 'Tap to copy email'}
                    </p>
                </div>

                {/* Connect Button - Opens Email */}
                <motion.a
                    href={`mailto:${email}?subject=Let's Connect&body=Hi Kalpesh,%0D%0A%0D%0AI'd like to discuss a project with you.`}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all duration-500 group overflow-hidden relative hover:bg-blue-500 hover:text-white hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] no-underline"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Connect Now
                        <motion.svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                        </motion.svg>
                    </span>
                </motion.a>
            </div>
        </div>
    )
}
