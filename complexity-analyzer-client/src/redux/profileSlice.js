import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    uuid: '',
    signedIn: false
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
    },
})

export const { updateUser } = profileSlice.actions

export default profileSlice.reducer