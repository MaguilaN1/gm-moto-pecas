import React, { useState } from 'react';
import { 
  Zap, 
  CreditCard, 
  Barcode, 
  ArrowLeft, 
  Lock, 
  Check, 
  Copy, 
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency, maskCardNumber, maskCardExpiry } from '../../utils/formatters';

interface StepPaymentProps {
  onCompletePayment: (paymentData: {
    method: 'pix' | 'credit_card' | 'debit_card' | 'boleto';
    details: any;
  }) => void;
  onBack: () => void;
}

export const StepPayment: React.FC<StepPaymentProps> = ({ onCompletePayment, onBack }) => {
  const { grandTotal, pixGrandTotal, pixDiscountAmount } = useCart();
  const { success, error } = useToast();

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'debit_card' | 'boleto'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);

  // Credit Card Form
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState(1);

  // Simulated Pix Copy Paste code
  const pixCopyPasteCode = '00020126580014br.gov.bcb.pix013694821-gmmoto-pagamento5204000053039865802BR5913GM MOTO PECAS6009SAO PAULO62070503***6304E8A9';
  const [copiedPix, setCopiedPix] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCopyPasteCode);
    setCopiedPix(true);
    success('Código PIX Copiado!', 'Cole no aplicativo do seu banco para pagar.');
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleFinalizeOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'credit_card') {
      if (cardNumber.replace(/\D/g, '').length < 16) {
        error('Cartão inválido', 'Digite os 16 números do seu cartão de crédito.');
        return;
      }
      if (!cardHolder.trim()) {
        error('Titular do cartão', 'Informe o nome impresso no cartão.');
        return;
      }
      if (cardExpiry.length < 5) {
        error('Validade do cartão', 'Informe a validade no formato MM/AA.');
        return;
      }
      if (cardCvv.length < 3) {
        error('Código CVV', 'Informe o código de segurança de 3 ou 4 dígitos.');
        return;
      }
    }

    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsProcessing(false);

    onCompletePayment({
      method: paymentMethod,
      details: {
        cardLast4: cardNumber ? cardNumber.slice(-4) : undefined,
        installments: paymentMethod === 'credit_card' ? installments : undefined,
        installmentValue: paymentMethod === 'credit_card' ? grandTotal / installments : undefined,
        pixQrCode: paymentMethod === 'pix' ? 'pix-qr-demo-valid' : undefined,
        pixCopyPaste: paymentMethod === 'pix' ? pixCopyPasteCode : undefined,
        boletoBarcode: paymentMethod === 'boleto' ? '34191.79001 01043.510047 91020.150008 5 98240000029782' : undefined,
      },
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-fade-in">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white">4. Forma de Pagamento</h3>
        <p className="text-xs text-slate-400">Escolha como deseja pagar seu pedido com total segurança.</p>
      </div>

      {/* Payment Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          type="button"
          onClick={() => setPaymentMethod('pix')}
          className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
            paymentMethod === 'pix'
              ? 'bg-emerald-600/15 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-500/20'
              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <Zap className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">PIX (-5%)</span>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod('credit_card')}
          className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
            paymentMethod === 'credit_card'
              ? 'bg-brand-600/15 border-brand-500 text-white shadow-lg ring-2 ring-brand-500/20'
              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <CreditCard className="w-5 h-5 text-brand-400" />
          <span className="text-xs font-bold">Cartão de Crédito</span>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod('debit_card')}
          className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
            paymentMethod === 'debit_card'
              ? 'bg-blue-600/15 border-blue-500 text-white shadow-lg ring-2 ring-blue-500/20'
              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <CreditCard className="w-5 h-5 text-blue-400" />
          <span className="text-xs font-bold">Débito Online</span>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod('boleto')}
          className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
            paymentMethod === 'boleto'
              ? 'bg-amber-600/15 border-amber-500 text-white shadow-lg ring-2 ring-amber-500/20'
              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <Barcode className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold">Boleto Bancário</span>
        </button>
      </div>

      {/* Payment Details Container */}
      <form onSubmit={handleFinalizeOrder} className="space-y-5">
        {/* 1. PIX Content */}
        {paymentMethod === 'pix' && (
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
                  <Zap className="w-4 h-4" />
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">Pagamento Instantâneo via PIX</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Economize {formatCurrency(pixDiscountAmount)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              {/* QR Code SVG */}
              <div className="w-32 h-32 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950">
                  <path fill="currentColor" d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" />
                  <path fill="currentColor" d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" />
                  <path fill="currentColor" d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" />
                  <path fill="currentColor" d="M60,60 h10 v10 h-10 z M80,60 h10 v10 h-10 z M70,70 h10 v10 h-10 z M60,80 h10 v10 h-10 z M80,80 h10 v10 h-10 z" />
                  <rect x="45" y="15" width="10" height="70" fill="currentColor" />
                </svg>
              </div>

              <div className="space-y-2 flex-1 text-center sm:text-left">
                <p className="text-xs text-slate-300">
                  1. Abra o app do seu banco e escolha <strong>Pagar com PIX</strong>.
                </p>
                <p className="text-xs text-slate-300">
                  2. Aponte a câmera para o QR Code ou copie o código abaixo:
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    readOnly
                    value={pixCopyPasteCode}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-[11px] text-slate-400 font-mono select-all truncate"
                  />
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow"
                  >
                    {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-1">
              <span className="text-slate-400">Total a pagar com 5% de desconto:</span>
              <span className="text-base font-black text-emerald-400">{formatCurrency(pixGrandTotal)}</span>
            </div>
          </div>
        )}

        {/* 2. Credit Card Content */}
        {paymentMethod === 'credit_card' && (
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            {/* Security Notice for Demo Environment */}
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5 text-xs text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <div>
                <strong className="block font-semibold mb-0.5">Ambiente Demonstrativo (Modo de Testes)</strong>
                <span className="text-[11px] text-amber-200/90 leading-relaxed block">
                  Esta loja está em fase de desenvolvimento. <strong>Nunca insira dados reais de cartões de crédito.</strong> Para testar o fluxo de finalização, utilize dados fictícios de demonstração (ex: 4242 4242 4242 4242). Nenhuma cobrança financeira real é realizada.
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Número do Cartão</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(maskCardNumber(e.target.value))}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                  />
                  <CreditCard className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Impresso no Cartão</label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                  placeholder="EX: CARLOS E SILVA"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 uppercase focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Validade</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(maskCardExpiry(e.target.value))}
                    placeholder="MM/AA"
                    maxLength={5}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 font-mono text-center focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">CVV / Cód. Segurança</label>
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                    placeholder="123"
                    maxLength={4}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 font-mono text-center focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Opções de Parcelamento</label>
                <select
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                >
                  <option value={1}>1x de {formatCurrency(grandTotal)} (À vista sem juros)</option>
                  <option value={2}>2x de {formatCurrency(grandTotal / 2)} sem juros</option>
                  <option value={3}>3x de {formatCurrency(grandTotal / 3)} sem juros</option>
                  <option value={6}>6x de {formatCurrency(grandTotal / 6)} sem juros</option>
                  <option value={10}>10x de {formatCurrency(grandTotal / 10)} sem juros</option>
                  <option value={12}>12x de {formatCurrency(grandTotal / 12)} sem juros</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 3. Debit Card */}
        {paymentMethod === 'debit_card' && (
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white">Débito Online Automático</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Você será direcionado com total segurança para o ambiente do seu banco (Itaú, Bradesco, Santander, Banco do Brasil ou Nubank) para autenticar a transação.
            </p>
          </div>
        )}

        {/* 4. Boleto Bancário */}
        {paymentMethod === 'boleto' && (
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white">Boleto Bancário</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              O boleto será gerado após a confirmação com vencimento para 3 dias úteis. Pode ser pago em qualquer agência bancária, lotérica ou internet banking.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <button
            type="submit"
            disabled={isProcessing}
            className="px-8 py-3.5 bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-500 hover:to-rose-500 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-xl shadow-brand-600/40 transition-all flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>
              {isProcessing
                ? 'Processando Pedido...'
                : paymentMethod === 'pix'
                ? `Pagar ${formatCurrency(pixGrandTotal)} no PIX`
                : `Confirmar Pedido (${formatCurrency(grandTotal)})`}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
