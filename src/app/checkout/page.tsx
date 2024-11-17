'use client'
import { useAppSelector } from '@/redux/hooks';
import { getBasketInfos } from '@/redux/reducers/basket/selectors';
import React from 'react';
import UserInfos from './subComponents/UserInfos';
import Cart from './subComponents/Cart';
import Button from '@/components/Button/Button';

const Checkout = () => {
  const basket = useAppSelector((state) => getBasketInfos(state))

  const renderEmptyState = (): JSX.Element => (
    <div className='Checkout__emptyState'>
      <h2 className='Checkout__title Checkout__title'>Votre panier est vide</h2>
      <Button link='/artworks' text='Voir nos oeuvres' additionalClassName='gold' />
    </div>
  )

  return (
    <main className="Checkout">
      {!basket?.current ?
        renderEmptyState()
        :
        <>
          <h1 className='Checkout__title'>Summary</h1>
          <div className="Checkout__content">
            <UserInfos />
            <Cart />
          </div>
        </>
      }
    </main>
  );
};

export default Checkout;
