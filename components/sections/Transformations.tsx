'use client'
import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, MoveHorizontal, Sparkles } from 'lucide-react'
import SectionReveal, { RevealItem } from '@/components/ui/SectionReveal'

interface TransformationItem {
  id: number
  number: string
  title: string
  concept: string
  desc: string
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
}

const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: 1,
    number: '01',
    title: 'Storm & Hurricane Restoration',
    concept: 'Category 5 Wind & Hail Impact Recovery',
    desc: 'Severe storm damage restored with hurricane-tested copper flashing, underlayment, and hand-laid slate tiles.',
    beforeImage: '/before_storm_damage.png',
    afterImage: '/after_storm_restoration.png',
    beforeLabel: 'BEFORE (STORM DAMAGED)',
    afterLabel: 'AFTER (RESTORED SLATE)',
  },
  {
    id: 2,
    number: '02',
    title: 'Old Asphalt to Heritage Slate',
    concept: '50-Year Heritage Slate Upgrade',
    desc: 'Weathered asphalt shingles replaced with premium hand-graded Vermont natural slate tiles.',
    beforeImage: '/before_old_asphalt.png',
    afterImage: '/after_heritage_slate.png',
    beforeLabel: 'BEFORE (OLD SHINGLES)',
    afterLabel: 'AFTER (VERMONT SLATE)',
  },
  {
    id: 3,
    number: '03',
    title: 'Water Damage & Algae Removal',
    concept: 'Concealed Drainage & Copper Flashing',
    desc: 'Algae-stained leaking roof valley replaced with hand-soldered copper valleys and fresh slate.',
    beforeImage: '/before_water_algae.png',
    afterImage: '/after_copper_flashing.png',
    beforeLabel: 'BEFORE (ALGAE & WATER LEAKS)',
    afterLabel: 'AFTER (COPPER FLASHING)',
  },
  {
    id: 4,
    number: '04',
    title: 'Rotting Eaves to Heavy Timber',
    concept: 'Mortise & Tenon Structural Joinery',
    desc: 'Decayed roof eaves reconstructed with structural Douglas fir heavy timber trusses.',
    beforeImage: '/gallery_timber_eaves.png',
    afterImage: '/timber_framing_trusses.png',
    beforeLabel: 'BEFORE (DECAYED EAVES)',
    afterLabel: 'AFTER (TIMBER TRUSSES)',
  },
  {
    id: 5,
    number: '05',
    title: 'Fire Damage Roof Reconstruction',
    concept: 'Class-A Fireproof Slate Build',
    desc: 'Charred roof framing rebuilt with Class-A fireproof natural slate and structural timber trusses.',
    beforeImage: '/gallery_multipitch_truss.png',
    afterImage: '/heritage_slate_tiles.png',
    beforeLabel: 'BEFORE (CHARRED STRUCTURE)',
    afterLabel: 'AFTER (FIREPROOF SLATE)',
  },
]

function WipeSliderCard({ item }: { item: TransformationItem }) {
  const [sliderPos, setSliderPos] = useState(50) // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100)
    setSliderPos(percent)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation() // Stop outer row from scrolling when wiping slider
    isDraggingRef.current = true
    handleMove(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    e.stopPropagation()
    handleMove(e.clientX)
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.stopPropagation()
      isDraggingRef.current = false
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation() // Stop mobile page scroll when wiping slider
    isDraggingRef.current = true
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return
    e.stopPropagation()
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isDraggingRef.current) {
      e.stopPropagation()
      isDraggingRef.current = false
    }
  }

  return (
    <div
      className="flex-shrink-0 w-[340px] sm:w-[440px] md:w-[500px] lg:w-[540px] bg-obsidian/90 border border-timber/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between select-none snap-start"
    >
      {/* Wipe Comparison Header */}
      <div className="p-6 md:p-8 pb-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="font-display font-black text-ember text-2xl tracking-tight">
            {item.number}
          </span>
          <span className="eyebrow text-travertine/50 tracking-[0.2em] text-[9.5px]">
            {item.concept}
          </span>
        </div>
        <h3 className="font-display font-bold text-travertine text-lg md:text-xl uppercase tracking-wide mb-2">
          {item.title}
        </h3>
        <p className="font-body text-travertine/65 text-xs leading-relaxed min-h-[36px]">
          {item.desc}
        </p>
      </div>

      {/* Wipe Image Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] overflow-hidden cursor-ew-resize group select-none"
        style={{ touchAction: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* BEFORE IMAGE (Full Background) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <Image
            src={item.beforeImage}
            alt={`${item.title} - Before`}
            fill
            sizes="540px"
            className="object-cover"
            priority={item.id <= 2}
            draggable={false}
          />
          <div className="absolute top-4 left-4 bg-obsidian/80 backdrop-blur-md px-3 py-1 rounded-full border border-timber/30">
            <span className="font-display font-extrabold text-[9px] tracking-widest uppercase text-travertine/80">
              {item.beforeLabel || 'BEFORE'}
            </span>
          </div>
        </div>

        {/* AFTER IMAGE (Clipped overlay controlled by sliderPos) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <Image
            src={item.afterImage}
            alt={`${item.title} - After`}
            fill
            sizes="540px"
            className="object-cover"
            priority={item.id <= 2}
            draggable={false}
          />
          <div className="absolute top-4 right-4 bg-ember/90 text-obsidian px-3 py-1 rounded-full font-display font-black text-[9px] tracking-widest uppercase shadow-md">
            {item.afterLabel || 'AFTER'}
          </div>
        </div>

        {/* Wipe Bar Divider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-ember z-20 shadow-[0_0_12px_rgba(216,148,72,0.8)] pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-9 h-9 rounded-full bg-ember text-obsidian flex items-center justify-center shadow-2xl border-2 border-obsidian">
            <MoveHorizontal size={18} strokeWidth={2.8} />
          </div>
        </div>

        {/* Swipe Guidance Overlay Cue */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-obsidian/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-timber/30 opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-2">
          <Sparkles size={12} className="text-ember" />
          <span className="font-body text-[10px] text-travertine font-semibold tracking-wider uppercase">
            SWIPE TO COMPARE
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 md:p-5 bg-obsidian/60 border-t border-timber/20 flex justify-between items-center text-xs font-body text-travertine/60">
        <span>SWIPE RIGHT → REVEAL AFTER</span>
        <span>← SWIPE LEFT REVEAL BEFORE</span>
      </div>
    </div>
  )
}

export default function Transformations() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftState, setScrollLeftState] = useState(0)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const offset = direction === 'left' ? -420 : 420
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  // Mouse Grab & Drag horizontal scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsMouseDown(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeftState(scrollRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsMouseDown(false)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.6
    scrollRef.current.scrollLeft = scrollLeftState - walk
  }

  return (
    <section
      id="transformations"
      aria-label="Before & After Roofing Restorations"
      className="section-pad bg-obsidian border-t border-timber/20 scroll-mt-24 md:scroll-mt-28 relative overflow-hidden"
    >
      <div className="max-w-content mx-auto" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        {/* Section Header with Controls */}
        <SectionReveal className="mb-10 md:mb-14">
          <RevealItem>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-ember rounded-full" />
              <p className="eyebrow tracking-[0.26em]">PROVEN RESTORATION RESULTS</p>
            </div>
          </RevealItem>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <RevealItem delay={0.04}>
                <h2
                  className="font-display font-black text-travertine uppercase leading-[1.02] tracking-tight mb-4"
                  style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)' }}
                >
                  BEFORE &amp; AFTER <span className="text-ember">TRANSFORMATIONS.</span>
                </h2>
              </RevealItem>

              <RevealItem delay={0.08}>
                <p className="font-body text-travertine/70 max-w-xl leading-relaxed text-sm md:text-base">
                  Drag the wipe bar on any card to compare structural before &amp; after results. Grab and pull left to explore all 5 estate projects.
                </p>
              </RevealItem>
            </div>

            {/* Navigation Arrows & Grab Cue */}
            <RevealItem delay={0.12}>
              <div className="flex items-center gap-4 shrink-0">
                <div className="hidden sm:flex items-center gap-2 text-timber font-body text-xs uppercase tracking-widest font-extrabold mr-2">
                  <MoveHorizontal size={16} className="animate-pulse" />
                  GRAB &amp; PULL LEFT
                </div>
                <button
                  onClick={() => scroll('left')}
                  className="w-12 h-12 rounded-2xl border border-timber/30 bg-timber/10 text-travertine hover:border-ember hover:text-ember flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  aria-label="Scroll transformations left"
                >
                  <ArrowLeft size={18} strokeWidth={2.2} />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-12 h-12 rounded-2xl border border-timber/30 bg-timber/10 text-travertine hover:border-ember hover:text-ember flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  aria-label="Scroll transformations right"
                >
                  <ArrowRight size={18} strokeWidth={2.2} />
                </button>
              </div>
            </RevealItem>
          </div>
        </SectionReveal>

        {/* Horizontal Drag & Scroll Container */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 md:gap-8 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory ${
            isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollBehavior: isMouseDown ? 'auto' : 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {TRANSFORMATIONS.map((item) => (
            <WipeSliderCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
