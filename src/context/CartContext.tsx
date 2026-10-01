import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CartItem, Product, ProductSize, OrderType, CheckoutFormState } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: ProductSize, addOns?: string[], quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  modalProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  checkoutForm: CheckoutFormState;
  updateCheckoutForm: (updates: Partial<CheckoutFormState>) => void;
  lastAddedName: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cane_cart_items_v1';
const ORDER_TYPE_KEY = 'cane_order_type_v1';
const CHECKOUT_FORM_KEY = 'cane_checkout_form_v1';

const INITIAL_FORM: CheckoutFormState = {
  fullName: '',
  mobile: '',
  orderType: 'delivery',
  houseFlat: '',
  streetArea: '',
  landmark: '',
  city: 'Kollam',
  pinCode: '691001',
  preferredDeliveryTime: 'As soon as possible',
  preferredPickupTime: 'Within 30 minutes',
  tableDetails: 'Table 1',
  preferredDineInTime: 'Now',
  specialInstructions: '',
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderTypeState] = useState<OrderType>(() => {
    try {
      const saved = localStorage.getItem(ORDER_TYPE_KEY);
      return (saved as OrderType) || 'delivery';
    } catch {
      return 'delivery';
    }
  });

  const [checkoutForm, setCheckoutForm] = useState<CheckoutFormState>(() => {
    try {
      const saved = localStorage.getItem(CHECKOUT_FORM_KEY);
      return saved ? { ...INITIAL_FORM, ...JSON.parse(saved) } : INITIAL_FORM;
    } catch {
      return INITIAL_FORM;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [lastAddedName, setLastAddedName] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDER_TYPE_KEY, orderType);
    } catch {
      // storage unavailable
    }
  }, [orderType]);

  useEffect(() => {
    try {
      localStorage.setItem(CHECKOUT_FORM_KEY, JSON.stringify(checkoutForm));
    } catch {
      // storage unavailable
    }
  }, [checkoutForm]);

  const setOrderType = (type: OrderType) => {
    setOrderTypeState(type);
    setCheckoutForm((prev) => ({ ...prev, orderType: type }));
  };

  const updateCheckoutForm = (updates: Partial<CheckoutFormState>) => {
    setCheckoutForm((prev) => {
      const next = { ...prev, ...updates };
      if (updates.orderType) {
        setOrderTypeState(updates.orderType);
      }
      return next;
    });
  };

  const addToCart = (product: Product, size: ProductSize, addOns: string[] = [], quantity = 1) => {
    const sortedAddOns = [...addOns].sort();
    const addOnsKey = sortedAddOns.join('-');
    const variantId = `${product.id}-${size.name}-${addOnsKey}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === variantId);
      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex].quantity += quantity;
        return nextCart;
      } else {
        const newItem: CartItem = {
          id: variantId,
          productId: product.id,
          name: product.name,
          size,
          addOns: sortedAddOns,
          quantity,
          unitPrice: size.price,
          image: product.image,
        };
        return [...prevCart, newItem];
      }
    });

    setLastAddedName(product.name);
    setTimeout(() => {
      setLastAddedName(null);
    }, 2500);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [cart]);

  // Delivery charge rule: Configurable. ₹40 for delivery, ₹0 for takeaway or dine-in.
  const deliveryCharge = useMemo(() => {
    if (cart.length === 0) return 0;
    return orderType === 'delivery' ? 40 : 0;
  }, [orderType, cart.length]);

  const total = useMemo(() => {
    return subtotal + deliveryCharge;
  }, [subtotal, deliveryCharge]);

  const openProductModal = (product: Product) => {
    setModalProduct(product);
  };

  const closeProductModal = () => {
    setModalProduct(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryCharge,
        total,
        orderType,
        setOrderType,
        isCartOpen,
        setIsCartOpen,
        modalProduct,
        openProductModal,
        closeProductModal,
        checkoutForm,
        updateCheckoutForm,
        lastAddedName,
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
