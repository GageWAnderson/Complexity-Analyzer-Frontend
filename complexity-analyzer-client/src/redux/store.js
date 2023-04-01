import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import inputArgumentsReducer from './inputArgumentsSlice';
import resultsMetadataReducer from './resultsMetadataSlice';
import resultsGraphReducer from './resultsGraphSlice';

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        inputArguments: inputArgumentsReducer,
        resultsMetadata: resultsMetadataReducer,
        resultsGraph: resultsGraphReducer,
    },
})