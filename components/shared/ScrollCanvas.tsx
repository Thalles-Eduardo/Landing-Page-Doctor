'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseVx: number
  baseVy: number
  size: number
  baseOpacity: number
  colorIdx: number
}

const COLORS = [
  'rgba(59,130,246,COLOR)',   // blue-500
  'rgba(96,165,250,COLOR)',   // blue-400
  'rgba(147,197,253,COLOR)',  // blue-300
  'rgba(255,255,255,COLOR)',  // white
]

const MAX_DIST = 150
const MOUSE_RADIUS = 130
const MOUSE_FORCE = 1.8

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)
  const frameRef = useRef<number>(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const isMobile = W < 768
    const COUNT = isMobile ? 45 : 90

    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      const bvx = (Math.random() - 0.5) * 0.35
      const bvy = (Math.random() - 0.5) * 0.35
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: bvx,
        vy: bvy,
        baseVx: bvx,
        baseVy: bvy,
        size: Math.random() * 1.8 + 0.4,
        baseOpacity: Math.random() * 0.55 + 0.15,
        colorIdx: Math.floor(Math.random() * COLORS.length),
      }
    })

    const render = () => {
      ctx.clearRect(0, 0, W, H)
      const p = progressRef.current
      const mouse = mouseRef.current

      const curve = Math.sin(p * Math.PI)
      const speedMult = 1 + curve * 5
      const connOpacity = Math.max(0, 1 - p * 1.8)

      // Draw connections between particles
      if (connOpacity > 0.01) {
        for (let i = 0; i < COUNT; i++) {
          for (let j = i + 1; j < COUNT; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < MAX_DIST) {
              const alpha = (1 - dist / MAX_DIST) * 0.22 * connOpacity
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `rgba(59,130,246,${alpha})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      // Draw mouse connections and glow
      const mouseActive = mouse.x > -100
      if (mouseActive) {
        // Soft aura at mouse
        const aura = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS)
        aura.addColorStop(0, 'rgba(96,165,250,0.06)')
        aura.addColorStop(1, 'rgba(59,130,246,0)')
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = aura
        ctx.fill()

        // Lines from mouse to nearby particles
        for (let i = 0; i < COUNT; i++) {
          const dx = particles[i].x - mouse.x
          const dy = particles[i].y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS) {
            const alpha = (1 - dist / MOUSE_RADIUS) * 0.5
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(particles[i].x, particles[i].y)
            ctx.strokeStyle = `rgba(147,197,253,${alpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particles.forEach((part) => {
        // Restore toward base velocity
        part.vx += (part.baseVx - part.vx) * 0.03
        part.vy += (part.baseVy - part.vy) * 0.03

        // Mouse repulsion
        if (mouseActive) {
          const dx = part.x - mouse.x
          const dy = part.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * MOUSE_FORCE
            const angle = Math.atan2(dy, dx)
            part.vx += Math.cos(angle) * force * 0.12
            part.vy += Math.sin(angle) * force * 0.12
          }
        }

        // Cap velocity
        const spd = Math.sqrt(part.vx * part.vx + part.vy * part.vy)
        if (spd > 3) {
          part.vx = (part.vx / spd) * 3
          part.vy = (part.vy / spd) * 3
        }

        part.x += part.vx * speedMult
        part.y += part.vy * speedMult

        if (part.x < -5) part.x = W + 5
        if (part.x > W + 5) part.x = -5
        if (part.y < -5) part.y = H + 5
        if (part.y > H + 5) part.y = -5

        // Boost opacity when near mouse
        let opacityBoost = 1
        if (mouseActive) {
          const dx = part.x - mouse.x
          const dy = part.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS) {
            opacityBoost = 1 + (1 - dist / MOUSE_RADIUS) * 1.2
          }
        }

        const particleOpacity = Math.min(1, part.baseOpacity * (0.6 + curve * 0.6) * opacityBoost)
        const colorStr = COLORS[part.colorIdx].replace('COLOR', String(particleOpacity))

        ctx.beginPath()
        ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2)
        ctx.fillStyle = colorStr
        ctx.fill()

        // Glow for larger particles
        if (part.size > 1.2) {
          ctx.beginPath()
          ctx.arc(part.x, part.y, part.size * 3, 0, Math.PI * 2)
          const grad = ctx.createRadialGradient(
            part.x, part.y, part.size,
            part.x, part.y, part.size * 3
          )
          grad.addColorStop(0, `rgba(59,130,246,${particleOpacity * 0.15})`)
          grad.addColorStop(1, 'rgba(59,130,246,0)')
          ctx.fillStyle = grad
          ctx.fill()
        }
      })

      frameRef.current = requestAnimationFrame(render)
    }

    render()

    const gsapCtx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          progressRef.current = self.progress
        },
      })
    })

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(frameRef.current)
      gsapCtx.revert()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.65 }}
      aria-hidden="true"
    />
  )
}
