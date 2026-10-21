import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem, ShippingOption, Coupon } from '../types';
import { useStore } from './StoreContext';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  shippingOption: ShippingOption | null;
  setShippingOption: (option: ShippingOption | null) => void;
  shippingOptions: ShippingOption[];
  destinationCep: string;
  isCalculatingFreight: boolean;
  calculateFreight: (cep: string) => Promise<boolean>;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  grandTotal: number;
  pixDiscountAmount: number;
  pixGrandTotal: number;
}

const STORAGE_KEY_CART = 'gm_moto_cart_items';
const STORAGE_KEY_CEP = 'gm_moto_saved_cep';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { coupons } = useStore();
  const { success, warning, error, info } = useToast();

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [destinationCep, setDestinationCep] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_CEP) || '04626-000';
    } catch {
      return '04626-000';
    }
  });

  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [shippingOption, setShippingOption] = useState<ShippingOption | null>(null);
  const [isCalculatingFreight, setIsCalculatingFreight] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CEP, destinationCep);
  }, [destinationCep]);

  // Initial shipping options calculation if CEP exists
  useEffect(() => {
    if (destinationCep && destinationCep.replace(/\D/g, '').length === 8) {
      calculateFreight(destinationCep);
    }
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product, quantity: number = 1) => {
    const validQty = Math.max(1, Math.floor(Number(quantity) || 1));
    if (!product.inStock || product.stockQuantity === 0) {
      warning('Produto Esgotado', 'Desculpe, este item não está disponível no momento.');
      return;
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + validQty;
        if (newQty > product.stockQuantity) {
          warning('Limite de Estoque', `Apenas ${product.stockQuantity} unidades disponíveis em estoque.`);
          return prev.map((item) =>
            item.product.id === product.id ? { ...item, quantity: product.stockQuantity } : item
          );
        }
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        return [...prev, { product, quantity: Math.min(validQty, product.stockQuantity) }];
      }
    });

    success('Adicionado ao Carrinho!', `${validQty}x ${product.name}`);
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const validQty = Math.floor(Number(quantity) || 0);
    if (validQty <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          if (validQty > item.product.stockQuantity) {
            warning('Limite de Estoque', `Máximo disponível: ${item.product.stockQuantity} unidades.`);
            return { ...item, quantity: item.product.stockQuantity };
          }
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      info('Item removido', `${item.product.name} foi retirado do carrinho.`);
    }
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [items]);

  const calculateFreight = async (cep: string): Promise<boolean> => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      error('CEP Inválido', 'Por favor, digite um CEP válido com 8 dígitos.');
      return false;
    }

    setIsCalculatingFreight(true);
    setDestinationCep(cep);

    // Simulate shipping API lookup
    await new Promise((resolve) => setTimeout(resolve, 600));

    const isSpCapitalOrZonaSul =
      cleanCep.startsWith('04') || // Zona Sul SP
      cleanCep.startsWith('01') || // Centro
      cleanCep.startsWith('02') || // Zona Norte
      cleanCep.startsWith('03') || // Zona Leste
      cleanCep.startsWith('05') || // Zona Oeste
      cleanCep.startsWith('08');

    const isFreeShipping = subtotal >= 299;

    let options: ShippingOption[] = [];

    if (isSpCapitalOrZonaSul) {
      options = [
        {
          id: 'ship-motoboy-zs',
          name: 'Motoboy Expresso (Zona Sul e SP Capital)',
          code: 'motoboy',
          price: isFreeShipping ? 0 : 14.90,
          deadlineDays: 0,
          deadlineText: 'Hoje em até 2 horas',
          description: 'Entrega rápida dedicada para oficinas e clientes de SP',
          isFree: isFreeShipping
        },
        {
          id: 'ship-sedex-sp',
          name: 'SEDEX Correios',
          code: 'sedex',
          price: isFreeShipping ? 0 : 19.90,
          deadlineDays: 1,
          deadlineText: '1 dia útil',
          description: 'Rastreamento prioritário em tempo real',
          isFree: isFreeShipping
        },
        {
          id: 'ship-pac-sp',
          name: 'PAC Econômico',
          code: 'pac',
          price: isFreeShipping ? 0 : 12.90,
          deadlineDays: 3,
          deadlineText: '2 a 3 dias úteis',
          description: 'Envio padrão Correios',
          isFree: isFreeShipping
        },
        {
          id: 'ship-retirada',
          name: 'Retirar na Loja (Zona Sul - Washington Luís)',
          code: 'retirada',
          price: 0,
          deadlineDays: 0,
          deadlineText: 'Pronto em 30 min',
          description: 'Retirada gratuita no balcão GM Moto Peças',
          isFree: true
        }
      ];
    } else {
      options = [
        {
          id: 'ship-sedex-br',
          name: 'SEDEX Expresso Brasil',
          code: 'sedex',
          price: isFreeShipping ? 0 : 34.90,
          deadlineDays: 3,
          deadlineText: '2 a 4 dias úteis',
          description: 'Entrega expressa com seguro de carga para todo o Brasil',
          isFree: isFreeShipping
        },
        {
          id: 'ship-pac-br',
          name: 'PAC Correios Brasil',
          code: 'pac',
          price: isFreeShipping ? 0 : 24.90,
          deadlineDays: 7,
          deadlineText: '5 a 8 dias úteis',
          description: 'Envio convencional Correios',
          isFree: isFreeShipping
        }
      ];
    }

    setShippingOptions(options);
    setShippingOption(options[0]);
    setIsCalculatingFreight(false);
    return true;
  };

  const applyCoupon = (code: string): boolean => {
    const formattedCode = code.trim().toUpperCase();
    const foundCoupon = coupons.find((c) => c.code.toUpperCase() === formattedCode && c.active);

    if (!foundCoupon) {
      error('Cupom Inválido', 'O cupom digitado não existe ou expirou.');
      return false;
    }

    if (subtotal < foundCoupon.minOrderValue) {
      warning(
        'Valor Mínimo Não Atingido',
        `Este cupom requer pedido mínimo de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(foundCoupon.minOrderValue)}.`
      );
      return false;
    }

    setAppliedCoupon(foundCoupon);
    success('Cupom Aplicado!', `${foundCoupon.discountPercent}% de desconto no seu pedido.`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    info('Cupom removido');
  };

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return (subtotal * appliedCoupon.discountPercent) / 100;
  }, [subtotal, appliedCoupon]);

  const shippingCost = shippingOption ? shippingOption.price : 0;

  const grandTotal = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingCost);
  }, [subtotal, discountAmount, shippingCost]);

  const pixDiscountAmount = useMemo(() => {
    // 5% extra discount when paying via PIX
    return grandTotal * 0.05;
  }, [grandTotal]);

  const pixGrandTotal = useMemo(() => {
    return Math.max(0, grandTotal - pixDiscountAmount);
  }, [grandTotal, pixDiscountAmount]);

  const itemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        shippingOption,
        setShippingOption,
        shippingOptions,
        destinationCep,
        isCalculatingFreight,
        calculateFreight,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        shippingCost,
        discountAmount,
        grandTotal,
        pixDiscountAmount,
        pixGrandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
