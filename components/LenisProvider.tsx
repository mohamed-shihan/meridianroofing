'use client'
import { useEffect, useRef } from 'react'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<unknown>(null)

  useEffect(() => {
    let rafId: number

    async function init() {
      const Lenis = (await import('lenis')).default
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.2,
      })

      lenisRef.current = lenis

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      cancelAnimationFrame(rafId)
      const l = lenisRef.current as { destroy?: () => void } | null
      if (l?.destroy) l.destroy()
    }
  }, [])

  return <>{children}</>
}
