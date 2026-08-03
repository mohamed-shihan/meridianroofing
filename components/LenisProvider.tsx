'use client'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    lenis: unknown
  }
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<unknown>(null)

  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null
    let rafId: number

    async function init() {
      const { default: Lenis } = await import('@studio-freight/lenis')
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.2,
      })

      lenisRef.current = lenis

      function raf(time: number) {
        lenis!.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
