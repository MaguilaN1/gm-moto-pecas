import React, { useState } from 'react';
import { 
  Boxes, 
  Plus, 
  Minus, 
  AlertTriangle, 
  CheckCircle2, 
  History, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search,
  FileText
} from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { formatDate } from '../../utils/formatters';

interface AdminStockManagerProps {
  initialSelectedProduct?: Product | null;
}

export const AdminStockManager: React.FC<AdminStockManagerProps> = ({ initialSelectedProduct }) => {
  const { products, lowStockProducts, outOfStockProducts, stockMovements, adjustStock } = useStore();

  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialSelectedProduct?.id || products[0]?.id || ''
  );
  const [movementType, setMovementType] = useState<'entrada' | 'saida'>('entrada');
  const [quantity, setQuantity] = useState<number>(10);
  const [reason, setReason] = useState<string>('Reposição de Estoque / Entrada de NF');
  const [movementSearch, setMovementSearch] = useState('');

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleExecuteStockAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || quantity <= 0) return;

    const delta = movementType === 'entrada' ? quantity : -quantity;
    adjustStock(selectedProduct.id, delta, reason);

    setQuantity(5);
    setReason('Reposição de Estoque');
  };

  const filteredMovements = stockMovements.filter(
    (m) =>
      m.productName.toLowerCase().includes(movementSearch.toLowerCase()) ||
      m.partNumber.toLowerCase().includes(movementSearch.toLowerCase()) ||
      m.reason.toLowerCase().includes(movementSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-white heading-font">
          Controle Avançado de Estoque & Inventário
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Monitore pontos de reposição, dê entrada em notas fiscais e acompanhe o histórico completo de movimentações.
        </p>
      </div>

      {/* Critical Stock Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-amber-950/40 border border-amber-500/30 rounded-3xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Produtos com Estoque Baixo</h3>
              <span className="text-xs text-amber-400 font-semibold">{lowStockProducts.length} itens no limite mínimo</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {lowStockProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProductId(p.id)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-amber-500/30 rounded-xl text-xs text-slate-200 flex items-center gap-2"
              >
                <span className="font-bold text-amber-400">{p.stockQuantity} un.</span>
                <span className="truncate max-w-[150px]">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 bg-rose-950/40 border border-rose-500/30 rounded-3xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Produtos Esgotados (Sem Estoque)</h3>
              <span className="text-xs text-rose-400 font-semibold">{outOfStockProducts.length} itens zerados</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {outOfStockProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProductId(p.id)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-rose-500/30 rounded-xl text-xs text-slate-200 flex items-center gap-2"
              >
                <span className="font-bold text-rose-400">0 un.</span>
                <span className="truncate max-w-[150px]">{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stock Adjustment Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
          <div className="p-2 bg-brand-600/10 border border-brand-500/20 text-brand-400 rounded-xl">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Lançamento de Movimentação de Estoque</h3>
            <p className="text-xs text-slate-400">Dê entrada em novas compras ou faça ajustes manuais de inventário.</p>
          </div>
        </div>

        <form onSubmit={handleExecuteStockAdjustment} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Select Product */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Produto Selecionado
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  [{p.partNumber}] {p.name} (Atual: {p.stockQuantity} un.)
                </option>
              ))}
            </select>
          </div>

          {/* Type: Entry vs Exit */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Tipo de Movimento
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMovementType('entrada')}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  movementType === 'entrada'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-slate-950 border border-slate-700 text-slate-400'
                }`}
              >
                <Plus className="w-3.5 h-3.5" /> Entrada
              </button>
              <button
                type="button"
                onClick={() => setMovementType('saida')}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  movementType === 'saida'
                    ? 'bg-rose-600 text-white shadow-lg'
                    : 'bg-slate-950 border border-slate-700 text-slate-400'
                }`}
              >
                <Minus className="w-3.5 h-3.5" /> Saída
              </button>
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Quantidade (un.)
            </label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold text-center focus:outline-none focus:border-brand-500 font-mono"
            />
          </div>

          {/* Reason / Note */}
          <div className="sm:col-span-3 space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Motivo / Nota Fiscal / Observação
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ex: Entrada de NF 49102 ou Venda em Balcão"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col justify-end">
            <button
              type="submit"
              className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmar Lançamento</span>
            </button>
          </div>
        </form>
      </div>

      {/* Historical Stock Movements Audit Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-brand-500" />
            <div>
              <h3 className="text-base font-bold text-white">Histórico de Movimentações de Estoque</h3>
              <p className="text-xs text-slate-400">Rastreabilidade completa de todas as entradas e saídas.</p>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={movementSearch}
              onChange={(e) => setMovementSearch(e.target.value)}
              placeholder="Filtrar histórico..."
              className="bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Data / Hora</th>
                <th className="p-3">Produto</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Qtd</th>
                <th className="p-3">Saldo Resultante</th>
                <th className="p-3">Motivo / Origem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredMovements.map((mov) => (
                <tr key={mov.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="p-3 text-slate-400 font-mono text-[11px]">{formatDate(mov.date)}</td>
                  <td className="p-3 font-semibold text-white max-w-[220px] truncate">{mov.productName}</td>
                  <td className="p-3 font-mono text-brand-400">{mov.partNumber}</td>
                  <td className="p-3">
                    {mov.type === 'entrada' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <ArrowDownLeft className="w-3 h-3" /> Entrada
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                        <ArrowUpRight className="w-3 h-3" /> Saída
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-mono font-bold text-white">
                    {mov.type === 'entrada' ? `+${mov.quantity}` : `-${mov.quantity}`} un.
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-200">{mov.resultingStock} un.</td>
                  <td className="p-3 text-slate-300 italic">{mov.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
