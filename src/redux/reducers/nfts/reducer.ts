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
        },
        updateNft: (state, action: PayloadAction<{ id: NftId, isOwner: boolean }>) => {
            state.list = state.list.map(nft => (nft.id === action.payload.id ? { ...nft, isOwner: action.payload.isOwner } : nft))
        }
    }
})

export const { setNfts, updateNft } = nftsSlice.actions

export default nftsSlice.reducer
