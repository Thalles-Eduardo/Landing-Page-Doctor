import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dr. Carlos Mendes | Ortopedista e Traumatologista em São Paulo',
  description:
    'Especialista em ortopedia e traumatologia com mais de 15 anos de experiência. Tratamentos para joelho, quadril, ombro, coluna e medicina esportiva em São Paulo.',
  keywords: 'ortopedista, traumatologista, joelho, quadril, ombro, coluna, São Paulo, artroscopia, prótese',
  openGraph: {
    title: 'Dr. Carlos Mendes | Ortopedista e Traumatologista',
    description:
      'Especialista em ortopedia e traumatologia com mais de 15 anos de experiência em São Paulo.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Carlos Mendes | Ortopedista e Traumatologista',
    description: 'Especialista em ortopedia com mais de 15 anos de experiência em São Paulo.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={geist.className}>
      <body className="min-h-screen bg-[#020b18] antialiased">{children}</body>
    </html>
  )
}
