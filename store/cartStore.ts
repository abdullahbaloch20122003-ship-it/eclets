import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;
  increaseQuantity: (id: number, size: string) => void;
  decreaseQuantity: (id: number, size: string) => void;
  removeFromCart: (id: number, size: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) =>
              cartItem.id === item.id &&
              cartItem.size === item.size
          );

          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id &&
                cartItem.size === item.size
                  ? {
                      ...cartItem,
                      quantity:
                        cartItem.quantity + item.quantity,
                    }
                  : cartItem
              ),
            };
          }

          return {
            cart: [...state.cart, item],
          };
        }),

      increaseQuantity: (id, size) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id && item.size === size
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        })),

      decreaseQuantity: (id, size) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id && item.size === size
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      removeFromCart: (id, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(item.id === id && item.size === size)
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),

    {
      name: "eclets-cart",
    }
  )
);