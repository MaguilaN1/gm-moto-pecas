import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  Check, 
  AlertTriangle, 
  Share2, 
  ArrowRight,
  Plus,
  Minus,
  Zap
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { ProductGallery } from '../components/product/ProductGallery';
import { FitmentChecker } from '../components/product/FitmentChecker';
import { CompatibilityMatrix } from '../components/product/CompatibilityMatrix';
import { ProductTabs } from '../components/product/ProductTabs';
import { ProductCard } from '../components/product/ProductCard';
import { SEOHead } from '../components/common/SEOHead';
import { formatCurrency, formatInstallments } from '../utils/formatters';
import { generateProductSchema, STORE_CONFIG } from '../utils/seo';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (page: string, params?: any) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigate }) => {
  const { getProductBySlug, products } = useStore();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { success } = useToast();

  const [quantity, setQuantity] = useState(1);

  const product = getProductBySlug(slug) || products[0];

  const isFavorite = isInWishlist(product.id);
  const isOutOfStock = !product.inStock || product.stockQuantity === 0;
  const isLowStock = !isOutOfStock && product.stockQuantity <= product.minStockThreshold;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      addToCart(product, quantity);
      onNavigate('checkout');
    }
  };

  const handleBuyViaWhatsApp = () => {
    const msg = `Olá! Gostaria de comprar pelo WhatsApp o produto *${product.name}* (Código: ${product.partNumber}) no valor de ${formatCurrency(product.price * 0.95)} no PIX.`;
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Confira ${product.name} na GM Moto Peças`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      success('Link copiado!', 'O link do produto foi copiado para a área de transferência.');
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      {/* Schema.org Product Structured Data */}
      <SEOHead
        title={`${product.name} | Peças para Motos | GM Moto Peças`}
        description={product.description.slice(0, 160)}
        schemaJson={generateProductSchema(product)}
      />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-white">Início</button>
          <span>/</span>
          <button onClick={() => onNavigate('catalog')} className="hover:text-white">Produtos</button>
          <span>/</span>
          <span className="text-brand-400 font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Information, Pricing & CTAs */}
          <div className="space-y-6">
            {/* Top Brand, SKU, Rating */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-extrabold text-brand-400 uppercase tracking-wider bg-brand-600/10 px-3 py-1 rounded-full border border-brand-500/20">
                  {product.brand}
                </span>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                    Cód: {product.partNumber}
                  </span>
                  <button
                    onClick={handleShare}
                    className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-colors"
                    title="Compartilhar Produto"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h1 className="text-xl sm:text-3xl font-black text-white heading-font leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white text-sm">{product.rating}</span>
                <span>({product.reviewsCount} avaliações de clientes verificados)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-3 shadow-xl">
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-500 line-through block">
                  De: {formatCurrency(product.originalPrice)}
                </span>
              )}

              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  {formatCurrency(product.price * 0.95)} no PIX (5% OFF)
                </span>
              </div>

              <p className="text-xs text-slate-300">
                ou em até <strong className="text-white">{formatInstallments(product.price, product.installmentsCount)}</strong>
              </p>

              {/* Stock Status Badge */}
              <div className="pt-2">
                {isOutOfStock ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Produto Esgotado Temporariamente</span>
                  </div>
                ) : isLowStock ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Últimas {product.stockQuantity} unidades em estoque!</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Produto em Estoque • Pronta Entrega</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-700 bg-slate-900 rounded-2xl p-1 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="p-2 text-slate-400 hover:text-white disabled:opacity-30 rounded-xl"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-white font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    disabled={quantity >= product.stockQuantity || isOutOfStock}
                    className="p-2 text-slate-400 hover:text-white disabled:opacity-30 rounded-xl"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs sm:text-sm font-bold border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-40"
                >
                  <ShoppingCart className="w-4 h-4 text-brand-500" />
                  <span>Adicionar ao Carrinho</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-2xl border transition-all shrink-0 ${
                    isFavorite
                      ? 'bg-brand-600 text-white border-brand-500 shadow-lg shadow-brand-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border-slate-700'
                  }`}
                  title="Favoritar"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-4 bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-500 hover:to-rose-500 text-white rounded-2xl text-sm font-extrabold shadow-xl shadow-brand-600/40 hover:shadow-brand-600/60 transition-all flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-40"
              >
                <span>COMPRAR AGORA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* WhatsApp Direct Buy Button */}
              <button
                onClick={handleBuyViaWhatsApp}
                className="w-full py-3 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-2xl text-xs sm:text-sm font-bold border border-emerald-500/30 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Comprar pelo WhatsApp com Vendedor</span>
              </button>
            </div>

            {/* Quick Benefits Bullet Points */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2 text-xs text-slate-300">
                <Truck className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Motoboy SP ou Sedex BR</span>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garantia de {product.warrantyMonths} meses</span>
              </div>
            </div>

            {/* Fitment Checker Interactive Widget */}
            <FitmentChecker product={product} />
          </div>
        </div>

        {/* Compatibility Matrix Section */}
        <CompatibilityMatrix compatibilities={product.compatibilities} />

        {/* Product Tabs */}
        <ProductTabs product={product} />

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Produtos Relacionados</h3>
                <p className="text-xs text-slate-400">Quem comprou este item também se interessou por:</p>
              </div>
              <button
                onClick={() => onNavigate('catalog', { category: product.categoryId })}
                className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1"
              >
                <span>Ver mais desta categoria</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
