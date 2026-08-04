'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, CalendarCheck } from 'lucide-react'

const NAV_LINKS = [
  { label: 'The Build',   href: '#the-build'      },
  { label: 'Framing',     href: '#the-approach'   },
  { label: 'Slate & Tiles', href: '#the-grounds'  },
  { label: 'Specs',       href: '#specifications' },
  { label: 'Portfolio',   href: '#gallery'        },
]

// ─── Shared style tokens ──────────────────────────────────────────────────────
const FONT = 'Montserrat, system-ui, sans-serif'
const EMBER = '#D89448'
const OBSIDIAN = '#0B0B0A'
const TRAVERTINE = '#B9AE9A'
const TIMBER = '#8C6239'

export default function Navigation() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    /*
     * Outer shell — fixed, full-width, centered, max 1440px.
     * inset-x-4 on phones → 16px gap from screen edges.
     * md:inset-x-6 on tablet → 24px.
     * lg:inset-x-8 on desktop → 32px.
     * top-4 / md:top-5 — pill floats 16–20px below the viewport top.
     */
    <div
      className="fixed top-4 md:top-5 inset-x-4 md:inset-x-6 lg:inset-x-8 z-50 max-w-[1520px] mx-auto pointer-events-none"
    >
      {/* ── Nav pill ──────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1,  y: 0   }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Site navigation"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          /*
           * Horizontal: 20px on phone, 28px on tablet, 40px on desktop.
           * Vertical: 0 — height is driven by min-height so flex centres children exactly.
           */
          padding: '0 clamp(20px, 3vw, 40px)',
          minHeight: 'clamp(60px, 6.5vw, 76px)',
          borderRadius: 'clamp(14px, 1.8vw, 22px)',
          border: `1px solid ${scrolled ? 'rgba(140,98,57,0.45)' : 'rgba(140,98,57,0.28)'}`,
          background: scrolled ? 'rgba(11,11,10,0.94)' : 'rgba(11,11,10,0.82)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: scrolled
            ? '0 16px 48px rgba(0,0,0,0.88)'
            : '0 8px 28px rgba(0,0,0,0.55)',
          transition: 'background 400ms ease, border-color 400ms ease, box-shadow 400ms ease',
          pointerEvents: 'auto',
          width: '100%',
          boxSizing: 'border-box',
          gap: 'clamp(12px, 2vw, 28px)',
        }}
      >
        {/* ── Logo ────────────────────────────────────────────────────────── */}
        <a
          href="#"
          aria-label="Meridian Roofing Co. — Home"
          className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-xl"
          style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 1vw, 14px)', flexShrink: 0, textDecoration: 'none' }}
        >
          {/* Icon badge — size scales with nav height */}
          <div
            style={{
              width:  'clamp(34px, 4vw, 44px)',
              height: 'clamp(34px, 4vw, 44px)',
              borderRadius: 'clamp(8px, 1vw, 12px)',
              background: 'rgba(140,98,57,0.15)',
              border: '1px solid rgba(140,98,57,0.38)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'border-color 180ms ease, background 180ms ease',
            }}
            className="group-hover:border-ember group-hover:bg-ember/10"
          >
            <svg
              width="clamp(14px,1.6vw,20px)"
              height="clamp(11px,1.2vw,15px)"
              viewBox="0 0 18 14"
              fill="none"
              aria-hidden
              style={{ color: EMBER, width: 'clamp(14px,1.6vw,20px)', height: 'clamp(11px,1.2vw,15px)' }}
            >
              <path d="M1 13L9 2L17 13"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
              <path d="M4 13L9 6.5L14 13" stroke={EMBER}       strokeWidth="1.2" strokeLinecap="square" />
            </svg>
          </div>

          {/* Wordmark */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span
              className="group-hover:text-ember transition-colors duration-200"
              style={{
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: 'clamp(13px, 1.15vw, 16px)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: TRAVERTINE,
                lineHeight: 1,
                display: 'block',
              }}
            >
              MERIDIAN
            </span>
            <span
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 'clamp(8px, 0.7vw, 9.5px)',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: TIMBER,
                lineHeight: 1,
                display: 'block',
              }}
            >
              ROOFING CO.
            </span>
          </div>
        </a>

        {/* ── Desktop nav links (lg+) ─────────────────────────────────────── */}
        <ul
          className="hidden lg:flex"
          style={{ listStyle: 'none', margin: 0, padding: 0, gap: 'clamp(20px, 2.4vw, 36px)', alignItems: 'center' }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>

        {/* ── Right cluster ───────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 1.2vw, 16px)', flexShrink: 0 }}>

          {/*
           * CTA — desktop only (lg+).
           * Hidden on phone AND tablet so the pill never looks crowded.
           * Padding: 11px vertical × 20px horizontal — optically centred for 10px all-caps.
           */}
          <a
            href="#inquiry"
            aria-label="Book a free roofing inspection"
            className="hidden lg:inline-flex cursor-active hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            style={{
              alignItems: 'center',
              gap: '8px',
              padding: 'clamp(10px, 1vw, 13px) clamp(16px, 1.6vw, 22px)',
              background: EMBER,
              color: OBSIDIAN,
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 'clamp(9.5px, 0.85vw, 11px)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              borderRadius: 'clamp(8px, 0.9vw, 11px)',
              border: `2px solid ${EMBER}`,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              boxShadow: '0 3px 12px rgba(216,148,72,0.28)',
              transition: 'opacity 140ms ease, box-shadow 140ms ease',
            }}
          >
            <CalendarCheck size={13} strokeWidth={2.5} aria-hidden />
            Book FREE Inspection
          </a>

          {/* Hamburger — visible below lg */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden flex items-center justify-center cursor-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember hover:text-ember"
            style={{
              width:  'clamp(38px, 5vw, 44px)',
              height: 'clamp(38px, 5vw, 44px)',
              borderRadius: 'clamp(8px, 1vw, 11px)',
              border: '1px solid rgba(140,98,57,0.28)',
              background: 'rgba(140,98,57,0.10)',
              color: TRAVERTINE,
              flexShrink: 0,
              transition: 'color 150ms ease, border-color 150ms ease',
              cursor: 'none',
            }}
          >
            {mobileOpen
              ? <X     size={18} strokeWidth={2}   />
              : <Menu  size={18} strokeWidth={1.8}  />
            }
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile / Tablet Drawer ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1,  y: 0,  scale: 1    }}
            exit={{    opacity: 0,  y: -8,  scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              pointerEvents: 'auto',
              marginTop: '8px',
              background: 'rgba(11,11,10,0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(140,98,57,0.30)',
              borderRadius: 'clamp(14px, 1.8vw, 20px)',
              /*
               * Internal padding: 24px all sides on phone, 32px on tablet.
               * This is the single source that controls ALL internal spacing.
               */
              padding: 'clamp(20px, 4vw, 32px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.80)',
            }}
          >
            {/* Nav links */}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      fontFamily: FONT,
                      fontWeight: 700,
                      fontSize: 'clamp(14px, 2.5vw, 17px)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: TRAVERTINE,
                      textDecoration: 'none',
                      padding: 'clamp(10px, 1.8vw, 14px) 0',
                      borderBottom: '1px solid rgba(140,98,57,0.12)',
                      transition: 'color 150ms ease',
                    }}
                    className="hover:text-ember focus-visible:outline-none focus-visible:text-ember"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA — full-width, inside drawer only */}
            <a
              href="#inquiry"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginTop: 'clamp(16px, 3vw, 24px)',
                padding: 'clamp(14px, 2vw, 18px) 24px',
                background: EMBER,
                color: OBSIDIAN,
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: 'clamp(10px, 1.4vw, 12px)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                borderRadius: 'clamp(10px, 1.2vw, 14px)',
                textDecoration: 'none',
                boxShadow: '0 4px 18px rgba(216,148,72,0.30)',
                transition: 'opacity 140ms ease',
                width: '100%',
                boxSizing: 'border-box',
              }}
              className="hover:opacity-90 cursor-active"
            >
              <CalendarCheck size={15} strokeWidth={2.5} aria-hidden />
              Book FREE Inspection
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative group focus-visible:outline-none"
      style={{
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 'clamp(9.5px, 0.85vw, 11px)',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'rgba(185,174,154,0.75)',
        textDecoration: 'none',
        padding: '4px 0',
        display: 'inline-block',
        transition: 'color 180ms ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = TRAVERTINE }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(185,174,154,0.75)' }}
    >
      {label}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-280 ease-out rounded-full"
        style={{ background: EMBER }}
      />
    </a>
  )
}
