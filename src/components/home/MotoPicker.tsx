import React, { useState } from 'react';
import { Search, ChevronDown, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { MOTORCYCLES, POPULAR_BRANDS, YEARS_LIST } from '../../data/motorcycles';

interface MotoPickerProps {
  onSelectMoto: (brand: string, model: string, year: string) => void;
}

export const MotoPicker: React.FC<MotoPickerProps> = ({ onSelectMoto }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('Honda');
  const [selectedModel, setSelectedModel] = useState<string>('CG 160 Titan');
  const [selectedYear, setSelectedYear] = useState<string>('2024');

  // Filter models based on selected brand
  const availableModels = React.useMemo(() => {
    return MOTORCYCLES.filter((m) => m.brand === selectedBrand);
  }, [selectedBrand]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const modelsForBrand = MOTORCYCLES.filter((m) => m.brand === brand);
    if (modelsForBrand.length > 0) {
      setSelectedModel(modelsForBrand[0].model);
    } else {
      setSelectedModel('');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectMoto(selectedBrand, selectedModel, selectedYear);
  };

  const handleQuickSelect = (brand: string, model: string) => {
    setSelectedBrand(brand);
    setSelectedModel(model);
    onSelectMoto(brand, model, selectedYear);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-slate-950 to-slate-900 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle Glow Background */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600/10 border border-brand-500/20 text-brand-400 text-xs font-bold">
                <Filter className="w-3.5 h-3.5" />
                <span>Busca por Compatibilidade Exata</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white heading-font tracking-tight uppercase">
                Encontre peças para sua <span className="text-brand-500">moto</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Selecione a marca, o modelo e o ano da sua motocicleta para ver apenas produtos 100% compatíveis.
              </p>
            </div>

            {/* Filter Selector Form */}
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {/* 1. Marca */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  1. Marca da Moto
                </label>
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 appearance-none cursor-pointer"
                  >
                    {POPULAR_BRANDS.map((brand) => (
                      <option key={brand} value={brand} className="bg-slate-900 text-white">
                        {brand}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 2. Modelo */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  2. Modelo da Moto
                </label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 appearance-none cursor-pointer"
                  >
                    {availableModels.map((m) => (
                      <option key={m.id} value={m.model} className="bg-slate-900 text-white">
                        {m.model}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 3. Ano */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  3. Ano de Fabricação
                </label>
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 appearance-none cursor-pointer"
                  >
                    {YEARS_LIST.map((year) => (
                      <option key={year} value={year.toString()} className="bg-slate-900 text-white">
                        Ano {year}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 4. Action Button */}
              <div className="space-y-1.5 flex flex-col justify-end">
                <label className="hidden lg:block text-xs font-bold opacity-0">Buscar</label>
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-500 hover:to-rose-500 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 transition-all flex items-center justify-center gap-2 transform active:scale-98"
                >
                  <Search className="w-4 h-4" />
                  <span>ENCONTRAR PEÇAS</span>
                </button>
              </div>
            </form>

            {/* Popular Shortcuts */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Mais Buscadas:
              </span>
              <button
                onClick={() => handleQuickSelect('Honda', 'CG 160 Titan')}
                className="px-3 py-1 bg-slate-800/80 hover:bg-brand-600 hover:text-white rounded-full border border-slate-700 transition-colors text-slate-200"
              >
                Honda CG 160
              </button>
              <button
                onClick={() => handleQuickSelect('Honda', 'Biz 125')}
                className="px-3 py-1 bg-slate-800/80 hover:bg-brand-600 hover:text-white rounded-full border border-slate-700 transition-colors text-slate-200"
              >
                Honda Biz 125
              </button>
              <button
                onClick={() => handleQuickSelect('Honda', 'XRE 300')}
                className="px-3 py-1 bg-slate-800/80 hover:bg-brand-600 hover:text-white rounded-full border border-slate-700 transition-colors text-slate-200"
              >
                Honda XRE 300
              </button>
              <button
                onClick={() => handleQuickSelect('Yamaha', 'YS/FZ25 Fazer 250')}
                className="px-3 py-1 bg-slate-800/80 hover:bg-brand-600 hover:text-white rounded-full border border-slate-700 transition-colors text-slate-200"
              >
                Yamaha Fazer 250
              </button>
              <button
                onClick={() => handleQuickSelect('Yamaha', 'Factor 150')}
                className="px-3 py-1 bg-slate-800/80 hover:bg-brand-600 hover:text-white rounded-full border border-slate-700 transition-colors text-slate-200"
              >
                Yamaha Factor 150
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
