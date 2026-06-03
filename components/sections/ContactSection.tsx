'use client'

import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from 'lucide-react'
import gsap from 'gsap'
import ScrollReveal from '@/components/shared/ScrollReveal'

const schema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  phone: z.string().min(10, 'Informe um telefone válido'),
  email: z.string().email('Informe um e-mail válido'),
  specialty: z.string().min(1, 'Selecione uma especialidade'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const SPECIALTIES = ['Joelho', 'Quadril', 'Ombro', 'Coluna Vertebral', 'Tornozelo e Pé', 'Medicina Esportiva', 'Outro']

const contactItems = [
  { Icon: Phone, label: 'Telefone', value: '(11) 3456-7890', href: 'tel:+551134567890' },
  { Icon: MessageCircle, label: 'WhatsApp', value: '(11) 9 8765-4321', href: 'https://wa.me/5511987654321' },
  { Icon: Mail, label: 'E-mail', value: 'contato@drcarlosmendes.com.br', href: 'mailto:contato@drcarlosmendes.com.br' },
  { Icon: MapPin, label: 'Endereço', value: 'Av. Paulista, 1234 — Sala 501\nSão Paulo, SP — 01310-100', href: '#' },
]

const inputClass =
  'w-full bg-[#061428] border border-white/8 text-white placeholder:text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors duration-200'

function MagneticSubmitButton({ disabled, isSubmitting }: { disabled: boolean; isSubmitting: boolean }) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const btn = btnRef.current
    const inner = innerRef.current
    if (!btn || !inner) return

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = (e.clientX - centerX) * 0.28
      const dy = (e.clientY - centerY) * 0.28

      gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power3.out' })
      gsap.to(inner, { x: dx * 0.4, y: dy * 0.4, duration: 0.4, ease: 'power3.out' })
    }

    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
      gsap.to(inner, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }

    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)

    return () => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <button
      ref={btnRef}
      type="submit"
      disabled={disabled}
      className="w-full flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors duration-200 text-sm relative shadow-lg shadow-blue-600/20"
      style={{ willChange: 'transform' }}
    >
      <span ref={innerRef} className="flex items-center gap-2.5">
        <Send size={15} />
        {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
      </span>
    </button>
  )
}

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    await new Promise<void>((res) => setTimeout(res, 900))
    console.log('Form submitted:', data)
    reset()
  }

  return (
    <section id="contato" className="py-24 md:py-32 bg-[#020b18]/97">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
              Contato
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
              Agende sua <span className="text-blue-400">Consulta</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
              Entre em contato e dê o primeiro passo para recuperar sua qualidade de vida.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Contact info */}
          <ScrollReveal direction="left">
            <div className="space-y-3">
              {contactItems.map(({ Icon, label, value, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="flex gap-4 p-5 bg-[#061428] border border-white/5 rounded-xl hover:border-blue-600/25 hover:bg-[#07182f] transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 transition-colors">
                    <Icon className="text-blue-400" size={17} />
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs mb-0.5">{label}</p>
                    <p className="text-white text-sm font-medium whitespace-pre-line">{value}</p>
                  </div>
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex gap-4 p-5 bg-blue-600/8 border border-blue-600/15 rounded-xl"
              >
                <div className="w-10 h-10 bg-blue-600/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="text-blue-400" size={17} />
                </div>
                <div>
                  <p className="text-blue-400 font-semibold text-sm mb-1">Horário de Atendimento</p>
                  <p className="text-slate-400 text-sm">Segunda a Sexta: 08h — 18h</p>
                  <p className="text-slate-400 text-sm">Sábado: 08h — 12h</p>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="right" delay={0.15}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-[#061428] border border-white/5 rounded-2xl p-6 md:p-8 space-y-5"
            >
              {isSubmitSuccessful && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-green-600/10 border border-green-600/20 rounded-xl"
                >
                  <p className="text-green-400 text-sm font-medium">Mensagem enviada com sucesso!</p>
                  <p className="text-green-600 text-xs mt-0.5">Retornaremos em até 24 horas.</p>
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 text-xs mb-2">Nome completo *</label>
                  <input {...register('name')} placeholder="Seu nome" className={inputClass} />
                  {errors.name && <p className="text-blue-400 text-xs mt-1.5">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-slate-500 text-xs mb-2">Telefone / WhatsApp *</label>
                  <input {...register('phone')} placeholder="(11) 9 0000-0000" className={inputClass} />
                  {errors.phone && <p className="text-blue-400 text-xs mt-1.5">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-slate-500 text-xs mb-2">E-mail *</label>
                <input {...register('email')} type="email" placeholder="seu@email.com" className={inputClass} />
                {errors.email && <p className="text-blue-400 text-xs mt-1.5">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-slate-500 text-xs mb-2">Especialidade *</label>
                <select {...register('specialty')} className={inputClass}>
                  <option value="">Selecione a especialidade</option>
                  {SPECIALTIES.map((s) => (
                    <option key={s} value={s} className="bg-[#061428]">{s}</option>
                  ))}
                </select>
                {errors.specialty && <p className="text-blue-400 text-xs mt-1.5">{errors.specialty.message}</p>}
              </div>

              <div>
                <label className="block text-slate-500 text-xs mb-2">
                  Mensagem <span className="text-slate-700">(opcional)</span>
                </label>
                <textarea
                  {...register('message')}
                  placeholder="Descreva brevemente seu problema ou dúvida..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <MagneticSubmitButton disabled={isSubmitting} isSubmitting={isSubmitting} />

              <p className="text-slate-700 text-xs text-center">
                Seus dados estão seguros. Nunca compartilhamos suas informações.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
