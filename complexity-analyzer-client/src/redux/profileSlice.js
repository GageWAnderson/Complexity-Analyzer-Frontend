import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uuid: 1
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getUuid: (state) => { return state.uuid }
    },
})

export const { getUuid } = profileSlice.actions

export default profileSlice.reducer