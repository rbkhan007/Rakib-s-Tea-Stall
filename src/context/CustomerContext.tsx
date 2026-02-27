import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  createdAt: string;
}

interface CustomerContextType {
  customer: Customer | null;
  isAuthenticated: boolean;
  login: (name: string, phone: string, email?: string, address?: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<Customer>) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // Load customer from localStorage on mount
    const savedCustomer = localStorage.getItem('customer');
    if (savedCustomer) {
      try {
        setCustomer(JSON.parse(savedCustomer));
      } catch {
        localStorage.removeItem('customer');
      }
    }
  }, []);

  const login = (name: string, phone: string, email?: string, address?: string) => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      address,
      createdAt: new Date().toISOString(),
    };
    setCustomer(newCustomer);
    localStorage.setItem('customer', JSON.stringify(newCustomer));
  };

  const logout = () => {
    setCustomer(null);
    localStorage.removeItem('customer');
  };

  const updateProfile = (data: Partial<Customer>) => {
    if (customer) {
      const updated = { ...customer, ...data };
      setCustomer(updated);
      localStorage.setItem('customer', JSON.stringify(updated));
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        isAuthenticated: !!customer,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
