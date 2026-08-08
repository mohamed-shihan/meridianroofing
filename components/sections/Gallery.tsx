'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import SectionReveal, { RevealItem } from '@/components/ui/SectionReveal'
import ImageReveal from '@/components/ui/ImageReveal'

const GALLERY_ITEMS = [
  {
    src: '/gallery_slate_copper.png',
    alt: 'Hand-laid slate roof tile installation with custom copper edge detailing',
    caption: 'Slate Tile & Copper Edging',
    span: 'lg:col-span-2 lg:row-span-2',
    aspect: '16/10',
  },
  {
    src: '/gallery_copper_dormer.png',
    alt: 'Custom copper dormer flashing and architectural gutter craft',
    caption: 'Architectural Copper Flashing',
    span: '',
    aspect: '4/3',
  },
  {
    src: '/gallery_timber_eaves.png',
    alt: 'Heavy timber roof eaves and overhang framing integrated with glass facade',
    caption: 'Timber Eaves & Facade Roofing',
    span: '',
    aspect: '4/3',
  },
  {
    src: '/gallery_multipitch_truss.png',
    alt: 'Aerial structural roof detail showing slate tiles over heavy timber trusses',
    caption: 'Multi-Pitch Truss Geometry',
    span: 'lg:col-span-2',
    aspect: '16/7',
  },
]

export default function Gallery() {
  const [activePreview, setActivePreview] = useState<string | null>(null)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 200 }
  const previewX = useSpring(cursorX, springConfig)
  const previewY = useSpring(cursorY, springConfig)

  const containerRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent) {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
  }

  return (
    <section
      id="gallery"
      aria-label="Roofing Portfolio Gallery"
      className="section-pad bg-obsidian scroll-mt-24 md:scroll-mt-28"
    >
      <div className="max-w-content mx-auto" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <span className="divider-timber mb-12 block" aria-hidden />

        <SectionReveal className="mb-10 md:mb-14">
          <RevealItem>
            <div className="flex items-center gap-3">
              <span className="w-6 h-0.5 bg-ember" />
              <p className="eyebrow tracking-[0.24em]">CRAFTSMANSHIP PORTFOLIO</p>
            </div>
          </RevealItem>
        </SectionReveal>

        {/* Cursor-following preview */}
        <motion.div
          aria-hidden
          className="fixed top-0 left-0 pointer-events-none z-50 rounded-2xl overflow-hidden border border-ember/40 shadow-2xl"
          style={{
            x: previewX,
            y: previewY,
            translateX: '-50%',
            translateY: '-120%',
            width: 280,
            opacity: activePreview ? 0.95 : 0,
            transition: 'opacity 0.2s ease',
          }}
        >
          {activePreview && (
            <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
              <Image
                src={activePreview}
                alt="Roofing craft detail preview"
                fill
                quality={60}
                sizes="280px"
                className="object-cover"
              />
            </div>
          )}
        </motion.div>

        {/* Unequal-ratio gallery grid */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {GALLERY_ITEMS.map((item, i) => (
            <ImageReveal
              key={item.src}
              className={`w-full ${item.span}`}
              delay={i * 0.06}
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl lg:rounded-3xl border border-timber/25 group cursor-active"
                style={{ aspectRatio: item.aspect }}
                onMouseEnter={() => setActivePreview(item.src)}
                onMouseLeave={() => setActivePreview(null)}
                role="img"
                aria-label={item.alt}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
                {/* Caption on hover */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-obsidian/95 via-obsidian/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-display font-extrabold text-travertine text-base uppercase tracking-wider mb-1">
                    {item.caption}
                  </p>
                  <p className="font-body text-xs text-travertine/70 leading-normal">
                    {item.alt}
                  </p>
                </div>
              </div>
            </ImageReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
