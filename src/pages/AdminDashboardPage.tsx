import React, { useState } from 'react';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { AdminProducts } from '../components/admin/AdminProducts';
import { AdminStockManager } from '../components/admin/AdminStockManager';
import { AdminOrders } from '../components/admin/AdminOrders';
import { AdminCoupons } from '../components/admin/AdminCoupons';
import { ProductModal } from '../components/admin/ProductModal';
import { Product } from '../types';
import { SEOHead } from '../components/common/SEOHead';

interface AdminDashboardPageProps {
  onNavigateToStore: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigateToStore }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'stock' | 'orders' | 'coupons'>('dashboard');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [selectedStockProduct, setSelectedStockProduct] = useState<Product | null>(null);

  const handleOpenNewProduct = () => {
    setProductToEdit(null);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product?: Product) => {
    setProductToEdit(product || null);
    setIsProductModalOpen(true);
  };

  const handleOpenStockManager = (product: Product) => {
    setSelectedStockProduct(product);
    setActiveTab('stock');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <SEOHead title="Painel Administrativo GM Moto Peças" />

      {/* Admin Header */}
      <AdminHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigateToStore={onNavigateToStore}
      />

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <AdminDashboard
            onNavigateTab={setActiveTab}
            onOpenNewProductModal={handleOpenNewProduct}
          />
        )}

        {activeTab === 'products' && (
          <AdminProducts
            onOpenModal={handleEditProduct}
            onOpenStockModal={handleOpenStockManager}
          />
        )}

        {activeTab === 'stock' && (
          <AdminStockManager initialSelectedProduct={selectedStockProduct} />
        )}

        {activeTab === 'orders' && <AdminOrders />}

        {activeTab === 'coupons' && <AdminCoupons />}
      </main>

      {/* Product CRUD Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        productToEdit={productToEdit}
      />
    </div>
  );
};
