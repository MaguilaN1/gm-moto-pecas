import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'kits',
    name: 'Kits Completos',
    slug: 'kits',
    description: 'Kits de transmissão, embreagem, cilindro e revisão com máxima economia.',
    iconName: 'PackageCheck',
    itemCount: 28,
    featuredImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
    subcategories: [
      { id: 'kit-relacao', name: 'Kit Relação (Coroa, Pinhão e Corrente)', slug: 'kit-relacao' },
      { id: 'kit-embreagem', name: 'Kit Embreagem Completo', slug: 'kit-embreagem' },
      { id: 'kit-revisao', name: 'Kit Revisão Periódica', slug: 'kit-revisao' },
      { id: 'kit-cilindro', name: 'Kit Cilindro e Pistão', slug: 'kit-cilindro' },
      { id: 'jogo-juntas', name: 'Jogo de Juntas do Motor', slug: 'jogo-juntas' },
      { id: 'kit-manutencao', name: 'Kits de Manutenção Preventiva', slug: 'kit-manutencao' }
    ]
  },
  {
    id: 'motor',
    name: 'Motor & Força',
    slug: 'motor',
    description: 'Componentes internos de alta performance e durabilidade para o coração da sua moto.',
    iconName: 'Cpu',
    itemCount: 45,
    featuredImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80',
    subcategories: [
      { id: 'cilindros', name: 'Cilindros', slug: 'cilindros' },
      { id: 'pistoes-aneis', name: 'Pistões e Anéis', slug: 'pistoes-aneis' },
      { id: 'cabecotes-valvulas', name: 'Cabeçote e Válvulas', slug: 'cabecotes-valvulas' },
      { id: 'comando-valvulas', name: 'Comando de Válvulas', slug: 'comando-valvulas' },
      { id: 'bomba-oleo', name: 'Bomba de Óleo', slug: 'bomba-oleo' },
      { id: 'virabrequim-biela', name: 'Virabrequim e Biela', slug: 'virabrequim-biela' },
      { id: 'juntas-retentores', name: 'Juntas e Retentores', slug: 'juntas-retentores' }
    ]
  },
  {
    id: 'freios',
    name: 'Sistema de Freios',
    slug: 'freios',
    description: 'Segurança máxima com pastilhas, lonas, discos e componentes hidráulicos certificados.',
    iconName: 'Disc',
    itemCount: 36,
    featuredImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    subcategories: [
      { id: 'pastilhas-freio', name: 'Pastilhas de Freio Diant./Tras.', slug: 'pastilhas-freio' },
      { id: 'lonas-sapatas', name: 'Lonas e Sapatas de Freio', slug: 'lonas-sapatas' },
      { id: 'discos-freio', name: 'Discos de Freio Ventilados', slug: 'discos-freio' },
      { id: 'pincas-cilindros', name: 'Pinças e Cilindros Mestres', slug: 'pincas-cilindros' },
      { id: 'manetes-cabos', name: 'Manetes e Cabos de Freio', slug: 'manetes-cabos' },
      { id: 'fluidos-freio', name: 'Fluidos DOT 4 e DOT 5.1', slug: 'fluidos-freio' }
    ]
  },
  {
    id: 'dianteira',
    name: 'Parte Dianteira',
    slug: 'parte-dianteira',
    description: 'Direção, estabilidade e visual com guidões, retrovisores, bengalas e mesas.',
    iconName: 'Compass',
    itemCount: 29,
    featuredImage: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=600&q=80',
    subcategories: [
      { id: 'guidoes-pesos', name: 'Guidões e Pesos de Guidão', slug: 'guidoes-pesos' },
      { id: 'retrovisores', name: 'Retrovisores Originais e Esportivos', slug: 'retrovisores' },
      { id: 'bengalas-tubos', name: 'Bengalas e Tubos Internos', slug: 'bengalas-tubos' },
      { id: 'mesa-caixa-direcao', name: 'Mesa e Caixa de Direção', slug: 'mesa-caixa-direcao' },
      { id: 'paralamas-dianteiros', name: 'Paralamas Dianteiros', slug: 'paralamas-dianteiros' },
      { id: 'rodas-raios', name: 'Rodas, Aros e Raios', slug: 'rodas-raios' }
    ]
  },
  {
    id: 'traseira',
    name: 'Parte Traseira',
    slug: 'parte-traseira',
    description: 'Suspensão e suporte com amortecedores, balanças, rabetas e bagageiros.',
    iconName: 'ShieldAlert',
    itemCount: 24,
    featuredImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80',
    subcategories: [
      { id: 'amortecedores', name: 'Amortecedores e Pro-Link', slug: 'amortecedores' },
      { id: 'balanca-traseira', name: 'Balança e Buchas Traseiras', slug: 'balanca-traseira' },
      { id: 'rabetas-paralamas', name: 'Rabetas e Paralamas Traseiros', slug: 'rabetas-paralamas' },
      { id: 'bagageiros-suportes', name: 'Bagageiros e Suportes de Baú', slug: 'bagageiros-suportes' },
      { id: 'suportes-placa', name: 'Suportes de Placa e Olho de Gato', slug: 'suportes-placa' }
    ]
  },
  {
    id: 'eletrica',
    name: 'Elétrica & Iluminação',
    slug: 'eletrica',
    description: 'Baterias seladas, faróis em LED, chicotes, relés e estatores confiáveis.',
    iconName: 'Zap',
    itemCount: 38,
    featuredImage: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80',
    subcategories: [
      { id: 'baterias', name: 'Baterias Seladas / AGM', slug: 'baterias' },
      { id: 'farois-lampadas', name: 'Faróis Completos e Lâmpadas LED', slug: 'farois-lampadas' },
      { id: 'lanternas-piscas', name: 'Lanternas Traseiras e Piscas', slug: 'lanternas-piscas' },
      { id: 'estator-regulador', name: 'Estator e Regulador Retificador', slug: 'estator-regulador' },
      { id: 'cdi-reles', name: 'CDI, ECU e Relés de Partida', slug: 'cdi-reles' },
      { id: 'chicotes-interruptores', name: 'Chicotes Principais e Punhos', slug: 'chicotes-interruptores' }
    ]
  },
  {
    id: 'transmissao',
    name: 'Transmissão & Câmbio',
    slug: 'transmissao',
    description: 'Correntes reforçadas, pinhões temperados, coroas de aço 1045 e eixos.',
    iconName: 'Workflow',
    itemCount: 31,
    featuredImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
    subcategories: [
      { id: 'correntes-retentor', name: 'Correntes de Transmissão c/ e s/ Retentor', slug: 'correntes-retentor' },
      { id: 'coroas-aco', name: 'Coroas em Aço 1045', slug: 'coroas-aco' },
      { id: 'pinhoes', name: 'Pinhões de Aço Carbono', slug: 'pinhoes' },
      { id: 'engrenagens-cambio', name: 'Engrenagens e Garfos de Câmbio', slug: 'engrenagens-cambio' },
      { id: 'coxim-coroa', name: 'Coxin da Coroa / Buchas de Roda', slug: 'coxim-coroa' }
    ]
  },
  {
    id: 'carenagens',
    name: 'Carenagens & Estética',
    slug: 'carenagens',
    description: 'Kits plásticos com pintura automotiva e protetores de carenagem de alta resistência.',
    iconName: 'Layers',
    itemCount: 22,
    featuredImage: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=600&q=80',
    subcategories: [
      { id: 'carenagens-frontais', name: 'Carenagens Frontais e Cúpulas', slug: 'carenagens-frontais' },
      { id: 'tampas-laterais', name: 'Tampas Laterais e Asas do Tanque', slug: 'tampas-laterais' },
      { id: 'protetores-carenagem', name: 'Protetores de Carenagem e Motor', slug: 'protetores-carenagem' },
      { id: 'faixas-adesivos', name: 'Jogos de Faixas e Adesivos Originais', slug: 'faixas-adesivos' }
    ]
  },
  {
    id: 'filtros',
    name: 'Filtros & Lubrificantes',
    slug: 'filtros-lubrificantes',
    description: 'Filtros de ar, óleo, combustível e óleos de alta performance para máxima vida útil.',
    iconName: 'Filter',
    itemCount: 26,
    featuredImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80',
    subcategories: [
      { id: 'filtro-ar', name: 'Filtros de Ar Originais e Esportivos', slug: 'filtro-ar' },
      { id: 'filtro-oleo', name: 'Filtros de Óleo do Motor', slug: 'filtro-oleo' },
      { id: 'filtro-combustivel', name: 'Filtros de Combustível Injeção/Carburador', slug: 'filtro-combustivel' },
      { id: 'oleos-lubrificantes', name: 'Óleos 10W30, 20W50 Semissintético e 100% Sintético', slug: 'oleos-lubrificantes' }
    ]
  }
];
