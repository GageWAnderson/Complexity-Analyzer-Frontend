import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    graph: null
}

export const resultsGraphSlice = createSlice({
    name: 'resultsGraph',
    initialState,
    reducers: {
        updateResultsGraph: (state, action) => {
            state.graph = action.payload;
        }
    },
})

export const { updateResultsGraph } = resultsGraphSlice.actions

export default resultsGraphSlice.reducer