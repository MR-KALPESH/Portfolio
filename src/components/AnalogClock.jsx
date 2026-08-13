import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

export default function AnalogClock() {
    const [time, setTime] = useState(dayjs())

    useEffect(() => {
        const interval = setInterval(() => setTime(dayjs()), 1000)
        return () => clearInterval(interval)
    }, [])

    const hours = time.hour()
    const minutes = time.minute()
    const seconds = time.second()

    const hourRotation = (hours % 12) * 30 + minutes * 0.5
    const minuteRotation = minutes * 6 + seconds * 0.1
    const secondRotation = seconds * 6

    const cx = 160
    const cy = 160

    return (
        <div className="relative flex items-center justify-center">
            <svg
                width="300"
                height="300"
                viewBox="0 0 320 320"
                className="drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            >
                <defs>
                    {/* Outer case gradient — dark titanium */}
                    <linearGradient id="caseGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3a3a3a" />
                        <stop offset="30%" stopColor="#1a1a1a" />
                        <stop offset="70%" stopColor="#111111" />
                        <stop offset="100%" stopColor="#2a2a2a" />
                    </linearGradient>

                    {/* Inner bezel gradient */}
                    <linearGradient id="bezelGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2d2d2d" />
                        <stop offset="50%" stopColor="#1a1a1a" />
                        <stop offset="100%" stopColor="#333333" />
                    </linearGradient>

                    {/* Dial gradient — deep black with subtle center */}
                    <radialGradient id="dialGrad" cx="50%" cy="45%" r="50%">
                        <stop offset="0%" stopColor="#1a1a1a" />
                        <stop offset="60%" stopColor="#0d0d0d" />
                        <stop offset="100%" stopColor="#050505" />
                    </radialGradient>

                    {/* Hour hand gradient */}
                    <linearGradient id="hourHandGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f0f0f0" />
                        <stop offset="100%" stopColor="#c0c0c0" />
                    </linearGradient>

                    {/* Minute hand gradient */}
                    <linearGradient id="minuteHandGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e8e8e8" />
                        <stop offset="100%" stopColor="#b0b0b0" />
                    </linearGradient>

                    {/* Subtle glow filter */}
                    <filter id="handGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Second hand glow */}
                    <filter id="secGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* === OUTER CASE === */}
                <circle cx={cx} cy={cy} r="158" fill="url(#caseGrad)" />
                {/* Polished edge highlight */}
                <circle cx={cx} cy={cy} r="157" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                {/* === BEZEL RING === */}
                <circle cx={cx} cy={cy} r="150" fill="url(#bezelGrad)" />
                <circle cx={cx} cy={cy} r="150" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

                {/* === DIAL FACE === */}
                <circle cx={cx} cy={cy} r="140" fill="url(#dialGrad)" />

                {/* === HOUR MARKERS === */}
                {/* 12 hour indices — clean batons */}
                {Array.from({ length: 12 }, (_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180)
                    const isCardinal = i % 3 === 0
                    const outerR = 132
                    const innerR = isCardinal ? 114 : 120
                    const width = isCardinal ? 3 : 1.5

                    const x1 = cx + outerR * Math.cos(angle)
                    const y1 = cy + outerR * Math.sin(angle)
                    const x2 = cx + innerR * Math.cos(angle)
                    const y2 = cy + innerR * Math.sin(angle)

                    return (
                        <line
                            key={`hour-${i}`}
                            x1={x1} y1={y1}
                            x2={x2} y2={y2}
                            stroke={isCardinal ? '#e0e0e0' : 'rgba(255,255,255,0.35)'}
                            strokeWidth={width}
                            strokeLinecap="round"
                        />
                    )
                })}

                {/* Minute tick marks — subtle dots */}
                {Array.from({ length: 60 }, (_, i) => {
                    if (i % 5 === 0) return null // skip where hour markers are
                    const angle = (i * 6 - 90) * (Math.PI / 180)
                    const r = 132
                    const dotX = cx + r * Math.cos(angle)
                    const dotY = cy + r * Math.sin(angle)

                    return (
                        <circle
                            key={`min-${i}`}
                            cx={dotX} cy={dotY}
                            r="0.8"
                            fill="rgba(255,255,255,0.15)"
                        />
                    )
                })}

                {/* === HOUR NUMBERS (12, 3, 6, 9) — Clean typography === */}
                {[
                    { n: '12', x: cx, y: cy - 98 },
                    { n: '3', x: cx + 98, y: cy + 1 },
                    { n: '6', x: cx, y: cy + 102 },
                    { n: '9', x: cx - 98, y: cy + 1 },
                ].map(({ n, x, y }) => (
                    <text
                        key={n}
                        x={x} y={y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="rgba(255,255,255,0.5)"
                        fontSize="13"
                        fontFamily="'Inter', 'SF Pro Display', -apple-system, sans-serif"
                        fontWeight="300"
                        letterSpacing="0.05em"
                    >
                        {n}
                    </text>
                ))}

                {/* === BRAND TEXT === */}
                <text
                    x={cx} y={cy - 45}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.25)"
                    fontSize="8"
                    fontFamily="'Inter', sans-serif"
                    fontWeight="500"
                    letterSpacing="0.25em"
                >
                    PORTFOLIO
                </text>
                <text
                    x={cx} y={cy - 34}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.12)"
                    fontSize="6"
                    fontFamily="'Inter', sans-serif"
                    fontWeight="300"
                    letterSpacing="0.15em"
                >
                    AUTOMATIC
                </text>

                {/* Small seconds sub-dial indicator */}
                <circle cx={cx} cy={cy + 50} r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                {/* Sub-dial ticks */}
                {Array.from({ length: 12 }, (_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180)
                    const subCy = cy + 50
                    const x1 = cx + 16 * Math.cos(angle)
                    const y1 = subCy + 16 * Math.sin(angle)
                    const x2 = cx + 18 * Math.cos(angle)
                    const y2 = subCy + 18 * Math.sin(angle)
                    return (
                        <line
                            key={`sub-${i}`}
                            x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="0.5"
                        />
                    )
                })}
                {/* Sub-dial second hand */}
                <line
                    x1={cx} y1={cy + 50}
                    x2={cx} y2={cy + 50 - 14}
                    stroke="#f97316"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    transform={`rotate(${secondRotation}, ${cx}, ${cy + 50})`}
                    filter="url(#secGlow)"
                />
                <circle cx={cx} cy={cy + 50} r="1.5" fill="#f97316" />

                {/* === HOUR HAND — thick, polished === */}
                <g transform={`rotate(${hourRotation}, ${cx}, ${cy})`} filter="url(#handGlow)">
                    <polygon
                        points={`${cx - 4},${cy + 14} ${cx - 3},${cy - 52} ${cx},${cy - 60} ${cx + 3},${cy - 52} ${cx + 4},${cy + 14}`}
                        fill="url(#hourHandGrad)"
                    />
                    {/* Center lume strip */}
                    <line
                        x1={cx} y1={cy - 15}
                        x2={cx} y2={cy - 55}
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1"
                        strokeLinecap="round"
                    />
                </g>

                {/* === MINUTE HAND — long, elegant === */}
                <g transform={`rotate(${minuteRotation}, ${cx}, ${cy})`} filter="url(#handGlow)">
                    <polygon
                        points={`${cx - 2.5},${cy + 18} ${cx - 1.5},${cy - 80} ${cx},${cy - 90} ${cx + 1.5},${cy - 80} ${cx + 2.5},${cy + 18}`}
                        fill="url(#minuteHandGrad)"
                    />
                    {/* Center lume strip */}
                    <line
                        x1={cx} y1={cy - 20}
                        x2={cx} y2={cy - 84}
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                    />
                </g>

                {/* === SECOND HAND — orange accent, ultra-thin === */}
                <g transform={`rotate(${secondRotation}, ${cx}, ${cy})`} filter="url(#secGlow)">
                    {/* Counterbalance */}
                    <line
                        x1={cx} y1={cy + 25}
                        x2={cx} y2={cy}
                        stroke="#f97316"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    {/* Main sweep */}
                    <line
                        x1={cx} y1={cy}
                        x2={cx} y2={cy - 100}
                        stroke="#f97316"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                    />
                    {/* Tip circle */}
                    <circle cx={cx} cy={cy - 94} r="2" fill="#f97316" />
                </g>

                {/* === CENTER HUB === */}
                <circle cx={cx} cy={cy} r="6" fill="#222" stroke="#444" strokeWidth="1" />
                <circle cx={cx} cy={cy} r="3" fill="#333" />
                <circle cx={cx} cy={cy} r="1.5" fill="#f97316" />

                {/* === CRYSTAL REFLECTION === */}
                <ellipse
                    cx={cx - 25} cy={cy - 40}
                    rx="50" ry="30"
                    fill="rgba(255,255,255,0.015)"
                    transform="rotate(-30, 160, 120)"
                />
            </svg>
        </div>
    )
}
