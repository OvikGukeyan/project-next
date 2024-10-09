import { create } from "zustand";
import { Api } from "../services/api-client";
import { getCartDetails } from "../lib";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";




export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    fetchCartItems: () => Promise<void>;
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
    addCartItem: (values: CreateCartItemValues) => Promise<void>;
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    loading: true,
    error: false,
    totalAmount: 0,

    removeCartItem: async (id: number) => {
        try {
          set({ loading: true, error: false });
          const data = await Api.cart.removeCartItem(id);
          set(getCartDetails(data));
        } catch (error) {
          set({ error: true });
          console.error(error);
        } finally {
          set({ loading: false });
        }
      },
      fetchCartItems: async () => {
        try {
          set({ loading: true, error: false });
          const data = await Api.cart.getCart();
          console.log(1, data)
          set(getCartDetails(data));
        } catch (error) {
          console.error(error);
          set({ error: true });
        } finally {
          set({ loading: false });
        }
      },
      updateItemQuantity: async (id: number, quantity: number) => {
        try {
          set({ loading: true, error: false });
          const data = await Api.cart.updateItemQuantity(id, quantity);
          set(getCartDetails(data));
        } catch (error) {
          console.error(error);
          set({ error: true });
        } finally {
          set({ loading: false });
        }
      },
      addCartItem: async (values: any) => {
        try {
          set({ loading: true, error: false });
          const data = await Api.cart.addCartItem(values);
          set(getCartDetails(data));
        } catch (error) {
          console.error(error);
          set({ error: true });
        } finally {
          set({ loading: false });
        }
      },

}))