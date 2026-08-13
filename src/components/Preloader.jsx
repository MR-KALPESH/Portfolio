import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // 0 = black  |  1 = signing  |  2 = done  |  3 = exit
  const [writeProgress, setWriteProgress]   = useState(0);
  const [nibPos,        setNibPos]          = useState({ x: 0, y: 50 });
  const [showSub,       setShowSub]         = useState(false);
  const [inkSplats,     setInkSplats]       = useState([]);
  const rafRef   = useRef(null);
  const lastPRef = useRef(0);
  const containerRef = useRef(null);

  /* ─── Timeline ─────────────────────────────────────────── */
  useEffect(() => {
    const t0 = setTimeout(() => setPhase(1), 500);
    const t1 = setTimeout(() => setShowSub(true), 2600);
    const t2 = setTimeout(() => setPhase(2), 3000);
    const t3 = setTimeout(() => setPhase(3), 3600);
    const t4 = setTimeout(() => onComplete(), 4400);
    return () => [t0, t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  /* ─── Writing animation ─────────────────────────────────── */
  useEffect(() => {
    if (phase !== 1) return;
    const DURATION = 2400;
    const start    = performance.now();

    // Smooth ease-in-out-cubic — natural pen motion, no artificial pauses
    const ease = (t) => t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Nib path: follows a sine-wave approximation of cursive writing motion
    const nibY = (rawP) => {
      // Simulate vertical pen motion — dips on descenders, rises on ascenders
      const angle = rawP * Math.PI * 6;
      return 50 + Math.sin(angle) * 18 * (1 - rawP * 0.5);
    };

    const tick = (now) => {
      const t      = Math.min((now - start) / DURATION, 1);
      const eased  = ease(t);
      const pct    = eased * 100;

      setWriteProgress(pct);
      setNibPos({ x: pct, y: nibY(eased) });

      // Spawn ink splat occasionally
      if (pct - lastPRef.current > 3 && Math.random() < 0.25) {
        const splat = {
          id: `${now}`,
          x:  pct,
          y:  nibY(eased) + (Math.random() - 0.5) * 22,
          size: Math.random() * 2.5 + 1,
        };
        setInkSplats(prev => [...prev.slice(-10), splat]);
      }
      lastPRef.current = pct;

      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="preloader-v3"
          className="fixed inset-0 z-[9999] overflow-hidden flex flex-col items-center justify-center"
          style={{ background: '#050505' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* ── Film grain ── */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px',
            }}
          />

          {/* ── Radial ambient ── */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(255,255,255,0.025) 0%, transparent 100%)' }} />

          {/* ── Corner brackets ── */}
          {[
            'top-7 left-7 border-t border-l',
            'top-7 right-7 border-t border-r',
            'bottom-7 left-7 border-b border-l',
            'bottom-7 right-7 border-b border-r',
          ].map((cls, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: phase >= 1 ? 0.22 : 0, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
              className={`absolute w-8 h-8 md:w-12 md:h-12 ${cls} border-white`}
            />
          ))}

          {/* ── Top labels ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute top-9 left-24 text-[7px] tracking-[0.4em] text-white/20 uppercase"
          >Portfolio / 2026</motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute top-9 right-24 text-[7px] tracking-[0.4em] text-white/20 uppercase"
          >Software Engineer</motion.div>

          {/* ══════════════════════════════════════════════════
              SIGNATURE STAGE
          ══════════════════════════════════════════════════ */}
          <div
            ref={containerRef}
            className="relative flex flex-col items-center"
            style={{ width: 'clamp(300px, 85vw, 950px)' }}
          >
            {/* Signature text wrapper */}
            <div className="relative w-full select-none" style={{ lineHeight: 1.15 }}>

              {/* 1. Ghost text — always visible, very faint */}
              <div
                aria-hidden="true"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: 'clamp(3rem, 10vw, 7.8rem)',
                  color: 'rgba(255,255,255,0.045)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                Kalpesh Katariya
              </div>

              {/* 2. Ink fresh — bright trail right behind the nib */}
              {phase === 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: 0,
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 'clamp(3rem, 10vw, 7.8rem)',
                    color: 'rgba(255,255,255,0.75)',
                    letterSpacing: '0.02em',
                    whiteSpace: 'nowrap',
                    filter: 'blur(0.6px)',
                    // Show only the 8% window just behind the nib
                    clipPath: `inset(0 ${(100 - Math.max(0, writeProgress - 7)).toFixed(2)}% 0 ${Math.max(0, writeProgress - 15).toFixed(2)}%)`,
                  }}
                >
                  Kalpesh Katariya
                </div>
              )}

              {/* 3. Dried ink — the final revealed text */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0,
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: 'clamp(3rem, 10vw, 7.8rem)',
                  color: 'rgba(255,255,255,0.93)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  textShadow: '0 0 60px rgba(255,255,255,0.08)',
                  clipPath: `inset(0 ${(100 - writeProgress).toFixed(2)}% 0 0)`,
                }}
              >
                Kalpesh Katariya
              </div>

              {/* ── INK SPLATS (tiny particles from nib) ── */}
              {inkSplats.map(s => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0.7, scale: 1, x: `${s.x}%`, y: `${s.y}%` }}
                  animate={{ opacity: 0, scale: 0, y: `${s.y + 12}%` }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    width: `${s.size}px`, height: `${s.size}px`,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.8)',
                    pointerEvents: 'none',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}

              {/* ──────────────────────────────────────────────
                  PEN NIP — the star of the show
              ────────────────────────────────────────────── */}
              {phase === 1 && writeProgress < 100 && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: `${nibPos.y}%`,
                    left: `${nibPos.x}%`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 20,
                  }}
                >
                  {/* Outer soft halo */}
                  <div style={{
                    position: 'absolute',
                    width: 56, height: 56,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
                    filter: 'blur(6px)',
                  }} />

                  {/* Mid glow */}
                  <div style={{
                    position: 'absolute',
                    width: 20, height: 20,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 80%)',
                    filter: 'blur(2px)',
                  }} />

                  {/* Core nib dot */}
                  <div style={{
                    position: 'absolute',
                    width: 5, height: 5,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    background: '#ffffff',
                    boxShadow: '0 0 6px 2px rgba(255,255,255,0.9), 0 0 16px 6px rgba(255,255,255,0.4), 0 0 40px 14px rgba(255,255,255,0.12)',
                  }} />
                </div>
              )}
            </div>

            {/* ── Signature underline ── */}
            <div
              style={{
                marginTop: 6,
                width: '90%',
                height: '1.5px',
                background: 'rgba(255,255,255,0.06)',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 1,
              }}
            >
              {/* Traveling edge glow */}
              {phase === 1 && (
                <div style={{
                  position: 'absolute',
                  right: `${(100 - writeProgress).toFixed(1)}%`,
                  top: 0, bottom: 0,
                  width: 24,
                  background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.9))',
                  filter: 'blur(1px)',
                  transition: 'right 0.04s linear',
                }} />
              )}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255,255,255,0.55)',
                width: `${writeProgress.toFixed(1)}%`,
                borderRadius: 1,
              }} />
            </div>

            {/* ── Subtitle ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showSub ? 1 : 0, y: showSub ? 0 : 10 }}
              transition={{ duration: 0.7 }}
              className="mt-7 flex items-center gap-4 md:gap-6"
              style={{ color: 'rgba(255,255,255,0.25)', fontSize: '7px', letterSpacing: '0.45em', textTransform: 'uppercase' }}
            >
              <span>Software Engineer</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>India</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>2026</span>
            </motion.div>
          </div>

          {/* ── Bottom status bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute bottom-9 left-24 right-24 flex flex-col gap-2"
          >
            <div className="flex justify-between"
              style={{ fontSize: '7px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>
              <span>{writeProgress < 35 ? 'Loading' : writeProgress < 70 ? 'Composing' : writeProgress < 95 ? 'Almost' : 'Ready'}</span>
              <span style={{ fontFamily: 'monospace' }}>{Math.round(writeProgress).toString().padStart(3, '0')}</span>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(255,255,255,0.38)',
                width: `${writeProgress.toFixed(1)}%`,
              }} />
            </div>
          </motion.div>

          {/* ── Completion flash ── */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                key="flash"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-white pointer-events-none z-30"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
