import React from 'react';
import { ShoppingCart, Heart, Star, Check, AlertTriangle, XCircle, ArrowRight, Zap } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency, formatInstallments } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, params?: any) => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate, compact = false }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);
  const isOutOfStock = !product.inStock || product.stockQuantity === 0;
  const isLowStock = !isOutOfStock && product.stockQuantity <= product.minStockThreshold;

  const handleProductClick = () => {
    onNavigate('product-detail', { slug: product.slug });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={handleProductClick}
      className="group bg-slate-900 border border-slate-800 hover:border-slate-700/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative hover:-translate-y-1"
    >
      {/* 1. Card Top & Image */}
      <div className="relative aspect-square bg-slate-950 overflow-hidden flex items-center justify-center p-4">
        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 items-start">
          {product.discountPercent && product.discountPercent > 0 && !isOutOfStock && (
            <span className="bg-gradient-to-r from-brand-600 to-rose-600 text-white text-[10px] sm:text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-md flex items-center gap-0.5">
              <Zap className="w-3 h-3 fill-current" /> {product.discountPercent}% OFF
            </span>
          )}

          {isOutOfStock ? (
            <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              <XCircle className="w-3 h-3 text-rose-400" /> Esgotado
            </span>
          ) : isLowStock ? (
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-400" /> Últimas {product.stockQuantity} un.
            </span>
          ) : (
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" /> Em Estoque
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label="Adicionar aos favoritos"
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-brand-500 border border-slate-700/80 backdrop-blur-md flex items-center justify-center transition-all shadow-md active:scale-90"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-brand-500 text-brand-500' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 rounded-xl"
          loading="lazy"
        />
      </div>

      {/* 2. Card Body Content */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Brand & Part Number */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-semibold text-brand-400 uppercase tracking-wider text-[10px] truncate max-w-[120px]">
              {product.brand}
            </span>
            <span className="font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 text-[10px]">
              Cód: {product.partNumber}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Compatibility Snippet */}
          {product.compatibilities.length > 0 && (
            <div className="pt-0.5">
              <p className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>
                <span className="font-medium text-slate-300 truncate">
                  {product.compatibilities[0].brand} {product.compatibilities[0].model} ({product.compatibilities[0].yearRange})
                </span>
                {product.compatibilities.length > 1 && (
                  <span className="text-brand-400 text-[10px] font-bold shrink-0">
                    +{product.compatibilities.length - 1}
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Ratings */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-0.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="font-bold text-slate-200">{product.rating}</span>
            <span>({product.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing Block */}
        <div className="pt-2 border-t border-slate-800/80 space-y-1">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[11px] text-slate-500 line-through block">
              De {formatCurrency(product.originalPrice)}
            </span>
          )}

          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-white">
              {formatCurrency(product.price)}
            </span>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
              -5% no PIX
            </span>
          </div>

          <p className="text-[11px] text-slate-400">
            ou {formatInstallments(product.price, product.installmentsCount)}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleQuickAdd}
          disabled={isOutOfStock}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md ${
            isOutOfStock
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/20 group-hover:shadow-brand-600/40'
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>{isOutOfStock ? 'Indisponível' : 'Comprar'}</span>
        </button>
      </div>
    </div>
  );
};
