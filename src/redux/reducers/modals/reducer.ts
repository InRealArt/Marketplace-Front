/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ModalsState {
    loginModal: boolean
    signUpModal: boolean

}

const initialState: ModalsState = {
    loginModal: false,
    signUpModal: false
}


export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setLoginModalDisplay: (state, action: PayloadAction<boolean>) => {
            state.loginModal = action.payload
        },
        setSignUpModalDisplay: (state, action: PayloadAction<boolean>) => {
            state.signUpModal = action.payload
        }
    }
})

export const { setLoginModalDisplay, setSignUpModalDisplay } = modalsSlice.actions

export default modalsSlice.reducer
