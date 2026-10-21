import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Zap, Truck, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { STORE_CONFIG } from '../../utils/seo';

interface HeroSliderProps {
  onNavigate: (page: string, params?: any) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: 'Loja Oficial GM Moto Peças • São Paulo SP',
      title: 'PEÇAS PARA SUA MOTO',
      subtitle: 'Encontre a peça certa para sua moto com rapidez, garantia e máxima segurança.',
      tagline: 'Entrega expressa na Zona Sul de SP via Motoboy e SEDEX para todo o Brasil.',
      primaryBtnText: 'VER PRODUTOS',
      primaryAction: () => onNavigate('catalog'),
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1600&q=80',
      accentColor: 'from-brand-600 to-rose-600'
    },
    {
      id: 2,
      badge: 'Ofertas da Semana • Até 30% OFF',
      title: 'KITS DE REVISÃO E RELAÇÃO',
      subtitle: 'Linha completa D.I.D, Vaz, Cobreq e KMP com coroa, pinhão e corrente com retentor.',
      tagline: 'Economize tempo e dinheiro com kits prontos para instalação imediata.',
      primaryBtnText: 'VER KITS EM OFERTA',
      primaryAction: () => onNavigate('catalog', { category: 'kits' }),
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1600&q=80',
      accentColor: 'from-amber-600 to-orange-600'
    },
    {
      id: 3,
      badge: 'Especialistas em Honda & Yamaha',
      title: 'LINHA CG 160 & FAZER 250',
      subtitle: 'Tudo para o seu motor, freios, elétrica e estética com compatibilidade 100% garantida.',
      tagline: 'Tire dúvidas direto com nossos consultores técnicos no WhatsApp.',
      primaryBtnText: 'CONSULTAR PEÇAS',
      primaryAction: () => onNavigate('catalog', { search: 'CG 160' }),
      image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1600&q=80',
      accentColor: 'from-emerald-600 to-teal-600'
    }
  ];

  // Auto rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden bg-slate-950">
      {/* Slides Viewport */}
      <div className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-center ${
              activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Dark Vignette */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
              <div className="absolute inset-0 bg-radial-vignette opacity-70" />
            </div>

            {/* Slide Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
              <div className="max-w-2xl space-y-4 sm:space-y-6">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-white text-xs font-bold shadow-lg backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
                  <span>{slide.badge}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white heading-font uppercase leading-none">
                  {slide.title.split(' ')[0]}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-rose-400">
                    {slide.title.split(' ').slice(1).join(' ')}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-lg text-slate-200 font-medium leading-relaxed max-w-xl">
                  {slide.subtitle}
                </p>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-slate-400 font-normal">
                  {slide.tagline}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={slide.primaryAction}
                    className="px-6 sm:px-8 py-3.5 sm:py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl sm:rounded-2xl text-xs sm:text-sm font-extrabold shadow-xl shadow-brand-600/40 hover:shadow-brand-600/60 transition-all flex items-center gap-2.5 group transform hover:scale-105"
                  >
                    <span>{slide.primaryBtnText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá! Vim pelo banner principal da GM Moto Peças e gostaria de atendimento.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 sm:px-7 py-3.5 sm:py-4 bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold shadow-lg backdrop-blur-md transition-all flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>FALAR NO WHATSAPP</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Dots & Arrows */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-20 flex items-center gap-3">
        <button
          onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === i ? 'w-8 bg-brand-600' : 'w-2.5 bg-slate-700 hover:bg-slate-600'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
          className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition-colors"
          aria-label="Próximo"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Promotional Cards Bar Below Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => onNavigate('catalog', { filter: 'offers' })}
            className="p-4 bg-slate-900/90 border border-slate-800 hover:border-brand-500/50 rounded-2xl shadow-xl backdrop-blur-md cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">Ofertas da Semana</h4>
                <p className="text-[11px] text-slate-400">Descontos de até 30% OFF</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('catalog', { category: 'kits' })}
            className="p-4 bg-slate-900/90 border border-slate-800 hover:border-brand-500/50 rounded-2xl shadow-xl backdrop-blur-md cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-500/10 text-brand-400 rounded-xl group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-brand-400 transition-colors">Kits de Revisão</h4>
                <p className="text-[11px] text-slate-400">Transmissão, embreagem e juntas</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('catalog', { search: 'Honda' })}
            className="p-4 bg-slate-900/90 border border-slate-800 hover:border-brand-500/50 rounded-2xl shadow-xl backdrop-blur-md cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-rose-400 transition-colors">Peças Honda & Yamaha</h4>
                <p className="text-[11px] text-slate-400">Linha Titan, Fan, Bros e Fazer</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('contact')}
            className="p-4 bg-slate-900/90 border border-slate-800 hover:border-brand-500/50 rounded-2xl shadow-xl backdrop-blur-md cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Entrega Rápida SP</h4>
                <p className="text-[11px] text-slate-400">Motoboy Expresso na Zona Sul</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
