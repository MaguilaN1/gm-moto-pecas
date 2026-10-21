import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, Check, X } from 'lucide-react';
import { CookiePreferences } from '../../types';

const STORAGE_KEY_COOKIES = 'gm_moto_cookie_consent';

interface CookieConsentBannerProps {
  onNavigateToPrivacy?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onNavigateToPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COOKIES);
      if (!saved) {
        // Exibir após um breve delay para transição suave
        timer = setTimeout(() => setIsVisible(true), 1200);
      }
    } catch {
      timer = setTimeout(() => setIsVisible(true), 1200);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    const dataToSave = {
      ...prefs,
      acceptedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY_COOKIES, JSON.stringify(dataToSave));
    setIsVisible(false);
    setIsConfiguring(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-slate-900/95 border border-slate-700/80 backdrop-blur-xl rounded-2xl shadow-2xl p-5 md:p-6 text-slate-200 pointer-events-auto transition-all animate-fade-in">
        {!isConfiguring ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-600/10 border border-brand-500/20 rounded-xl text-brand-500 shrink-0 mt-0.5">
                <Cookie className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">Privacidade & Cookies (LGPD)</h4>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" /> Lei 13.709/18
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  Utilizamos cookies essenciais para o funcionamento do carrinho, navegação segura e personalização de ofertas. Ao continuar, você concorda com nossa{' '}
                  <button
                    onClick={onNavigateToPrivacy}
                    className="text-brand-400 hover:text-brand-300 underline font-medium"
                  >
                    Política de Privacidade
                  </button>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
              <button
                onClick={() => setIsConfiguring(true)}
                className="flex-1 md:flex-none px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                Preferências
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="flex-1 md:flex-none px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              >
                Apenas Essenciais
              </button>
              <button
                onClick={handleAcceptAll}
                className="w-full md:w-auto px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-lg shadow-lg shadow-brand-600/30 transition-all inline-flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Aceitar Todos
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-brand-500" />
                <h4 className="text-base font-bold text-white">Configurações de Privacidade e Cookies</h4>
              </div>
              <button
                onClick={() => setIsConfiguring(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Necessários (Obrigatório)</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Sempre Ativo</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Essenciais para o login, carrinho de compras e segurança das transações.
                </p>
              </div>

              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Desempenho & Análise</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600"></div>
                  </label>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Ajuda a melhorar a velocidade e entender os produtos mais procurados.
                </p>
              </div>

              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Ofertas & Personalização</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600"></div>
                  </label>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Permite exibir descontos e cupons especiais para o modelo da sua moto.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsConfiguring(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Voltar
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-lg shadow-lg transition-all"
              >
                Salvar Minhas Preferências
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
