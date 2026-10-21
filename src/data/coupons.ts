import { Coupon } from '../types';

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'BEMVINDO10',
    discountPercent: 10,
    minOrderValue: 100,
    active: true,
    description: '10% OFF na primeira compra acima de R$ 100'
  },
  {
    code: 'GMMOTO5',
    discountPercent: 5,
    minOrderValue: 50,
    active: true,
    description: '5% OFF em todo o site'
  },
  {
    code: 'ZONASUL15',
    discountPercent: 15,
    minOrderValue: 250,
    active: true,
    description: '15% OFF para compras acima de R$ 250'
  }
];
