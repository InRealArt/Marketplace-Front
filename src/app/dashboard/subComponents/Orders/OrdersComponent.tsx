'use client';
import { fetchOrdersByUser } from '@/lib/orders';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setOrders } from '@/redux/reducers/orders/reducer';
import { getOrders } from '@/redux/reducers/orders/selectors';
import { useItemsStore } from '@/store/itemsStore';
import { OrderType } from '@/types';
import { OrderStatus } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';

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
  const { getNftById } = useItemsStore()
  const nft = getNftById(nftId)

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
        {/* {nft?.name} by  {artist?.pseudo} */}
      </p>
      <p className="Orders__item--sub">
        <span>Status</span>: <br />
        {OrderStatusMapping[orderStatus]}</p>
    </div>
  )
}
const OrdersComponent = () => {
  const { data } = useSession();
  const sessionData = data
  const isAuthenticated = !!sessionData?.user?.id;
  const orders = useAppSelector((state) => getOrders(state))
  const dispatch = useAppDispatch()
  
  // Track authentication state changes
  const [authState, setAuthState] = useState(isAuthenticated);
  
  useEffect(() => {
    if (authState !== isAuthenticated) {
      setAuthState(isAuthenticated);
    }
  }, [isAuthenticated, authState]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      if (isAuthenticated && sessionData?.user?.id) {
        const orders = await fetchOrdersByUser(sessionData.user.id)
        const ordersFormatted = orders.map(order => ({ ...order, id: Number(order.id), created_at: order.created_at?.toDateString() }))
        dispatch(setOrders(ordersFormatted));
      }
    };
    fetchOrdersData()
  }, [isAuthenticated, sessionData, dispatch])

  return (
    <section className="Wallet__main">
      <h2 className="Wallet__title">Orders</h2>
      <div className="Wallet__content">
        {' '}
        <div className="Orders">
          {orders.map(order => <OrderItem key={Number(order.id)} order={order} />)}
        </div>
      </div>
    </section>
  );
};

export default OrdersComponent;
