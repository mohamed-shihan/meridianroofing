'use client'
import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface ImageRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function ImageReveal({ children, className = '', delay = 0 }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })
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
        hidden: {
          clipPath: 'inset(8% 0% 8% 0%)',
          opacity: 0.6,
        },
        visible: {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          transition: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
