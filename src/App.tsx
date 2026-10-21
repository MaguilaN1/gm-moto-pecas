import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { StoreProvider } from './context/StoreContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppFloating } from './components/common/WhatsAppFloating';
import { CookieConsentBanner } from './components/common/CookieConsentBanner';
import { AuthModal } from './components/auth/AuthModal';
import { CartDrawer } from './components/cart/CartDrawer';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CustomerAccountPage } from './pages/CustomerAccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

const MainAppContent: React.FC = () => {
  const { isAdminAuthenticated } = useAuth();
  
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParams, setPageParams] = useState<any>({});

  const handleNavigate = (page: string, params: any = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminRoute = currentPage === 'admin' || currentPage === 'admin-login';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-600 selection:text-white">
      {/* Global Modals and Overlays */}
      <AuthModal />
      <CartDrawer onNavigate={handleNavigate} />
      <CookieConsentBanner onNavigateToPrivacy={() => handleNavigate('privacy')} />

      {/* Main Header (Only shown on customer store pages) */}
      {!isAdminRoute && (
        <Header onNavigate={handleNavigate} currentPage={currentPage} />
      )}

      {/* Page Routing Switch */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}

        {currentPage === 'catalog' && (
          <CatalogPage
            initialSearch={pageParams.search || ''}
            initialCategory={pageParams.category || ''}
            initialBrand={pageParams.brand || ''}
            initialModel={pageParams.model || ''}
            initialYear={pageParams.year || ''}
            initialFilter={pageParams.filter || ''}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailPage
            slug={pageParams.slug || ''}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'account' && (
          <CustomerAccountPage
            initialTab={pageParams.tab || 'orders'}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'wishlist' && (
          <WishlistPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicyPage onNavigate={handleNavigate} />
        )}

        {/* Admin Guarded Routes */}
        {currentPage === 'admin' && (
          isAdminAuthenticated ? (
            <AdminDashboardPage onNavigateToStore={() => handleNavigate('home')} />
          ) : (
            <AdminLoginPage
              onSuccess={() => handleNavigate('admin')}
              onBackToStore={() => handleNavigate('home')}
            />
          )
        )}

        {currentPage === 'admin-login' && (
          <AdminLoginPage
            onSuccess={() => handleNavigate('admin')}
            onBackToStore={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Main Footer & Floating WhatsApp (Only on store pages) */}
      {!isAdminRoute && (
        <>
          <Footer onNavigate={handleNavigate} />
          <WhatsAppFloating />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <StoreProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <MainAppContent />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </StoreProvider>
    </ToastProvider>
  );
}
