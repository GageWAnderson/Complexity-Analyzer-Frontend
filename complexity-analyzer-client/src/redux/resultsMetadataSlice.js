import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    results: null
}

export const resultsMetadata = createSlice({
    name: 'resultsMetadata',
    initialState,
    reducers: {
        updateResultsMetadata: (state, action) => {
            const newResultsMetadata = [];
            for (const result of action.payload) {
                newResultsMetadata.push(JSON.parse(result.metadata));
            }
            state.results = newResultsMetadata;
        }
    },
})

export const { updateResultsMetadata } = resultsMetadata.actions

export default resultsMetadata.reducer