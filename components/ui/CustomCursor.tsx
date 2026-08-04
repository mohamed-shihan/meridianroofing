'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 280, mass: 0.5 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  const ringSpringConfig = { damping: 20, stiffness: 150, mass: 0.8 }
  const ringX = useSpring(cursorX, ringSpringConfig)
  const ringY = useSpring(cursorY, ringSpringConfig)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const enter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a, button, [data-cursor], .cursor-active, input, textarea, select, [role="button"]')
      ) {
        setIsActive(true)
      }
    }

    const leave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        !target.closest('a, button, [data-cursor], .cursor-active, input, textarea, select, [role="button"]')
      ) {
        setIsActive(false)
      }
    }

    const exit = () => setIsVisible(false)

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', enter)
    document.addEventListener('mouseout', leave)
    document.addEventListener('mouseleave', exit)

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', enter)
      document.removeEventListener('mouseout', leave)
      document.removeEventListener('mouseleave', exit)
    }
  }, [cursorX, cursorY, isVisible])

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: isActive ? 6 : 4,
            height: isActive ? 6 : 4,
            backgroundColor: '#D89448',
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full"
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: isActive ? 32 : 20,
            height: isActive ? 32 : 20,
            borderColor: isActive ? '#D89448' : 'rgba(185,174,154,0.6)',
            borderWidth: 1,
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full border"
        />
      </motion.div>
    </>
  )
}
