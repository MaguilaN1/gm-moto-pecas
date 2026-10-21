import React from 'react';
import { Store, MapPin, Award, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { STORE_CONFIG } from '../../utils/seo';

interface AboutSectionProps {
  onNavigate: (page: string, params?: any) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Story & Philosophy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600/10 border border-brand-500/20 text-brand-400 text-xs font-bold">
              <Store className="w-3.5 h-3.5" />
              <span>Institucional GM Moto Peças</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white heading-font uppercase tracking-tight leading-tight">
              Sobre a <span className="text-brand-500">GM Moto Peças</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              "Somos uma loja especializada em motopeças, oferecendo peças e acessórios para diversos modelos de motocicletas. Nosso objetivo é facilitar a compra, oferecendo variedade, atendimento rápido e informações claras para que você encontre a peça certa para sua moto."
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
                <span className="text-2xl font-black text-brand-500 block">10.000+</span>
                <span className="text-xs font-bold text-white block">Peças em Estoque</span>
                <span className="text-[11px] text-slate-400">Prontas para envio imediato</span>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
                <span className="text-2xl font-black text-emerald-400 block">Zona Sul SP</span>
                <span className="text-xs font-bold text-white block">Loja & Balcão</span>
                <span className="text-[11px] text-slate-400">Av. Washington Luís</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Atendimento técnico especializado para mecânicos e motociclistas</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Foco na satisfação do cliente e na compatibilidade garantida</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Envio rápido para todo o território nacional</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xl shadow-brand-600/30 transition-all flex items-center gap-2"
              >
                <span>Conheça Nossa Loja</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-brand-400" />
                <span>Ver Localização no Mapa</span>
              </button>
            </div>
          </div>

          {/* Right Column: Store Atmosphere Photo Collage */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
                alt="Loja GM Moto Peças"
                className="w-full h-96 sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-900/90 border border-slate-700/80 rounded-2xl backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">GM Moto Peças - Unidade Zona Sul</h4>
                    <p className="text-[11px] text-slate-400">{STORE_CONFIG.address}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    Aberto Hoje
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
