import { configureStore } from '@reduxjs/toolkit'
import collectionsReducer from './reducers/collections/reducer'
import modalsReducer from './reducers/modals/reducer'
import ordersReducer from './reducers/orders/reducer'

export const store = configureStore({
  reducer: {
    collections: collectionsReducer,
    modals: modalsReducer,
    orders: ordersReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


