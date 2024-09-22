import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      totalAmount: 0,

      addItem: (item) => {
        const existingItemIndex = get().cart.findIndex(
          (i) => i.name === item.name
        );
        if (existingItemIndex !== -1) {
          const updatedCart = [...get().cart];
          updatedCart[existingItemIndex].quantity += item.quantity;
          updatedCart[existingItemIndex].total += item.price * item.quantity;
          set({ cart: updatedCart });
        } else {
          set((state) => ({
            cart: [
              ...state.cart,
              { ...item, total: item.price * item.quantity },
            ],
          }));
        }
        get().calculateTotalAmount();
      },

      incrementItem: (name) => {
        const updatedCart = get().cart.map((item) => {
          if (item.name === name) {
            item.quantity += 1;
            item.total += item.price;
          }
          return item;
        });
        set({ cart: updatedCart });
        get().calculateTotalAmount();
      },

      decrementItem: (name) => {
        const updatedCart = get().cart.map((item) => {
          if (item.name === name && item.quantity > 1) {
            item.quantity -= 1;
            item.total -= item.price;
          }
          return item;
        });
        set({ cart: updatedCart });
        get().calculateTotalAmount();
      },

      removeItem: (name) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.name !== name),
        }));
        get().calculateTotalAmount();
      },

      calculateTotalAmount: () => {
        const total = get().cart.reduce((acc, item) => acc + item.total, 0);
        set({ totalAmount: total });
      },

      clearCart: () => {
        set({ cart: [], totalAmount: 0 });
      },
    }),
    {
      name: "cart-storage", // name of the item in the storage (must be unique)
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useCartStore;

export const useAppStore = create(
  persist(
    (set) => ({
      night: false,
      setNight: () => set((state) => ({ night: !state.night })),
      openModal: true,
      setOpen: () => set((state) => ({ openModal: !state.openModal })),
    }),
    {
      name: "app-settings", // unique name for the local storage key
      getStorage: () => localStorage, // specify localStorage as the storage
    }
  )
);

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAdmin: false, // Stores if the user is an admin
      isLoggedIn: false,

      // Action to log in the user
      login: (userInfo) => {
        return set({ user: userInfo, isAdmin: false, isLoggedIn: true });
      },

      // Action to log out the user
      logout: () => {
        set({ user: null, isAdmin: false, isLoggedIn: false });
      },

      // Check if user is admin
      checkAdmin: () => {
        const { user } = get();
        return user && user.role === "admin";
      },
    }),
    {
      name: "auth-storage", // unique name for the local storage key
      getStorage: () => localStorage, // specify localStorage as the storage
    }
  )
);
