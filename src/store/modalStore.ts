import { create } from 'zustand';

interface ModalState {
  showMenu: boolean;
  showUserMenu: boolean;
  showCart: boolean;
  showSearch: boolean;
  setShowMenu: (show: boolean) => void;
  setShowUserMenu: (show: boolean) => void;
  setShowCart: (show: boolean) => void;
  setShowSearch: (show: boolean) => void;
  toggleMenu: () => void;
  toggleUserMenu: () => void;
  toggleCart: () => void;
  openCart: () => void;
  toggleSearch: () => void;
  closeAllModals: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  showMenu: false,
  showUserMenu: false,
  showCart: false,
  showSearch: false,
  
  setShowMenu: (show) => set({ showMenu: show }),
  setShowUserMenu: (show) => set({ showUserMenu: show }),
  setShowCart: (show) => set({ showCart: show }),
  setShowSearch: (show) => set({ showSearch: show }),
  
  toggleMenu: () => set((state) => {
    // Close other modals when opening this one
    if (!state.showMenu) {
      return { showMenu: true, showUserMenu: false, showCart: false, showSearch: false };
    }
    return { showMenu: !state.showMenu };
  }),
  
  toggleUserMenu: () => set((state) => {
    // Close other modals when opening this one
    if (!state.showUserMenu) {
      return { showUserMenu: true, showMenu: false, showCart: false, showSearch: false };
    }
    return { showUserMenu: !state.showUserMenu };
  }),

  openCart: () => set((state) => {
    // Close other modals when opening this one
    if (!state.showCart) {
      return { showCart: true, showMenu: false, showUserMenu: false, showSearch: false };
    }
    return { showCart: true };
  }),
  
  toggleCart: () => set((state) => {
    // Close other modals when opening this one
    if (!state.showCart) {
      return { showCart: true, showMenu: false, showUserMenu: false, showSearch: false };
    }
    return { showCart: !state.showCart };
  }),
  
  toggleSearch: () => set((state) => {
    // Close other modals when opening this one
    if (!state.showSearch) {
      return { showSearch: true, showMenu: false, showUserMenu: false, showCart: false };
    }
    return { showSearch: !state.showSearch };
  }),
  
  closeAllModals: () => set({ showMenu: false, showUserMenu: false, showCart: false, showSearch: false }),
})); 