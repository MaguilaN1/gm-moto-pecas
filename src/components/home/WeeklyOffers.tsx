import React, { useState, useEffect } from 'react';
import { Zap, Clock, ArrowRight, Flame } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../product/ProductCard';

interface WeeklyOffersProps {
  products: Product[];
  onNavigate: (page: string, params?: any) => void;
}

export const WeeklyOffers: React.FC<WeeklyOffersProps> = ({ products, onNavigate }) => {
  // Simulated countdown timer: 2 days, 14 hours, 32 mins, 10 secs
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const offerProducts = products.filter((p) => p.isWeeklyOffer || (p.discountPercent && p.discountPercent > 15)).slice(0, 4);

  return (
    <section className="py-16 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner / Header */}
        <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 border border-rose-900/40 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-extrabold">
              <Flame className="w-4 h-4 text-brand-500 fill-current animate-bounce" />
              <span>Promoções Relâmpago GM Moto Peças</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white heading-font uppercase tracking-tight">
              Ofertas da <span className="text-brand-500">Semana</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Preços especiais com estoque limitado e descontos de até 30% à vista no PIX.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 sm:gap-3 z-10">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider mr-2 hidden sm:flex">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Termina em:</span>
            </div>

            <div className="flex gap-2 text-center">
              <div className="bg-slate-950/90 border border-slate-800 px-3 py-2 rounded-xl min-w-[50px]">
                <span className="text-lg sm:text-xl font-black text-white block font-mono">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-slate-400 uppercase font-bold">Dias</span>
              </div>
              <div className="bg-slate-950/90 border border-slate-800 px-3 py-2 rounded-xl min-w-[50px]">
                <span className="text-lg sm:text-xl font-black text-white block font-mono">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-slate-400 uppercase font-bold">Horas</span>
              </div>
              <div className="bg-slate-950/90 border border-slate-800 px-3 py-2 rounded-xl min-w-[50px]">
                <span className="text-lg sm:text-xl font-black text-white block font-mono">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-slate-400 uppercase font-bold">Min</span>
              </div>
              <div className="bg-slate-950/90 border border-slate-800 px-3 py-2 rounded-xl min-w-[50px] border-brand-500/40 bg-brand-950/20">
                <span className="text-lg sm:text-xl font-black text-brand-400 block font-mono">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-brand-300 uppercase font-bold">Seg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {offerProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* View all offers button */}
        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('catalog', { filter: 'offers' })}
            className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs sm:text-sm font-bold border border-slate-700 transition-all inline-flex items-center gap-2 hover:border-brand-500/50 shadow-lg"
          >
            <span>Ver Todas as Ofertas da Semana</span>
            <ArrowRight className="w-4 h-4 text-brand-500" />
          </button>
        </div>
      </div>
    </section>
  );
};
