import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import inputArgumentsReducer from './inputArgumentsSlice';

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        inputArguments: inputArgumentsReducer,
    },
})