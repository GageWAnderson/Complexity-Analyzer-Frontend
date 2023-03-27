import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inputArguments: []
}

export const inputArgumentsSlice = createSlice({
    name: 'inputArguments',
    initialState,
    reducers: {
        getInputArguments: (state) => { return state.inputArguments },
        addInputArgument: (state, action) => {
            state.inputArguments.push(action.payload);
        },
        removeInputArgument: (state, action) => {
            state.inputArguments.pop(action.payload);
        },
        setInputArguments: (state, action) => {
            state.inputArguments = [];
            action.payload.forEach(inputArgument => {
                state.inputArguments.push(inputArgument);
            });
        }
    },
})

export const { getProfile, addInputArgument, removeInputArgument, setInputArguments } = inputArgumentsSlice.actions

export default inputArgumentsSlice.reducer