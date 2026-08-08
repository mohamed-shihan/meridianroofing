'use client'
import { useState } from 'react'
import Image from 'next/image'
import { CalendarCheck, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
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
  const [step, setStep] = useState(1)

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault()
    setStep((s) => Math.min(s + 1, 3))
  }

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault()
    setStep((s) => Math.max(s - 1, 1))
  }

  const slideVariants: Variants = {
    hiddenRight: { x: 30, opacity: 0 },
    hiddenLeft: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exitRight: { x: 30, opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
    exitLeft: { x: -30, opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
  }

  return (
    <section
      id="inquiry"
      aria-label="Request a Roofing Consultation"
      className="relative min-h-screen flex items-center pt-24 pb-20 scroll-mt-24 md:scroll-mt-28"
    >
      {/* Background — luxury estate dusk */}
      <Image
        src="/hero_background.png"
        alt="Meridian Roofing Co. — Ultra-luxury estate roof project at dusk"
        fill
        quality={90}
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
                style={{
                  padding: 'clamp(32px, 4.5vw, 56px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
                className="bg-obsidian/85 backdrop-blur-xl rounded-3xl border border-timber/30 shadow-2xl relative overflow-hidden min-h-[540px]"
              >
                {/* Progress Indicators */}
                <div className="flex gap-3 mb-6 pt-2" style={{ paddingLeft: '4px', paddingRight: '4px' }}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                        step >= i ? 'bg-ember' : 'bg-timber/25'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex-1 relative">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        variants={slideVariants}
                        initial="hiddenLeft"
                        animate="visible"
                        exit="exitLeft"
                        className="flex flex-col gap-5 py-2"
                      >
                        <h3
                          className="font-display font-bold text-travertine text-xl sm:text-2xl tracking-wide uppercase px-4 md:px-5 pt-2 mb-6"
                        >
                          Contact Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
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

                        <div className="pt-8 flex justify-end">
                          <button
                            type="button"
                            onClick={nextStep}
                            className="btn-primary cursor-active w-full sm:w-auto font-extrabold tracking-widest uppercase text-xs flex items-center justify-center"
                          >
                            Next Step
                            <ArrowRight size={15} strokeWidth={2.5} aria-hidden className="ml-2" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        variants={slideVariants}
                        initial={step > 1 ? 'hiddenRight' : 'hiddenLeft'}
                        animate="visible"
                        exit={step > 2 ? 'exitLeft' : 'exitRight'}
                        className="flex flex-col gap-4 py-2"
                      >
                        <h3
                          className="font-display font-bold text-travertine text-xl sm:text-2xl tracking-wide uppercase px-4 md:px-5 pt-2 mb-6"
                        >
                          Project Specifications
                        </h3>
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

                        <div className="pt-8 flex flex-col sm:flex-row justify-between gap-4">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="btn-secondary cursor-active w-full sm:w-auto font-extrabold tracking-widest uppercase text-xs flex items-center justify-center border border-timber/30 px-6 py-4 rounded-xl text-travertine hover:border-ember transition-colors"
                          >
                            <ArrowLeft size={15} strokeWidth={2.5} aria-hidden className="mr-2" />
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={nextStep}
                            className="btn-primary cursor-active w-full sm:w-auto font-extrabold tracking-widest uppercase text-xs flex items-center justify-center"
                          >
                            Next Step
                            <ArrowRight size={15} strokeWidth={2.5} aria-hidden className="ml-2" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        variants={slideVariants}
                        initial="hiddenRight"
                        animate="visible"
                        exit="exitRight"
                        className="flex flex-col gap-4 py-2"
                      >
                        <h3
                          className="font-display font-bold text-travertine text-xl sm:text-2xl tracking-wide uppercase px-4 md:px-5 pt-2 mb-6"
                        >
                          Architectural Details
                        </h3>
                        <FloatingLabelTextarea
                          label="Project Scope & Architectural Details"
                          name="message"
                          rows={4}
                        />

                        <div className="pt-8 flex flex-col sm:flex-row justify-between gap-4 px-1">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="btn-secondary cursor-active w-full sm:w-auto font-extrabold tracking-widest uppercase text-xs flex items-center justify-center border border-timber/30 px-6 py-4 rounded-xl text-travertine hover:border-ember transition-colors"
                          >
                            <ArrowLeft size={15} strokeWidth={2.5} aria-hidden className="mr-2" />
                            Back
                          </button>
                          <button
                            type="submit"
                            className="btn-primary cursor-active w-full sm:w-auto font-extrabold tracking-widest uppercase text-xs flex items-center justify-center"
                            aria-label="Submit free roofing inspection request"
                          >
                            BOOK INSPECTION
                            <CalendarCheck size={15} strokeWidth={2.5} aria-hidden className="ml-2" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <p className="text-travertine/50 text-xs font-body mt-6 pb-2 px-4 leading-relaxed text-center">
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
