/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CollectionType } from '@/types'

interface CollectionsState {
    list: CollectionType[]
}

const initialState: CollectionsState = {
    list: []
}


export const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        setCollections: (state, action: PayloadAction<CollectionType[]>) => {
            state.list = action.payload
        }
    }
})

export const { setCollections } = collectionsSlice.actions

export default collectionsSlice.reducer
