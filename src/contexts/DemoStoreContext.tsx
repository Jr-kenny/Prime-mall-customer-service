import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface DemoUser {
  name: string;
  email: string;
  funds: number;
}

interface DemoStoreContextType {
  user: DemoUser | null;
  cart: CartItem[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addToCart: (item: Omit<CartItem, "quantity">) => boolean;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const DemoStoreContext = createContext<DemoStoreContextType | undefined>(undefined);

const DEMO_INITIAL_FUNDS = 1000.00;

export const DemoStoreProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DemoUser | null>(() => {
    const saved = localStorage.getItem("demo_user");
    return saved ? JSON.parse(saved) : null;
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("demo_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("demo_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("demo_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("demo_cart", JSON.stringify(cart));
  }, [cart]);

  const login = async (email: string, _password: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if returning user
    const savedUser = localStorage.getItem("demo_user_data_" + email);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      const newUser = {
        name: email.split("@")[0],
        email,
        funds: DEMO_INITIAL_FUNDS,
      };
      setUser(newUser);
      localStorage.setItem("demo_user_data_" + email, JSON.stringify(newUser));
    }
  };

  const signup = async (name: string, email: string, _password: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newUser = {
      name,
      email,
      funds: DEMO_INITIAL_FUNDS,
    };
    setUser(newUser);
    localStorage.setItem("demo_user_data_" + email, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("demo_cart");
  };

  const addToCart = (item: Omit<CartItem, "quantity">): boolean => {
    if (!user) return false;
    
    // Check if user has enough funds
    const currentTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    if (currentTotal + item.price > user.funds) {
      return false; // Not enough funds
    }

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    // Deduct funds immediately
    setUser(prev => prev ? { ...prev, funds: prev.funds - item.price } : null);
    
    return true;
  };

  const removeFromCart = (itemId: number) => {
    const item = cart.find(i => i.id === itemId);
    if (item && user) {
      // Refund the funds
      setUser(prev => prev ? { ...prev, funds: prev.funds + (item.price * item.quantity) } : null);
    }
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    const item = cart.find(i => i.id === itemId);
    if (!item || !user) return;

    const diff = quantity - item.quantity;
    const costDiff = diff * item.price;

    // Check if user has enough funds for increase
    if (diff > 0 && costDiff > user.funds) {
      return; // Not enough funds
    }

    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setUser(prev => prev ? { ...prev, funds: prev.funds - costDiff } : null);
    setCart(prev => prev.map(i =>
      i.id === itemId ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => {
    // Refund all items
    const totalRefund = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (user) {
      setUser(prev => prev ? { ...prev, funds: prev.funds + totalRefund } : null);
    }
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <DemoStoreContext.Provider
      value={{
        user,
        cart,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </DemoStoreContext.Provider>
  );
};

export const useDemoStore = () => {
  const context = useContext(DemoStoreContext);
  if (context === undefined) {
    throw new Error("useDemoStore must be used within a DemoStoreProvider");
  }
  return context;
};
