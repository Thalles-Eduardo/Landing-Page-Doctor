'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, GraduationCap, Stethoscope, Building } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const credentials = [
  {
    Icon: GraduationCap,
    title: 'Formação',
    desc: 'Medicina pela USP · Residência em Ortopedia e Traumatologia · Fellowship em Cirurgia do Joelho (EUA)',
  },
  {
    Icon: Award,
    title: 'Certificações',
    desc: 'SBOT · SBCJ · ISAKOS · Membro titular das principais sociedades nacionais e internacionais',
  },
  {
    Icon: Building,
    title: 'Afiliações Hospitalares',
    desc: 'Hospital das Clínicas USP · Hospital Sírio-Libanês · Hospital Albert Einstein',
  },
]

export default function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current && sectionRef.current) {
        gsap.to(imageRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="py-24 md:py-36 bg-[#020b18]/97 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div ref={imageRef} className="relative">
              <div className="aspect-[4/5] bg-[#061428] rounded-3xl overflow-hidden border border-white/5 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 to-transparent" />
                <div className="relative text-center">
                  <div className="w-28 h-28 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-600/20">
                    <Stethoscope className="text-blue-400" size={44} />
                  </div>
                  <p className="text-slate-700 text-sm">Dr. Carlos Mendes</p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-6 -right-4 sm:-right-8 bg-blue-600 rounded-2xl px-5 py-4 shadow-2xl shadow-blue-900/50"
              >
                <p className="text-blue-200 text-xs font-medium mb-0.5">CRM SP</p>
                <p className="text-white text-xl font-bold tracking-tight">123.456</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -top-5 -left-4 sm:-left-8 bg-[#061428] border border-white/8 rounded-2xl px-5 py-4 shadow-2xl"
              >
                <p className="text-blue-400 text-3xl font-bold leading-none">15+</p>
                <p className="text-slate-500 text-xs mt-1">anos de experiência</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content column */}
          <div className="space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-blue-400 text-sm font-semibold tracking-widest uppercase inline-block"
            >
              Sobre o Médico
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              Excelência em ortopedia com{' '}
              <span className="text-blue-400">atendimento humanizado</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-slate-400 leading-relaxed"
            >
              O Dr. Carlos Mendes é especialista em Ortopedia e Traumatologia com mais de 15 anos de
              experiência clínica e cirúrgica. Formado pela Universidade de São Paulo (USP), realizou
              residência e fellowship em centros de referência nacionais e internacionais.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 leading-relaxed"
            >
              Comprometido com a excelência técnica e o bem-estar do paciente, oferece diagnóstico
              preciso e tratamentos personalizados, sempre utilizando as técnicas mais modernas e
              minimamente invasivas disponíveis.
            </motion.p>

            <div className="space-y-3 pt-2">
              {credentials.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.12, duration: 0.6, ease: 'easeOut' }}
                  whileHover={{ x: 4 }}
                  className="flex gap-4 p-4 bg-[#061428] rounded-xl border border-white/5 hover:border-blue-600/25 transition-colors duration-300 group cursor-default"
                >
                  <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 transition-colors">
                    <Icon className="text-blue-400" size={19} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{title}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
