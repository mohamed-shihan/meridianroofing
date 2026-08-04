'use client'
import Image from 'next/image'
import SectionReveal, { RevealItem } from '@/components/ui/SectionReveal'
import ImageReveal from '@/components/ui/ImageReveal'

export default function TheApproach() {
  return (
    <section
      id="the-approach"
      aria-label="Structural Framing & Timber Trusses"
      className="section-pad bg-obsidian"
    >
      <div className="max-w-content mx-auto" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        {/* Hairline divider */}
        <span className="divider-timber block" aria-hidden />

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] items-center" style={{ gap: 'clamp(40px, 6vw, 80px)' }}>
          {/* Copy — left column */}
          <SectionReveal className="flex flex-col justify-center">
            <RevealItem>
              <p className="eyebrow mb-4 tracking-[0.24em]">STRUCTURAL TIMBER FRAMING</p>
            </RevealItem>
            <RevealItem>
              <h2
                className="font-display font-black text-travertine mb-6 uppercase leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2rem, 4.2vw, 3.4rem)' }}
              >
                Timber Trusses Engineered For Generations
              </h2>
            </RevealItem>
            <RevealItem delay={0.04}>
              <div className="w-12 h-1 bg-ember mb-7 rounded-full" aria-hidden />
            </RevealItem>
            <RevealItem delay={0.06}>
              <p
                className="font-body font-normal text-travertine/75 max-w-prose leading-relaxed"
                style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}
              >
                Before a single slate is laid, our heavy timber framing and precision roof trusses establish unyielding structural integrity. Every beam, mortise, and joint is calculated to withstand severe climate loads while delivering breathtaking architectural proportion.
              </p>
            </RevealItem>
          </SectionReveal>

          {/* Image — right column */}
          <ImageReveal className="w-full" delay={0.15}>
            <div className="relative w-full overflow-hidden rounded-xl border border-timber/30 shadow-2xl" style={{ aspectRatio: '4/3' }}>
              <Image
                src="/ezgif-frame-250.webp"
                alt="Heavy timber framing and structural roof truss installation on luxury residential estate"
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />
            </div>
          </ImageReveal>
        </div>
      </div>
    </section>
  )
}
