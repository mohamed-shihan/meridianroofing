'use client'
import Image from 'next/image'
import SectionReveal, { RevealItem } from '@/components/ui/SectionReveal'
import ImageReveal from '@/components/ui/ImageReveal'

export default function TheGrounds() {
  return (
    <section
      id="the-grounds"
      aria-label="Heritage Slate & Tile Systems"
      className="section-pad bg-hedge scroll-mt-24 md:scroll-mt-28"
    >
      <div className="max-w-content mx-auto" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <span className="divider-timber block" aria-hidden />

        {/* Flipped: image left / copy right */}
        <div className="grid grid-cols-1 lg:grid-cols-[6fr_5fr] items-center" style={{ gap: 'clamp(40px, 6vw, 80px)' }}>
          {/* Image — left */}
          <ImageReveal className="w-full order-2 lg:order-1" delay={0.1}>
            <div className="relative w-full overflow-hidden rounded-2xl lg:rounded-3xl border border-timber/30 shadow-2xl" style={{ aspectRatio: '4/3' }}>
              <Image
                src="/heritage_slate_tiles.png"
                alt="Hand-laid heritage slate tiles with copper rivets on luxury estate roof"
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />
            </div>
          </ImageReveal>

          {/* Copy — right column */}
          <SectionReveal className="flex flex-col justify-center order-1 lg:order-2">
            <RevealItem>
              <p className="eyebrow mb-4 tracking-[0.24em]">SLATE & ARCHITECTURAL TILES</p>
            </RevealItem>
            <RevealItem>
              <h2
                className="font-display font-black text-travertine mb-6 uppercase leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2rem, 4.2vw, 3.4rem)' }}
              >
                Heritage Slate Shingles Laid By Master Artisans
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
                Sourced from historic domestic and European quarries, our natural slate tiles are hand-selected, individually thickness-graded, and copper-riveted by master roofers. Class A fireproof and storm-tested to 180 mph, our slate roof systems age gracefully into unmatched aesthetic depth.
              </p>
            </RevealItem>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
