'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getAllFrameUrls, getStageLabel } from '@/lib/frames'

// Total number of keyframes to load (every 5th of 300 = 60)
const FRAME_COUNT = 60

export default function ConstructionDissolve() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const loadedCountRef = useRef(0)
  const [loadProgress, setLoadProgress] = useState(0)
  const [stageLabel, setStageLabel] = useState('Timber Framing')
  const [currentProgress, setCurrentProgress] = useState(0)

  // Preload all keyframes
  useEffect(() => {
    if (prefersReduced) return

    const urls = getAllFrameUrls()
    const images: HTMLImageElement[] = new Array(FRAME_COUNT)
    imagesRef.current = images
    let loaded = 0

    urls.forEach((url, i) => {
      const img = new window.Image()
      img.src = url
      img.onload = () => {
        images[i] = img
        loaded++
        loadedCountRef.current = loaded
        setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100))
      }
      img.onerror = () => {
        loaded++
        loadedCountRef.current = loaded
      }
    })
  }, [prefersReduced])

  // Draw a frame to canvas
  function drawFrame(index: number) {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = imagesRef.current[index]
    if (!canvas || !ctx || !img) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const canvasAspect = canvas.width / canvas.height
    const imgAspect = img.naturalWidth / img.naturalHeight
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      // Contain logic for mobile to zoom out
      if (imgAspect > canvasAspect) {
        const scaledHeight = canvas.width / imgAspect
        const yOffset = (canvas.height - scaledHeight) / 2
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, yOffset, canvas.width, scaledHeight)
      } else {
        const scaledWidth = canvas.height * imgAspect
        const xOffset = (canvas.width - scaledWidth) / 2
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, xOffset, 0, scaledWidth, canvas.height)
      }
    } else {
      // Cover logic for desktop
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight

      if (imgAspect > canvasAspect) {
        sw = img.naturalHeight * canvasAspect
        sx = (img.naturalWidth - sw) / 2
      } else {
        sh = img.naturalWidth / canvasAspect
        sy = (img.naturalHeight - sh) / 2
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
    }
  }

  // Init GSAP ScrollTrigger once frames start loading
  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !canvasRef.current) return

    let cleanup: (() => void) | null = null

    async function initGSAP() {
      const gsapModule = await import('gsap')
      // GSAP v3: types only expose .default; at runtime both .default and .gsap
      // are equivalent. Using .default satisfies the TypeScript compiler.
      const gsap = gsapModule.default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const canvas = canvasRef.current!
      const section = sectionRef.current!

      // Resize canvas to match DPR
      function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio, 2)
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        const ctx = canvas.getContext('2d')
        if (ctx) ctx.scale(dpr, dpr)
        // Redraw current frame after resize
        const frameObj = { index: 0 }
        drawFrame(frameObj.index)
      }

      resizeCanvas()

      const state = { frame: 0, parallaxY: 0 }

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=220%',
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress
          const frameIndex = Math.round(progress * (FRAME_COUNT - 1))

          if (frameIndex !== state.frame) {
            state.frame = frameIndex
            drawFrame(frameIndex)
          }

          // Subtle parallax drift: shift canvas ±2% vertically
          const drift = (progress - 0.5) * 4 // -2% to +2%
          canvas.style.transform = `translateY(${drift}%)`

          // Update UI labels
          setCurrentProgress(progress)
          setStageLabel(getStageLabel(progress))
        },
      })

      const resizeObserver = new ResizeObserver(resizeCanvas)
      resizeObserver.observe(canvas)

      cleanup = () => {
        trigger.kill()
        resizeObserver.disconnect()
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }

    // Short delay to let frames start loading
    const timer = setTimeout(initGSAP, 200)

    return () => {
      clearTimeout(timer)
      if (cleanup) cleanup()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReduced])

  // Reduced-motion fallback: static finished image
  if (prefersReduced) {
    return (
      <section id="the-build" aria-label="The Build — completed estate" className="relative w-full h-screen">
        <Image
          src="/ezgif-frame-300.webp"
          alt="Meridian Estate — completed aerial view"
          fill
          quality={90}
          sizes="100vw"
          className="object-contain md:object-cover object-center"
        />
        <div className="absolute inset-0 bg-obsidian/50" />
        <div className="absolute bottom-10 left-8 md:left-16">
          <p className="eyebrow text-travertine/60 mb-1">The Build</p>
          <p className="font-display text-travertine text-2xl" style={{ fontWeight: 300 }}>Estate Complete</p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="the-build"
      ref={sectionRef}
      aria-label="The Build — scroll to scrub through construction stages"
      className="relative w-full overflow-hidden h-[100svh]"
    >
      {/* Canvas — the frame scrubber */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="scrubber-canvas absolute inset-0 w-full h-full"
        style={{ willChange: 'transform', display: 'block' }}
      />

      {/* Loading bar — disappears once frames are ready */}
      {loadProgress < 100 && (
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-px bg-timber/40 transition-all duration-300"
          style={{ width: `${loadProgress}%` }}
        />
      )}

      {/* Bottom-left stage label badge */}
      <div
        className="absolute bottom-10 left-6 sm:bottom-12 sm:left-10 z-10 pointer-events-none rounded-2xl border border-timber/40 shadow-2xl"
        style={{
          background: 'rgba(11,11,10,0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: 'clamp(16px, 2.5vw, 28px) clamp(20px, 3vw, 36px)',
          /* Never wider than 90% of viewport, never taller than needed */
          maxWidth: 'min(480px, calc(100vw - 48px))',
          boxSizing: 'border-box',
        }}
      >
        <p
          style={{
            fontFamily: 'Montserrat, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: '10px',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#8C6239',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginBottom: '8px',
          }}
        >
          ROOFING CONSTRUCTION SEQUENCE
        </p>
        <p
          key={stageLabel}
          style={{
            fontFamily: 'Montserrat, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            lineHeight: 1.2,
            color: '#B9AE9A',
            animation: 'fadeInStage 0.35s ease forwards',
          }}
        >
          {stageLabel}
        </p>
      </div>

      {/* Progress bar — right side */}
      <div
        aria-hidden
        className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 h-24 w-px bg-travertine/15 z-10"
      >
        <div
          className="absolute top-0 left-0 w-full bg-ember transition-none"
          style={{ height: `${currentProgress * 100}%` }}
        />
      </div>

      {/* Subtle Obsidian vignette at bottom to ease into next section */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(11,11,10,0.7))',
        }}
      />

      <style jsx>{`
        @keyframes fadeInStage {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
