import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    uuid: '',
    apiKey: ''
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.uuid = action.payload.uuid;
        },
        getApiKey: (state) => {
            return state.apiKey;
        },
        updateApiKey: (state, action) => {
            state.apiKey = action.payload.apiKey;
        }
    },
})

export const { updateUser, getApiKey, updateApiKey } = profileSlice.actions

export default profileSlice.reducer