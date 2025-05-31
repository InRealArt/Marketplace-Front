import { create } from 'zustand';

interface ModalState {
  showMenu: boolean;
  showUserMenu: boolean;
  showCart: boolean;
  setShowMenu: (show: boolean) => void;
  setShowUserMenu: (show: boolean) => void;
  setShowCart: (show: boolean) => void;
  toggleMenu: () => void;
  toggleUserMenu: () => void;
  toggleCart: () => void;
  closeAllModals: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  showMenu: false,
  showUserMenu: false,
  showCart: false,
  
  setShowMenu: (show) => set({ showMenu: show }),
  setShowUserMenu: (show) => set({ showUserMenu: show }),
  setShowCart: (show) => set({ showCart: show }),
  
  toggleMenu: () => set((state) => {
    // Close other modals when opening this one
    if (!state.showMenu) {
      return { showMenu: true, showUserMenu: false, showCart: false };
    }
    return { showMenu: !state.showMenu };
  }),
  
  toggleUserMenu: () => set((state) => {
    // Close other modals when opening this one
    if (!state.showUserMenu) {
      return { showUserMenu: true, showMenu: false, showCart: false };
    }
    return { showUserMenu: !state.showUserMenu };
  }),
  
  toggleCart: () => set((state) => {
    // Close other modals when opening this one
    if (!state.showCart) {
      return { showCart: true, showMenu: false, showUserMenu: false };
    }
    return { showCart: !state.showCart };
  }),
  
  closeAllModals: () => set({ showMenu: false, showUserMenu: false, showCart: false }),
})); 