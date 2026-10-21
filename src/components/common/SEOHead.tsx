import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  schemaJson?: object | object[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'GM Moto Peças | Qualidade garantida • Atendimento rápido • Diversos modelos',
  description = 'Loja especializada em motopeças e acessórios para todas as marcas: Honda, Yamaha, Suzuki e mais. Entrega rápida para todo o Brasil e motoboy expresso em São Paulo Zona Sul.',
  keywords = 'motopeças, peças para moto, kit relação, pastilha de freio, Honda CG 160, São Paulo Zona Sul',
  ogImage = '/banner-og.jpg',
  ogType = 'website',
  canonicalUrl = 'https://gmmotopecas.com.br',
  schemaJson,
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // Update Open Graph tags
    const setMetaProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    setMetaProperty('og:image', ogImage);
    setMetaProperty('og:type', ogType);
    setMetaProperty('og:url', canonicalUrl);

    // Injected Schema.org JSON-LD
    const existingSchemaScript = document.getElementById('json-ld-schema');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schemaJson) {
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      // Escapar '<' para evitar quebra de bloco de script via injeção de markup
      script.text = JSON.stringify(schemaJson).replace(/</g, '\\u003c');
      document.head.appendChild(script);
    }

    return () => {
      const schemaToClean = document.getElementById('json-ld-schema');
      if (schemaToClean) {
        schemaToClean.remove();
      }
    };
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, schemaJson]);

  return null;
};
