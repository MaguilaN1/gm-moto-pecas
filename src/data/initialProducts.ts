import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'kit-relacao-honda-cg-160-did-com-retentor-aco-1045',
    name: 'Kit Relação Transmissão Honda CG 160 D.I.D c/ Retentor Aço 1045',
    brand: 'D.I.D Japan',
    partNumber: 'KTR-160-DID-01',
    categoryId: 'kits',
    subcategoryId: 'kit-relacao',
    price: 219.90,
    originalPrice: 269.90,
    discountPercent: 18,
    installmentsCount: 3,
    inStock: true,
    stockQuantity: 18,
    minStockThreshold: 5,
    isFeatured: true,
    isBestSeller: true,
    isWeeklyOffer: true,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'O Kit de Relação D.I.D com retentor O-Ring proporciona máxima durabilidade e baixíssimo nível de ruído para sua Honda CG 160. Fabricado com coroa e pinhão em aço 1045 temperado por indução e corrente japonesa de ultra resistência à tração.',
    specifications: {
      'Coroa': '44 Dentes (Aço 1045 Certificado)',
      'Pinhão': '15 Dentes (Aço 1045 Temperado)',
      'Corrente': '428 HVO x 118 Elos com Retentor O-Ring',
      'Marca': 'D.I.D Japan Original',
      'Tratamento Térmico': 'Anti-impacto e anti-corrosão',
      'Origem': 'Nacional / Tecnologia Japonesa'
    },
    compatibilities: [
      { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026', notes: 'Todas as versões (ESD, EX)' },
      { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026', notes: 'Versões ESDI e Flex' },
      { brand: 'Honda', model: 'CG 160 Start', yearRange: '2016 a 2026', notes: 'Plug and Play' },
      { brand: 'Honda', model: 'CG 160 Cargo', yearRange: '2016 a 2026', notes: 'Uso severo garantido' }
    ],
    warrantyMonths: 6,
    tags: ['transmissão', 'kit relação', 'did', 'cg160', 'retentor', 'revisão'],
    faqs: [
      { question: 'A corrente já vem com a emenda incluída?', answer: 'Sim! Acompanha trava de emenda por clipe de fácil instalação.' },
      { question: 'A corrente possui retentor de vedação?', answer: 'Sim, possui retentor especial D.I.D que retém a lubrificação interna das buchas.' }
    ]
  },
  {
    id: 'prod-2',
    slug: 'jogo-pastilha-de-freio-dianteira-cobreq-racing-cg-160-fan-titan',
    name: 'Jogo de Pastilhas de Freio Dianteiras Cobreq Street CG 160 CBS',
    brand: 'Cobreq',
    partNumber: 'N-942-CBQ',
    categoryId: 'freios',
    subcategoryId: 'pastilhas-freio',
    price: 38.90,
    originalPrice: 49.90,
    discountPercent: 22,
    installmentsCount: 2,
    inStock: true,
    stockQuantity: 42,
    minStockThreshold: 10,
    isFeatured: true,
    isBestSeller: true,
    isWeeklyOffer: true,
    rating: 4.8,
    reviewsCount: 98,
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pastilhas dianteiras originais Cobreq com composto orgânico cerâmico para frenagens seguras, sem ruídos e com menor desgaste do disco de freio. Ideal para o trânsito urbano intenso de São Paulo.',
    specifications: {
      'Posição': 'Dianteira',
      'Material': 'Composto Orgânico / Cerâmica',
      'Código Fabricante': 'Cobreq N-942',
      'Espessura': 'Standard Original'
    },
    compatibilities: [
      { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026', notes: 'Sistema de freio CBS' },
      { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2018 a 2026', notes: 'Freio a Disco Dianteiro' },
      { brand: 'Honda', model: 'CB 250F Twister', yearRange: '2016 a 2022', notes: 'Dianteira CBS' }
    ],
    warrantyMonths: 3,
    tags: ['freio', 'pastilha', 'cobreq', 'cg160', 'cbs', 'seguranca']
  },
  {
    id: 'prod-3',
    slug: 'filtro-de-ar-esportivo-lavavel-inflow-honda-cg-160-fan-titan-start',
    name: 'Filtro de Ar de Alta Performance Lavável Honda CG 160',
    brand: 'Inflow Racing',
    partNumber: 'FA-160-INF',
    categoryId: 'filtros',
    subcategoryId: 'filtro-ar',
    price: 64.90,
    originalPrice: 79.90,
    discountPercent: 18,
    installmentsCount: 2,
    inStock: true,
    stockQuantity: 4, // Low stock demo!
    minStockThreshold: 6,
    isFeatured: true,
    isBestSeller: false,
    isWeeklyOffer: false,
    rating: 4.7,
    reviewsCount: 37,
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Filtro de ar com elemento filtrante de algodão multicamadas lavável. Aumenta a admissão de ar no motor gerando resposta mais ágil no acelerador e economia de combustível comprovada.',
    specifications: {
      'Tipo': 'Lavável e Reutilizável',
      'Vida Útil': 'Até 60.000 km com lavagens periódicas',
      'Encaixe': 'Caixa de ar original sem adaptações',
      'Material': 'Algodão cirúrgico e tela de alumínio'
    },
    compatibilities: [
      { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Start', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Cargo', yearRange: '2016 a 2026' }
    ],
    warrantyMonths: 12,
    tags: ['filtro de ar', 'cg160', 'performance', 'honda']
  },
  {
    id: 'prod-4',
    slug: 'kit-embreagem-completo-plato-cubo-discos-honda-cg-160',
    name: 'Kit Embreagem Completo (Platô, Cubo, Discos e Molas) Scud CG 160',
    brand: 'Scud',
    partNumber: 'EMB-160-SCUD',
    categoryId: 'kits',
    subcategoryId: 'kit-embreagem',
    price: 189.90,
    originalPrice: 229.00,
    discountPercent: 17,
    installmentsCount: 3,
    inStock: true,
    stockQuantity: 12,
    minStockThreshold: 5,
    isFeatured: true,
    isBestSeller: true,
    isWeeklyOffer: false,
    rating: 4.9,
    reviewsCount: 64,
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Conjunto completo de embreagem com cubos usinados em liga especial e discos de fricção sinterizados. Elimina patinação e restaura a arrancada precisa da sua moto.',
    specifications: {
      'Conteúdo': '1 Platô + 1 Cubo + 5 Discos de Fricção + 4 Separadores + 4 Molas Reforçadas',
      'Fabricante': 'Scud Automotive Parts',
      'Padrão': 'OEM Original Honda'
    },
    compatibilities: [
      { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Start', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'NXR 160 Bros', yearRange: '2015 a 2024' }
    ],
    warrantyMonths: 6,
    tags: ['embreagem', 'kit embreagem', 'cg160', 'scud', 'motor']
  },
  {
    id: 'prod-5',
    slug: 'par-retrovisores-modelo-bmw-f800-giro-360-haste-reforcada-universal',
    name: 'Par de Retrovisores Modelo BMW F800 Gira 360° Haste de Aço Rosca Honda',
    brand: 'GVS Sport',
    partNumber: 'RET-F800-GVS',
    categoryId: 'dianteira',
    subcategoryId: 'retrovisores',
    price: 59.90,
    originalPrice: 79.90,
    discountPercent: 25,
    installmentsCount: 2,
    inStock: true,
    stockQuantity: 35,
    minStockThreshold: 8,
    isFeatured: true,
    isBestSeller: true,
    isWeeklyOffer: true,
    rating: 4.8,
    reviewsCount: 215,
    images: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'O retrovisor mais procurado do Brasil! Visual imponente estilo BMW F800 com espelho convexo anti-reflexo que amplia o campo de visão nos corredores urbanos. Haste grossa sem trepidação.',
    specifications: {
      'Corpo': 'Polímero ABS injetado fosco de alta resistência',
      'Haste': 'Aço Carbono 10mm com pintura eletrostática preta',
      'Rosca': 'M10 Padrão Honda (Horário / Horário)',
      'Articulação': 'Esfera 360 graus com aperto regulável'
    },
    compatibilities: [
      { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 150 Titan', yearRange: '2004 a 2015' },
      { brand: 'Honda', model: 'Biz 125', yearRange: '2006 a 2026' },
      { brand: 'Honda', model: 'XRE 300', yearRange: '2009 a 2023' },
      { brand: 'Honda', model: 'CB 250F Twister', yearRange: '2016 a 2022' }
    ],
    warrantyMonths: 3,
    tags: ['retrovisor', 'f800', 'gvs', 'honda', 'estilo', 'acessorio']
  },
  {
    id: 'prod-6',
    slug: 'kit-cilindro-pistao-aneis-juntas-motor-cg-160-kmp-rik',
    name: 'Kit Cilindro Motor c/ Pistão, Anéis RIK e Juntas Honda CG 160',
    brand: 'KMP / RIK',
    partNumber: 'CIL-160-KMP',
    categoryId: 'motor',
    subcategoryId: 'cilindros',
    price: 349.90,
    originalPrice: 419.00,
    discountPercent: 16,
    installmentsCount: 6,
    inStock: true,
    stockQuantity: 9,
    minStockThreshold: 4,
    isFeatured: true,
    isBestSeller: false,
    isWeeklyOffer: false,
    rating: 4.9,
    reviewsCount: 52,
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Kit de força completo para retífica e restauração da compressão original do motor 160cc. Cilindro usinado com precisão micrométrica e anéis japoneses RIK que evitam queima de óleo prematura.',
    specifications: {
      'Cilindrada': '162,7 cc (Medida Standard STD 57.30mm)',
      'Conteúdo': '1 Cilindro + 1 Pistão STD + Jogo de Anéis RIK + Pino + Travas + Kit de Juntas Cabeçote',
      'Fabricante': 'KMP / RIK Japão'
    },
    compatibilities: [
      { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Start', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'NXR 160 Bros', yearRange: '2015 a 2026' },
      { brand: 'Honda', model: 'XRE 190', yearRange: '2016 a 2026', notes: 'Consultar mecânico para adaptação' }
    ],
    warrantyMonths: 6,
    tags: ['motor', 'cilindro', 'pistao', 'kmp', 'rik', 'cg160']
  },
  {
    id: 'prod-7',
    slug: 'bateria-moto-selada-heliar-htz6l-5ah-honda-cg-160-titan-fan-biz-125',
    name: 'Bateria de Moto Heliar HTZ6L 5Ah Selada AGM Livre de Manutenção',
    brand: 'Heliar',
    partNumber: 'HTZ6L-HLR',
    categoryId: 'eletrica',
    subcategoryId: 'baterias',
    price: 189.90,
    originalPrice: 220.00,
    discountPercent: 14,
    installmentsCount: 3,
    inStock: true,
    stockQuantity: 28,
    minStockThreshold: 6,
    isFeatured: true,
    isBestSeller: true,
    isWeeklyOffer: false,
    rating: 5.0,
    reviewsCount: 189,
    images: [
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Bateria líder de mercado com tecnologia AGM selada, ativada de fábrica e 100% livre de manutenção. Maior CCA de partida a frio para você nunca ficar na mão em manhãs frias.',
    specifications: {
      'Voltagem / Capacidade': '12V / 5.0 Ah',
      'Corrente de Partida (CCA)': '60 A (-10°C)',
      'Tecnologia': 'AGM / VRLA Regulada por Válvula',
      'Certificação': 'Inmetro Registro 003898/2012'
    },
    compatibilities: [
      { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'Biz 125', yearRange: '2011 a 2026' },
      { brand: 'Honda', model: 'PCX 150', yearRange: '2013 a 2022' },
      { brand: 'Yamaha', model: 'Factor 150', yearRange: '2016 a 2026' },
      { brand: 'Yamaha', model: 'Fazer 150', yearRange: '2014 a 2026' }
    ],
    warrantyMonths: 9,
    tags: ['bateria', 'heliar', 'eletrica', 'partida', 'cg160', 'biz125']
  },
  {
    id: 'prod-8',
    slug: 'lampada-farol-led-h4-stallion-super-branca-6500k-efeito-xenon',
    name: 'Lâmpada Farol LED H4 Stallion Super Branca 6500K Foco Preciso',
    brand: 'Stallion LED',
    partNumber: 'LED-H4-STL',
    categoryId: 'eletrica',
    subcategoryId: 'farois-lampadas',
    price: 49.90,
    originalPrice: 69.90,
    discountPercent: 28,
    installmentsCount: 2,
    inStock: true,
    stockQuantity: 3, // Low stock demo!
    minStockThreshold: 5,
    isFeatured: false,
    isBestSeller: true,
    isWeeklyOffer: true,
    rating: 4.7,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Iluminação 300% mais eficiente que lâmpadas halógenas comuns com linha de corte que não ofusca condutores no sentido oposto. Plug and play sem necessidade de relé adicional.',
    specifications: {
      'Encaixe': 'H4 (Farol Alto e Baixo na mesma lâmpada)',
      'Temperatura de Cor': '6500K Branco Puro',
      'Consumo': 'Apenas 25W (Economiza até 60% de bateria)',
      'Lumens': '4.000 Lúmens por lâmpada'
    },
    compatibilities: [
      { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'XRE 300', yearRange: '2009 a 2018' },
      { brand: 'Yamaha', model: 'YS/FZ25 Fazer 250', yearRange: '2006 a 2017' },
      { brand: 'Yamaha', model: 'Factor 150', yearRange: '2016 a 2026' }
    ],
    warrantyMonths: 6,
    tags: ['farol', 'led', 'lampada', 'h4', 'iluminacao']
  },
  {
    id: 'prod-9',
    slug: 'par-amortecedores-traseiros-reforcados-cofap-cg-160-titan-fan-start',
    name: 'Par de Amortecedores Traseiros Cofap TurboGás Honda CG 160',
    brand: 'Cofap',
    partNumber: 'CR-22534M-CFP',
    categoryId: 'traseira',
    subcategoryId: 'amortecedores',
    price: 279.90,
    originalPrice: 329.90,
    discountPercent: 15,
    installmentsCount: 4,
    inStock: true,
    stockQuantity: 15,
    minStockThreshold: 4,
    isFeatured: true,
    isBestSeller: false,
    isWeeklyOffer: false,
    rating: 4.9,
    reviewsCount: 76,
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Par de amortecedores pressurizados Cofap com regulagem de pré-carga de mola em 5 posições. Proporciona estabilidade superior em curvas e conforto inigualável em pistas irregulares.',
    specifications: {
      'Tecnologia': 'Pressurizado com gás nitrogênio (TurboGás)',
      'Regulagem': '5 estágios de dureza de mola',
      'Acabamento': 'Molas pretas e corpo cromado de alta densidade',
      'Garantia': 'Garantia oficial Cofap Brasil'
    },
    compatibilities: [
      { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Start', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 150 Titan', yearRange: '2004 a 2015' }
    ],
    warrantyMonths: 12,
    tags: ['amortecedor', 'cofap', 'suspensao', 'cg160', 'traseira']
  },
  {
    id: 'prod-10',
    slug: 'oleo-motor-motul-5100-4t-10w30-semissintetico-technosynthese-1l',
    name: 'Óleo de Motor Motul 5100 4T 10W30 Semissintético Ester JASO MA2 1L',
    brand: 'Motul',
    partNumber: 'MOT-5100-10W30',
    categoryId: 'filtros',
    subcategoryId: 'oleos-lubrificantes',
    price: 54.90,
    originalPrice: 65.00,
    discountPercent: 15,
    installmentsCount: 2,
    inStock: true,
    stockQuantity: 60,
    minStockThreshold: 15,
    isFeatured: true,
    isBestSeller: true,
    isWeeklyOffer: false,
    rating: 5.0,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Lubrificante de alta tecnologia à base de Éster que reduz o atrito interno do motor, melhora trocas de marcha e resiste a altas temperaturas no trânsito de São Paulo.',
    specifications: {
      'Viscosidade': 'SAE 10W30 (Recomendado Honda)',
      'Norma API': 'API SM / SL',
      'Norma JASO': 'JASO MA2 M033MOT155 (Máxima aderência de embreagem)',
      'Volume': '1 Litro'
    },
    compatibilities: [
      { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'Biz 125', yearRange: '2011 a 2026' },
      { brand: 'Honda', model: 'CB 250F Twister', yearRange: '2016 a 2022' },
      { brand: 'Honda', model: 'XRE 300', yearRange: '2009 a 2023' },
      { brand: 'Yamaha', model: 'YS/FZ25 Fazer 250', yearRange: '2006 a 2026' }
    ],
    warrantyMonths: 1,
    tags: ['oleo', 'motul', '10w30', 'motor', 'lubrificante', 'ester']
  },
  {
    id: 'prod-11',
    slug: 'kit-relacao-transmissao-yamaha-fazer-250-vaz-aco-1045-com-retentor',
    name: 'Kit Relação Transmissão Yamaha Fazer 250 Vaz X-Ring Aço 1045',
    brand: 'Vaz / KMC',
    partNumber: 'KTR-FZ25-VAZ',
    categoryId: 'transmissao',
    subcategoryId: 'correntes-retentor',
    price: 249.90,
    originalPrice: 299.90,
    discountPercent: 17,
    installmentsCount: 3,
    inStock: true,
    stockQuantity: 14,
    minStockThreshold: 4,
    isFeatured: true,
    isBestSeller: true,
    isWeeklyOffer: true,
    rating: 4.9,
    reviewsCount: 112,
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Kit completo de transmissão para Yamaha Fazer 250 / FZ25 com coroa e pinhão usinados pela Vaz e corrente KMC reforçada com anéis retentores especiais para suportar o torque do motor 250cc.',
    specifications: {
      'Coroa': '45 Dentes (Aço 1045 Temperado)',
      'Pinhão': '15 Dentes (Aço Carbono Forjado)',
      'Corrente': '520 UO x 106 Elos c/ Retentor O-Ring',
      'Marca': 'Vaz Extreme / KMC'
    },
    compatibilities: [
      { brand: 'Yamaha', model: 'YS/FZ25 Fazer 250', yearRange: '2006 a 2026' },
      { brand: 'Yamaha', model: 'XTZ 250 Lander', yearRange: '2007 a 2026', notes: 'Consultar relação de dentes' }
    ],
    warrantyMonths: 6,
    tags: ['transmissao', 'fazer250', 'vaz', 'yamaha', 'kit relacao']
  },
  {
    id: 'prod-12',
    slug: 'protetor-de-carenagem-e-motor-com-pedaleiras-honda-cg-160-stunt-race',
    name: 'Protetor de Carenagem e Motor com Pedaleiras Retráteis Honda CG 160',
    brand: 'Coyote Racing',
    partNumber: 'PROT-160-CYT',
    categoryId: 'carenagens',
    subcategoryId: 'protetores-carenagem',
    price: 199.90,
    originalPrice: 249.90,
    discountPercent: 20,
    installmentsCount: 3,
    inStock: true,
    stockQuantity: 8,
    minStockThreshold: 3,
    isFeatured: false,
    isBestSeller: true,
    isWeeklyOffer: false,
    rating: 4.8,
    reviewsCount: 94,
    images: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Proteja as abas do tanque, motor e pernas do piloto contra quedas e arranhões. Estrutura tubular robusta com pintura eletrostática microtexturizada e pedaleiras para descanso em viagens.',
    specifications: {
      'Tubo': 'Aço Carbono parede de 2mm com solda TIG reforçada',
      'Pintura': 'Eletrostática a pó anti-risco (Preto Fosco)',
      'Acompanha': 'Parafusos, buchas e pedaleiras retráteis com mola'
    },
    compatibilities: [
      { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Start', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Cargo', yearRange: '2016 a 2026' }
    ],
    warrantyMonths: 6,
    tags: ['protetor de motor', 'coyote', 'cg160', 'acessorio', 'carenagem']
  },
  {
    id: 'prod-13',
    slug: 'jogo-lonas-sapata-freio-traseira-standard-cobreq-cg-150-160-fan-titan',
    name: 'Jogo de Lonas e Sapatas de Freio Traseira Cobreq Standard CG 160 / 150',
    brand: 'Cobreq',
    partNumber: 'LON-0302-CBQ',
    categoryId: 'freios',
    subcategoryId: 'lonas-sapatas',
    price: 29.90,
    originalPrice: 38.00,
    discountPercent: 21,
    installmentsCount: 1,
    inStock: true,
    stockQuantity: 50,
    minStockThreshold: 10,
    isFeatured: false,
    isBestSeller: true,
    isWeeklyOffer: false,
    rating: 4.8,
    reviewsCount: 167,
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sapatas de freio traseiras com material de atrito termofixo de alta aderência. Não vitrifica o tambor de freio e mantém a frenagem firme mesmo em dias chuvosos.',
    specifications: {
      'Posição': 'Traseira (Tambor)',
      'Medida': 'Standard (Acompanha molas de retorno)',
      'Fabricante': 'Cobreq Original'
    },
    compatibilities: [
      { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Start', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 150 Titan', yearRange: '2004 a 2015' },
      { brand: 'Honda', model: 'Biz 125', yearRange: '2006 a 2026' }
    ],
    warrantyMonths: 3,
    tags: ['freio', 'lona', 'cobreq', 'tambor', 'cg160']
  },
  {
    id: 'prod-14',
    slug: 'guidao-original-honda-cg-160-fan-titan-com-pesos-e-rosca-cromado',
    name: 'Guidão Modelo Original Honda CG 160 com Bucha Interna Cromado',
    brand: 'Monaco Alumínio',
    partNumber: 'GUI-160-MNC',
    categoryId: 'dianteira',
    subcategoryId: 'guidoes-pesos',
    price: 89.90,
    originalPrice: 110.00,
    discountPercent: 18,
    installmentsCount: 2,
    inStock: true,
    stockQuantity: 2, // Low stock demo!
    minStockThreshold: 5,
    isFeatured: false,
    isBestSeller: false,
    isWeeklyOffer: false,
    rating: 4.6,
    reviewsCount: 41,
    images: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Guidão com espessura reforçada e furação padrão para os manetes e comutadores elétricos originais. Acompanha buchas internas soldadas para fixação perfeita dos pesos de guidão.',
    specifications: {
      'Diâmetro': '22mm (7/8 polegadas)',
      'Material': 'Aço Carbono com tripla camada de cromo',
      'Furação': 'Passagem de cabos e travas idêntica à de fábrica'
    },
    compatibilities: [
      { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026' },
      { brand: 'Honda', model: 'CG 160 Start', yearRange: '2016 a 2026' }
    ],
    warrantyMonths: 6,
    tags: ['guidao', 'direcao', 'cg160', 'monaco', 'cromado']
  },
  {
    id: 'prod-15',
    slug: 'disco-de-freio-dianteiro-ventilado-onda-wave-honda-xre-300-cb-300r',
    name: 'Disco de Freio Dianteiro Ventilado Esportivo Wave 276mm Honda XRE 300',
    brand: 'GP7 Racing',
    partNumber: 'DSC-XRE-WAV',
    categoryId: 'freios',
    subcategoryId: 'discos-freio',
    price: 149.90,
    originalPrice: 179.90,
    discountPercent: 17,
    installmentsCount: 3,
    inStock: true,
    stockQuantity: 11,
    minStockThreshold: 4,
    isFeatured: true,
    isBestSeller: false,
    isWeeklyOffer: true,
    rating: 4.9,
    reviewsCount: 63,
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Disco flutuante com design recortado tipo Wave que dissipa o calor rapidamente, reduz o peso não suspenso e previne o fading dos freios em descidas de serra e uso esportivo.',
    specifications: {
      'Diâmetro Externo': '276 mm',
      'Aço': 'Inox 420 Cirúrgico com tratamento térmico',
      'Furação': '6 furos padrão cubo dianteiro Honda'
    },
    compatibilities: [
      { brand: 'Honda', model: 'XRE 300', yearRange: '2009 a 2023' },
      { brand: 'Honda', model: 'CB 300R', yearRange: '2009 a 2015' },
      { brand: 'Honda', model: 'XRE 300 Sahara', yearRange: '2024 a 2026' }
    ],
    warrantyMonths: 6,
    tags: ['disco', 'freio', 'xre300', 'cb300', 'wave']
  },
  {
    id: 'prod-16',
    slug: 'regulador-retificador-voltagem-reforcado-honda-cb-300r-xre-300-servitec',
    name: 'Regulador Retificador de Voltagem Reforçado MOSFET Honda CB 300 / XRE 300',
    brand: 'Servitec',
    partNumber: 'REG-300-SRV',
    categoryId: 'eletrica',
    subcategoryId: 'estator-regulador',
    price: 169.90,
    originalPrice: 199.90,
    discountPercent: 15,
    installmentsCount: 3,
    inStock: false, // Out of stock demo!
    stockQuantity: 0,
    minStockThreshold: 3,
    isFeatured: false,
    isBestSeller: false,
    isWeeklyOffer: false,
    rating: 4.8,
    reviewsCount: 34,
    images: [
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Solução definitiva para problemas de carga e queima de estator. Circuito com tecnologia MOSFET que opera em temperatura 40% mais baixa que retificadores convencionais.',
    specifications: {
      'Tecnologia': 'MOSFET Inteligente',
      'Tensão de Saída': '14.2V a 14.5V estabilizada',
      'Carcaça': 'Alumínio aletado para máxima dissipação de calor'
    },
    compatibilities: [
      { brand: 'Honda', model: 'CB 300R', yearRange: '2009 a 2015' },
      { brand: 'Honda', model: 'XRE 300', yearRange: '2009 a 2023' }
    ],
    warrantyMonths: 6,
    tags: ['eletrica', 'retificador', 'xre300', 'cb300', 'servitec']
  }
];
