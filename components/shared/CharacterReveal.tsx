'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface CharacterRevealProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function CharacterReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.035,
  tag: Tag = 'span',
}: CharacterRevealProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chars = container.querySelectorAll<HTMLElement>('[data-char-inner]')

    gsap.fromTo(
      chars,
      { yPercent: 115, opacity: 0, rotateX: -40 },
      {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.85,
        stagger,
        delay,
        ease: 'power4.out',
        transformOrigin: '50% 0%',
      }
    )
  }, [delay, stagger])

  const Tag2 = Tag as React.ElementType
  return (
    <Tag2
      ref={containerRef}
      className={className}
      aria-label={text}
      style={{ perspective: '800px' }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: 'top', lineHeight: 'inherit' }}
          aria-hidden="true"
        >
          <span
            data-char-inner
            className="inline-block"
            style={{ willChange: 'transform, opacity' }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        </span>
      ))}
    </Tag2>
  )
}
