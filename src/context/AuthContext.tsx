import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, CustomerAddress } from '../types';
import { useToast } from './ToastContext';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'forgot';
  openLoginModal: () => void;
  openRegisterModal: () => void;
  openForgotModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'addresses' | 'role'>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<CustomerAddress, 'id'>) => void;
  updateAddress: (address: CustomerAddress) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  adminLogin: (pin: string) => boolean;
  adminLogout: () => void;
}

const STORAGE_KEY_USER = 'gm_moto_current_user';
const STORAGE_KEY_ADMIN = 'gm_moto_admin_session';

const INITIAL_DEMO_USER: User = {
  id: 'user-demo-1',
  name: 'Bruno Silva Santos',
  email: 'bruno.motociclista@gmail.com',
  cpf: '345.678.901-22',
  phone: '(11) 98123-4567',
  role: 'customer',
  createdAt: '2026-06-10T14:30:00Z',
  addresses: [
    {
      id: 'addr-1',
      label: 'Principal (Casa)',
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
    {
      id: 'addr-2',
      label: 'Oficina / Trabalho',
      isDefault: false,
      recipientName: 'Bruno Silva (Oficina MotoSpeed)',
      street: 'Av. Santo Amaro',
      number: '3890',
      neighborhood: 'Santo Amaro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04556-300'
    }
  ]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, error } = useToast();
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_USER;
    } catch {
      return INITIAL_DEMO_USER;
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_ADMIN) === 'true';
    } catch {
      return false;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'forgot'>('login');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ADMIN, isAdminAuthenticated ? 'true' : 'false');
  }, [isAdminAuthenticated]);

  const openLoginModal = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  };

  const openForgotModal = () => {
    setAuthModalTab('forgot');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string): Promise<boolean> => {
    // Simulated login check
    if (email) {
      const user: User = currentUser || {
        ...INITIAL_DEMO_USER,
        email,
      };
      setCurrentUser(user);
      success('Login realizado com sucesso!', `Bem-vindo de volta, ${user.name.split(' ')[0]}!`);
      closeAuthModal();
      return true;
    }
    error('Erro ao entrar', 'Verifique seu e-mail e senha.');
    return false;
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt' | 'addresses' | 'role'>): Promise<boolean> => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      ...userData,
      role: 'customer',
      createdAt: new Date().toISOString(),
      addresses: []
    };
    setCurrentUser(newUser);
    success('Conta criada com sucesso!', 'Aproveite todas as vantagens da GM Moto Peças!');
    closeAuthModal();
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    success('Logout realizado', 'Você saiu da sua conta com segurança.');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    success('Perfil atualizado', 'Seus dados foram salvos com sucesso.');
  };

  const addAddress = (addressData: Omit<CustomerAddress, 'id'>) => {
    if (!currentUser) return;
    const newAddress: CustomerAddress = {
      ...addressData,
      id: `addr-${Date.now()}`,
      isDefault: currentUser.addresses.length === 0 || addressData.isDefault
    };

    const updatedAddresses = addressData.isDefault
      ? currentUser.addresses.map(a => ({ ...a, isDefault: false })).concat(newAddress)
      : [...currentUser.addresses, newAddress];

    setCurrentUser({
      ...currentUser,
      addresses: updatedAddresses
    });
    success('Endereço adicionado!', 'Novo endereço salvo para suas entregas.');
  };

  const updateAddress = (updatedAddr: CustomerAddress) => {
    if (!currentUser) return;
    const updatedAddresses = currentUser.addresses.map(addr => {
      if (addr.id === updatedAddr.id) {
        return updatedAddr;
      }
      if (updatedAddr.isDefault) {
        return { ...addr, isDefault: false };
      }
      return addr;
    });

    setCurrentUser({
      ...currentUser,
      addresses: updatedAddresses
    });
    success('Endereço atualizado com sucesso!');
  };

  const deleteAddress = (id: string) => {
    if (!currentUser) return;
    const filtered = currentUser.addresses.filter(a => a.id !== id);
    if (filtered.length > 0 && !filtered.some(a => a.isDefault)) {
      filtered[0].isDefault = true;
    }
    setCurrentUser({
      ...currentUser,
      addresses: filtered
    });
    success('Endereço removido.');
  };

  const setDefaultAddress = (id: string) => {
    if (!currentUser) return;
    const updated = currentUser.addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    setCurrentUser({
      ...currentUser,
      addresses: updated
    });
    success('Endereço principal definido!');
  };

  const adminLogin = (pin: string): boolean => {
    // Master PIN for admin demo: "1234" or "admin" or "gm2026"
    if (pin === '1234' || pin.toLowerCase() === 'admin' || pin === 'gm2026') {
      setIsAdminAuthenticated(true);
      success('Acesso Administrativo Autorizado', 'Bem-vindo ao Painel de Controle GM Moto Peças.');
      return true;
    }
    error('PIN Incorreto', 'O código de acesso administrativo é "1234" para demonstração.');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    success('Sessão Administrativa Encerrada');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdminAuthenticated,
        isAuthModalOpen,
        authModalTab,
        openLoginModal,
        openRegisterModal,
        openForgotModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
