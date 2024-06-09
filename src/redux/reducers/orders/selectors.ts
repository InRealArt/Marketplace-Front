import { RootState } from "../../store"

export const getOrders = (state: RootState) => state.orders.list
