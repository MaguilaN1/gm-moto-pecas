import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  ShoppingBag, 
  Tag, 
  LogOut, 
  ArrowLeft, 
  ShieldAlert,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';

interface AdminHeaderProps {
  activeTab: 'dashboard' | 'products' | 'stock' | 'orders' | 'coupons';
  setActiveTab: (tab: 'dashboard' | 'products' | 'stock' | 'orders' | 'coupons') => void;
  onNavigateToStore: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ activeTab, setActiveTab, onNavigateToStore }) => {
  const { adminLogout } = useAuth();
  const { lowStockProducts, orders } = useStore();

  const pendingOrdersCount = orders.filter((o) => o.status === 'pendente' || o.status === 'pago').length;

  return (
    <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-lg shadow-brand-600/20 flex items-center justify-center p-0.5 border border-slate-700 shrink-0">
              <img
                src="/logo.png"
                alt="GM Moto Peças"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white">Painel Administrativo</span>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.2 rounded-full">
                  Gestão & Estoque
                </span>
              </div>
              <p className="text-[11px] text-slate-400">GM Moto Peças</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Visão Geral</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'products'
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Produtos</span>
            </button>

            <button
              onClick={() => setActiveTab('stock')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 relative ${
                activeTab === 'stock'
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Boxes className="w-4 h-4" />
              <span>Controle de Estoque</span>
              {lowStockProducts.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pedidos</span>
              {pendingOrdersCount > 0 && (
                <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'coupons'
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Cupons</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToStore}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-brand-400" />
              <span className="hidden sm:inline">Voltar para a Loja</span>
            </button>

            <button
              onClick={adminLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-xl transition-colors"
              title="Sair do Modo Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
