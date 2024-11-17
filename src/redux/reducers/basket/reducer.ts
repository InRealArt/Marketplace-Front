/* eslint-disable no-param-reassign */
import { Artist } from '@/mocks/types'
import { NftId } from '@/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'


interface BasketInfos {
    id: NftId
    title: string
    price: number
    description: string
    artist: Partial<Artist>
    image: string | null
}

interface BasketState {
    current: BasketInfos | null
}

const initialState: BasketState = {
    current: null
}


export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasketInfos: (state, action: PayloadAction<BasketInfos | null>) => {
            state.current = action.payload
        }
    }
})

export const { setBasketInfos } = basketSlice.actions

export default basketSlice.reducer
