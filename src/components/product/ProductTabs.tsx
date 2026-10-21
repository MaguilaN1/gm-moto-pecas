import React, { useState } from 'react';
import { FileText, Sliders, ShieldCheck, HelpCircle, ChevronDown } from 'lucide-react';
import { Product } from '../../types';

interface ProductTabsProps {
  product: Product;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'warranty' | 'faq'>('desc');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
      {/* Tabs Header */}
      <div className="flex border-b border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('desc')}
          className={`flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'desc'
              ? 'border-brand-500 text-white bg-slate-850'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
          }`}
        >
          <FileText className="w-4 h-4 text-brand-500" />
          <span>Descrição do Produto</span>
        </button>

        <button
          onClick={() => setActiveTab('specs')}
          className={`flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'specs'
              ? 'border-brand-500 text-white bg-slate-850'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
          }`}
        >
          <Sliders className="w-4 h-4 text-brand-500" />
          <span>Especificações Técnicas</span>
        </button>

        <button
          onClick={() => setActiveTab('warranty')}
          className={`flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'warranty'
              ? 'border-brand-500 text-white bg-slate-850'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-brand-500" />
          <span>Garantia & Envio</span>
        </button>

        {product.faqs && product.faqs.length > 0 && (
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'faq'
                ? 'border-brand-500 text-white bg-slate-850'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-brand-500" />
            <span>Perguntas Frequentes ({product.faqs.length})</span>
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="p-6 sm:p-8">
        {/* 1. Description */}
        {activeTab === 'desc' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>{product.description}</p>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 mt-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Destaques & Benefícios do Produto:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
                <li>Peça nova e original com selo de qualidade GM Moto Peças.</li>
                <li>Fabricada dentro dos rigorosos padrões OEM das montadoras.</li>
                <li>Testada e homologada para máxima durabilidade no trânsito urbano e rodoviário.</li>
                <li>Embalagem reforçada para transporte seguro.</li>
              </ul>
            </div>
          </div>
        )}

        {/* 2. Specifications */}
        {activeTab === 'specs' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div
                  key={key}
                  className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-400">{key}:</span>
                  <span className="font-bold text-white text-right">{val}</span>
                </div>
              ))}
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400">Código / SKU:</span>
                <span className="font-mono font-bold text-brand-400">{product.partNumber}</span>
              </div>
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400">Garantia Legal:</span>
                <span className="font-bold text-emerald-400">{product.warrantyMonths} meses contra defeitos</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. Warranty & Shipping */}
        {activeTab === 'warranty' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">Garantia de {product.warrantyMonths} Meses</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Todos os nossos produtos possuem garantia legal contra qualquer defeito de fabricação. Caso identifique qualquer problema, nossa equipe efetuará a troca ou o reembolso de forma ágil e desburocratizada.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">Prazos e Formas de Entrega</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-xs">
                <li><strong>São Paulo (Zona Sul e Capital):</strong> Entrega no mesmo dia via Motoboy dedicado para pedidos feitos até as 14h.</li>
                <li><strong>Demais regiões do Brasil:</strong> SEDEX (1 a 4 dias) e PAC (4 a 10 dias) com seguro de carga e rastreamento online.</li>
                <li><strong>Retirada na Loja Física:</strong> Disponível em até 30 minutos após aprovação do pedido.</li>
              </ul>
            </div>
          </div>
        )}

        {/* 4. FAQs */}
        {activeTab === 'faq' && product.faqs && (
          <div className="space-y-3">
            {product.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-white hover:text-brand-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaqIndex === idx ? 'transform rotate-180 text-brand-400' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-900 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
