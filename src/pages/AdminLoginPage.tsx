import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SEOHead } from '../components/common/SEOHead';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onBackToStore: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess, onBackToStore }) => {
  const { adminLogin } = useAuth();
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const ok = adminLogin(pin);
    if (ok) {
      onSuccess();
    } else {
      setErrorMsg('Código PIN incorreto. Dica de demonstração: 1234');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <SEOHead title="Acesso Administrativo Restrito | GM Moto Peças" />

      <div className="max-w-md w-full bg-slate-900 border border-slate-700/90 rounded-3xl p-8 space-y-6 shadow-2xl relative text-slate-100 animate-scale-up">
        {/* Brand Logo & Top Icon */}
        <div className="text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-xl shadow-brand-600/20 flex items-center justify-center p-1 border-2 border-slate-700 mb-3">
            <img
              src="/logo.png"
              alt="GM Moto Peças"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 uppercase tracking-wider inline-flex items-center gap-1">
            <Lock className="w-3 h-3" /> Área Restrita do Administrador
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white heading-font mt-2">
            Painel GM Moto Peças
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Digite seu PIN mestre para gerenciar produtos, estoque e vendas.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Código PIN de Acesso</label>
            <div className="relative">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Dica: 1234"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 text-center font-mono text-base tracking-widest focus:outline-none focus:border-brand-500"
                autoFocus
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {errorMsg && <p className="text-xs text-rose-400 mt-1.5 text-center font-medium">{errorMsg}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Desbloquear Painel de Controle</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-start gap-2.5 text-[11px] text-slate-400">
          <KeyRound className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>Ambiente de demonstração: Autenticação simulada no cliente. A proteção real de rotas e dados administrativos requer implementação de backend com autenticação robusta (sessões HttpOnly / JWT assinado).</span>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onBackToStore}
            className="text-xs text-slate-400 hover:text-white font-medium"
          >
            ← Voltar para a Loja Virtual
          </button>
        </div>
      </div>
    </div>
  );
};
