import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MessageCircle, 
  MapPin
} from 'lucide-react';
import { Order } from '../../types';
import { STORE_CONFIG } from '../../utils/seo';
import { formatCurrency } from '../../utils/formatters';

interface OrderSuccessProps {
  order: Order;
  onNavigate: (page: string, params?: any) => void;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ order, onNavigate }) => {
  useEffect(() => {
    // Trigger festive confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#10b981', '#3b82f6', '#f59e0b', '#ffffff']
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  const handleOpenWhatsAppTracking = () => {
    const msg = `Olá! Acabei de realizar o pedido *#${order.code}* no site da GM Moto Peças no valor de ${formatCurrency(order.total)}. Gostaria de acompanhar a entrega!`;
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-scale-up py-4">
      {/* 1. Success Hero Card */}
      <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Pedido Realizado com Sucesso!
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white heading-font">
            Obrigado pela sua compra!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Número do Pedido: <strong className="text-white font-mono text-base font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">#{order.code}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleOpenWhatsAppTracking}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Acompanhar pelo WhatsApp</span>
          </button>

          <button
            onClick={() => onNavigate('account', { tab: 'orders' })}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2"
          >
            <Package className="w-4 h-4 text-brand-400" />
            <span>Ver Meus Pedidos</span>
          </button>
        </div>
      </div>

      {/* 2. Order Summary Details */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
          Resumo do Pedido #{order.code}
        </h3>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-500" /> Endereço de Entrega
            </span>
            <p className="text-slate-300">{order.shippingAddress.recipientName}</p>
            <p className="text-slate-400">
              {order.shippingAddress.street}, {order.shippingAddress.number} {order.shippingAddress.complement}
            </p>
            <p className="text-slate-400">
              {order.shippingAddress.neighborhood} — {order.shippingAddress.city}/{order.shippingAddress.state} (CEP {order.shippingAddress.zipCode})
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-400" /> Envio & Pagamento
            </span>
            <p className="text-slate-300">
              Método: <strong>{order.shippingOption.name}</strong> ({order.shippingOption.deadlineText})
            </p>
            <p className="text-slate-300">
              Pagamento: <strong className="uppercase">{order.paymentMethod.replace('_', ' ')}</strong>
            </p>
            {order.trackingCode && (
              <p className="text-brand-400 font-mono font-bold">
                Rastreio: {order.trackingCode}
              </p>
            )}
          </div>
        </div>

        {/* Purchased Items Table */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Itens Comprados ({order.items.length})
          </span>
          <div className="divide-y divide-slate-800 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover rounded-xl bg-slate-900 border border-slate-800"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Cód: {item.product.partNumber} • Qtd: {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-white shrink-0">
                  {formatCurrency(item.totalPrice)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals Summary */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Subtotal dos Produtos</span>
            <span className="text-white font-medium">{formatCurrency(order.subtotal)}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-400">
              <span>Descontos Aplicados</span>
              <span className="font-semibold">-{formatCurrency(order.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-400">
            <span>Valor do Frete</span>
            <span className="text-white font-medium">
              {order.shippingCost === 0 ? 'Grátis' : formatCurrency(order.shippingCost)}
            </span>
          </div>
          <div className="border-t border-slate-800 pt-2 flex justify-between items-baseline font-bold text-sm text-white">
            <span>Total Final</span>
            <span className="text-base font-black text-brand-400">{formatCurrency(order.total)}</span>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-bold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1"
          >
            ← Voltar para a Página Inicial da Loja
          </button>
        </div>
      </div>
    </div>
  );
};
