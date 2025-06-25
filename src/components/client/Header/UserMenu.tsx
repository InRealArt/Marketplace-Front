'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, UserCircle } from 'lucide-react';
import { useAppDispatch } from '@/redux/hooks';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';
import { useSession } from '@/lib/auth-client';
import { DashboardTabs } from '@/utils/constants';
import { signOut } from '@/app/actions/auth';
import { toast } from 'sonner';
import { useModalStore } from '@/store/modalStore';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const { data, refetch } = useSession();
  const user = data?.user;
  const menuRef = useRef<HTMLElement>(null);
  const { showUserMenu, setShowUserMenu } = useModalStore();
  
  // Get display name safely
  const displayName = user ? (user.name || user.email) : '';
  
  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && showUserMenu) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowUserMenu, showUserMenu]);
  
  const hideMenu = () => setShowUserMenu(false);
  
  const displayLoginModal = () => {
    hideMenu();
    dispatch(setLoginModalDisplay(true));
  };

  const handleSignOut = async () => {
    try {
      hideMenu();
      // Perform sign out
      const result = await signOut();
      if (result.success) {
        toast.success('Déconnexion réussie');
        refetch();
      } else {
        toast.error('Une erreur est survenue lors de la déconnexion');
        throw new Error('Échec de la déconnexion');
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la déconnexion');
    }
  };

  return (
    <section 
      ref={menuRef}
      className={`max-w-[250px] w-full sm:w-[90%] rounded-[20px] border border-[#a6a6a6] bg-[#313130] p-[20px] fixed right-0 top-[80px] z-[100] ${!showUserMenu ? 'hidden' : ''}`}
    >
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-montserrat text-xl tracking-[0] font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:w-[20px] after:bg-[#b39e73]">Account</h1>
        <X
          className="cursor-pointer"
          onClick={hideMenu}
          width={24}
          height={24}
        />
      </div>
      
      <div className="flex flex-col space-y-3">
        {!user ? (
          <span onClick={displayLoginModal} className="flex text-white font-poppins text-base py-1 cursor-pointer">
            Sign up / Sign in
          </span>
        ) : (
          <>
            <div className="flex items-center space-x-2 pb-2 border-b border-[#dedcd838]">
              <UserCircle className="w-6 h-6" />
              <span className="text-white font-poppins text-sm">
                {displayName}
              </span>
            </div>
            
            <div className="relative pt-2">
              <Link
                className="flex text-white font-poppins text-base py-1 cursor-pointer"
                onClick={hideMenu}
                href={{
                  pathname: "/dashboard",
                  query: {
                    tab: DashboardTabs.PROFILE,
                  }
                }}
              >
                My Account
              </Link>
            </div>
            
            <div className="relative">
              <button 
                onClick={handleSignOut}
                className="flex text-white font-poppins text-base py-1 cursor-pointer bg-transparent border-none"
              >
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default UserMenu; 