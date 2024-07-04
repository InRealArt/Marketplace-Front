/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { NftId, NftType } from '@/types'

interface NftsState {
    list: NftType[]
}

const initialState: NftsState = {
    list: []
}


export const nftsSlice = createSlice({
    name: 'nfts',
    initialState,
    reducers: {
        setNfts: (state, action: PayloadAction<NftType[]>) => {
            state.list = action.payload
        }
    }
})

export const communautaryNftsSlice = createSlice({
    name: 'communautaryNfts',
    initialState,
    reducers: {
        setCommunautaryNfts: (state, action: PayloadAction<NftType[]>) => {
            state.list = action.payload
        }
    }
})

export const { setNfts } = nftsSlice.actions
export const { setCommunautaryNfts } = communautaryNftsSlice.actions

export default nftsSlice.reducer
