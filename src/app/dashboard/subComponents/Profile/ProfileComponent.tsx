'use client';
import Button from '@/components/Button/Button';
import { DashboardTabs } from '@/utils/constants';
import { UserCircle } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { signOut } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useSession } from '@/lib/auth-client';
import { useAppDispatch } from '@/redux/hooks';
import { setOrders } from '@/redux/reducers/orders/reducer';
import { useNftsStore } from '@/store/nftsStore';
import { useCollectionsStore } from '@/store/collectionsStore';
import { useArtistsStore } from '@/store/artistsStore';
import { v4 as uuidv4 } from 'uuid';
import { useCart } from '@/hooks/useCart';

interface ProfileProps {
  setActiveTab: React.Dispatch<React.SetStateAction<DashboardTabs>>;
}

const ProfileComponent = ({ setActiveTab }: ProfileProps) => {
  const { data, refetch } = useSession();
  const sessionData = data as any;
  const sessionUser = sessionData?.user;
  const { setAnonymousId } = useCartStore();

  const userMetadata = sessionUser?.user_metadata || {};
  const { address, tel, surname } = userMetadata;
  const name = userMetadata.name;
  const email = sessionUser?.email;
  const role = 'SELLER'; // Default role

  // Helper function to clear localStorage cart data
  const clearLocalStorageCartData = () => {
    try {
      // Remove the cart data from localStorage
      localStorage.removeItem('ira-cart-storage');
      console.log('Cleared localStorage cart data');
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      // Perform sign out
      const result = await signOut();
      if (result.success) {        
        // First reset the cart completely
        setAnonymousId(uuidv4());
        // clearLocalStorageCartData()
        toast.success('Déconnexion réussie');
        refetch();
      } else {
        throw new Error('Échec de la déconnexion');
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la déconnexion');
    }
  };

  return (
    <section className="Wallet__main">
      <h2 className="Wallet__title">Profile</h2>
      <div className="Wallet__content">
        {' '}
        <div className='Profile'>
          <div className='Profile__intro'>
            <UserCircle className='Profile__icon' />
            <span className='Profile__name'>{name} {surname}</span>
          </div>
          <div className='Profile__content'>
            <p className='Profile__item'>
              <span className='Profile__item--label'>Mail:</span> {email}
            </p>
            <p className='Profile__item'>
              <span className='Profile__item--label'>Phone:</span> {tel}
            </p>
            <p className='Profile__item'>
              <span className='Profile__item--label'>Address:</span> {address}
            </p>
            <p className='Profile__item'>
              <span className='Profile__item--label'>Role:</span> {role}
            </p>
            <Button
              additionalClassName='logout'
              text='Se déconnecter'
              action={handleSignOut}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileComponent;
