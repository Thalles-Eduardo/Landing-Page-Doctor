'use client'

import { motion } from 'framer-motion'

interface AnimatedButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled,
}: AnimatedButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-colors duration-300 cursor-pointer select-none'
  const variants = {
    primary:
      'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/25 hover:shadow-red-600/40',
    secondary:
      'border border-white/20 text-white hover:border-white/40 hover:bg-white/5',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <motion.a href={href} className={cls} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
