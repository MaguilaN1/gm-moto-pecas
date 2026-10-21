import React, { useState } from 'react';
import { User, Mail, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { maskCpf, maskPhone } from '../../utils/formatters';
import { validateCpf, validateEmail, validatePhone } from '../../utils/validators';

interface StepIdentificationProps {
  onNext: (data: { name: string; email: string; cpf: string; phone: string }) => void;
  initialData?: { name: string; email: string; cpf: string; phone: string };
}

export const StepIdentification: React.FC<StepIdentificationProps> = ({ onNext, initialData }) => {
  const { currentUser } = useAuth();
  const { error } = useToast();

  const [name, setName] = useState(initialData?.name || currentUser?.name || '');
  const [email, setEmail] = useState(initialData?.email || currentUser?.email || '');
  const [cpf, setCpf] = useState(initialData?.cpf || currentUser?.cpf || '');
  const [phone, setPhone] = useState(initialData?.phone || currentUser?.phone || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      error('Nome obrigatório', 'Por favor, informe seu nome completo.');
      return;
    }

    if (!validateEmail(email)) {
      error('E-mail inválido', 'Digite um endereço de e-mail válido.');
      return;
    }

    if (!validateCpf(cpf)) {
      error('CPF inválido', 'Por favor, informe um CPF válido para a emissão da nota fiscal.');
      return;
    }

    if (!validatePhone(phone)) {
      error('Telefone inválido', 'Informe um número de celular/WhatsApp com DDD.');
      return;
    }

    onNext({ name, email, cpf, phone });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-fade-in">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white">1. Dados Pessoais & Identificação</h3>
        <p className="text-xs text-slate-400">
          Utilizados para envio da nota fiscal e atualizações de entrega pelo WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nome Completo</label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João Ferreira da Silva"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">CPF (Para Nota Fiscal)</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(maskCpf(e.target.value))}
              placeholder="000.000.000-00"
              maxLength={14}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">WhatsApp / Celular</label>
            <div className="relative">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(maskPhone(e.target.value))}
                placeholder="(11) 90000-0000"
                maxLength={15}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">E-mail para Confirmação</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-2.5 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Seus dados são protegidos e tratados em estrita conformidade com a LGPD.</span>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2"
        >
          <span>Continuar para o Endereço de Entrega</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
