'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Phone, ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CharacterReveal from '@/components/shared/CharacterReveal'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '15+', label: 'Anos de Experiência' },
  { value: '+5 mil', label: 'Cirurgias Realizadas' },
  { value: '+8 mil', label: 'Pacientes Atendidos' },
  { value: '98%', label: 'Satisfação' },
]

export default function HeroSection() {
  const orbRef1 = useRef<HTMLDivElement>(null)
  const orbRef2 = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (orbRef1.current) {
        gsap.to(orbRef1.current, {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.8,
          },
        })
        gsap.to(orbRef1.current, {
          scale: 1.2,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
      if (orbRef2.current) {
        gsap.to(orbRef2.current, {
          y: 90,
          x: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2.5,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          ref={orbRef1}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600/12 rounded-full blur-[150px]"
        />
        <div
          ref={orbRef2}
          className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-900/15 rounded-full blur-[90px]"
        />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020b18] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 bg-blue-600/10 border border-blue-600/25 rounded-full px-5 py-2 mb-10"
        >
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-blue-300 text-sm font-medium tracking-wide">
            Ortopedista e Traumatologista · CRM SP 123.456
          </span>
        </motion.div>

        {/* Title — GSAP character reveal */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-6">
          <CharacterReveal
            text="Dr. Carlos"
            className="block text-white mb-2"
            delay={0.3}
            stagger={0.04}
          />
          <CharacterReveal
            text="Mendes"
            className="block text-blue-400"
            delay={0.65}
            stagger={0.05}
          />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: 'easeOut' }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Sua mobilidade é nossa prioridade. Mais de 15 anos devolvendo qualidade de vida com
          ortopedia de excelência e atendimento humanizado.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
        >
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 text-sm shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40"
          >
            <Calendar size={17} />
            Agendar Consulta
          </motion.a>
          <motion.a
            href="tel:+551134567890"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 border border-white/20 hover:border-blue-400/50 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-sm hover:bg-blue-600/10"
          >
            <Phone size={17} />
            (11) 3456-7890
          </motion.a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5, ease: 'easeOut' }}
          className="grid grid-cols-2 md:grid-cols-4 border border-white/6 rounded-2xl overflow-hidden divide-x divide-y md:divide-y-0 divide-white/6 backdrop-blur-sm"
        >
          {stats.map(({ value, label }) => (
            <motion.div
              key={label}
              whileHover={{ backgroundColor: 'rgba(37,99,235,0.08)' }}
              className="bg-[#020b18]/80 px-6 py-5 text-center cursor-default"
            >
              <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">{value}</p>
              <p className="text-slate-600 text-xs mt-1">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-slate-700 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="text-slate-700"
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
