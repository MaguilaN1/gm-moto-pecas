import React from 'react';
import { Truck, ArrowRight, ArrowLeft, CheckCircle2, Zap } from 'lucide-react';
import { ShippingOption } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

interface StepShippingProps {
  onNext: () => void;
  onBack: () => void;
}

export const StepShipping: React.FC<StepShippingProps> = ({ onNext, onBack }) => {
  const { shippingOption, setShippingOption, shippingOptions, subtotal } = useCart();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingOption && shippingOptions.length > 0) {
      setShippingOption(shippingOptions[0]);
    }
    onNext();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-fade-in">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white">3. Escolha o Método de Entrega</h3>
        <p className="text-xs text-slate-400">
          Entregas expressas para oficinas e motociclistas de São Paulo e envio nacional pelos Correios.
        </p>
      </div>

      <form onSubmit={handleContinue} className="space-y-4">
        <div className="space-y-3">
          {shippingOptions.map((opt) => (
            <label
              key={opt.id}
              onClick={() => setShippingOption(opt)}
              className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                shippingOption?.id === opt.id
                  ? 'bg-brand-600/15 border-brand-500 text-white shadow-xl shadow-brand-600/10 ring-2 ring-brand-500/20'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <input
                  type="radio"
                  name="shippingOption"
                  checked={shippingOption?.id === opt.id}
                  onChange={() => setShippingOption(opt)}
                  className="w-4 h-4 text-brand-600 focus:ring-0"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-white">{opt.name}</span>
                    {opt.code === 'motoboy' && (
                      <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Mais Rápido
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{opt.description}</p>
                  <p className="text-xs font-semibold text-brand-400">Prazo: {opt.deadlineText}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm sm:text-base font-extrabold text-white">
                  {opt.price === 0 ? (
                    <span className="text-emerald-400 font-extrabold uppercase">Grátis</span>
                  ) : (
                    formatCurrency(opt.price)
                  )}
                </span>
              </div>
            </label>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-brand-600/30 transition-all flex items-center gap-2"
          >
            <span>Continuar para o Pagamento</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
