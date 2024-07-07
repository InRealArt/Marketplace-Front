/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { NftId, NftType } from '@/types'
import { ResourceNftStatuses } from '@prisma/client'

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
        updateNftById: (state, action: PayloadAction<{ nftId: NftId, status: ResourceNftStatuses, purchaseOnce: boolean }>) => {
            const index = state.list.findIndex(obj => obj.id == action.payload.nftId);
            state.list[index].status = action.payload.status
            state.list[index].purchasedOnce = action.payload.purchaseOnce
        }
    }
})

export const { setNfts, updateNftById } = nftsSlice.actions

export default nftsSlice.reducer
