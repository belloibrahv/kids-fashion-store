import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Order, Product, Size, Color, ShippingAddress } from '@/types';

// User Authentication
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
}

interface UserStore {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

// Wishlist
interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

// Addresses
interface AddressStore {
  addresses: ShippingAddress[];
  defaultAddressId: string | null;
  addAddress: (address: ShippingAddress) => void;
  updateAddress: (id: string, address: ShippingAddress) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDefaultAddress: () => ShippingAddress | null;
}

// Notifications
interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (type: Notification['type'], message: string) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
  getUnreadCount: () => number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: Size, color: Color, quantity?: number) => void;
  removeItem: (productId: string, size: Size, color: Color) => void;
  updateQuantity: (productId: string, size: Size, color: Color, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

interface SearchStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size, color, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.selectedSize === size &&
                item.selectedColor === color
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, selectedSize: size, selectedColor: color, quantity }],
          };
        });
      },
      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor === color
              )
          ),
        }));
      },
      updateQuantity: (productId, size, color, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
      getCartCount: () => {
        const items = get().items;
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },
      getOrderById: (id) => {
        return get().orders.find((order) => order.id === id);
      },
      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status, updatedAt: new Date() } : order
          ),
        }));
      },
    }),
    {
      name: 'orders-storage',
    }
  )
);

export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
