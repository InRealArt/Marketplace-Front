/* eslint-disable no-param-reassign */
import { UserRoles } from '@prisma/client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface UserInfos {
    id: string
    email?: string;
    name: string;
    address: string;
    surname: string;
    tel: string
    role: UserRoles
    orderIds: number[]
}

interface UserState {
    infos: UserInfos | null
}

const initialState: UserState = {
    infos: null
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfos: (state, action: PayloadAction<UserInfos | null>) => {
            state.infos = action.payload
        }
    }
})

export const { setUserInfos } = userSlice.actions

export default userSlice.reducer
