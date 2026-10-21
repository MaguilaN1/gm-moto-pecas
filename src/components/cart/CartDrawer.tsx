import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  Tag, 
  ArrowRight, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency, maskCep } from '../../utils/formatters';

interface CartDrawerProps {
  onNavigate: (page: string, params?: any) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    items,
    itemCount,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingCost,
    shippingOption,
    setShippingOption,
    shippingOptions,
    destinationCep,
    calculateFreight,
    isCalculatingFreight,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    grandTotal,
    pixGrandTotal
  } = useCart();

  const [inputCep, setInputCep] = useState(destinationCep);
  const [couponCode, setCouponCode] = useState('');

  if (!isCartOpen) return null;

  const handleCalculateCep = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCep) {
      calculateFreight(inputCep);
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      const success = applyCoupon(couponCode);
      if (success) setCouponCode('');
    }
  };

  const handleGoToCheckout = () => {
    closeCart();
    onNavigate('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeCart}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-fade-in" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-slate-100 animate-slide-left">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-brand-600/10 border border-brand-500/20 text-brand-500 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Meu Carrinho</h3>
                <span className="text-xs text-slate-400 font-medium">{itemCount} {itemCount === 1 ? 'item' : 'itens'}</span>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-slate-800/80 rounded-full flex items-center justify-center text-slate-500 mb-4 border border-slate-700">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Seu carrinho está vazio</h4>
              <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
                Explore nosso catálogo completo e encontre as melhores peças para sua motocicleta.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  onNavigate('catalog');
                }}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-600/30 transition-all flex items-center gap-2"
              >
                Explorar Catálogo de Peças <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto divide-y divide-slate-800 p-4 space-y-4">
              {/* Products List */}
              <div className="space-y-3">
                {items.map(({ product, quantity }) => (
                  <div 
                    key={product.id} 
                    className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 flex gap-3 group relative"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-xl bg-slate-900 border border-slate-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 
                            onClick={() => {
                              closeCart();
                              onNavigate('product-detail', { slug: product.slug });
                            }}
                            className="text-xs font-bold text-white hover:text-brand-400 cursor-pointer transition-colors line-clamp-2"
                          >
                            {product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                            title="Remover"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                          <span className="font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 text-slate-300">
                            {product.partNumber}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="truncate text-slate-300">{product.brand}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60">
                        {/* Qty Steppers */}
                        <div className="flex items-center border border-slate-700 bg-slate-900 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-white font-mono">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-xs font-extrabold text-white block">
                            {formatCurrency(product.price * quantity)}
                          </span>
                          <span className="text-[10px] text-emerald-400">
                            {formatCurrency(product.price * quantity * 0.95)} no PIX
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Calculator */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Truck className="w-4 h-4 text-brand-500" />
                  <span>Calcular Frete e Prazo</span>
                </div>

                <form onSubmit={handleCalculateCep} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCep}
                    onChange={(e) => setInputCep(maskCep(e.target.value))}
                    placeholder="00000-000"
                    maxLength={9}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isCalculatingFreight}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors"
                  >
                    {isCalculatingFreight ? '...' : 'Calcular'}
                  </button>
                </form>

                {/* Shipping Options Selection */}
                {shippingOptions.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {shippingOptions.map((opt) => (
                      <label
                        key={opt.id}
                        onClick={() => setShippingOption(opt)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all text-xs ${
                          shippingOption?.id === opt.id
                            ? 'bg-brand-600/10 border-brand-500/50 text-white'
                            : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingOption?.id === opt.id}
                            onChange={() => setShippingOption(opt)}
                            className="text-brand-600 focus:ring-0"
                          />
                          <div>
                            <span className="font-semibold block">{opt.name}</span>
                            <span className="text-[11px] text-slate-400">{opt.deadlineText}</span>
                          </div>
                        </div>
                        <span className="font-bold text-white">
                          {opt.price === 0 ? (
                            <span className="text-emerald-400 font-extrabold uppercase">Grátis</span>
                          ) : (
                            formatCurrency(opt.price)
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Coupon Form */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Tag className="w-4 h-4 text-brand-500" />
                  <span>Cupom de Desconto</span>
                </div>

                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Ex: BEMVINDO10"
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 uppercase font-mono focus:outline-none focus:border-brand-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow transition-colors"
                    >
                      Aplicar
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-mono font-bold text-emerald-300">{appliedCoupon.code}</span>
                        <span className="text-[11px] text-slate-400 block">(-{appliedCoupon.discountPercent}%)</span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-400 hover:underline font-semibold"
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Summary & Checkout Button */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-slate-200 font-semibold">{formatCurrency(subtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto Cupom ({appliedCoupon.code})</span>
                    <span className="font-semibold">-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Frete</span>
                  <span className="text-slate-200 font-semibold">
                    {shippingCost === 0 && shippingOption ? (
                      <span className="text-emerald-400 uppercase font-bold">Grátis</span>
                    ) : (
                      formatCurrency(shippingCost)
                    )}
                  </span>
                </div>

                <div className="border-t border-slate-800 pt-2 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Total</span>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-white block">
                      {formatCurrency(grandTotal)}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      ou {formatCurrency(pixGrandTotal)} no PIX (5% OFF)
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGoToCheckout}
                className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-500 hover:to-rose-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 group transform active:scale-98"
              >
                <span>Finalizar Compra Segura</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ambiente Criptografado & Garantia GM Moto Peças</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
