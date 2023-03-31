import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    uuid: '',
    // TODO: Store key needed to access AWS API Gateway through Cognito User Pool
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.uuid = action.payload.uuid;
        }
    },
})

export const { updateUser } = profileSlice.actions

export default profileSlice.reducer