import React from 'react';
import { ShieldCheck, MessageCircle, Truck, Lock, CheckCircle2 } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-500" />,
      title: 'Qualidade Garantida',
      description: 'Peças selecionadas das melhores marcas do mercado (D.I.D, Cobreq, Heliar, Cofap, Motul, KMP) com garantia total de fábrica.',
      accent: 'border-brand-500/20 bg-brand-500/5'
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-emerald-400" />,
      title: 'Atendimento Rápido',
      description: 'Nossa equipe de consultores especializados ajuda você a tirar qualquer dúvida e encontrar a peça exata para o ano da sua moto.',
      accent: 'border-emerald-500/20 bg-emerald-500/5'
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-400" />,
      title: 'Entrega Rápida',
      description: 'Motoboy expresso para a Zona Sul e São Paulo Capital, além de Sedex e PAC com código de rastreio em tempo real para todo o Brasil.',
      accent: 'border-blue-500/20 bg-blue-500/5'
    },
    {
      icon: <Lock className="w-8 h-8 text-amber-400" />,
      title: 'Compra 100% Segura',
      description: 'Pagamento protegido com tecnologia de ponta, PIX com 5% de desconto imediato e parcelamento em até 12x no cartão.',
      accent: 'border-amber-500/20 bg-amber-500/5'
    }
  ];

  return (
    <section className="py-16 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white heading-font uppercase tracking-tight">
            Por que comprar na <span className="text-brand-500">GM Moto Peças</span>?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Compromisso com o motociclista, agilidade no envio e respeito pelo seu tempo e sua moto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border ${b.accent} backdrop-blur-sm space-y-4 hover:-translate-y-1 transition-all duration-300 shadow-xl`}
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
                {b.icon}
              </div>
              <h3 className="text-base font-bold text-white">{b.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
