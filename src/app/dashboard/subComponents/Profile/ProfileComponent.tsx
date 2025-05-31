'use client';
import Button from '@/components/Button/Button';
import { DashboardTabs } from '@/utils/constants';
import { UserCircle } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { signOut } from '@/app/actions/auth';
import { useSession } from '@/lib/auth-client';

interface ProfileProps {
  setActiveTab: React.Dispatch<React.SetStateAction<DashboardTabs>>;
}

const ProfileComponent = ({ setActiveTab }: ProfileProps) => {
  const { data, refetch } = useSession();
  const sessionData = data as any;
  const sessionUser = sessionData?.user;

  const userMetadata = sessionUser?.user_metadata || {};
  const { address, tel, surname } = userMetadata;
  const name = userMetadata.name;
  const email = sessionUser?.email;
  const role = 'SELLER'; // Default role

  const handleSignOut = async () => {
    try {
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileComponent;
