'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
  display: string
  target: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function AnimatedCounter({
  display,
  target,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          if (triggered.current) return
          triggered.current = true

          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 2.2,
            ease: 'power3.out',
            onUpdate: () => {
              const rounded = Math.round(obj.val)
              el.textContent = `${prefix}${rounded.toLocaleString('pt-BR')}${suffix}`
            },
            onComplete: () => {
              el.textContent = display
            },
          })
        },
      })
    })

    return () => ctx.revert()
  }, [display, target, prefix, suffix])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
