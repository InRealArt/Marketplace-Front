/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ModalType, NftId, NftType } from '@/types'
import { ResourceNftStatuses } from '@prisma/client'
import { Address } from 'viem'

interface NftsState {
    list: NftType[]
    currentNft: {
        infos: Partial<NftType> | null
        modalType: ModalType
        price: number
        contractAddress: Address
        success?: boolean
    }
}

const initialState: NftsState = {
    list: [],
    currentNft: {
        infos: null,
        modalType: ModalType.BUY,
        price: 0,
        contractAddress: '0x',
        success: false
    }
}


export const nftsSlice = createSlice({
    name: 'nfts',
    initialState,
    reducers: {
        setNfts: (state, action: PayloadAction<NftType[]>) => {
            state.list = action.payload
        },
        updateNftById: (state, action: PayloadAction<{ nftId: NftId, status: ResourceNftStatuses, purchasedOnce?: boolean, itemId?: number }>) => {
            const index = state.list.findIndex(obj => obj.id === action.payload.nftId);
            state.list[index].status = action.payload.status

            if (action.payload.itemId) state.list[index].itemId = action.payload.itemId
            if (action.payload.purchasedOnce) state.list[index].purchasedOnce = action.payload.purchasedOnce
        },
        setModalInfos: (state, action: PayloadAction<{ nft: Partial<NftType>, modalType: ModalType, price: number, contractAddress: Address, success?: boolean }>) => {
            console.log("setModalInfos");

            state.currentNft = {
                infos: action.payload.nft,
                modalType: action.payload.modalType,
                price: action.payload.price,
                contractAddress: action.payload.contractAddress,
                success: action.payload.success
            }
        },
        closeModal: (state) => {
            state.currentNft = initialState.currentNft
        }
    }
})

export const { setNfts, updateNftById, setModalInfos, closeModal } = nftsSlice.actions

export default nftsSlice.reducer
