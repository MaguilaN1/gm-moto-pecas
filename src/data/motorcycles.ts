import { Motorcycle } from '../types';

export const MOTORCYCLES: Motorcycle[] = [
  // HONDA
  { id: 'honda-cg-160-titan', brand: 'Honda', model: 'CG 160 Titan', category: 'Street', startYear: 2016, endYear: 2026 },
  { id: 'honda-cg-160-fan', brand: 'Honda', model: 'CG 160 Fan', category: 'Street', startYear: 2016, endYear: 2026 },
  { id: 'honda-cg-160-start', brand: 'Honda', model: 'CG 160 Start', category: 'Street', startYear: 2016, endYear: 2026 },
  { id: 'honda-cg-160-cargo', brand: 'Honda', model: 'CG 160 Cargo', category: 'Street', startYear: 2016, endYear: 2026 },
  { id: 'honda-cg-150-titan', brand: 'Honda', model: 'CG 150 Titan', category: 'Street', startYear: 2004, endYear: 2015 },
  { id: 'honda-cg-150-fan', brand: 'Honda', model: 'CG 150 Fan', category: 'Street', startYear: 2009, endYear: 2015 },
  { id: 'honda-biz-125', brand: 'Honda', model: 'Biz 125', category: 'Scooter/Cub', startYear: 2006, endYear: 2026 },
  { id: 'honda-biz-110i', brand: 'Honda', model: 'Biz 110i', category: 'Scooter/Cub', startYear: 2016, endYear: 2026 },
  { id: 'honda-pop-110i', brand: 'Honda', model: 'Pop 110i', category: 'Scooter/Cub', startYear: 2016, endYear: 2026 },
  { id: 'honda-nxr-160-bros', brand: 'Honda', model: 'NXR 160 Bros', category: 'Trail', startYear: 2015, endYear: 2026 },
  { id: 'honda-xre-190', brand: 'Honda', model: 'XRE 190', category: 'Trail', startYear: 2016, endYear: 2026 },
  { id: 'honda-xre-300', brand: 'Honda', model: 'XRE 300', category: 'Trail', startYear: 2009, endYear: 2023 },
  { id: 'honda-sahara-300', brand: 'Honda', model: 'XRE 300 Sahara', category: 'Trail', startYear: 2024, endYear: 2026 },
  { id: 'honda-cb-250f-twister', brand: 'Honda', model: 'CB 250F Twister', category: 'Street', startYear: 2016, endYear: 2022 },
  { id: 'honda-cb-300f-twister', brand: 'Honda', model: 'CB 300F Twister', category: 'Street', startYear: 2023, endYear: 2026 },
  { id: 'honda-cb-300r', brand: 'Honda', model: 'CB 300R', category: 'Street', startYear: 2009, endYear: 2015 },
  { id: 'honda-pcx-150', brand: 'Honda', model: 'PCX 150', category: 'Scooter', startYear: 2013, endYear: 2022 },
  { id: 'honda-pcx-160', brand: 'Honda', model: 'PCX 160', category: 'Scooter', startYear: 2023, endYear: 2026 },
  { id: 'honda-cb-500f', brand: 'Honda', model: 'CB 500F', category: 'Naked', startYear: 2014, endYear: 2024 },

  // YAMAHA
  { id: 'yamaha-fazer-250', brand: 'Yamaha', model: 'YS/FZ25 Fazer 250', category: 'Street', startYear: 2006, endYear: 2026 },
  { id: 'yamaha-factor-150', brand: 'Yamaha', model: 'Factor 150', category: 'Street', startYear: 2016, endYear: 2026 },
  { id: 'yamaha-factor-125i', brand: 'Yamaha', model: 'Factor 125i', category: 'Street', startYear: 2017, endYear: 2024 },
  { id: 'yamaha-fazer-150', brand: 'Yamaha', model: 'Fazer 150', category: 'Street', startYear: 2014, endYear: 2026 },
  { id: 'yamaha-crosser-150', brand: 'Yamaha', model: 'XTZ 150 Crosser', category: 'Trail', startYear: 2014, endYear: 2026 },
  { id: 'yamaha-lander-250', brand: 'Yamaha', model: 'XTZ 250 Lander', category: 'Trail', startYear: 2007, endYear: 2026 },
  { id: 'yamaha-tenere-250', brand: 'Yamaha', model: 'XTZ 250 Ténéré', category: 'Trail', startYear: 2011, endYear: 2019 },
  { id: 'yamaha-nmax-160', brand: 'Yamaha', model: 'NMAX 160', category: 'Scooter', startYear: 2016, endYear: 2026 },
  { id: 'yamaha-mt-03', brand: 'Yamaha', model: 'MT-03', category: 'Naked', startYear: 2016, endYear: 2026 },
  { id: 'yamaha-fluo-125', brand: 'Yamaha', model: 'Fluo 125 ABS', category: 'Scooter', startYear: 2022, endYear: 2026 },

  // SUZUKI
  { id: 'suzuki-yes-125', brand: 'Suzuki', model: 'EN 125 Yes', category: 'Street', startYear: 2005, endYear: 2016 },
  { id: 'suzuki-intruder-125', brand: 'Suzuki', model: 'Intruder 125', category: 'Custom', startYear: 2002, endYear: 2017 },
  { id: 'suzuki-burgman-125', brand: 'Suzuki', model: 'Burgman 125', category: 'Scooter', startYear: 2006, endYear: 2019 },
  { id: 'suzuki-gsx-s750', brand: 'Suzuki', model: 'GSX-S750', category: 'Naked', startYear: 2018, endYear: 2024 },
  { id: 'suzuki-v-strom-650', brand: 'Suzuki', model: 'V-Strom 650', category: 'Big Trail', startYear: 2008, endYear: 2024 },

  // KAWASAKI
  { id: 'kawasaki-ninja-300', brand: 'Kawasaki', model: 'Ninja 300', category: 'Sport', startYear: 2013, endYear: 2018 },
  { id: 'kawasaki-ninja-400', brand: 'Kawasaki', model: 'Ninja 400', category: 'Sport', startYear: 2019, endYear: 2024 },
  { id: 'kawasaki-z400', brand: 'Kawasaki', model: 'Z400', category: 'Naked', startYear: 2019, endYear: 2025 },
  { id: 'kawasaki-versys-300', brand: 'Kawasaki', model: 'Versys-X 300', category: 'Trail', startYear: 2018, endYear: 2025 },

  // DAFRA
  { id: 'dafra-citycom-300i', brand: 'Dafra', model: 'Citycom 300i', category: 'Scooter', startYear: 2011, endYear: 2024 },
  { id: 'dafra-nh-190', brand: 'Dafra', model: 'NH 190', category: 'Trail', startYear: 2020, endYear: 2025 },
  { id: 'dafra-apache-rtr-200', brand: 'Dafra', model: 'Apache RTR 200', category: 'Street', startYear: 2019, endYear: 2024 },

  // SHINERAY
  { id: 'shineray-xy-50-q', brand: 'Shineray', model: 'XY 50 Q Phoenix', category: 'Moped', startYear: 2011, endYear: 2024 },
  { id: 'shineray-jet-125', brand: 'Shineray', model: 'Jet 125', category: 'Scooter/Cub', startYear: 2015, endYear: 2025 },
  { id: 'shineray-worker-125', brand: 'Shineray', model: 'Worker 125', category: 'Street', startYear: 2021, endYear: 2025 },

  // OUTRAS / DIVERSAS
  { id: 'bmw-g310-gs', brand: 'Outras', model: 'BMW G 310 GS', category: 'Trail', startYear: 2018, endYear: 2026 },
  { id: 'royal-enfield-hunter-350', brand: 'Outras', model: 'Royal Enfield Hunter 350', category: 'Custom', startYear: 2023, endYear: 2026 }
];

export const POPULAR_BRANDS = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'Dafra', 'Shineray', 'Outras'] as const;

export const YEARS_LIST = Array.from({ length: 17 }, (_, i) => 2026 - i); // 2026 down to 2010
