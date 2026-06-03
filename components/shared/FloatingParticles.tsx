'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Deterministic values — no Math.random() in render to avoid hydration mismatch
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: (i * 37 + 11) % 100,
  y: (i * 41 + 7) % 100,
  size: (i % 3) + 1.2,
  isRed: i % 3 === 0,
  floatY: -((i * 13 % 80) + 50),
  floatX: ((i * 17 % 60) - 30),
  duration: (i * 7 % 5) + 4,
  initDelay: (i * 3 % 20) / 10,
  targetOpacity: ((i * 11 % 30) + 8) / 100,
}))

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const els = container.querySelectorAll<HTMLElement>('[data-particle]')

    const ctx = gsap.context(() => {
      els.forEach((el, i) => {
        const p = PARTICLES[i]
        if (!p) return

        gsap.fromTo(
          el,
          { opacity: 0, scale: 0 },
          {
            opacity: p.targetOpacity,
            scale: 1,
            delay: p.initDelay,
            duration: 0.9,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(el, {
                y: p.floatY,
                x: p.floatX,
                opacity: p.targetOpacity * 0.6,
                duration: p.duration,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: p.initDelay * 0.5,
              })
            },
          }
        )
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {PARTICLES.map(({ id, x, y, size, isRed }) => (
        <div
          key={id}
          data-particle
          className="absolute rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}%`,
            top: `${y}%`,
            background: isRed ? '#ef4444' : 'rgba(255,255,255,0.55)',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}
