'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedCounter from '@/components/shared/AnimatedCounter'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { display: '15+', target: 15, prefix: '', suffix: '+', label: 'Anos de Experiência', detail: 'em ortopedia e traumatologia' },
  { display: '+5.000', target: 5000, prefix: '+', suffix: '', label: 'Cirurgias Realizadas', detail: 'com sucesso e segurança' },
  { display: '+8.000', target: 8000, prefix: '+', suffix: '', label: 'Pacientes Atendidos', detail: 'em consultório e hospital' },
  { display: '98%', target: 98, prefix: '', suffix: '%', label: 'Taxa de Satisfação', detail: 'avaliado pelos pacientes' },
]

export default function StatsSection() {
  const lineRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated red line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-[#020b18]/97"
      aria-label="Estatísticas"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/6 rounded-full blur-[100px]" />
      </div>

      {/* Decorative line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div ref={lineRef} className="h-px bg-gradient-to-r from-blue-600 via-blue-500/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map(({ display, target, prefix, suffix, label, detail }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
              className="text-center px-4"
            >
              {/* Counter */}
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-1">
                <AnimatedCounter
                  display={display}
                  target={target}
                  prefix={prefix}
                  suffix={suffix}
                />
              </div>
              <p className="text-blue-400 font-semibold text-sm mb-1">{label}</p>
              <p className="text-slate-600 text-xs">{detail}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </section>
  )
}
