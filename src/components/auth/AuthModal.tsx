import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, ShieldCheck, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { maskCpf, maskPhone } from '../../utils/formatters';
import { validateCpf, validateEmail, validatePhone } from '../../utils/validators';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalTab, closeAuthModal, openLoginModal, openRegisterModal, openForgotModal, login, register } = useAuth();
  const { success, error } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCpf, setRegCpf] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      error('Campos obrigatórios', 'Por favor, preencha seu e-mail e senha.');
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    await login(loginEmail, loginPassword);
    setIsLoading(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!regName.trim()) {
      error('Nome obrigatório', 'Por favor, informe seu nome completo.');
      return;
    }

    if (!validateEmail(regEmail)) {
      error('E-mail inválido', 'Digite um endereço de e-mail válido.');
      return;
    }

    if (!validateCpf(regCpf)) {
      error('CPF inválido', 'Por favor, informe um CPF válido.');
      return;
    }

    if (!validatePhone(regPhone)) {
      error('Telefone inválido', 'Informe um número de celular com DDD.');
      return;
    }

    if (regPassword.length < 6) {
      error('Senha curta', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    await register({
      name: regName,
      email: regEmail,
      cpf: regCpf,
      phone: regPhone,
    });
    setIsLoading(false);
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(forgotEmail)) {
      error('E-mail inválido', 'Informe o e-mail cadastrado para recuperação.');
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setForgotSent(true);
    success('Instruções enviadas!', `Enviamos o link de redefinição para ${forgotEmail}.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative text-slate-100 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-md shadow-brand-600/20 flex items-center justify-center p-0.5 border border-slate-700 shrink-0">
            <img
              src="/logo.png"
              alt="GM Moto Peças"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white tracking-tight heading-font">
              GM <span className="text-brand-500">MOTO</span> PEÇAS
            </h3>
            <p className="text-[10px] text-slate-400">
              Peças confiáveis para cada caminho.
            </p>
          </div>
        </div>

        {/* Header Tabs */}
        {authModalTab !== 'forgot' && (
          <div className="flex border-b border-slate-800 mb-6">
            <button
              onClick={openLoginModal}
              className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${
                authModalTab === 'login'
                  ? 'border-brand-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Entrar na Conta
            </button>
            <button
              onClick={openRegisterModal}
              className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${
                authModalTab === 'register'
                  ? 'border-brand-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Criar Nova Conta
            </button>
          </div>
        )}

        {/* 1. Login Form */}
        {authModalTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-extrabold text-white">Bem-vindo à GM Moto Peças</h3>
              <p className="text-xs text-slate-400 mt-1">
                Acesse seus pedidos, acompanhe entregas e compre com agilidade.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">E-mail</label>
              <div className="relative">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="exemplo@gmail.com"
                  className="w-full bg-slate-950 border border-slate-700/90 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">Senha</label>
                <button
                  type="button"
                  onClick={openForgotModal}
                  className="text-[11px] text-brand-400 hover:text-brand-300 font-medium"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700/90 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? 'Entrando...' : 'Entrar na Minha Conta'}
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center gap-2 text-[11px] text-slate-400 mt-4">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Ambiente 100% protegido com autenticação criptografada.</span>
            </div>
          </form>
        )}

        {/* 2. Register Form */}
        {authModalTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div className="text-center mb-3">
              <h3 className="text-lg font-extrabold text-white">Criar Cadastro</h3>
              <p className="text-xs text-slate-400 mt-1">Preencha seus dados para compras rápidas e cupons exclusivos.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
              <div className="relative">
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ex: Carlos Eduardo Silva"
                  className="w-full bg-slate-950 border border-slate-700/90 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">CPF</label>
                <input
                  type="text"
                  value={regCpf}
                  onChange={(e) => setRegCpf(maskCpf(e.target.value))}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className="w-full bg-slate-950 border border-slate-700/90 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp</label>
                <div className="relative">
                  <input
                    type="text"
                    value={regPhone}
                    onChange={(e) => setRegPhone(maskPhone(e.target.value))}
                    placeholder="(11) 90000-0000"
                    maxLength={15}
                    className="w-full bg-slate-950 border border-slate-700/90 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                  />
                  <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail</label>
              <div className="relative">
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full bg-slate-950 border border-slate-700/90 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Criar Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-slate-950 border border-slate-700/90 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? 'Cadastrando...' : 'Finalizar Cadastro Gratuito'}
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 3. Forgot Password Form */}
        {authModalTab === 'forgot' && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-extrabold text-white">Recuperar Senha</h3>
              <p className="text-xs text-slate-400 mt-1">
                Digite seu e-mail cadastrado e enviaremos o link de recuperação.
              </p>
            </div>

            {!forgotSent ? (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Seu E-mail Cadastrado</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="exemplo@gmail.com"
                      className="w-full bg-slate-950 border border-slate-700/90 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
                >
                  {isLoading ? 'Enviando...' : 'Enviar Link de Redefinição'}
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-xs font-bold text-white">E-mail de Recuperação Enviado!</h4>
                <p className="text-[11px] text-slate-300">
                  Verifique sua caixa de entrada e spam no endereço <strong>{forgotEmail}</strong>.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={openLoginModal}
              className="w-full text-center text-xs text-slate-400 hover:text-white pt-2 font-medium"
            >
              ← Voltar para o Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
