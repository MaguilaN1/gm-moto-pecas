import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  X, 
  RotateCcw, 
  Zap,
  Package
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { CATEGORIES } from '../data/categories';
import { MOTORCYCLES, POPULAR_BRANDS } from '../data/motorcycles';
import { SEOHead } from '../components/common/SEOHead';
import { formatCurrency } from '../utils/formatters';

interface CatalogPageProps {
  initialSearch?: string;
  initialCategory?: string;
  initialBrand?: string;
  initialModel?: string;
  initialYear?: string;
  initialFilter?: string;
  onNavigate: (page: string, params?: any) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  initialSearch = '',
  initialCategory = '',
  initialBrand = '',
  initialModel = '',
  initialYear = '',
  initialFilter = '',
  onNavigate,
}) => {
  const { products } = useStore();

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [onlyOffers, setOnlyOffers] = useState(initialFilter === 'offers');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'bestsellers' | 'rating'>('relevance');

  useEffect(() => {
    if (initialSearch !== undefined) setSearch(initialSearch);
    if (initialCategory !== undefined) setSelectedCategory(initialCategory);
    if (initialBrand !== undefined) setSelectedBrand(initialBrand);
    if (initialModel !== undefined) setSelectedModel(initialModel);
    if (initialYear !== undefined) setSelectedYear(initialYear);
    if (initialFilter === 'offers') setOnlyOffers(true);
  }, [initialSearch, initialCategory, initialBrand, initialModel, initialYear, initialFilter]);

  const availableModelsForBrand = useMemo(() => {
    if (!selectedBrand) return [];
    return MOTORCYCLES.filter((m) => m.brand === selectedBrand);
  }, [selectedBrand]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchSku = p.partNumber.toLowerCase().includes(q);
        const matchCat = p.categoryId.toLowerCase().includes(q);
        const matchMoto = p.compatibilities.some(
          (c) =>
            c.model.toLowerCase().includes(q) ||
            c.brand.toLowerCase().includes(q) ||
            c.yearRange.includes(q)
        );
        if (!matchName && !matchBrand && !matchSku && !matchCat && !matchMoto) return false;
      }

      if (selectedCategory && p.categoryId !== selectedCategory) {
        return false;
      }

      if (selectedBrand) {
        const hasBrandComp = p.compatibilities.some(
          (c) => c.brand.toLowerCase() === selectedBrand.toLowerCase()
        );
        if (!hasBrandComp) return false;
      }

      if (selectedModel) {
        const hasModelComp = p.compatibilities.some(
          (c) =>
            c.model.toLowerCase().includes(selectedModel.toLowerCase()) ||
            selectedModel.toLowerCase().includes(c.model.toLowerCase())
        );
        if (!hasModelComp) return false;
      }

      if (onlyOffers && (!p.discountPercent || p.discountPercent <= 0) && !p.isWeeklyOffer) {
        return false;
      }

      if (onlyInStock && (!p.inStock || p.stockQuantity === 0)) {
        return false;
      }

      if (p.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestsellers') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      return 0;
    });
  }, [products, search, selectedCategory, selectedBrand, selectedModel, selectedYear, onlyOffers, onlyInStock, maxPrice, sortBy]);

  const activeFiltersCount = [
    search,
    selectedCategory,
    selectedBrand,
    selectedModel,
    selectedYear,
    onlyOffers,
    onlyInStock,
    maxPrice < 500,
  ].filter(Boolean).length;

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedYear('');
    setOnlyOffers(false);
    setOnlyInStock(false);
    setMaxPrice(500);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Catálogo Completo de Peças para Motos | GM Moto Peças"
        description="Filtre e encontre peças e kits de alta performance compatíveis com Honda, Yamaha, Suzuki e muito mais. Preço baixo, garantia e envio rápido."
      />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Title & Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <button onClick={() => onNavigate('home')} className="hover:text-white">Início</button>
              <span>/</span>
              <span className="text-brand-400 font-semibold">Catálogo de Produtos</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white heading-font">
              {selectedCategory
                ? CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Produtos'
                : 'Todas as Motopeças'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Exibindo <strong>{filteredProducts.length}</strong> produtos compatíveis
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 hidden sm:inline">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-500 cursor-pointer"
              >
                <option value="relevance">Mais Relevantes</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="bestsellers">Mais Vendidos</option>
                <option value="rating">Melhor Avaliados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Chips Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-400">Filtros ativos:</span>

            {search && (
              <span className="inline-flex items-center gap-1 bg-slate-900 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-lg text-xs">
                Busca: "{search}"
                <button onClick={() => setSearch('')} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
              </span>
            )}

            {selectedCategory && (
              <span className="inline-flex items-center gap-1 bg-brand-600/20 text-brand-300 border border-brand-500/30 px-2.5 py-1 rounded-lg text-xs font-semibold">
                {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory('')} className="hover:text-white"><X className="w-3 h-3" /></button>
              </span>
            )}

            {selectedBrand && (
              <span className="inline-flex items-center gap-1 bg-slate-900 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-lg text-xs">
                Marca: {selectedBrand}
                <button onClick={() => setSelectedBrand('')} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
              </span>
            )}

            {selectedModel && (
              <span className="inline-flex items-center gap-1 bg-slate-900 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-lg text-xs">
                Modelo: {selectedModel}
                <button onClick={() => setSelectedModel('')} className="hover:text-rose-400"><X className="w-3 h-3" /></button>
              </span>
            )}

            {onlyOffers && (
              <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-lg text-xs font-semibold">
                <Zap className="w-3 h-3 fill-current" /> Ofertas da Semana
                <button onClick={() => setOnlyOffers(false)} className="hover:text-white"><X className="w-3 h-3" /></button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs text-brand-400 hover:text-brand-300 font-bold ml-2 underline"
            >
              Limpar todos
            </button>
          </div>
        )}

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Sidebar Filters */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 sticky top-24 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-500" /> Filtros
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-slate-400 hover:text-brand-400 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Limpar
                </button>
              )}
            </div>

            {/* 1. Categorias */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Categorias
              </label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    !selectedCategory ? 'bg-brand-600/20 text-brand-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Todas as Categorias</span>
                  <span>{products.length}</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id ? 'bg-brand-600/20 text-brand-400 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[11px] opacity-70">
                      {products.filter((p) => p.categoryId === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Marca da Moto */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Marca da Motocicleta
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setSelectedModel('');
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
              >
                <option value="">Todas as Montadoras</option>
                {POPULAR_BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* 3. Modelo da Moto */}
            {selectedBrand && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Modelo da Moto
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                >
                  <option value="">Todos os Modelos</option>
                  {availableModelsForBrand.map((m) => (
                    <option key={m.id} value={m.model}>{m.model}</option>
                  ))}
                </select>
              </div>
            )}

            {/* 4. Preço Máximo */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span className="uppercase tracking-wider">Faixa de Preço</span>
                <span className="text-brand-400">Até {formatCurrency(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={20}
                max={500}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>

            {/* 5. Toggles */}
            <div className="space-y-2.5 pt-3 border-t border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={onlyOffers}
                  onChange={(e) => setOnlyOffers(e.target.checked)}
                  className="rounded border-slate-700 text-brand-600 focus:ring-0"
                />
                <span>Apenas Ofertas da Semana</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-slate-700 text-brand-600 focus:ring-0"
                />
                <span>Apenas Itens em Estoque</span>
              </label>
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-3 space-y-6">
            {filteredProducts.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-xl">
                <Package className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">Nenhum produto encontrado</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Não encontramos peças correspondentes a todos os filtros selecionados. Experimente limpar alguns filtros ou buscar pelo nome geral da peça.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Limpar Todos os Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
