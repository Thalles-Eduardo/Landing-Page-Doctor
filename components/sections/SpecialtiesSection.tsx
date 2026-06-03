'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Bone, Activity, Zap, AlignCenter } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const specialties = [
  {
    Icon: Bone,
    title: 'Joelho',
    number: '01',
    description:
      'Diagnóstico e tratamento de lesões ligamentares, meniscais e artrose com as técnicas mais modernas e minimamente invasivas disponíveis.',
    procedures: ['Artroscopia', 'Reconstrução do LCA', 'Prótese Total', 'Tratamento da Artrose'],
    gradient: 'from-blue-600/15 to-blue-900/5',
  },
  {
    Icon: Activity,
    title: 'Quadril',
    number: '02',
    description:
      'Soluções completas para dor e disfunção do quadril em todas as faixas etárias, do conservador à cirurgia.',
    procedures: ['Prótese Total', 'Artroscopia de Quadril', 'Osteotomia', 'Fraturas do Fêmur'],
    gradient: 'from-slate-700/15 to-slate-900/5',
  },
  {
    Icon: Zap,
    title: 'Ombro',
    number: '03',
    description:
      'Tratamento especializado para lesões do ombro, manguito rotador e instabilidades, com foco no retorno pleno à atividade.',
    procedures: ['Artroscopia', 'Manguito Rotador', 'Luxação Recidivante', 'Acromioplastia'],
    gradient: 'from-blue-600/15 to-blue-900/5',
  },
  {
    Icon: AlignCenter,
    title: 'Coluna',
    number: '04',
    description:
      'Cuidado integral para patologias da coluna vertebral, desde abordagem conservadora até cirurgias de alta precisão.',
    procedures: ['Hérnia de Disco', 'Escoliose', 'Estenose de Canal', 'Osteoporose'],
    gradient: 'from-slate-700/15 to-slate-900/5',
  },
]

export default function SpecialtiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${-getScrollAmount()}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.width = `${self.progress * 100}%`
              }
            },
          },
        })

        tl.to(track, { x: getScrollAmount, ease: 'none' })

        const cards = track.querySelectorAll<HTMLElement>('[data-card]')
        cards.forEach((card) => {
          gsap.fromTo(card, { opacity: 0.35, scale: 0.96 }, {
            opacity: 1, scale: 1, ease: 'none',
            scrollTrigger: {
              trigger: card, containerAnimation: tl,
              start: 'left center', end: 'center center', scrub: true,
            },
          })
        })
      })

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="especialidades"
      className="bg-[#030d1c]/97 relative lg:h-screen overflow-hidden"
    >
      <div className="relative z-10 pt-20 pb-10 lg:pt-24 lg:pb-0 text-center lg:text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-blue-400 text-sm font-semibold tracking-widest uppercase inline-block mb-3"
            >
              Especialidades
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              Áreas de <span className="text-blue-400">Atuação</span>
            </motion.h2>
          </div>
          <div className="hidden lg:flex items-center gap-3 mb-2">
            <span className="text-slate-600 text-xs uppercase tracking-widest">Arraste para explorar</span>
            <div className="w-32 h-px bg-white/8 relative">
              <div ref={progressRef} className="absolute inset-y-0 left-0 bg-blue-500 transition-none" style={{ width: '0%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile grid */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
          {specialties.map(({ Icon, title, number, description, procedures, gradient }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-[#061428] border border-white/5 rounded-2xl p-6 bg-gradient-to-br ${gradient}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600/15 rounded-xl flex items-center justify-center">
                  <Icon className="text-blue-400" size={23} />
                </div>
                <span className="text-slate-800 text-4xl font-bold tracking-tight">{number}</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{description}</p>
              <ul className="space-y-2">
                {procedures.map((proc) => (
                  <li key={proc} className="flex items-center gap-2 text-slate-600 text-xs">
                    <span className="w-1 h-1 bg-blue-500/70 rounded-full flex-shrink-0" />
                    {proc}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop horizontal scroll */}
      <div
        ref={trackRef}
        className="hidden lg:flex items-center gap-6 absolute top-0 left-0 h-full pl-[max(24px,calc((100vw-1280px)/2+32px))] pr-[15vw] pt-36"
        style={{ width: 'max-content' }}
      >
        {specialties.map(({ Icon, title, number, description, procedures, gradient }, i) => (
          <motion.div
            data-card
            key={title}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className={`relative flex-shrink-0 w-[420px] h-[520px] bg-[#061428] border border-white/6 rounded-3xl p-8 flex flex-col overflow-hidden bg-gradient-to-br ${gradient} cursor-default`}
          >
            <span className="absolute top-4 right-6 text-8xl font-bold text-white/4 select-none leading-none">
              {number}
            </span>
            <div className="w-16 h-16 bg-blue-600/12 rounded-2xl flex items-center justify-center mb-6 border border-blue-600/15">
              <Icon className="text-blue-400" size={30} />
            </div>
            <h3 className="text-white font-bold text-3xl mb-3">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{description}</p>
            <div className="h-px bg-white/5 mb-5" />
            <ul className="space-y-2.5">
              {procedures.map((proc) => (
                <li key={proc} className="flex items-center gap-3 text-slate-500 text-sm">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                  {proc}
                </li>
              ))}
            </ul>
            <div className="absolute inset-0 rounded-3xl border border-blue-600/0 hover:border-blue-600/25 transition-colors duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
