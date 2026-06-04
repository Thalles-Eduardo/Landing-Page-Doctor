'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import ScrollReveal from '@/components/shared/ScrollReveal'

const testimonials = [
  {
    name: 'Ana Carolina Silva',
    age: 42,
    procedure: 'Reconstrução do LCA',
    text: 'O Dr. Carlos me devolveu a qualidade de vida! Após a cirurgia do joelho, voltei a praticar corrida sem qualquer dor. Profissional incrível, com muita atenção e cuidado do início ao fim.',
    rating: 5,
    initials: 'AC',
  },
  {
    name: 'Roberto Machado',
    age: 65,
    procedure: 'Prótese Total de Quadril',
    text: 'Fiz a prótese total do quadril e foi a melhor decisão da minha vida. O doutor é extremamente competente e a equipe toda é muito atenciosa. Recomendo para qualquer um!',
    rating: 5,
    initials: 'RM',
  },
  {
    name: 'Mariana Fernandes',
    age: 35,
    procedure: 'Artroscopia de Ombro',
    text: 'Sofri uma lesão grave no ombro jogando vôlei. Com o tratamento do Dr. Carlos, me recuperei completamente em poucos meses. Excelente profissional e equipe dedicada!',
    rating: 5,
    initials: 'MF',
  },
]

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-24 md:py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
              Depoimentos
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
              O que nossos <span className="text-blue-400">pacientes dizem</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
              A recuperação e satisfação de cada paciente é o nosso maior reconhecimento.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map(({ name, age, procedure, text, rating, initials }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.13, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative bg-[#061428] border border-white/5 rounded-2xl p-6 hover:border-blue-600/25 transition-colors duration-300 h-full flex flex-col cursor-default"
            >
              {/* Blue accent corner */}
              <div className="absolute top-0 right-6 w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />

              <Quote className="text-blue-600/25 mb-4 flex-shrink-0" size={28} aria-hidden="true" />

              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-6 italic">
                &ldquo;{text}&rdquo;
              </p>

              <div className="border-t border-white/5 pt-4">
                <div className="flex gap-0.5 mb-3" aria-label={`${rating} de 5 estrelas`}>
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} className="text-blue-400 fill-blue-400" size={12} aria-hidden="true" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-600/15 rounded-full flex items-center justify-center flex-shrink-0 border border-blue-600/20">
                    <span className="text-blue-400 text-xs font-semibold">{initials}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">{name}</p>
                    <p className="text-slate-600 text-xs">
                      {age} anos · {procedure}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
