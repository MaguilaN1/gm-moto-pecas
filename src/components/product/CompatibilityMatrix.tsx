import React from 'react';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import { ProductCompatibility } from '../../types';

interface CompatibilityMatrixProps {
  compatibilities: ProductCompatibility[];
}

export const CompatibilityMatrix: React.FC<CompatibilityMatrixProps> = ({ compatibilities }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white">Motos e Modelos Compatíveis</h3>
          <p className="text-xs text-slate-400">Esta peça foi testada e aprovada para as seguintes aplicações:</p>
        </div>
        <span className="text-xs font-bold text-brand-400 bg-brand-600/10 px-3 py-1 rounded-full border border-brand-500/20">
          {compatibilities.length} Aplicações
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {compatibilities.map((comp, index) => (
          <div
            key={index}
            className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl flex items-start gap-3 hover:border-slate-700 transition-colors"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {comp.brand} {comp.model}
              </h4>
              <p className="text-xs text-brand-400 font-semibold">
                Anos: {comp.yearRange}
              </p>
              {comp.notes && (
                <p className="text-[11px] text-slate-400 italic">
                  Obs: {comp.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Safety Warning */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3 text-xs text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block text-white">Aviso Importante de Instalação</strong>
          <span>
            Confira o modelo, ano e código da peça antes de finalizar a compra. Em caso de dúvidas sobre a versão (ex: freio a disco ou tambor / CBS), fale com nosso atendimento.
          </span>
        </div>
      </div>
    </div>
  );
};
