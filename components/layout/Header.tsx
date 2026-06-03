'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/constants'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* ── Desktop floating pill ── */}
      <div className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center pt-5 px-4 pointer-events-none">
        <motion.header
          initial={false}
          animate={{
            backgroundColor: scrolled ? 'rgba(2,11,24,0.82)' : 'rgba(2,11,24,0)',
            borderColor: scrolled ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.04)'
              : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="flex items-center gap-1 border rounded-full px-3 py-2 pointer-events-auto"
          style={{ backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none' }}
        >
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 pr-3 group">
            <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 transition-colors duration-200">
              <span className="text-white font-bold text-[10px] tracking-tight">CM</span>
            </div>
            <motion.span
              animate={{ opacity: scrolled ? 1 : 0.55 }}
              transition={{ duration: 0.35 }}
              className="text-white text-xs font-semibold tracking-tight whitespace-nowrap"
            >
              Dr. Carlos Mendes
            </motion.span>
          </a>

          {/* Separator */}
          <motion.div
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="w-px h-3.5 bg-white/10 mx-2"
          />

          {/* Nav links */}
          <nav className="flex items-center gap-0.5" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 hover:bg-white/8 hover:text-white group"
                style={{ color: scrolled ? 'rgba(203,213,225,1)' : 'rgba(255,255,255,0.45)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Separator */}
          <motion.div
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="w-px h-3.5 bg-white/10 mx-2"
          />

          {/* CTA */}
          <a
            href="#contato"
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors duration-200 shadow-lg shadow-blue-600/25 whitespace-nowrap"
          >
            Agendar Consulta
          </a>
        </motion.header>
      </div>

      {/* ── Mobile top bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 pt-4 pointer-events-none">
        {/* Logo chip */}
        <motion.a
          href="#inicio"
          animate={{
            backgroundColor: scrolled ? 'rgba(2,11,24,0.82)' : 'rgba(2,11,24,0.3)',
            borderColor: scrolled ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.06)',
          }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-2 border rounded-full px-3 py-2 pointer-events-auto"
          style={{ backdropFilter: 'blur(20px)' }}
        >
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-[9px]">CM</span>
          </div>
          <span className="text-white text-xs font-semibold">Dr. Carlos</span>
        </motion.a>

        {/* Hamburger chip */}
        <motion.button
          animate={{
            backgroundColor: mobileOpen
              ? 'rgba(37,99,235,0.9)'
              : scrolled
                ? 'rgba(2,11,24,0.82)'
                : 'rgba(2,11,24,0.3)',
            borderColor: mobileOpen
              ? 'rgba(96,165,250,0.4)'
              : scrolled
                ? 'rgba(255,255,255,0.07)'
                : 'rgba(255,255,255,0.06)',
          }}
          transition={{ duration: 0.25 }}
          className="border rounded-full p-2.5 pointer-events-auto text-white"
          style={{ backdropFilter: 'blur(20px)' }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                <X size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                <Menu size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden fixed inset-0 z-40 bg-[#020b18]/96 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/6 rounded-full blur-[120px] pointer-events-none" />

            <nav className="relative flex flex-col items-center gap-1" aria-label="Navegação mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: i * 0.055, duration: 0.3, ease: 'easeOut' }}
                  onClick={() => setMobileOpen(false)}
                  className="text-3xl font-bold text-white/50 hover:text-white transition-colors duration-200 py-2 px-6 rounded-2xl hover:bg-white/4"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#contato"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: NAV_LINKS.length * 0.055 + 0.05, duration: 0.3 }}
                onClick={() => setMobileOpen(false)}
                className="mt-8 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-9 py-3.5 rounded-full transition-colors duration-200 shadow-xl shadow-blue-600/25 text-sm"
              >
                Agendar Consulta
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
