'use client'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="footer"
      aria-label="Footer"
      className="bg-obsidian border-t border-timber/25"
    >
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-timber/20 border border-timber/40 flex items-center justify-center text-ember">
                <svg width="14" height="12" viewBox="0 0 18 14" fill="none" aria-hidden>
                  <path d="M1 13L9 2L17 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                </svg>
              </div>
              <p className="font-display font-black text-travertine tracking-[0.14em] uppercase text-base">
                MERIDIAN ROOFING CO.
              </p>
            </div>
            <p className="font-body text-travertine/50 text-xs leading-relaxed max-w-[260px]">
              Master Timber Framing &amp; Slate Roofing Contractors. Built once. Built right.
            </p>
          </div>

          {/* Column 2 — Fine print */}
          <div className="flex flex-col gap-3">
            <p className="eyebrow text-travertine/40 mb-1 tracking-[0.2em]">LICENSING &amp; PRIVACY</p>
            <p className="font-body text-travertine/45 text-xs leading-relaxed">
              Meridian Roofing Co. is a licensed master roofing &amp; timber framing contractor (FL State Cert #CCC133099). All architectural imagery proprietary.
            </p>
            <p className="font-body text-travertine/45 text-xs leading-relaxed">
              Specializing in bespoke estate roofing systems, hand-laid slate, and structural timber trusses.
            </p>
          </div>

          {/* Column 3 — Contact */}
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-travertine/40 mb-1 tracking-[0.2em]">PRIVATE APPOINTMENTS</p>
            <address className="not-italic flex flex-col gap-3">
              <a
                href="mailto:inquire@meridianroofing.co"
                className="group flex items-center gap-2.5 text-travertine/60 hover:text-ember text-xs font-body font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ember"
                aria-label="Email Meridian Roofing Co."
              >
                <Mail size={14} strokeWidth={1.5} aria-hidden />
                inquire@meridianroofing.co
              </a>
              <a
                href="tel:+13055550199"
                className="group flex items-center gap-2.5 text-travertine/60 hover:text-ember text-xs font-body font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ember"
                aria-label="Call Meridian Roofing Co."
              >
                <Phone size={14} strokeWidth={1.5} aria-hidden />
                +1 (305) 555&ndash;0199
              </a>
              <span className="flex items-center gap-2.5 text-travertine/45 text-xs font-body">
                <MapPin size={14} strokeWidth={1.5} aria-hidden />
                South Florida &bull; National Estate Contracting
              </span>
            </address>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-timber/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="font-body text-travertine/35 text-xs">
            &copy; {year} Meridian Roofing Co. All rights reserved.
          </p>
          <p className="font-body text-travertine/30 text-xs tracking-wider uppercase font-semibold">
            By Private Appointment Only
          </p>
        </div>
      </div>
    </footer>
  )
}
