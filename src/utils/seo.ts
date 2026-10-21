import type { Product } from '../types';

export const STORE_CONFIG = {
  name: 'GM Moto Peças',
  slogan: 'Qualidade garantida • Atendimento rápido • Diversos modelos',
  phone: '(11) 98765-4321',
  phoneFormatted: '+5511987654321',
  whatsappNumber: '5511987654321',
  email: 'contato@gmmotopecas.com.br',
  address: 'Av. Washington Luís, 4520 - Santo Amaro',
  neighborhood: 'Zona Sul',
  city: 'São Paulo',
  state: 'SP',
  zipCode: '04626-000',
  country: 'BR',
  operatingHours: 'Segunda a Sexta: 08h às 18h | Sábado: 08h às 14h',
  instagram: '@gmmotopecas_sp',
  facebook: '/gmmotopecas',
};

export const generateStoreSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoPartsStore',
    name: STORE_CONFIG.name,
    description: 'Loja especializada em motopeças e acessórios com entrega em todo o Brasil e motoboy expresso para a Zona Sul de São Paulo.',
    telephone: STORE_CONFIG.phone,
    email: STORE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: STORE_CONFIG.address,
      addressLocality: STORE_CONFIG.city,
      addressRegion: STORE_CONFIG.state,
      postalCode: STORE_CONFIG.zipCode,
      addressCountry: 'BR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '14:00',
      }
    ],
    priceRange: '$$',
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Cash, Credit Card, Debit Card, PIX, Boleto',
  };
};

export const generateProductSchema = (product: Product) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.partNumber,
    mpn: product.partNumber,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `https://gmmotopecas.com.br/produto/${product.slug}`,
      priceCurrency: 'BRL',
      price: product.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock && product.stockQuantity > 0 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'AutoPartsStore',
        name: STORE_CONFIG.name,
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewsCount.toString(),
      bestRating: '5',
      worstRating: '1',
    }
  };
};

export const generateBreadcrumbsSchema = (items: { name: string; url: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};
