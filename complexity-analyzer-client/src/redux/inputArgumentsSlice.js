import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inputArguments: [],
    description: '',
    numVariableArgs: 0,
    inputCode: ''
}

export const inputArgumentsSlice = createSlice({
    name: 'inputArguments',
    initialState,
    reducers: {
        updateDescription: (state, action) => {
            state.description = action.payload;
        },
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
            const isVariable = state.inputArguments.find(inputArgument => inputArgument.name === action.payload).isVariable;
            if (isVariable) {
                state.numVariableArgs--;
            }
            state.inputArguments = state.inputArguments.filter(inputArgument => inputArgument.name !== action.payload);
        },
        updateInputCode: (state, action) => {
            state.inputCode = action.payload;
        }
    },
})

export const { updateDescription, getInputArguments, addInputArgument, removeInputArgument, updateInputCode } = inputArgumentsSlice.actions

export default inputArgumentsSlice.reducer