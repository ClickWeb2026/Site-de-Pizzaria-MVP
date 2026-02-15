import React from 'react';
import {
  FlameIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon } from
'lucide-react';
import { Link } from 'react-router-dom';
export function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-[#FFF8F0]/80" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <FlameIcon className="w-6 h-6 text-[#D4652F]" />
              <span className="font-['Playfair_Display'] text-xl font-bold text-[#FFF8F0]">
                Forno Mágico
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#FFF8F0]/60 max-w-xs">
              Desde 2010 trazendo a verdadeira pizza artesanal feita no forno a
              lenha, com ingredientes selecionados e muito amor.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFF8F0]/50 hover:text-[#D4652F] transition-colors"
                aria-label="Instagram">

                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFF8F0]/50 hover:text-[#D4652F] transition-colors"
                aria-label="Facebook">

                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFF8F0]/50 hover:text-[#D4652F] transition-colors"
                aria-label="Twitter">

                <TwitterIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Horário */}
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#FFF8F0] mb-4">
              Horário de Funcionamento
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <ClockIcon className="w-4 h-4 mt-0.5 text-[#D4652F] flex-shrink-0" />
                <div>
                  <p className="text-[#FFF8F0]/90 font-medium">
                    Segunda a Sexta
                  </p>
                  <p className="text-[#FFF8F0]/60">18h às 23h</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon className="w-4 h-4 mt-0.5 text-[#D4652F] flex-shrink-0" />
                <div>
                  <p className="text-[#FFF8F0]/90 font-medium">
                    Sábado e Domingo
                  </p>
                  <p className="text-[#FFF8F0]/60">17h às 00h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#FFF8F0] mb-4">
              Contato
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-4 h-4 mt-0.5 text-[#D4652F] flex-shrink-0" />
                <p className="text-[#FFF8F0]/70">
                  Rua das Pizzas, 123 — Centro
                  <br />
                  São Paulo, SP — CEP 01001-000
                </p>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-4 h-4 text-[#D4652F] flex-shrink-0" />
                <a
                  href="tel:+5511999999999"
                  className="text-[#FFF8F0]/70 hover:text-[#D4652F] transition-colors">

                  (11) 99999-9999
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-[#FFF8F0]/40">
          <p>
            © {new Date().getFullYear()} Forno Mágico Pizzaria. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>);

}