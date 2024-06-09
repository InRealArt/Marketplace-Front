'use client';
import useFetchData from '@/customHooks/useFetchData';
import { fetchOrdersByUser } from '@/lib/orders';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getArtistByNft } from '@/redux/reducers/artists/selectors';
import { getNftById } from '@/redux/reducers/nfts/selectors';
import { setOrders } from '@/redux/reducers/orders/reducer';
import { getOrders } from '@/redux/reducers/orders/selectors';
import { getUserInfos } from '@/redux/reducers/user/selectors';
import { OrderType } from '@/types';
import { OrderStatus } from '@prisma/client';
import React, { useEffect } from 'react';

interface OrderProps {
  order: OrderType
}

const OrderStatusMapping = {
  [OrderStatus.WAITING_FOR_CONFIRMATION]: "Waiting for confirmation",
  [OrderStatus.CONFIRMED]: "Confirmé",
  [OrderStatus.PROCESS_OF_DELIVERY]: "En cours de livraison",
  [OrderStatus.DELIVER]: "Livré à destination",
}
const OrderItem = ({ order }: OrderProps) => {
  const { id, created_at, userId, nftId, orderStatus } = order
  const nft = useAppSelector((state) => getNftById(state, nftId))
  const artist = useAppSelector((state) => getArtistByNft(state, nft?.collectionId || 0))
  useFetchData()

  return (
    <div className="Orders__item">
      <p className="Orders__item--sub">
        <span>Order n°</span> <br />
        {userId.slice(0, 8)}-{Number(id)}
      </p>
      {created_at && <p className="Orders__item--sub">
        <span>Date:</span>  <br />
        {new Date(created_at).toLocaleString()}
      </p>}
      <p className="Orders__item--sub">
        <span>Artwork</span>: <br />
        {nft?.name} by {artist?.pseudo}
      </p>
      <p className="Orders__item--sub">
        <span>Status</span>: <br />
        {OrderStatusMapping[orderStatus]}</p>
    </div>
  )
}
const OrdersComponent = () => {
  const user = useAppSelector((state) => getUserInfos(state))
  const orders = useAppSelector((state) => getOrders(state))
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchOrdersData = async () => {
      if (user.infos?.id) {
        const orders = await fetchOrdersByUser(user.infos.id)
        dispatch(setOrders(orders));
      }
    };
    fetchOrdersData()
  }, [])

  return (
    <section className="Wallet__main">
      <h2 className="Wallet__title">Orders</h2>
      <div className="Wallet__content">
        {' '}
        <div className="Orders">
          {orders.map(order => <OrderItem key={order.id} order={order} />)}
        </div>
      </div>
    </section>
  );
};

export default OrdersComponent;
