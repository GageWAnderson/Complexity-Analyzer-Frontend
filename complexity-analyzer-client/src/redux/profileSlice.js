import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uuid: 1,
    signedIn: false,
    email: '',
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getUuid: (state) => { return state.uuid },
        signIn: (state, action) => { state.signedIn = true; state.email = action.payload.email },
        signOut: (state) => { state.signedIn = false; state.email = '' },
    },
})

export const { getUuid, signIn, signOut } = profileSlice.actions

export default profileSlice.reducer