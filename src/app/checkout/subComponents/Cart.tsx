import Button from '@/components/Button/Button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getBasketInfos } from '@/redux/reducers/basket/selectors';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';
import { getUserInfos } from '@/redux/reducers/user/selectors';
import React from 'react'

export default function Cart() {
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => getUserInfos(state))
  const basket = useAppSelector((state) => getBasketInfos(state))
  const { price } = basket.current || {}

  console.log(basket, user);

  const percent = (quantity: number, percent: number) => {
    return (quantity * percent) / 100;
  }
  const tvaPourcent = 15
  const totalPrice = (price || 10000)
  const totalPriceIncludedTva = totalPrice + percent(totalPrice, tvaPourcent)


  const submitPayment = () => {
    if (!user.infos) {
      dispatch(setLoginModalDisplay(true))
    } else {
      // todo stripe
    }
  }
  return (
    <div className='Cart'>
      <div className='Cart__item'>
        <span>Delivery costs</span>
        <span>Included</span>
      </div>

      <div className='Cart__item'>
        <span>TVA</span>
        <span>{percent(totalPrice, tvaPourcent)} € ({tvaPourcent}%)</span>
      </div>

      <div className='Cart__item Cart__item--last' >
        <span>Total</span>
        <span>{totalPriceIncludedTva} €</span>
      </div>

      <Button text="Proceed" additionalClassName='gold' action={submitPayment} />
    </div>
  )
}
