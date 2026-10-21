import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  Clock, 
  X, 
  ExternalLink,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { STORE_CONFIG } from '../../utils/seo';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.code.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.cpf.includes(search);

    const matchStatus = statusFilter === 'all' || o.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus, trackingInput);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus,
        trackingCode: trackingInput || selectedOrder.trackingCode,
      });
    }
  };

  const handleWhatsAppContact = (order: Order) => {
    const msg = `Olá ${order.customer.name.split(' ')[0]}! Aqui é da GM Moto Peças referente ao seu pedido #${order.code}. Estamos atualizando o status para: ${order.status.toUpperCase()}.`;
    const url = `https://wa.me/55${order.customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-white heading-font">
          Gestão de Pedidos
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Acompanhe os pedidos recebidos, altere status de entrega e envie código de rastreio aos clientes.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por código (#GM-...), nome do cliente ou CPF..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-950 border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-500"
        >
          <option value="all">Todos os Status</option>
          <option value="pendente">Pendente</option>
          <option value="pago">Pago</option>
          <option value="em_separacao">Em Separação</option>
          <option value="enviado">Enviado</option>
          <option value="entregue">Entregue</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Pedido</th>
                <th className="p-4">Data</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Itens</th>
                <th className="p-4">Envio</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-brand-400">#{order.code}</td>
                  <td className="p-4 text-slate-400 text-[11px]">{formatDate(order.createdAt)}</td>
                  <td className="p-4">
                    <span className="font-semibold text-white block">{order.customer.name}</span>
                    <span className="text-[11px] text-slate-400">{order.customer.phone}</span>
                  </td>
                  <td className="p-4">{order.items.length} un.</td>
                  <td className="p-4">
                    <span className="text-slate-300 block">{order.shippingOption.name.split(' (')[0]}</span>
                    <span className="text-[10px] text-slate-500">{order.shippingAddress.neighborhood} - {order.shippingAddress.city}</span>
                  </td>
                  <td className="p-4 font-bold text-white">{formatCurrency(order.total)}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                      className={`text-[11px] font-bold uppercase rounded-lg px-2 py-1 border cursor-pointer ${
                        order.status === 'entregue'
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                          : order.status === 'enviado'
                          ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                          : order.status === 'em_separacao'
                          ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                          : order.status === 'pago'
                          ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      <option value="pendente" className="bg-slate-900 text-white">Pendente</option>
                      <option value="pago" className="bg-slate-900 text-white">Pago</option>
                      <option value="em_separacao" className="bg-slate-900 text-white">Em Separação</option>
                      <option value="enviado" className="bg-slate-900 text-white">Enviado</option>
                      <option value="entregue" className="bg-slate-900 text-white">Entregue</option>
                      <option value="cancelado" className="bg-slate-900 text-white">Cancelado</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setTrackingInput(order.trackingCode || '');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative text-slate-100 my-8">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-brand-400 font-mono">
                  PEDIDO #{selectedOrder.code}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">Detalhes do Pedido</h3>
              </div>
              <button
                onClick={() => handleWhatsAppContact(selectedOrder)}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Falar no WhatsApp
              </button>
            </div>

            <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-1 text-xs">
              {/* Customer & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <h4 className="font-bold text-white">Dados do Cliente</h4>
                  <p className="text-slate-300"><strong>Nome:</strong> {selectedOrder.customer.name}</p>
                  <p className="text-slate-300"><strong>CPF:</strong> {selectedOrder.customer.cpf}</p>
                  <p className="text-slate-300"><strong>WhatsApp:</strong> {selectedOrder.customer.phone}</p>
                  <p className="text-slate-300"><strong>E-mail:</strong> {selectedOrder.customer.email}</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <h4 className="font-bold text-white">Endereço de Entrega</h4>
                  <p className="text-slate-300">
                    {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.number} {selectedOrder.shippingAddress.complement}
                  </p>
                  <p className="text-slate-400">
                    {selectedOrder.shippingAddress.neighborhood} — {selectedOrder.shippingAddress.city}/{selectedOrder.shippingAddress.state}
                  </p>
                  <p className="text-slate-400">CEP: {selectedOrder.shippingAddress.zipCode}</p>
                </div>
              </div>

              {/* Tracking Code Input */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-white">Código de Rastreamento (Correios / Motoboy)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="Ex: NL987654321BR ou MOTOBOY-SP-01"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedOrder.id, selectedOrder.status)}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold"
                  >
                    Salvar Rastreio
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                <h4 className="font-bold text-white">Itens do Pedido ({selectedOrder.items.length})</h4>
                <div className="divide-y divide-slate-800 bg-slate-950 rounded-2xl border border-slate-800">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded-lg bg-slate-900"
                        />
                        <div>
                          <p className="font-semibold text-white">{item.product.name}</p>
                          <span className="text-[11px] text-slate-400 font-mono">
                            Cód: {item.product.partNumber} • Qtd: {item.quantity}x
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-white">{formatCurrency(item.totalPrice)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Frete ({selectedOrder.shippingOption.name}):</span>
                  <span>{formatCurrency(selectedOrder.shippingCost)}</span>
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto:</span>
                    <span>-{formatCurrency(selectedOrder.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-white pt-2 border-t border-slate-800">
                  <span>Total Pago:</span>
                  <span className="text-brand-400">{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
