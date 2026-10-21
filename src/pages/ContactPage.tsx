import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Store
} from 'lucide-react';
import { STORE_CONFIG } from '../utils/seo';
import { useToast } from '../context/ToastContext';
import { SEOHead } from '../components/common/SEOHead';
import { validateEmail } from '../utils/validators';
import { maskPhone } from '../utils/formatters';

export const ContactPage: React.FC = () => {
  const { success, error } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bikeModel, setBikeModel] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      error('Campos obrigatórios', 'Por favor, preencha seu nome e sua mensagem.');
      return;
    }

    if (!validateEmail(email)) {
      error('E-mail inválido', 'Informe um e-mail válido para retornarmos.');
      return;
    }

    setIsSent(true);
    success('Mensagem enviada!', 'Nossa equipe entrará em contato em até 2 horas úteis.');
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Fale Conosco | Loja Física na Zona Sul de SP | GM Moto Peças"
        description="Fale com os consultores técnicos da GM Moto Peças por WhatsApp, telefone ou formulário. Localizada na Av. Washington Luís em Santo Amaro, São Paulo."
      />

      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-white heading-font uppercase">
            Atendimento & <span className="text-brand-500">Contato</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Tire dúvidas sobre peças, consulte orçamentos especiais para oficinas ou retire seu pedido em nossa loja física.
          </p>
        </div>

        {/* 2-Column Grid: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Contact Info Cards */}
          <div className="space-y-4">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Store className="w-5 h-5 text-brand-500" />
                <span>Nossos Canais Diretos</span>
              </h3>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Loja & Balcão de Retirada</strong>
                    <span>{STORE_CONFIG.address}, {STORE_CONFIG.neighborhood}</span>
                    <p className="text-slate-400">{STORE_CONFIG.city} - {STORE_CONFIG.state} (CEP: {STORE_CONFIG.zipCode})</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="text-white block">Central de Atendimento / WhatsApp</strong>
                    <a href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                      {STORE_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <strong className="text-white block">E-mail Comercial & NFe</strong>
                    <span className="text-slate-300">{STORE_CONFIG.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Horário de Funcionamento</strong>
                    <span>{STORE_CONFIG.operatingHours}</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">Domingos e Feriados: Fechado</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick CTA */}
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá! Vim pela página de contato da GM Moto Peças.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp Agora</span>
              </a>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-white">Envie uma Mensagem</h3>

            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Seu Nome Completo</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Roberto Almeida"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(maskPhone(e.target.value))}
                      placeholder="(11) 90000-0000"
                      maxLength={15}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Modelo e Ano da sua Moto (Opcional)</label>
                  <input
                    type="text"
                    value={bikeModel}
                    onChange={(e) => setBikeModel(e.target.value)}
                    placeholder="Ex: Honda CG 160 Titan 2022"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mensagem ou Dúvida</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Qual peça você está procurando ou como podemos te ajudar?"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensagem</span>
                </button>
              </form>
            ) : (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Mensagem Enviada com Sucesso!</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Recebemos seu contato e nossa equipe responderá em breve no e-mail ou WhatsApp informado.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="text-xs text-brand-400 hover:underline font-semibold"
                >
                  Enviar outra mensagem
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
