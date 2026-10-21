import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck, ArrowLeft, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { CustomerAddress, Order, CartItem } from '../types';
import { CheckoutStepper } from '../components/checkout/CheckoutStepper';
import { StepIdentification } from '../components/checkout/StepIdentification';
import { StepAddress } from '../components/checkout/StepAddress';
import { StepShipping } from '../components/checkout/StepShipping';
import { StepPayment } from '../components/checkout/StepPayment';
import { OrderSuccess } from '../components/checkout/OrderSuccess';
import { SEOHead } from '../components/common/SEOHead';
import { formatCurrency, generateOrderCode } from '../utils/formatters';

interface CheckoutPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { 
    items, 
    subtotal, 
    shippingCost, 
    shippingOption, 
    discountAmount, 
    grandTotal, 
    pixGrandTotal, 
    clearCart 
  } = useCart();

  const { createOrder } = useStore();
  const { currentUser } = useAuth();

  const [step, setStep] = useState(1);

  // Form states across steps
  const [customerData, setCustomerData] = useState<{
    name: string;
    email: string;
    cpf: string;
    phone: string;
  }>({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    cpf: currentUser?.cpf || '',
    phone: currentUser?.phone || '',
  });

  const [shippingAddress, setShippingAddress] = useState<CustomerAddress | null>(
    currentUser?.addresses.find((a: CustomerAddress) => a.isDefault) || null
  );

  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (completedOrder) {
    return (
      <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
        <SEOHead title={`Pedido #${completedOrder.code} Confirmado | GM Moto Peças`} />
        <OrderSuccess order={completedOrder} onNavigate={onNavigate} />
      </div>
    );
  }

  if (items.length === 0 && step !== 5) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Seu carrinho está vazio</h2>
          <p className="text-xs text-slate-400">Adicione produtos antes de prosseguir para o checkout.</p>
          <button
            onClick={() => onNavigate('catalog')}
            className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg"
          >
            Ir para o Catálogo de Peças
          </button>
        </div>
      </div>
    );
  }

  const handleIdentificationNext = (data: typeof customerData) => {
    setCustomerData(data);
    setStep(2);
  };

  const handleAddressNext = (address: CustomerAddress) => {
    setShippingAddress(address);
    setStep(3);
  };

  const handleShippingNext = () => {
    setStep(4);
  };

  const handleCompletePayment = (payment: {
    method: 'pix' | 'credit_card' | 'debit_card' | 'boleto';
    details: any;
  }) => {
    if (!shippingAddress || !shippingOption) return;

    const orderTotal = payment.method === 'pix' ? pixGrandTotal : grandTotal;
    const totalDiscount = payment.method === 'pix' ? discountAmount + (grandTotal * 0.05) : discountAmount;

    const orderItems = items.map((i: CartItem) => ({
      product: i.product,
      quantity: i.quantity,
      unitPrice: i.product.price,
      totalPrice: i.product.price * i.quantity,
    }));

    const newOrder = createOrder({
      code: generateOrderCode(),
      createdAt: new Date().toISOString(),
      customer: {
        userId: currentUser?.id,
        name: customerData.name,
        email: customerData.email,
        cpf: customerData.cpf,
        phone: customerData.phone,
      },
      shippingAddress,
      shippingOption,
      paymentMethod: payment.method,
      paymentDetails: payment.details,
      items: orderItems,
      subtotal,
      shippingCost,
      discountAmount: totalDiscount,
      total: orderTotal,
      status: payment.method === 'pix' || payment.method === 'credit_card' ? 'pago' : 'pendente',
      trackingCode: shippingOption.code === 'motoboy' ? `MOTOBOY-SP-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
    });

    clearCart();
    setCompletedOrder(newOrder);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <SEOHead title="Finalizar Compra Segura | GM Moto Peças" />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Back Link */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continuar Comprando</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
            <Lock className="w-4 h-4" />
            <span>Checkout Seguro Criptografado</span>
          </div>
        </div>

        {/* Stepper */}
        <CheckoutStepper currentStep={step} />

        {/* Grid: Forms (2/3) + Order Summary (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Checkout Step Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <StepIdentification
                onNext={handleIdentificationNext}
                initialData={customerData}
              />
            )}

            {step === 2 && (
              <StepAddress
                onNext={handleAddressNext}
                onBack={() => setStep(1)}
                initialAddress={shippingAddress}
              />
            )}

            {step === 3 && (
              <StepShipping
                onNext={handleShippingNext}
                onBack={() => setStep(2)}
              />
            )}

            {step === 4 && (
              <StepPayment
                onCompletePayment={handleCompletePayment}
                onBack={() => setStep(3)}
              />
            )}
          </div>

          {/* Right Order Summary Sticky Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 sticky top-24 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Resumo do Pedido ({items.length} {items.length === 1 ? 'item' : 'itens'})
              </h4>
            </div>

            {/* Items Thumbnails List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map(({ product, quantity }: CartItem) => (
                <div key={product.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-11 h-11 object-cover rounded-xl bg-slate-950 border border-slate-800 shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-white line-clamp-1">{product.name}</p>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Qtd: {quantity}x • {product.partNumber}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-white shrink-0">
                    {formatCurrency(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-medium">{formatCurrency(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Desconto de Cupom</span>
                  <span className="font-semibold">-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span>Frete ({shippingOption?.name.split(' (')[0] || 'A calcular'})</span>
                <span className="text-white font-medium">
                  {shippingCost === 0 ? 'Grátis' : formatCurrency(shippingCost)}
                </span>
              </div>

              <div className="border-t border-slate-800 pt-2 flex justify-between items-baseline font-bold text-sm text-white">
                <span>Total</span>
                <div className="text-right">
                  <span className="text-lg font-black text-white block">
                    {formatCurrency(grandTotal)}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    ou {formatCurrency(pixGrandTotal)} no PIX (-5%)
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Garantia de Satisfação GM Moto Peças</span>
              </div>
              <p>Envio imediato com emissão automática de nota fiscal e rastreamento.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
