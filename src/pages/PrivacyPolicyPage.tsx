import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, FileText, Mail, ArrowLeft } from 'lucide-react';
import { STORE_CONFIG } from '../utils/seo';
import { SEOHead } from '../components/common/SEOHead';

interface PrivacyPolicyPageProps {
  onNavigate: (page: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-300">
      <SEOHead
        title="Política de Privacidade & LGPD | GM Moto Peças"
        description="Conheça nossos termos de segurança, conformidade com a Lei Geral de Proteção de Dados (LGPD) e como tratamos seus dados com total sigilo."
      />

      <div className="max-w-4xl mx-auto space-y-8">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Loja</span>
        </button>

        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Lei Geral de Proteção de Dados (Lei 13.709/2018)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white heading-font">
            Política de Privacidade & Termos de Uso
          </h1>
          <p className="text-xs text-slate-400">Última atualização: Agosto de 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-500" />
              <span>1. Compromisso com a Segurança e Privacidade</span>
            </h2>
            <p>
              A <strong>GM Moto Peças</strong> está profundamente comprometida em resguardar a privacidade e proteger os dados pessoais de seus clientes e usuários. Todas as informações coletadas durante a navegação, cadastro e compra são tratadas em estrita observância à Lei Geral de Proteção de Dados Pessoais (LGPD - Lei Federal nº 13.709/2018).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-500" />
              <span>2. Dados Coletados e Finalidade</span>
            </h2>
            <p>Coletamos apenas os dados essenciais para o processamento e entrega dos seus pedidos:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li><strong>Identificação e Contato:</strong> Nome completo, CPF, e-mail e telefone/WhatsApp para emissão de Nota Fiscal eletrônica (NFe) e comunicação sobre o status do pedido.</li>
              <li><strong>Endereço de Entrega:</strong> Logradouro, número, bairro, cidade, estado e CEP para despacho correto via Motoboy ou Correios.</li>
              <li><strong>Dados de Pagamento:</strong> Processados em ambiente criptografado com certificação SSL de 256 bits. Não armazenamos códigos de segurança (CVV) de cartões de crédito.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>3. Direitos do Titular de Dados (Art. 18 LGPD)</span>
            </h2>
            <p>Você, como titular de seus dados pessoais, tem o direito de solicitar a qualquer momento:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
              <li>Confirmação da existência de tratamento e acesso aos dados.</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários.</li>
              <li>Revogação do consentimento para envio de newsletters ou ofertas.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Política de Cookies</h2>
            <p>
              Utilizamos cookies essenciais para manter o carrinho de compras funcionando, lembrar seus dados de navegação e garantir a integridade da sua sessão. Cookies de análise e marketing só são ativados mediante seu consentimento explícito através do nosso banner de preferências.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Encarregado de Dados (DPO) & Contato</h2>
            <p>
              Para exercer qualquer um de seus direitos ou esclarecer dúvidas sobre o tratamento de dados pessoais, entre em contato diretamente com nosso Encarregado pelo e-mail:
            </p>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-400 shrink-0" />
              <div>
                <strong className="text-white block">Canal de Privacidade GM Moto Peças</strong>
                <span className="text-brand-400">{STORE_CONFIG.email}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
