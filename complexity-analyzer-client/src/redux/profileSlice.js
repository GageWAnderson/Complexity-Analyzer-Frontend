import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    uuid: '',
    signedIn: false,
    signOutError: false
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.uuid = action.payload.uuid;
            state.signedIn = true;
        },
        signUserOut: (state) => {
            state.username = '';
            state.email = '';
            state.uuid = '';
            state.signedIn = false;
        },
        setSignOutError: (state, action) => {
            state.signOutError = action.payload;
        }
    },
})

export const { updateUser, signUserOut, setSignOutError } = profileSlice.actions

export default profileSlice.reducer