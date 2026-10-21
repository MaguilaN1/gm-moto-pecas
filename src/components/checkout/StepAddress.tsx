import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, ArrowLeft, Plus, Check } from 'lucide-react';
import { CustomerAddress } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { maskCep } from '../../utils/formatters';
import { validateCep } from '../../utils/validators';

interface StepAddressProps {
  onNext: (address: CustomerAddress) => void;
  onBack: () => void;
  initialAddress?: CustomerAddress | null;
}

export const StepAddress: React.FC<StepAddressProps> = ({ onNext, onBack, initialAddress }) => {
  const { currentUser, addAddress } = useAuth();
  const { error, info } = useToast();

  const [useSavedAddress, setUseSavedAddress] = useState(
    currentUser && currentUser.addresses.length > 0
  );
  const [selectedSavedId, setSelectedSavedId] = useState<string>(
    currentUser?.addresses.find((a) => a.isDefault)?.id || currentUser?.addresses[0]?.id || ''
  );

  // Address form fields
  const [label, setLabel] = useState(initialAddress?.label || 'Minha Casa');
  const [recipientName, setRecipientName] = useState(
    initialAddress?.recipientName || currentUser?.name || ''
  );
  const [zipCode, setZipCode] = useState(initialAddress?.zipCode || '04626-000');
  const [street, setStreet] = useState(initialAddress?.street || 'Av. Washington Luís');
  const [number, setNumber] = useState(initialAddress?.number || '4520');
  const [complement, setComplement] = useState(initialAddress?.complement || '');
  const [neighborhood, setNeighborhood] = useState(initialAddress?.neighborhood || 'Santo Amaro');
  const [city, setCity] = useState(initialAddress?.city || 'São Paulo');
  const [state, setState] = useState(initialAddress?.state || 'SP');
  const [saveToAccount, setSaveToAccount] = useState(true);

  const handleCepLookup = async (cepValue: string) => {
    const clean = cepValue.replace(/\D/g, '');
    if (clean.length === 8) {
      if (clean.startsWith('04')) {
        setNeighborhood('Santo Amaro / Zona Sul');
        setCity('São Paulo');
        setState('SP');
      } else if (clean.startsWith('01') || clean.startsWith('02') || clean.startsWith('03') || clean.startsWith('05')) {
        setCity('São Paulo');
        setState('SP');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (useSavedAddress && currentUser) {
      const chosen = currentUser.addresses.find((a) => a.id === selectedSavedId);
      if (chosen) {
        onNext(chosen);
        return;
      }
    }

    if (!validateCep(zipCode)) {
      error('CEP inválido', 'Digite um CEP válido com 8 dígitos.');
      return;
    }

    if (!street.trim() || !number.trim() || !neighborhood.trim() || !city.trim()) {
      error('Campos obrigatórios', 'Por favor, preencha rua, número, bairro e cidade.');
      return;
    }

    const newAddressObj: CustomerAddress = {
      id: `addr-${Date.now()}`,
      label,
      recipientName: recipientName || currentUser?.name || 'Cliente GM Moto',
      zipCode,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      isDefault: false,
    };

    if (saveToAccount && currentUser) {
      addAddress(newAddressObj);
    }

    onNext(newAddressObj);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white">2. Endereço de Entrega</h3>
          <p className="text-xs text-slate-400">Onde devemos entregar seu pedido?</p>
        </div>
        {currentUser && currentUser.addresses.length > 0 && (
          <button
            type="button"
            onClick={() => setUseSavedAddress(!useSavedAddress)}
            className="text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors"
          >
            {useSavedAddress ? '+ Novo Endereço' : 'Usar Endereço Salvo'}
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Saved addresses selection */}
        {useSavedAddress && currentUser && currentUser.addresses.length > 0 ? (
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Selecione um dos seus endereços cadastrados:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentUser.addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedSavedId(addr.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                    selectedSavedId === addr.id
                      ? 'bg-brand-600/15 border-brand-500 text-white shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{addr.label}</span>
                    {selectedSavedId === addr.id && (
                      <span className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center text-white">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300">
                    {addr.street}, {addr.number} {addr.complement && `• ${addr.complement}`}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {addr.neighborhood} — {addr.city}/{addr.state} (CEP {addr.zipCode})
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Address Manual Form */
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">CEP</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => {
                    const masked = maskCep(e.target.value);
                    setZipCode(masked);
                    handleCepLookup(masked);
                  }}
                  placeholder="00000-000"
                  maxLength={9}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Destinatário</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Nome de quem vai receber"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Rua / Logradouro</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Ex: Av. Washington Luís"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Número</label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="123"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Complemento (Opcional)</label>
                <input
                  type="text"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                  placeholder="Apto, Bloco, Oficina"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Bairro</label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Ex: Santo Amaro"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Cidade</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="São Paulo"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Estado</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="SP"
                    maxLength={2}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-3 text-xs text-white uppercase text-center focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            {currentUser && (
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={saveToAccount}
                  onChange={(e) => setSaveToAccount(e.target.checked)}
                  className="rounded border-slate-700 text-brand-600 focus:ring-0"
                />
                <span className="text-xs text-slate-300">Salvar este endereço na minha conta para compras futuras</span>
              </label>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-brand-600/30 transition-all flex items-center gap-2"
          >
            <span>Continuar para Opções de Envio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
