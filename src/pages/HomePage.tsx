import React from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { MotoPicker } from '../components/home/MotoPicker';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { WeeklyOffers } from '../components/home/WeeklyOffers';
import { BestSellers } from '../components/home/BestSellers';
import { Benefits } from '../components/home/Benefits';
import { AboutSection } from '../components/home/AboutSection';
import { CustomerReviews } from '../components/home/CustomerReviews';
import { Newsletter } from '../components/home/Newsletter';
import { SEOHead } from '../components/common/SEOHead';
import { useStore } from '../context/StoreContext';
import { generateStoreSchema } from '../utils/seo';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { products } = useStore();

  const handleSelectMoto = (brand: string, model: string, year: string) => {
    onNavigate('catalog', { brand, model, year });
  };

  const handleSelectCategory = (categoryId: string) => {
    onNavigate('catalog', { category: categoryId });
  };

  return (
    <div className="bg-slate-950">
      <SEOHead
        title="GM Moto Peças | Qualidade Garantida • Atendimento Rápido • São Paulo"
        description="Encontre motopeças de alta performance com compatibilidade garantida para Honda, Yamaha, Suzuki e muito mais. Entrega rápida na Zona Sul de SP e envio para todo o Brasil."
        schemaJson={generateStoreSchema()}
      />

      {/* 1. Hero Slider */}
      <HeroSlider onNavigate={onNavigate} />

      {/* 2. Moto Compatibility Filter */}
      <MotoPicker onSelectMoto={handleSelectMoto} />

      {/* 3. Category Grid */}
      <CategoryGrid onSelectCategory={handleSelectCategory} />

      {/* 4. Weekly Offers */}
      <WeeklyOffers products={products} onNavigate={onNavigate} />

      {/* 5. Best Sellers */}
      <BestSellers products={products} onNavigate={onNavigate} />

      {/* 6. Benefits */}
      <Benefits />

      {/* 7. About Institutional */}
      <AboutSection onNavigate={onNavigate} />

      {/* 8. Customer Reviews */}
      <CustomerReviews />

      {/* 9. Newsletter */}
      <Newsletter />
    </div>
  );
};
