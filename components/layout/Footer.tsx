import { Phone, Mail, MapPin, Camera, Globe, Play } from 'lucide-react'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
]

const contactItems = [
  { Icon: Phone, value: '(11) 3456-7890', href: 'tel:+551134567890' },
  { Icon: Mail, value: 'contato@drcarlosmendes.com.br', href: 'mailto:contato@drcarlosmendes.com.br' },
  { Icon: MapPin, value: 'Av. Paulista, 1234 — Sala 501\nSão Paulo, SP — 01310-100', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">CM</span>
              </div>
              <div>
                <p className="text-white font-semibold leading-tight">Dr. Carlos Mendes</p>
                <p className="text-slate-600 text-xs leading-tight">CRM SP 123.456</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Ortopedista e Traumatologista com mais de 15 anos de experiência. Sua mobilidade é nossa prioridade.
            </p>
            <div className="flex gap-2.5">
              {[
                { Icon: Camera, label: 'Instagram' },
                { Icon: Globe, label: 'Facebook' },
                { Icon: Play, label: 'Youtube' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 hover:bg-blue-600/20 border border-white/5 hover:border-blue-600/30 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-400 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white font-semibold mb-5">Navegação</p>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-slate-600 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-5">Contato</p>
            <ul className="space-y-4">
              {contactItems.map(({ Icon, value, href }) => (
                <li key={value}>
                  <a
                    href={href}
                    className="flex items-start gap-3 text-slate-600 hover:text-slate-400 text-sm transition-colors duration-200"
                  >
                    <Icon size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="whitespace-pre-line">{value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-700 text-xs">
            © {new Date().getFullYear()} Dr. Carlos Mendes. Todos os direitos reservados.
          </p>
          <p className="text-slate-800 text-xs">CRM SP 123.456 · Ortopedia e Traumatologia</p>
        </div>
      </div>
    </footer>
  )
}
