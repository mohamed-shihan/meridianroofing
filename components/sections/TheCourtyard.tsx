'use client'
import Image from 'next/image'
import SectionReveal, { RevealItem } from '@/components/ui/SectionReveal'
import ImageReveal from '@/components/ui/ImageReveal'

export default function TheCourtyard() {
  return (
    <section
      id="the-courtyard"
      aria-label="Roofline Geometry & Copper Flashing"
      className="section-pad bg-obsidian"
    >
      <div className="max-w-content mx-auto" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <span className="divider-timber block" aria-hidden />

        {/* Flipped back: copy left / image right */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] items-center" style={{ gap: 'clamp(40px, 6vw, 80px)' }}>
          {/* Copy — left */}
          <SectionReveal className="flex flex-col justify-center">
            <RevealItem>
              <p className="eyebrow mb-4 tracking-[0.24em]">ROOFLINE GEOMETRY & FLASHING</p>
            </RevealItem>
            <RevealItem>
              <h2
                className="font-display font-black text-travertine mb-6 uppercase leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2rem, 4.2vw, 3.4rem)' }}
              >
                Multi-Pitch Valleys & Custom Copper Detailing
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
                Complex estate rooflines demand uncompromising flashing craftsmanship. From hand-soldered copper valleys to custom dormer caps, chimney crickets, and concealed drainage, we engineer every intersection so water sheds effortlessly without compromising architectural form.
              </p>
            </RevealItem>
          </SectionReveal>

          {/* Image — right */}
          <ImageReveal className="w-full" delay={0.15}>
            <div className="relative w-full overflow-hidden rounded-xl border border-timber/30 shadow-2xl" style={{ aspectRatio: '4/3' }}>
              <Image
                src="/ezgif-frame-001.webp"
                alt="Aerial view of complex multi-pitch timber roof framing and courtyard geometry"
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
