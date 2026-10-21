import React from 'react';
import { Star, CheckCircle2, MessageSquare, Quote, Sparkles } from 'lucide-react';
import { INITIAL_REVIEWS } from '../../data/reviews';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Avaliações Reais de Motociclistas</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white heading-font uppercase tracking-tight">
            O que nossos clientes <span className="text-brand-500">dizem</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Mais de 4.800 entregas realizadas com índice de aprovação de 4.9 estrelas.
          </p>
        </div>

        {/* Reviews Grid (6 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-slate-950 border border-slate-800 rounded-3xl p-6 relative flex flex-col justify-between hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <Quote className="w-8 h-8 text-slate-800 absolute top-5 right-5 pointer-events-none" />

              <div className="space-y-4">
                {/* Stars Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-white ml-1.5">{review.rating}.0</span>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Bike Information */}
              <div className="pt-4 mt-4 border-t border-slate-900 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white">{review.author}</h4>
                    {review.verifiedPurchase && (
                      <span title="Compra Verificada">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-brand-400 font-medium">{review.bikeModel}</p>
                  <p className="text-[10px] text-slate-500">{review.cityState}</p>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                  {review.author.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
