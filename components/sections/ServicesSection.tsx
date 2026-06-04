'use client'

import { motion } from 'framer-motion'
import { Stethoscope, Heart, Shield, Zap, Users, AlignCenter } from 'lucide-react'
import ScrollReveal from '@/components/shared/ScrollReveal'

const services = [
  {
    Icon: Stethoscope,
    title: 'Cirurgia Artroscópica',
    description:
      'Procedimentos minimamente invasivos com câmera para visualização interna das articulações, menor dor e recuperação acelerada.',
  },
  {
    Icon: Heart,
    title: 'Medicina Esportiva',
    description:
      'Prevenção e tratamento de lesões em atletas amadores e profissionais, com foco no retorno seguro ao esporte.',
  },
  {
    Icon: Shield,
    title: 'Próteses Articulares',
    description:
      'Cirurgias de substituição total e parcial de articulações desgastadas, devolvendo mobilidade e qualidade de vida.',
  },
  {
    Icon: Zap,
    title: 'Tratamento de Fraturas',
    description:
      'Redução e fixação cirúrgica de fraturas complexas com materiais e técnicas de última geração.',
  },
  {
    Icon: Users,
    title: 'Ortopedia Pediátrica',
    description:
      'Atendimento especializado para crianças e adolescentes com alterações ortopédicas congênitas ou adquiridas.',
  },
  {
    Icon: AlignCenter,
    title: 'Coluna Vertebral',
    description:
      'Tratamento completo de patologias da coluna, desde abordagem conservadora até cirurgias de alta precisão.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: 'easeOut' },
  }),
}

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-24 md:py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
              Serviços
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
              O que <span className="text-blue-400">oferecemos</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
              Tratamentos modernos e personalizados para cada necessidade, com foco em resultados
              duradouros e recuperação eficiente.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group flex gap-4 p-6 bg-[#061428] border border-white/5 rounded-2xl hover:border-blue-600/25 hover:bg-[#07182f] transition-colors duration-300 cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.25 }}
                className="w-11 h-11 bg-blue-600/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 transition-colors duration-300"
              >
                <Icon className="text-blue-400" size={21} />
              </motion.div>
              <div>
                <h3 className="text-white font-semibold mb-1.5 text-sm">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
