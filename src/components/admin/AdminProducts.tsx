import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Boxes
} from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/formatters';
import { CATEGORIES } from '../../data/categories';

interface AdminProductsProps {
  onOpenModal: (product?: Product) => void;
  onOpenStockModal: (product: Product) => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({ onOpenModal, onOpenStockModal }) => {
  const { products, deleteProduct } = useStore();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');

  const filteredProducts = React.useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.partNumber.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());

      const matchCat = categoryFilter === 'all' || p.categoryId === categoryFilter;

      const matchStock =
        stockFilter === 'all'
          ? true
          : stockFilter === 'low'
          ? p.stockQuantity > 0 && p.stockQuantity <= p.minStockThreshold
          : p.stockQuantity === 0;

      return matchSearch && matchCat && matchStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${name}"?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header & New Product Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white heading-font">
            Gerenciamento de Produtos
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Cadastre, edite preços, estoque e fotos das peças automotivas.
          </p>
        </div>

        <button
          onClick={() => onOpenModal()}
          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-600/30 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Novo Produto</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, marca ou código SKU..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-500"
          >
            <option value="all">Todas as Categorias</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="bg-slate-950 border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-500"
          >
            <option value="all">Todos os Estoques</option>
            <option value="low">⚠️ Apenas Estoque Baixo</option>
            <option value="out">🚫 Apenas Esgotados</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Produto</th>
                <th className="p-4">SKU / OEM</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Estoque</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredProducts.map((p) => {
                const isOutOfStock = p.stockQuantity === 0;
                const isLowStock = !isOutOfStock && p.stockQuantity <= p.minStockThreshold;

                return (
                  <tr key={p.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-xl bg-slate-950 border border-slate-800 shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-white line-clamp-1">{p.name}</h4>
                          <span className="text-[11px] text-slate-400">{p.brand}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-brand-400 font-bold">{p.partNumber}</td>
                    <td className="p-4 font-bold text-white">{formatCurrency(p.price)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm font-mono">{p.stockQuantity} un.</span>
                        <span className="text-[10px] text-slate-500">(Mín: {p.minStockThreshold})</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {isOutOfStock ? (
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                          Esgotado
                        </span>
                      ) : isLowStock ? (
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          ⚠️ Baixo
                        </span>
                      ) : (
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Em Estoque
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenStockModal(p)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition-colors"
                          title="Ajustar Estoque"
                        >
                          <Boxes className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onOpenModal(p)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                          title="Editar Produto"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-2 bg-slate-800 hover:bg-rose-600/20 text-rose-400 rounded-lg transition-colors"
                          title="Excluir Produto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
