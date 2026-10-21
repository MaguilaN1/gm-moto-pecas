import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { STORE_CONFIG } from '../../utils/seo';

interface WhatsAppFloatingProps {
  customMessage?: string;
}

export const WhatsAppFloating: React.FC<WhatsAppFloatingProps> = ({ customMessage }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const defaultMsg =
    customMessage ||
    'Olá! Vim pelo site da GM Moto Peças e gostaria de ajuda para encontrar uma peça para minha moto.';

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(defaultMsg);
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto group">
      {/* Tooltip Card */}
      {isTooltipOpen && (
        <div className="bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl p-4 max-w-xs w-72 text-slate-100 animate-fade-in relative backdrop-blur-xl">
          <button
            onClick={() => setIsTooltipOpen(false)}
            className="absolute top-2.5 right-2.5 text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
            <span className="text-xs font-bold text-emerald-400">Atendimento Especializado</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Dúvidas sobre o modelo ou ano da sua moto? Nossos mecânicos e consultores atendem você agora mesmo!
          </p>
          <button
            onClick={handleOpenWhatsApp}
            className="w-full py-2 px-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            Iniciar Conversa no WhatsApp
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <div className="relative flex items-center gap-3">
        {/* Floating pill for desktop */}
        <button
          onClick={() => setIsTooltipOpen(!isTooltipOpen)}
          className="hidden sm:flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 px-4 py-2.5 rounded-full shadow-xl text-xs font-semibold backdrop-blur-md transition-all group-hover:border-emerald-500/50"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Falar com um especialista</span>
        </button>

        <button
          onClick={handleOpenWhatsApp}
          aria-label="Falar no WhatsApp"
          className="w-14 h-14 bg-gradient-to-tr from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-600/40 hover:shadow-emerald-600/60 transform hover:scale-110 active:scale-95 transition-all duration-300 relative focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950"></span>
          </span>
          <MessageCircle className="w-7 h-7 fill-current" />
        </button>
      </div>
    </div>
  );
};
