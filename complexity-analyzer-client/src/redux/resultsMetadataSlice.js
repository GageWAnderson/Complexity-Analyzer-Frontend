import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    results: []
}

export const resultsMetadata = createSlice({
    name: 'resultsMetadata',
    initialState,
    reducers: {
        updateResultsMetadata: (state, action) => {
            const newResultsMetadata = [];
            for (const result of action.payload) {
                newResultsMetadata.push(result);
            }
            state.results = newResultsMetadata;
        }
    },
})

export const { updateResultsMetadata } = resultsMetadata.actions

export default resultsMetadata.reducer