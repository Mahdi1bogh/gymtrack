"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variants?: Record<string, string>;
};

type CartState = {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

type CartContextType = {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.variants) ===
            JSON.stringify(action.payload.variants)
      );

      const items = existingItem
        ? state.items.map((item) =>
            item.id === action.payload.id &&
            JSON.stringify(item.variants) ===
              JSON.stringify(action.payload.variants)
              ? {
                  ...item,
                  quantity:
                    (item.quantity || 0) + (action.payload.quantity || 1),
                }
              : item
          )
        : [
            ...state.items,
            { ...action.payload, quantity: action.payload.quantity || 1 },
          ];

      return calculateTotals({ ...state, items });
    }
    case "REMOVE_ITEM": {
      const items = state.items.filter((item) => item.id !== action.payload);
      return calculateTotals({ ...state, items });
    }
    case "UPDATE_QUANTITY": {
      const items = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity || 1) }
          : item
      );
      return calculateTotals({ ...state, items });
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

function calculateTotals(state: CartState): CartState {
  const subtotal = state.items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  return {
    ...state,
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    total: Number((subtotal + shipping).toFixed(2)),
  };
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  shipping: 0,
  total: 0,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart.items && Array.isArray(parsedCart.items)) {
          parsedCart.items.forEach((item: CartItem) => {
            dispatch({ type: "ADD_ITEM", payload: item });
          });
        }
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [state]);

  const addItem = (item: CartItem) => {
    if (!item.quantity || isNaN(item.quantity)) {
      item.quantity = 1;
    }
    if (!item.price || isNaN(item.price)) {
      item.price = 0;
    }
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity: Math.max(1, quantity) },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
