import { Review } from '../types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Ricardo Silveira',
    bikeModel: 'Honda CG 160 Titan 2022',
    cityState: 'São Paulo - SP (Santo Amaro)',
    rating: 5,
    date: '2026-08-18',
    comment: 'Atendimento nota 10! Pedi o Kit Relação D.I.D de manhã e à tarde o motoboy já estava entregando aqui na minha oficina na Zona Sul. Peça 100% original e embalada perfeitamente.',
    verifiedPurchase: true,
    productName: 'Kit Relação Transmissão Honda CG 160 D.I.D c/ Retentor'
  },
  {
    id: 'rev-2',
    author: 'Carlos Eduardo Mendes',
    bikeModel: 'Yamaha FZ25 Fazer 250 2021',
    cityState: 'São Bernardo do Campo - SP',
    rating: 5,
    date: '2026-08-12',
    comment: 'Muito fácil encontrar a peça certa usando o filtro por moto. O site me mostrou exatamente a pastilha e o óleo compatíveis com a minha Fazer. Recomendo demais a GM Moto Peças!',
    verifiedPurchase: true,
    productName: 'Jogo de Pastilhas de Freio Cobreq'
  },
  {
    id: 'rev-3',
    author: 'Marcos Vinícius Costa',
    bikeModel: 'Honda XRE 300 2019',
    cityState: 'São Paulo - SP (Campo Limpo)',
    rating: 5,
    date: '2026-08-05',
    comment: 'Preço justo e atendimento super prestativo no WhatsApp quando tive dúvida sobre o ano da minha XRE. O regulador retificador funcionou perfeitamente e resolveu meu problema de carga.',
    verifiedPurchase: true,
    productName: 'Regulador Retificador MOSFET'
  },
  {
    id: 'rev-4',
    author: 'Diego Fernandes',
    bikeModel: 'Honda Biz 125 2023',
    cityState: 'Guarulhos - SP',
    rating: 5,
    date: '2026-07-28',
    comment: 'Comprei a bateria Heliar e o kit de revisão. O desconto de 5% no PIX compensou bastante e o rastreio do pedido pelo site funcionou redondinho. Comprarei de novo com certeza.',
    verifiedPurchase: true,
    productName: 'Bateria Heliar HTZ6L 5Ah Selada'
  },
  {
    id: 'rev-5',
    author: 'Alexandre Bastos',
    bikeModel: 'Yamaha Factor 150 2020',
    cityState: 'Campinas - SP',
    rating: 5,
    date: '2026-07-20',
    comment: 'Chegou em 2 dias pelo Sedex aqui no interior. Peças de alta qualidade, nota fiscal no e-mail e tudo muito bem protegido. Loja extremamente profissional e séria.',
    verifiedPurchase: true,
    productName: 'Par de Retrovisores Modelo BMW F800'
  },
  {
    id: 'rev-6',
    author: 'Rodrigo Santana',
    bikeModel: 'Honda CG 160 Fan 2023',
    cityState: 'São Paulo - SP (Interlagos)',
    rating: 5,
    date: '2026-07-15',
    comment: 'Trabalho com entregas todos os dias e preciso de peças que aguentem o tranco. O kit de embreagem e o protetor de carenagem da GM Moto Peças salvaram a moto na correria.',
    verifiedPurchase: true,
    productName: 'Kit Embreagem Completo Scud CG 160'
  }
];
