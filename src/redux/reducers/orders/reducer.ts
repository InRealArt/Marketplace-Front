/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { OrderType } from '@/types'

interface ordersState {
    list: OrderType[]
}

const initialState: ordersState = {
    list: []
}


export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<OrderType[]>) => {
            state.list = action.payload
        }
    }
})

export const { setOrders } = ordersSlice.actions

export default ordersSlice.reducer
