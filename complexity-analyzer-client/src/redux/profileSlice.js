import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    signOut: null,
    // TODO: Store key needed to access AWS API Gateway through Cognito User Pool
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload;
        }
    },
})

export const { updateUser } = profileSlice.actions

export default profileSlice.reducer