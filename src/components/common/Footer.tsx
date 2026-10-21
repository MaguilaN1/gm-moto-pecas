import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CreditCard,
  Zap,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { STORE_CONFIG } from '../../utils/seo';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-300">
      {/* 1. Value Badges Grid */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="p-3 bg-brand-600/10 border border-brand-500/20 text-brand-500 rounded-xl shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Entrega Rápida</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Motoboy Expresso SP e Sedex para todo o Brasil</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="p-3 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 rounded-xl shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">5% OFF no PIX</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Desconto automático em todos os produtos</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="p-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Compra 100% Segura</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Criptografia SSL de 256 bits e proteção total</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="p-3 bg-purple-600/10 border border-purple-500/20 text-purple-400 rounded-xl shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Garantia & Troca Fácil</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Até 30 dias para trocas e garantia de fábrica</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-white shadow-lg shadow-brand-600/20 flex items-center justify-center p-0.5 border border-slate-700/60 shrink-0">
                <img
                  src="/logo.png"
                  alt="GM Moto Peças"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight heading-font block">
                  GM <span className="text-brand-500">MOTO</span> PEÇAS
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Peças confiáveis para cada caminho.
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Somos especialistas em motopeças de alta qualidade. Oferecemos peças e acessórios para diversos modelos com atendimento técnico especializado, entrega expressa em São Paulo e envio seguro para todo o Brasil.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-900 hover:bg-brand-600 hover:text-white rounded-lg flex items-center justify-center text-slate-400 border border-slate-800 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-900 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center text-slate-400 border border-slate-800 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-900 hover:bg-emerald-600 hover:text-white rounded-lg flex items-center justify-center text-slate-400 border border-slate-800 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Comprar */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Comprar</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-brand-400 transition-colors">
                  Todos os Produtos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog', { category: 'kits' })} className="hover:text-brand-400 transition-colors">
                  Kits de Revisão & Relação
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog', { category: 'freios' })} className="hover:text-brand-400 transition-colors">
                  Freios & Pastilhas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog', { category: 'motor' })} className="hover:text-brand-400 transition-colors">
                  Componentes de Motor
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog', { filter: 'offers' })} className="hover:text-brand-400 transition-colors">
                  Ofertas da Semana
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog', { filter: 'bestsellers' })} className="hover:text-brand-400 transition-colors">
                  Mais Vendidos
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Institucional & Ajuda */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Institucional</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-brand-400 transition-colors">
                  Sobre a GM Moto Peças
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-brand-400 transition-colors">
                  Nossa Loja Física
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-brand-400 transition-colors">
                  Política de Privacidade (LGPD)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-brand-400 transition-colors">
                  Termos e Condições
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-brand-400 transition-colors">
                  Trocas e Devoluções
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-brand-400 transition-colors">
                  Política de Entregas
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Atendimento & Localização */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Atendimento</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.address}, {STORE_CONFIG.neighborhood} - {STORE_CONFIG.city}/{STORE_CONFIG.state}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{STORE_CONFIG.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{STORE_CONFIG.email}</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.operatingHours}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 3. Payment Methods & Security Seals */}
        <div className="border-t border-slate-800/80 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Payment Badges */}
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Formas de Pagamento
            </span>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-emerald-400 flex items-center gap-1">
                <Zap className="w-3 h-3" /> PIX (-5%)
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-brand-400" /> Cartão até 12x
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300">
                Boleto Bancário
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300">
                Débito Online
              </span>
            </div>
          </div>

          {/* Security Seals */}
          <div className="space-y-2 text-center md:text-right">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Segurança & Certificações
            </span>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-emerald-400" /> SSL 256-Bit Protegido
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-blue-400" /> LGPD Adequado
              </span>
            </div>
          </div>
        </div>

        {/* 4. Copyright & Location Signature */}
        <div className="border-t border-slate-800/80 mt-8 pt-6 text-center text-xs text-slate-400 space-y-1">
          <p>
            © {new Date().getFullYear()} GM Moto Peças. Todos os direitos reservados. CNPJ: 12.345.678/0001-90.
          </p>
          <p className="text-[11px] text-slate-400">
            Atendendo toda a Zona Sul de São Paulo (Santo Amaro, Campo Limpo, Interlagos, Grajaú, Jabaquara) e entregando para todo o Brasil.
          </p>
        </div>
      </div>
    </footer>
  );
};
