import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inputArguments: [],
    numVariableArgs: 0
}

export const inputArgumentsSlice = createSlice({
    name: 'inputArguments',
    initialState,
    reducers: {
        getInputArguments: (state) => { return state.inputArguments },
        addInputArgument: (state, action) => {
            if (state.inputArguments.find(inputArgument => inputArgument.name === action.payload.name)) {
                throw new Error("Input argument with the same name already exists");
            }

            if (action.payload.isVariable) {
                if (state.numVariableArgs < 1) {
                    state.inputArguments.push(action.payload);
                    state.numVariableArgs++;
                } else {
                    throw new Error("Only one variable argument is allowed");
                }
            } else {
                state.inputArguments.push(action.payload);
            }

        },
        removeInputArgument: (state, action) => {
            if (action.payload.isVariable) {
                state.numVariableArgs--;
            }
            state.inputArguments = state.inputArguments.filter(inputArgument => inputArgument.name !== action.payload);
        }
    },
})

export const { getInputArguments, addInputArgument, removeInputArgument } = inputArgumentsSlice.actions

export default inputArgumentsSlice.reducer