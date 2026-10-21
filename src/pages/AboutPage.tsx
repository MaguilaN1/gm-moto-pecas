import React from 'react';
import { Store, Award, Truck, Users, MapPin, ArrowRight } from 'lucide-react';
import { STORE_CONFIG } from '../utils/seo';
import { SEOHead } from '../components/common/SEOHead';

interface AboutPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Sobre a GM Moto Peças | Tradição e Qualidade em Motopeças em SP"
        description="Conheça a história da GM Moto Peças, nossa loja física na Zona Sul de São Paulo e nosso compromisso com peças de procedência e atendimento rápido."
      />

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-600/10 border border-brand-500/20 text-brand-400 text-xs font-bold">
            <Store className="w-3.5 h-3.5" />
            <span>Nossa História & Propósito</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white heading-font tracking-tight uppercase">
            Sobre a <span className="text-brand-500">GM Moto Peças</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            "Somos uma loja especializada em motopeças, oferecendo peças e acessórios para diversos modelos de motocicletas. Nosso objetivo é facilitar a compra, oferecendo variedade, atendimento rápido e informações claras para que você encontre a peça certa para sua moto."
          </p>
        </div>

        {/* Banner Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative h-72 sm:h-96">
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=80"
            alt="Oficina e Loja GM Moto Peças"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white">Unidade Matriz - Zona Sul de São Paulo</h3>
              <p className="text-xs text-slate-300">{STORE_CONFIG.address} • Santo Amaro</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700">
              Estoque Próprio com +10.000 Itens
            </span>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-xl">
            <div className="w-12 h-12 bg-brand-600/10 text-brand-500 rounded-2xl flex items-center justify-center border border-brand-500/20">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Procedência & Garantia</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Trabalhamos exclusivamente com distribuidores homologados e fabricantes líderes de mercado como D.I.D, Cobreq, Cofap, KMP, Vaz e Heliar.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-xl">
            <div className="w-12 h-12 bg-emerald-600/10 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Agilidade de Entrega</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sabemos que quem depende da moto para trabalhar ou lazer não pode ficar parado. Por isso despachamos seu pedido no mesmo dia.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-xl">
            <div className="w-12 h-12 bg-blue-600/10 text-blue-400 rounded-2xl flex items-center justify-center border border-blue-500/20">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Atendimento Técnico</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nossa equipe compreende de mecânica de motos para tirar dúvidas e garantir que a peça comprada encaixe com precisão no modelo e ano correto.
            </p>
          </div>
        </div>

        {/* Location Box */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Venha Conhecer Nosso Balcão de Atendimento</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Retire suas peças na hora ou tome um café conosco na nossa loja física na Zona Sul de São Paulo.
            </p>
            <p className="text-xs text-brand-400 font-semibold flex items-center justify-center md:justify-start gap-1">
              <MapPin className="w-4 h-4" /> {STORE_CONFIG.address}
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-600/30 transition-all flex items-center gap-2 shrink-0"
          >
            <span>Fale com Nossa Equipe</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
