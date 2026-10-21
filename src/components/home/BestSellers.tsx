import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../product/ProductCard';

interface BestSellersProps {
  products: Product[];
  onNavigate: (page: string, params?: any) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ products, onNavigate }) => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'kits' | 'freios' | 'motor' | 'eletrica'>('all');

  const filteredProducts = React.useMemo(() => {
    if (selectedTab === 'all') {
      return products.filter((p) => p.isBestSeller || p.isFeatured).slice(0, 8);
    }
    return products.filter((p) => p.categoryId === selectedTab).slice(0, 8);
  }, [products, selectedTab]);

  return (
    <section className="py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600/10 border border-brand-500/20 text-brand-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Alta Procura na Zona Sul & Brasil</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white heading-font uppercase tracking-tight">
              Mais <span className="text-brand-500">Vendidos</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              As peças preferidas pelos motociclistas e oficinas mecânicas de São Paulo.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTab === 'all'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Todos os Destaques
            </button>
            <button
              onClick={() => setSelectedTab('kits')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTab === 'kits'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Kits Completos
            </button>
            <button
              onClick={() => setSelectedTab('freios')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTab === 'freios'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Freios
            </button>
            <button
              onClick={() => setSelectedTab('motor')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTab === 'motor'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Motor
            </button>
            <button
              onClick={() => setSelectedTab('eletrica')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTab === 'eletrica'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Elétrica
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* Bottom Banner & CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('catalog')}
            className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 transition-all inline-flex items-center gap-2 transform hover:scale-105"
          >
            <span>Ver Catálogo Completo com Filtros</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
