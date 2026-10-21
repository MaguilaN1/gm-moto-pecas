import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Truck, 
  MessageCircle,
  PackageCheck,
  Cpu,
  Disc,
  Compass,
  Layers,
  Filter,
  Workflow,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';
import { STORE_CONFIG } from '../../utils/seo';
import { formatCurrency } from '../../utils/formatters';

interface HeaderProps {
  onNavigate: (page: string, params?: any) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { itemCount, subtotal, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentUser, isAuthenticated, openLoginModal, logout } = useAuth();
  const { products } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for predictive search
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase().trim();

    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchSku = p.partNumber.toLowerCase().includes(q);
      const matchCategory = p.categoryId.toLowerCase().includes(q);
      const matchMoto = p.compatibilities.some(
        (c) =>
          c.model.toLowerCase().includes(q) ||
          c.brand.toLowerCase().includes(q) ||
          c.yearRange.toLowerCase().includes(q)
      );
      return matchName || matchBrand || matchSku || matchCategory || matchMoto;
    }).slice(0, 6);
  }, [searchQuery, products]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      setIsMobileMenuOpen(false);
      onNavigate('catalog', { search: searchQuery.trim() });
    }
  };

  const handleSelectProduct = (slug: string) => {
    setIsSearchFocused(false);
    setIsMobileMenuOpen(false);
    setSearchQuery('');
    onNavigate('product-detail', { slug });
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'PackageCheck': return <PackageCheck className="w-4 h-4 text-brand-500" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-brand-500" />;
      case 'Disc': return <Disc className="w-4 h-4 text-brand-500" />;
      case 'Compass': return <Compass className="w-4 h-4 text-brand-500" />;
      case 'Zap': return <Zap className="w-4 h-4 text-brand-500" />;
      case 'Workflow': return <Workflow className="w-4 h-4 text-brand-500" />;
      case 'Layers': return <Layers className="w-4 h-4 text-brand-500" />;
      case 'Filter': return <Filter className="w-4 h-4 text-brand-500" />;
      default: return <PackageCheck className="w-4 h-4 text-brand-500" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 border-b border-slate-800/80 backdrop-blur-md transition-all">
      {/* 1. Top Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800/60 py-1.5 px-4 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left Highlights */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Zap className="w-3.5 h-3.5" /> 5% OFF no PIX à vista
            </span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Truck className="w-3.5 h-3.5 text-brand-400" /> Entrega Expressa Motoboy (SP Zona Sul) & Sedex Brasil
            </span>
            <span className="hidden lg:flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Compra 100% Segura e Garantida
            </span>
          </div>

          {/* Right Links & Quick Contact */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs font-medium">
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> {STORE_CONFIG.phone}
            </a>
            <span className="text-slate-600">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> Zona Sul - SP
            </span>
            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50"
            >
              <Lock className="w-3 h-3 text-brand-400" /> Painel Admin
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors"
            aria-label="Abrir Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group focus:outline-none shrink-0"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white shadow-lg shadow-brand-600/20 group-hover:scale-105 transition-transform flex items-center justify-center p-0.5 border border-slate-700/60 shrink-0">
              <img
                src="/logo.png"
                alt="GM Moto Peças"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white heading-font">
                  GM <span className="text-brand-500">MOTO</span> PEÇAS
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wide hidden sm:block">
                Peças confiáveis para cada caminho.
              </p>
            </div>
          </button>

          {/* Center Search Bar with Predictive Dropdown */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Digite nome, código da peça ou modelo da moto (Ex: Pastilha CG 160)"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-11 pr-24 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-inner"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors shadow-md shadow-brand-600/30"
              >
                Buscar
              </button>
            </form>

            {/* Search Suggestions Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in backdrop-blur-xl">
                <div className="p-3 bg-slate-800/80 border-b border-slate-700/70 flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold">Produtos Encontrados ({searchResults.length})</span>
                  <span className="text-slate-400 text-[11px]">Pressione Enter para ver todos</span>
                </div>
                <div className="divide-y divide-slate-800 max-h-96 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="p-3 hover:bg-slate-800/90 cursor-pointer flex items-center justify-between gap-3 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg bg-slate-950 border border-slate-800 shrink-0"
                        />
                        <div>
                          <h5 className="text-xs font-semibold text-white group-hover:text-brand-400 transition-colors line-clamp-1">
                            {product.name}
                          </h5>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                            <span className="font-mono bg-slate-950 px-1.5 py-0.2 rounded border border-slate-800 text-slate-300">
                              Cód: {product.partNumber}
                            </span>
                            <span>•</span>
                            <span className="text-brand-300 font-medium">
                              {product.compatibilities[0]?.model || product.brand}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-white block">
                          {formatCurrency(product.price)}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-medium">
                          {formatCurrency(product.price * 0.95)} no PIX
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSearchSubmit}
                  className="w-full p-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-center text-brand-400 hover:text-brand-300 transition-colors flex items-center justify-center gap-1.5"
                >
                  Ver todos os resultados para "{searchQuery}" <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Action Icons: Account, Favorites, Cart */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Account / User Menu */}
            <div className="relative">
              {isAuthenticated && currentUser ? (
                <div>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-2 hover:bg-slate-800/80 rounded-xl transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-600/20 border border-brand-500/40 flex items-center justify-center text-brand-400 font-bold text-xs">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden xl:block">
                      <span className="text-xs font-semibold text-white block leading-tight">
                        Olá, {currentUser.name.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-slate-400">Minha Conta</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-slate-800">
                        <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onNavigate('account', { tab: 'orders' });
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        Meus Pedidos
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onNavigate('account', { tab: 'addresses' });
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        Endereços Salvos
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onNavigate('account', { tab: 'profile' });
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        Dados Cadastrais
                      </button>
                      <div className="border-t border-slate-800 my-1"></div>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        Sair da Conta
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="flex items-center gap-2 p-2 hover:bg-slate-800/80 rounded-xl transition-colors text-slate-300 hover:text-white"
                >
                  <User className="w-5 h-5 text-slate-300" />
                  <div className="text-left hidden xl:block">
                    <span className="text-xs font-bold text-white block leading-tight">Entrar / Cadastrar</span>
                    <span className="text-[10px] text-slate-400">Minha Conta</span>
                  </div>
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => onNavigate('wishlist')}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors"
              aria-label="Favoritos"
            >
              <Heart className="w-5 h-5 text-slate-300 hover:text-brand-500" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with Total */}
            <button
              onClick={openCart}
              className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 p-2 sm:px-3 sm:py-2 rounded-xl transition-all group focus:outline-none"
              aria-label="Carrinho de Compras"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-brand-500 group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider leading-none">
                  Carrinho
                </span>
                <span className="text-xs font-extrabold text-white">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Digite nome, código ou moto..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-20 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-brand-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      {/* 3. Second Navigation Bar */}
      <div className="hidden lg:block bg-slate-900 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <nav className="flex items-center gap-1 py-1">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                currentPage === 'home'
                  ? 'text-white bg-brand-600/20 text-brand-400 border border-brand-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Início
            </button>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <button
                onClick={() => onNavigate('catalog')}
                className="px-3.5 py-2 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Menu className="w-3.5 h-3.5 text-brand-500" />
                Categorias
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Mega Dropdown */}
              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 w-[540px] bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl p-4 z-50 grid grid-cols-2 gap-3 backdrop-blur-xl animate-fade-in">
                  {CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setIsCategoryDropdownOpen(false);
                        onNavigate('catalog', { category: cat.id });
                      }}
                      className="p-2.5 hover:bg-slate-800/80 rounded-xl cursor-pointer transition-colors flex items-start gap-3 group border border-transparent hover:border-slate-700/60"
                    >
                      <div className="p-2 bg-slate-950 rounded-lg shrink-0 border border-slate-800 group-hover:border-brand-500/40">
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-brand-400 transition-colors">
                          {cat.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {cat.subcategories.slice(0, 2).map((s) => s.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Mais de 10.000 itens em estoque</span>
                    <button
                      onClick={() => {
                        setIsCategoryDropdownOpen(false);
                        onNavigate('catalog');
                      }}
                      className="text-brand-400 hover:text-brand-300 font-bold flex items-center gap-1"
                    >
                      Ver Catálogo Completo <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('catalog')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                currentPage === 'catalog'
                  ? 'text-brand-400 bg-brand-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Todos os Produtos
            </button>

            <button
              onClick={() => onNavigate('catalog', { filter: 'offers' })}
              className="px-3.5 py-2 rounded-lg text-xs font-bold text-amber-400 hover:bg-amber-500/10 transition-colors flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              Ofertas da Semana
            </button>

            <button
              onClick={() => onNavigate('catalog', { category: 'kits' })}
              className="px-3.5 py-2 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Kits de Revisão & Relação
            </button>

            <button
              onClick={() => onNavigate('about')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                currentPage === 'about'
                  ? 'text-brand-400 bg-brand-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Sobre Nós
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                currentPage === 'contact'
                  ? 'text-brand-400 bg-brand-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Fale Conosco
            </button>
          </nav>

          {/* Quick WhatsApp Header Button */}
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá! Vim pelo site da GM Moto Peças e gostaria de atendimento.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Falar no WhatsApp
          </a>
        </div>
      </div>

      {/* 4. Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[110px] z-50 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 p-6 overflow-y-auto animate-fade-in">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Navegação</h3>
              <div className="grid grid-cols-1 gap-1">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('home');
                  }}
                  className="w-full text-left py-2 px-3 text-sm font-semibold text-white hover:bg-slate-800 rounded-lg"
                >
                  Início
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('catalog');
                  }}
                  className="w-full text-left py-2 px-3 text-sm font-semibold text-white hover:bg-slate-800 rounded-lg"
                >
                  Todos os Produtos
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('catalog', { filter: 'offers' });
                  }}
                  className="w-full text-left py-2 px-3 text-sm font-bold text-amber-400 hover:bg-amber-500/10 rounded-lg flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current" /> Ofertas da Semana
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('catalog', { category: 'kits' });
                  }}
                  className="w-full text-left py-2 px-3 text-sm font-semibold text-white hover:bg-slate-800 rounded-lg"
                >
                  Kits Completos
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('about');
                  }}
                  className="w-full text-left py-2 px-3 text-sm font-semibold text-white hover:bg-slate-800 rounded-lg"
                >
                  Sobre a GM Moto Peças
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('contact');
                  }}
                  className="w-full text-left py-2 px-3 text-sm font-semibold text-white hover:bg-slate-800 rounded-lg"
                >
                  Contato & Loja Física
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Compre por Categoria</h3>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate('catalog', { category: cat.id });
                    }}
                    className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-left hover:border-brand-500/50 flex items-center gap-2 text-xs font-medium text-slate-200"
                  >
                    {getCategoryIcon(cat.iconName)}
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
              >
                <MessageCircle className="w-4 h-4" />
                Falar com Vendedor no WhatsApp
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('admin');
                }}
                className="w-full py-2.5 bg-slate-900 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-brand-400" /> Acessar Painel de Controle
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
