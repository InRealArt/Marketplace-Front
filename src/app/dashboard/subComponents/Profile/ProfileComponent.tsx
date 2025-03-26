'use client';
import Button from '@/components/Button/Button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setUserInfos } from '@/redux/reducers/user/reducer';
import { getUserInfos } from '@/redux/reducers/user/selectors';
import { DashboardTabs } from '@/utils/constants';
import { UserCircle } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { signOut } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
interface ProfileProps {
  setActiveTab: React.Dispatch<React.SetStateAction<DashboardTabs>>;
}

const ProfileComponent = ({ setActiveTab }: ProfileProps) => {
  const dispatch = useAppDispatch()
  const { infos } = useAppSelector((state) => getUserInfos(state))
  const { address, email, name, role, surname, tel } = infos || {}
  const router = useRouter()
  const handleSignOut = async () => {
    try {
      const result = await signOut()
      if (result.success) {
        dispatch(setUserInfos(null))
        toast.success('Déconnexion réussie')
        router.push('/')
      } else {
        throw new Error('Échec de la déconnexion')
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la déconnexion')
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
