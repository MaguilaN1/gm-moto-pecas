import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, StockMovement, Order, Coupon, OrderStatus } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { INITIAL_COUPONS } from '../data/coupons';
import { useToast } from './ToastContext';

interface StoreContextType {
  products: Product[];
  stockMovements: StockMovement[];
  orders: Order[];
  coupons: Coupon[];
  lowStockProducts: Product[];
  outOfStockProducts: Product[];
  addProduct: (productData: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  adjustStock: (productId: string, quantityChange: number, reason: string) => void;
  createOrder: (order: Omit<Order, 'id'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingCode?: string) => void;
  addCoupon: (coupon: Coupon) => void;
  toggleCoupon: (code: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
}

const STORAGE_KEY_PRODUCTS = 'gm_moto_products';
const STORAGE_KEY_STOCK_MOVEMENTS = 'gm_moto_stock_movements';
const STORAGE_KEY_ORDERS = 'gm_moto_orders';
const STORAGE_KEY_COUPONS = 'gm_moto_coupons';

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-1',
    code: 'GM-93821',
    createdAt: '2026-08-22T10:15:00Z',
    customer: {
      userId: 'user-demo-1',
      name: 'Bruno Silva Santos',
      email: 'bruno.motociclista@gmail.com',
      cpf: '345.678.901-22',
      phone: '(11) 98123-4567'
    },
    shippingAddress: {
      id: 'addr-1',
      label: 'Casa',
      isDefault: true,
      recipientName: 'Bruno Silva Santos',
      street: 'Rua Domingos de Morais',
      number: '2150',
      complement: 'Apto 42B',
      neighborhood: 'Vila Mariana',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04036-000'
    },
    shippingOption: {
      id: 'ship-motoboy',
      name: 'Motoboy Expresso (Zona Sul SP)',
      code: 'motoboy',
      price: 15.00,
      deadlineDays: 0,
      deadlineText: 'Hoje em até 2h',
      description: 'Entrega rápida dedicada para a Zona Sul de São Paulo'
    },
    paymentMethod: 'pix',
    paymentDetails: {
      pixQrCode: 'pix-demo-code-93821',
      pixCopyPaste: '00020126580014br.gov.bcb.pix013693821-gmmoto-pagamento5204000053039865802BR5913GM MOTO PECAS6009SAO PAULO62070503***6304E8A9'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        unitPrice: 219.90,
        totalPrice: 219.90
      },
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 2,
        unitPrice: 38.90,
        totalPrice: 77.80
      }
    ],
    subtotal: 297.70,
    shippingCost: 15.00,
    discountAmount: 14.88, // 5% PIX
    total: 297.82,
    status: 'entregue',
    trackingCode: 'MOTOBOY-SP-93821'
  },
  {
    id: 'ord-2',
    code: 'GM-94105',
    createdAt: '2026-08-24T16:40:00Z',
    customer: {
      userId: 'user-demo-1',
      name: 'Bruno Silva Santos',
      email: 'bruno.motociclista@gmail.com',
      cpf: '345.678.901-22',
      phone: '(11) 98123-4567'
    },
    shippingAddress: {
      id: 'addr-1',
      label: 'Casa',
      isDefault: true,
      recipientName: 'Bruno Silva Santos',
      street: 'Rua Domingos de Morais',
      number: '2150',
      complement: 'Apto 42B',
      neighborhood: 'Vila Mariana',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04036-000'
    },
    shippingOption: {
      id: 'ship-sedex',
      name: 'SEDEX Expresso',
      code: 'sedex',
      price: 24.90,
      deadlineDays: 2,
      deadlineText: '1 a 2 dias úteis',
      description: 'Envio rápido com rastreamento detalhado Correios'
    },
    paymentMethod: 'credit_card',
    paymentDetails: {
      cardLast4: '4242',
      installments: 3,
      installmentValue: 71.93
    },
    items: [
      {
        product: INITIAL_PRODUCTS[4],
        quantity: 1,
        unitPrice: 59.90,
        totalPrice: 59.90
      },
      {
        product: INITIAL_PRODUCTS[6],
        quantity: 1,
        unitPrice: 189.90,
        totalPrice: 189.90
      }
    ],
    subtotal: 249.80,
    shippingCost: 24.90,
    discountAmount: 24.98, // Coupon BEMVINDO10
    total: 249.72,
    status: 'enviado',
    trackingCode: 'NL987654321BR'
  }
];

const INITIAL_STOCK_MOVEMENTS: StockMovement[] = [
  {
    id: 'mov-1',
    productId: 'prod-1',
    productName: 'Kit Relação Transmissão Honda CG 160 D.I.D',
    partNumber: 'KTR-160-DID-01',
    type: 'entrada',
    quantity: 20,
    reason: 'Entrada de Mercadoria - NF 49102 (Distribuidor D.I.D)',
    date: '2026-08-10T08:00:00Z',
    resultingStock: 20
  },
  {
    id: 'mov-2',
    productId: 'prod-1',
    productName: 'Kit Relação Transmissão Honda CG 160 D.I.D',
    partNumber: 'KTR-160-DID-01',
    type: 'saida',
    quantity: 1,
    reason: 'Venda Pedido #GM-93821',
    date: '2026-08-22T10:15:00Z',
    resultingStock: 19
  },
  {
    id: 'mov-3',
    productId: 'prod-3',
    productName: 'Filtro de Ar de Alta Performance Lavável Honda CG 160',
    partNumber: 'FA-160-INF',
    type: 'saida',
    quantity: 6,
    reason: 'Venda em Balcão da Loja Física (Zona Sul)',
    date: '2026-08-23T14:20:00Z',
    resultingStock: 4
  }
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, warning } = useToast();

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [stockMovements, setStockMovements] = useState<StockMovement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STOCK_MOVEMENTS);
      return saved ? JSON.parse(saved) : INITIAL_STOCK_MOVEMENTS;
    } catch {
      return INITIAL_STOCK_MOVEMENTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COUPONS);
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STOCK_MOVEMENTS, JSON.stringify(stockMovements));
  }, [stockMovements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_COUPONS, JSON.stringify(coupons));
  }, [coupons]);

  const lowStockProducts = products.filter(
    (p) => p.stockQuantity > 0 && p.stockQuantity <= p.minStockThreshold
  );

  const outOfStockProducts = products.filter(
    (p) => p.stockQuantity === 0 || !p.inStock
  );

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);

    // Log initial stock movement
    if (newProduct.stockQuantity > 0) {
      const initialMovement: StockMovement = {
        id: `mov-${Date.now()}`,
        productId: newProduct.id,
        productName: newProduct.name,
        partNumber: newProduct.partNumber,
        type: 'entrada',
        quantity: newProduct.stockQuantity,
        reason: 'Cadastro Inicial de Produto',
        date: new Date().toISOString(),
        resultingStock: newProduct.stockQuantity
      };
      setStockMovements((prev) => [initialMovement, ...prev]);
    }

    success('Produto Cadastrado!', `${newProduct.name} foi adicionado ao catálogo.`);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    success('Produto Atualizado', 'As alterações foram salvas no catálogo.');
  };

  const deleteProduct = (id: string) => {
    const productToDelete = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (productToDelete) {
      warning('Produto Excluído', `${productToDelete.name} foi removido.`);
    }
  };

  const adjustStock = (productId: string, quantityChange: number, reason: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const newStock = Math.max(0, product.stockQuantity + quantityChange);
    const inStock = newStock > 0;

    const updatedProduct = {
      ...product,
      stockQuantity: newStock,
      inStock
    };

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? updatedProduct : p))
    );

    const movement: StockMovement = {
      id: `mov-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      partNumber: product.partNumber,
      type: quantityChange >= 0 ? 'entrada' : 'saida',
      quantity: Math.abs(quantityChange),
      reason,
      date: new Date().toISOString(),
      resultingStock: newStock
    };

    setStockMovements((prev) => [movement, ...prev]);
    success('Estoque Atualizado', `${product.name}: novo saldo de ${newStock} un.`);
  };

  const createOrder = (orderData: Omit<Order, 'id'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Automatically decrement stock for each item in order
    orderData.items.forEach((item) => {
      const product = products.find((p) => p.id === item.product.id);
      if (product) {
        const newStock = Math.max(0, product.stockQuantity - item.quantity);
        const inStock = newStock > 0;

        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, stockQuantity: newStock, inStock } : p
          )
        );

        const movement: StockMovement = {
          id: `mov-${Date.now()}-${item.product.id}`,
          productId: product.id,
          productName: product.name,
          partNumber: product.partNumber,
          type: 'saida',
          quantity: item.quantity,
          reason: `Venda Pedido #${newOrder.code}`,
          date: new Date().toISOString(),
          resultingStock: newStock
        };

        setStockMovements((prev) => [movement, ...prev]);
      }
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingCode?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            trackingCode: trackingCode || ord.trackingCode
          };
        }
        return ord;
      })
    );
    success('Status do Pedido Atualizado', `Pedido atualizado para: ${status.toUpperCase()}`);
  };

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => [...prev, newCoupon]);
    success('Cupom Criado', `Cupom ${newCoupon.code} adicionado com sucesso.`);
  };

  const toggleCoupon = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        stockMovements,
        orders,
        coupons,
        lowStockProducts,
        outOfStockProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        adjustStock,
        createOrder,
        updateOrderStatus,
        addCoupon,
        toggleCoupon,
        getProductById,
        getProductBySlug
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
