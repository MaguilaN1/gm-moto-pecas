import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send, Tag } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { validateEmail } from '../../utils/validators';

export const Newsletter: React.FC = () => {
  const { success, error } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      error('E-mail inválido', 'Por favor, digite um e-mail válido para receber as promoções.');
      return;
    }

    setIsSubscribed(true);
    success('Inscrição confirmada!', 'Você ganhou 10% OFF com o cupom BEMVINDO10.');
  };

  return (
    <section className="py-16 bg-slate-950 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-950 via-slate-900 to-slate-900 border border-brand-900/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle Glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-bold">
              <Tag className="w-3.5 h-3.5" />
              <span>Ganhe 10% OFF na Primeira Compra</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white heading-font uppercase tracking-tight">
              Receba ofertas e <span className="text-brand-500">novidades</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Cadastre seu e-mail e receba promoções, lançamentos de peças e cupons de desconto exclusivos da GM Moto Peças.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail (ex: motociclista@gmail.com)"
                    className="w-full bg-slate-950 border border-slate-700/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="py-3.5 px-8 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>CADASTRAR</span>
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-xs sm:text-sm text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong>Cadastro realizado com sucesso!</strong>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Use o cupom <span className="font-mono font-bold text-white bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">BEMVINDO10</span> no seu primeiro pedido.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
