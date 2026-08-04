'use client'
import Image from 'next/image'
import { CalendarCheck } from 'lucide-react'
import SectionReveal, { RevealItem } from '@/components/ui/SectionReveal'
import {
  FloatingLabelInput,
  FloatingLabelTextarea,
  FloatingSelect,
} from '@/components/ui/FloatingLabel'

const PROJECT_TYPE_OPTIONS = [
  { value: 'new-estate', label: 'New Estate Roof Construction' },
  { value: 'slate-restoration', label: 'Slate or Tile Roof Restoration' },
  { value: 'timber-framing', label: 'Heavy Timber Framing & Trusses' },
  { value: 'copper-flashing', label: 'Copper Flashing & Custom Gutters' },
  { value: 'inspection', label: 'Structural Roof Inspection' },
]

const TIMELINE_OPTIONS = [
  { value: 'immediate', label: 'Immediate / Active Build' },
  { value: '3months', label: 'Within 3 Months' },
  { value: '6months', label: 'Within 6 Months' },
  { value: 'planning', label: 'Planning / Architectural Stage' },
]

export default function Inquiry() {
  return (
    <section
      id="inquiry"
      aria-label="Request a Roofing Consultation"
      className="relative min-h-screen flex items-center pt-24 pb-20"
    >
      {/* Background — frame 285 */}
      <Image
        src="/ezgif-frame-285.webp"
        alt="Meridian Roofing Co. — Estate roof project at dusk"
        fill
        quality={85}
        sizes="100vw"
        className="object-cover object-center"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(135deg, rgba(11,11,10,0.96) 0%, rgba(11,11,10,0.88) 50%, rgba(11,11,10,0.80) 100%)',
        }}
      />

      <div className="relative z-20 w-full max-w-content mx-auto" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)', paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-16 lg:gap-24 items-start">
          {/* Left — copy */}
          <SectionReveal className="lg:sticky lg:top-36">
            <RevealItem>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-0.5 bg-ember" />
                <p className="eyebrow tracking-[0.24em]">ROOFING CONSULTATION</p>
              </div>
            </RevealItem>
            <RevealItem>
              <h2
                className="font-display font-black text-travertine mb-6 uppercase leading-[1.02] tracking-tight"
                style={{
                  fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)',
                }}
              >
                PROTECT YOUR ESTATE&apos;S <span className="text-ember">ARCHITECTURAL INVESTMENT.</span>
              </h2>
            </RevealItem>
            <RevealItem delay={0.06}>
              <p className="font-body font-semibold text-ember text-sm uppercase tracking-wider mb-6">
                Schedule a Private Structural &amp; Roofing Consultation.
              </p>
            </RevealItem>
            <RevealItem delay={0.08}>
              <p className="font-body text-travertine/70 max-w-sm leading-relaxed text-sm">
                Available for luxury new builds, slate restorations, heavy timber framing, and architectural roofing projects.
              </p>
            </RevealItem>
          </SectionReveal>

          {/* Right — form */}
          <SectionReveal>
            <RevealItem delay={0.1}>
              <form
                aria-label="Private roofing consultation form"
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-2 bg-obsidian/60 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-timber/30 shadow-2xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  <FloatingLabelInput
                    label="First Name"
                    name="firstName"
                    required
                    autoComplete="given-name"
                  />
                  <FloatingLabelInput
                    label="Last Name"
                    name="lastName"
                    required
                    autoComplete="family-name"
                  />
                </div>

                <FloatingLabelInput
                  label="Email Address"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                />

                <FloatingLabelInput
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                />

                <FloatingSelect
                  label="Project Category"
                  name="projectType"
                  options={PROJECT_TYPE_OPTIONS}
                />

                <FloatingSelect
                  label="Estimated Timeline"
                  name="timeline"
                  options={TIMELINE_OPTIONS}
                />

                <FloatingLabelTextarea
                  label="Project Scope & Architectural Details"
                  name="message"
                  rows={4}
                />

                <div className="pt-6">
                  <button
                    type="submit"
                    className="btn-primary cursor-active w-full sm:w-auto font-extrabold tracking-widest uppercase text-xs"
                    aria-label="Submit free roofing inspection request"
                  >
                    BOOK FREE INSPECTION
                    <CalendarCheck size={15} strokeWidth={2.5} aria-hidden />
                  </button>
                </div>

                <p className="text-travertine/40 text-xs font-body mt-4 leading-relaxed">
                  Your property specifications are held with absolute discretion. All consultations are confidential.
                </p>
              </form>
            </RevealItem>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
