import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';
import { SEOHead } from '../components/common/SEOHead';

interface WishlistPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onNavigate }) => {
  const { wishlist, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <SEOHead title="Meus Favoritos | GM Moto Peças" />

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <button onClick={() => onNavigate('home')} className="hover:text-white">Início</button>
              <span>/</span>
              <span className="text-brand-400 font-semibold">Lista de Desejos</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white heading-font">
              Meus Favoritos ({wishlist.length})
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Peças e acessórios salvos para você comprar quando quiser.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar Lista</span>
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-xl max-w-md mx-auto">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-brand-500">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Sua lista de favoritos está vazia</h3>
            <p className="text-xs text-slate-400">
              Clique no coração dos produtos para salvá-los e acompanhar preços e promoções.
            </p>
            <button
              onClick={() => onNavigate('catalog')}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg"
            >
              Explorar Produtos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => (
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
  );
};
