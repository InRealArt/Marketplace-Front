/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ArtistType } from '@/types'

interface artistsState {
    list: ArtistType[]
}

const initialState: artistsState = {
    list: []
}


export const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {
        setArtists: (state, action: PayloadAction<ArtistType[]>) => {
            state.list = action.payload
        }
    }
})

export const { setArtists } = artistsSlice.actions

export default artistsSlice.reducer
