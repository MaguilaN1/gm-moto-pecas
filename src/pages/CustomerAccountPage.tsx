import React, { useState } from 'react';
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  Plus, 
  Trash2, 
  MessageCircle,
  Package
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency, formatDate, maskPhone } from '../utils/formatters';
import { validatePhone, validateCep } from '../utils/validators';
import { SEOHead } from '../components/common/SEOHead';
import { STORE_CONFIG } from '../utils/seo';

interface CustomerAccountPageProps {
  initialTab?: 'orders' | 'addresses' | 'profile';
  onNavigate: (page: string, params?: any) => void;
}

export const CustomerAccountPage: React.FC<CustomerAccountPageProps> = ({ initialTab = 'orders', onNavigate }) => {
  const { currentUser, updateProfile, addAddress, deleteAddress, setDefaultAddress, logout } = useAuth();
  const { orders } = useStore();
  const { error } = useToast();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>(initialTab);

  // Profile form state
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');

  // New address form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrLabel, setAddrLabel] = useState('Casa');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrNumber, setAddrNumber] = useState('');
  const [addrComplement, setAddrComplement] = useState('');
  const [addrNeighborhood, setAddrNeighborhood] = useState('');
  const [addrCity, setAddrCity] = useState('São Paulo');
  const [addrState] = useState('SP');
  const [addrZip, setAddrZip] = useState('');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Acesso à Área do Cliente</h2>
        <p className="text-xs text-slate-400">Faça login para visualizar seus pedidos e endereços.</p>
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold"
        >
          Voltar para o Início
        </button>
      </div>
    );
  }

  // Filter orders for current user
  const userOrders = orders.filter(
    (o) => o.customer.email.toLowerCase() === currentUser.email.toLowerCase() || o.customer.userId === currentUser.id
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim()) {
      error('Nome obrigatório', 'O nome do perfil não pode ficar em branco.');
      return;
    }
    if (profilePhone && !validatePhone(profilePhone)) {
      error('Telefone inválido', 'Por favor, informe um telefone válido com DDD.');
      return;
    }
    updateProfile({ name: profileName.trim(), phone: profilePhone.trim() });
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrStreet.trim() || !addrNumber.trim() || !addrZip.trim()) {
      error('Campos obrigatórios', 'Preencha a rua, número e CEP para continuar.');
      return;
    }

    if (!validateCep(addrZip)) {
      error('CEP inválido', 'Informe um CEP válido com 8 dígitos.');
      return;
    }

    addAddress({
      label: addrLabel.trim() || 'Principal',
      recipientName: currentUser.name,
      street: addrStreet.trim(),
      number: addrNumber.trim(),
      complement: addrComplement.trim(),
      neighborhood: addrNeighborhood.trim(),
      city: addrCity.trim() || 'São Paulo',
      state: addrState.trim() || 'SP',
      zipCode: addrZip.trim(),
      isDefault: currentUser.addresses.length === 0,
    });

    setShowAddressForm(false);
    setAddrStreet('');
    setAddrNumber('');
    setAddrComplement('');
    setAddrNeighborhood('');
    setAddrZip('');
  };

  const handleOpenOrderWhatsApp = (orderCode: string) => {
    const msg = `Olá! Sou o cliente ${currentUser.name} e gostaria de informações sobre meu pedido #${orderCode}.`;
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <SEOHead title={`Minha Conta | ${currentUser.name} | GM Moto Peças`} />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Card Top */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 font-black text-2xl shadow-inner">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{currentUser.email} • CPF: {currentUser.cpf}</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-2 border border-emerald-500/20">
                Cliente Cadastrado
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 bg-slate-800 hover:bg-rose-600/20 text-rose-400 rounded-xl text-xs font-bold transition-colors"
          >
            Sair da Conta
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-brand-500 text-white bg-slate-900/50 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-brand-500" />
            <span>Meus Pedidos ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'border-brand-500 text-white bg-slate-900/50 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4 text-brand-500" />
            <span>Endereços Salvos ({currentUser.addresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-brand-500 text-white bg-slate-900/50 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4 text-brand-500" />
            <span>Dados Pessoais</span>
          </button>
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {userOrders.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-xl">
                <Package className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-base font-bold text-white">Você ainda não possui pedidos</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Encontre a peça compatível com sua moto e aproveite 5% de desconto no PIX!
                </p>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Explorar Catálogo de Peças
                </button>
              </div>
            ) : (
              userOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-bold text-brand-400 font-mono">PEDIDO #{order.code}</span>
                      <p className="text-[11px] text-slate-400">Realizado em {formatDate(order.createdAt)}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                          order.status === 'entregue'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : order.status === 'enviado'
                            ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {order.status.replace('_', ' ')}
                      </span>

                      <button
                        onClick={() => handleOpenOrderWhatsApp(order.code)}
                        className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                        title="Tirar dúvidas no WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-4 text-xs py-1">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-10 h-10 object-cover rounded-xl bg-slate-950 border border-slate-800"
                          />
                          <div>
                            <p className="font-semibold text-white line-clamp-1">{item.product.name}</p>
                            <span className="text-[11px] text-slate-400">Qtd: {item.quantity}x</span>
                          </div>
                        </div>
                        <span className="font-bold text-white">{formatCurrency(item.totalPrice)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer Details */}
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="text-slate-400">
                      <span>Entrega: {order.shippingOption.name.split(' (')[0]}</span>
                      {order.trackingCode && (
                        <span className="font-mono text-brand-400 ml-2">({order.trackingCode})</span>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-slate-400 mr-2">Total:</span>
                      <strong className="text-base text-white font-black">{formatCurrency(order.total)}</strong>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Endereços para Entrega
              </h3>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Novo Endereço</span>
              </button>
            </div>

            {/* Add Address Form */}
            {showAddressForm && (
              <form
                onSubmit={handleAddAddress}
                className="bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 animate-scale-up"
              >
                <h4 className="text-sm font-bold text-white">Cadastrar Endereço</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Identificação (Ex: Casa, Oficina)</label>
                    <input
                      type="text"
                      value={addrLabel}
                      onChange={(e) => setAddrLabel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">CEP</label>
                    <input
                      type="text"
                      value={addrZip}
                      onChange={(e) => setAddrZip(e.target.value)}
                      placeholder="00000-000"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Rua</label>
                    <input
                      type="text"
                      value={addrStreet}
                      onChange={(e) => setAddrStreet(e.target.value)}
                      placeholder="Nome da rua/avenida"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Número</label>
                    <input
                      type="text"
                      value={addrNumber}
                      onChange={(e) => setAddrNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Complemento</label>
                    <input
                      type="text"
                      value={addrComplement}
                      onChange={(e) => setAddrComplement(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Bairro</label>
                    <input
                      type="text"
                      value={addrNeighborhood}
                      onChange={(e) => setAddrNeighborhood(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Cidade</label>
                    <input
                      type="text"
                      value={addrCity}
                      onChange={(e) => setAddrCity(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold"
                  >
                    Salvar Endereço
                  </button>
                </div>
              </form>
            )}

            {/* Address Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentUser.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 relative shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-500" /> {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        Principal
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300">
                    {addr.street}, {addr.number} {addr.complement && `(${addr.complement})`}
                  </p>
                  <p className="text-xs text-slate-400">
                    {addr.neighborhood} — {addr.city}/{addr.state} (CEP: {addr.zipCode})
                  </p>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    {!addr.isDefault ? (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-brand-400 hover:text-brand-300 font-semibold text-[11px]"
                      >
                        Definir como Principal
                      </button>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Endereço padrão de envio</span>
                    )}

                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Excluir Endereço"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Personal Data */}
        {activeTab === 'profile' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl max-w-xl">
            <h3 className="text-base font-bold text-white">Editar Dados Pessoais</h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Telefone</label>
                <input
                  type="text"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(maskPhone(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail (Cadastrado)</label>
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">CPF</label>
                <input
                  type="text"
                  disabled
                  value={currentUser.cpf}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-500 cursor-not-allowed font-mono"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-600/30 transition-all"
              >
                Salvar Alterações
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
