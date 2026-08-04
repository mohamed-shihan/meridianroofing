'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarCheck } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero — Master Roofing & Timber Framing"
      className="relative w-full h-screen min-h-[700px] flex flex-col justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/ezgif-frame-300.webp"
        alt="Meridian Roofing Co. — Completed slate roof and timber framing project at dusk"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center"
        style={{ zIndex: 0 }}
      />

      {/* Gradient — lighter on top (nav floats over), heavy ramp on bottom third */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background: [
            'linear-gradient(to bottom,',
            '  rgba(11,11,10,0.10)  0%,',
            '  rgba(11,11,10,0.30) 30%,',
            '  rgba(11,11,10,0.70) 60%,',
            '  rgba(11,11,10,0.94) 85%,',
            '  rgba(11,11,10,1.00) 100%)',
          ].join(''),
        }}
      />

      {/* Content — vertically centered, nudged down by half the nav height */}
      <div
        className="relative z-20 w-full max-w-[1600px] mx-auto"
        style={{
          paddingLeft: 'var(--gutter)',
          paddingRight: 'var(--gutter)',
          marginTop: 'clamp(64px, 10vh, 120px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="max-w-[860px]"
        >
          {/* Eyebrow label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-ember rounded-full shrink-0" />
            <p
              style={{
                fontFamily: 'Montserrat, system-ui, sans-serif',
                fontWeight: 800,
                fontSize: '10px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#8C6239',
              }}
            >
              MERIDIAN ROOFING CO. &bull; MASTER CRAFTSMEN
            </p>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'Montserrat, system-ui, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.6rem, 7.5vw, 6rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#B9AE9A',
              marginBottom: 'clamp(16px, 2.5vw, 28px)',
            }}
          >
            BUILT ONCE.<br />
            <span style={{ color: '#D89448' }}>BUILT RIGHT.</span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            style={{
              fontFamily: 'Montserrat, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
              lineHeight: 1.7,
              color: 'rgba(185,174,154,0.75)',
              maxWidth: '520px',
              marginBottom: 'clamp(28px, 4vw, 48px)',
            }}
          >
            Estate-grade slate roofing, heavy timber framing, and custom architectural roof systems — built to outlast generations.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#inquiry"
              aria-label="Book a free roofing inspection"
              className="cursor-active hover:opacity-90 flex justify-center items-center w-full sm:w-auto"
              style={{
                gap: '10px',
                padding: '18px 36px',
                background: '#D89448',
                color: '#0B0B0A',
                fontFamily: 'Montserrat, system-ui, sans-serif',
                fontWeight: 900,
                fontSize: '11px',
                letterSpacing: '0.20em',
                textTransform: 'uppercase',
                border: '2px solid #D89448',
                borderRadius: '10px',
                textDecoration: 'none',
                cursor: 'none',
                boxShadow: '0 4px 20px rgba(216,148,72,0.30)',
              }}
            >
              <CalendarCheck size={16} strokeWidth={2.5} aria-hidden />
              BOOK FREE INSPECTION
            </a>

            <a
              href="#the-build"
              aria-label="Explore our construction process"
              className="cursor-active hover:text-travertine hover:border-timber/80 flex justify-center items-center w-full sm:w-auto"
              style={{
                gap: '8px',
                padding: '18px 32px',
                background: 'transparent',
                color: '#B9AE9A',
                fontFamily: 'Montserrat, system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                border: '1px solid rgba(140,98,57,0.50)',
                borderRadius: '10px',
                textDecoration: 'none',
                cursor: 'none',
                transition: 'border-color 160ms ease, color 160ms ease',
              }}
            >
              OUR PROCESS
              <ArrowRight size={14} strokeWidth={2} aria-hidden />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue — bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden
        className="absolute bottom-10 right-10 z-20 hidden md:flex flex-col items-center gap-2.5"
      >
        <span
          style={{
            fontFamily: 'Montserrat, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: '9px',
            letterSpacing: '0.24em',
            color: 'rgba(185,174,154,0.40)',
            textTransform: 'uppercase',
          }}
        >
          SCROLL
        </span>
        <div className="w-px h-14 bg-gradient-to-b from-timber/60 to-transparent" />
      </motion.div>
    </section>
  )
}
