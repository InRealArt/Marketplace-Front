import { configureStore } from '@reduxjs/toolkit'
import artistsReducer from './reducers/artists/reducer'
import collectionsReducer from './reducers/collections/reducer'
import nftsReducer from './reducers/nfts/reducer'
import modalsReducer from './reducers/modals/reducer'
import userReducer from './reducers/user/reducer'
import ordersReducer from './reducers/orders/reducer'
import basketReducer from './reducers/basket/reducer'

export const store = configureStore({
  reducer: {
    nfts: nftsReducer,
    collections: collectionsReducer,
    artists: artistsReducer,
    modals: modalsReducer,
    user: userReducer,
    orders: ordersReducer,
    basket: basketReducer

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


