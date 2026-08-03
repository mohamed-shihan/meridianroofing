'use client'
import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: number
}

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.48,
            ease: [0.25, 0.1, 0.25, 1.0],
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
