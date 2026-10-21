import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, ChevronDown, Check, X } from 'lucide-react';
import { Product } from '../../types';
import { MOTORCYCLES, POPULAR_BRANDS, YEARS_LIST } from '../../data/motorcycles';

interface FitmentCheckerProps {
  product: Product;
}

export const FitmentChecker: React.FC<FitmentCheckerProps> = ({ product }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('Honda');
  const [selectedModel, setSelectedModel] = useState<string>('CG 160 Titan');
  const [selectedYear, setSelectedYear] = useState<string>('2022');
  const [hasChecked, setHasChecked] = useState(false);
  const [isCompatible, setIsCompatible] = useState(true);

  const availableModels = React.useMemo(() => {
    return MOTORCYCLES.filter((m) => m.brand === selectedBrand);
  }, [selectedBrand]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const models = MOTORCYCLES.filter((m) => m.brand === brand);
    if (models.length > 0) {
      setSelectedModel(models[0].model);
    } else {
      setSelectedModel('');
    }
    setHasChecked(false);
  };

  const handleCheckFitment = (e: React.FormEvent) => {
    e.preventDefault();
    setHasChecked(true);

    // Check compatibility against product.compatibilities
    const matched = product.compatibilities.some((comp) => {
      const matchBrand = comp.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchModel = comp.model.toLowerCase().includes(selectedModel.toLowerCase()) ||
                         selectedModel.toLowerCase().includes(comp.model.toLowerCase());
      return matchBrand && matchModel;
    });

    setIsCompatible(matched);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-brand-600/10 border border-brand-500/20 text-brand-400 rounded-xl">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">Verificador de Compatibilidade</h4>
          <p className="text-xs text-slate-400">Esta peça serve na sua moto? Faça a checagem rápida abaixo.</p>
        </div>
      </div>

      <form onSubmit={handleCheckFitment} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <select
            value={selectedBrand}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 appearance-none cursor-pointer"
          >
            {POPULAR_BRANDS.map((b) => (
              <option key={b} value={b} className="bg-slate-900">
                {b}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value);
              setHasChecked(false);
            }}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 appearance-none cursor-pointer"
          >
            {availableModels.map((m) => (
              <option key={m.id} value={m.model} className="bg-slate-900">
                {m.model}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setHasChecked(false);
            }}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 appearance-none cursor-pointer"
          >
            {YEARS_LIST.map((y) => (
              <option key={y} value={y.toString()} className="bg-slate-900">
                Ano {y}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="sm:col-span-3">
          <button
            type="submit"
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 hover:border-brand-500 transition-colors"
          >
            Verificar Compatibilidade
          </button>
        </div>
      </form>

      {/* Result Status */}
      {hasChecked && (
        <div
          className={`p-3.5 rounded-2xl border text-xs flex items-start gap-3 animate-fade-in ${
            isCompatible
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}
        >
          {isCompatible ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-white text-sm">
                  ✅ Compatível com {selectedBrand} {selectedModel} ({selectedYear})!
                </span>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Instalação padrão sem necessidade de adaptações. Garantia GM Moto Peças.
                </p>
              </div>
            </>
          ) : (
            <>
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-white text-sm">
                  ⚠️ Peça Não Compatível com {selectedBrand} {selectedModel} ({selectedYear})
                </span>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Consulte nossa equipe no WhatsApp para indicarmos o modelo exato para a sua moto.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
