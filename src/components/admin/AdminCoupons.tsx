import React, { useState } from 'react';
import { Tag, Plus, Check, Trash2, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/formatters';

export const AdminCoupons: React.FC = () => {
  const { coupons, addCoupon, toggleCoupon } = useStore();
  const { error } = useToast();

  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(10);
  const [minOrderValue, setMinOrderValue] = useState<number>(100);
  const [description, setDescription] = useState('');

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      error('Código obrigatório', 'Informe o código do cupom (Ex: PROMO10).');
      return;
    }

    addCoupon({
      code: code.trim().toUpperCase(),
      discountPercent: Number(discountPercent),
      minOrderValue: Number(minOrderValue),
      active: true,
      description: description || `${discountPercent}% de desconto`,
    });

    setCode('');
    setDescription('');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-white heading-font">
          Gestão de Cupons de Desconto
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Crie códigos promocionais e configure regras de valor mínimo para impulsionar as vendas.
        </p>
      </div>

      {/* New Coupon Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
          <div className="p-2 bg-brand-600/10 border border-brand-500/20 text-brand-400 rounded-xl">
            <Tag className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Criar Novo Cupom</h3>
        </div>

        <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Código do Cupom</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Ex: OFERTA15"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono uppercase focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Desconto (%)</label>
            <input
              type="number"
              min={1}
              max={90}
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-brand-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Pedido Mínimo (R$)</label>
            <input
              type="number"
              min={0}
              value={minOrderValue}
              onChange={(e) => setMinOrderValue(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-brand-500 font-mono"
            />
          </div>

          <div className="flex flex-col justify-end">
            <button
              type="submit"
              className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Criar Cupom</span>
            </button>
          </div>
        </form>
      </div>

      {/* Existing Coupons Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Código</th>
                <th className="p-4">Desconto</th>
                <th className="p-4">Pedido Mínimo</th>
                <th className="p-4">Descrição</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ativar / Desativar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-slate-850/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-brand-400 text-sm">{c.code}</td>
                  <td className="p-4 font-bold text-white text-sm">{c.discountPercent}% OFF</td>
                  <td className="p-4 text-slate-300">{formatCurrency(c.minOrderValue)}</td>
                  <td className="p-4 text-slate-400">{c.description}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        c.active
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {c.active ? 'Ativo' : 'Pausado'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleCoupon(c.code)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        c.active
                          ? 'bg-slate-800 hover:bg-rose-600/20 text-rose-400'
                          : 'bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white'
                      }`}
                    >
                      {c.active ? 'Desativar' : 'Ativar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
