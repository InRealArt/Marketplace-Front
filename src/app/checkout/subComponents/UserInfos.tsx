import Button from '@/components/Button/Button';
import { useAppSelector } from '@/redux/hooks';
import { getBasketInfos } from '@/redux/reducers/basket/selectors';
import { getUserInfos } from '@/redux/reducers/user/selectors';
import { getImageFromUri } from '@/utils/getImageFromUri';
import Link from 'next/link';
import React from 'react'

export default function UserInfos() {
  const user = useAppSelector((state) => getUserInfos(state))
  const basket = useAppSelector((state) => getBasketInfos(state))

  console.log(basket, user);
  const { title, artist, image, description, price, id } = basket.current || {}

  const imageUrl = getImageFromUri(image || '')

  const renderEmptyState = (): JSX.Element => {
    return <div className='UserInfos'>
      <h2 className='UserInfos__product__title'>Votre panier est vide</h2>
      <Button link='/artworks' text='Voir nos oeuvres' />
    </div>
  }

  if (!title) {
    return renderEmptyState()
  }
  return (
    <section className='UserInfos'>
      <div className='UserInfos__product'>
        {imageUrl && <Link href={`/artworks/${id}`}><img className='UserInfos__product__image' src={imageUrl} /> </Link>}
        <div className='UserInfos__product__infos'>
          <div className='UserInfos__product__title'>
            <Link href={`/artworks/${id}`}> {title} </Link>
            -
            <Link href={`/artists/${artist?.id}`}> {artist?.name}</Link>
          </div>

          <h3 className='UserInfos__product__price'>{price || '10 000 €'}</h3>
          <p className='UserInfos__product__description'>{description}</p>
          <p className='UserInfos__product__item'><span>Quantity :</span> 1 - Pièce unique</p>
          <p className='UserInfos__product__item'><span>Materials :</span> Paint</p>
          <p className='UserInfos__product__item'><span>Size :</span> 13F</p>
        </div>
      </div>
    </section>
  )
}
