import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    results: null
}

export const resultsMetadata = createSlice({
    name: 'resultsMetadata',
    initialState,
    reducers: {
        updateResultsMetadata: (state, action) => {
            state.results = action.payload;
        }
    },
})

export const { updateResultsMetadata } = resultsMetadata.actions

export default resultsMetadata.reducer