import { createSlice, current } from '@reduxjs/toolkit';
import { initialStates } from '../initialStates';
import { sliceName, GET_RECOMMENDATIONS } from '../actions/recommendations';

const initialState = initialStates.recommendations;

export const getRecommendationsReducer = (builder) => {
    builder
        .addCase(GET_RECOMMENDATIONS.pending, (state) => {
            state.callStatus = 'loading';
        })
        .addCase(GET_RECOMMENDATIONS.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.data = data;
            state.callStatus = 'idle';
        })
        .addCase(GET_RECOMMENDATIONS.rejected, (state) => {
            state.callStatus = 'failed';
        })
};

const recommendationsSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        getRecommendationsReducer(builder);
    },
});

export const recommendationsStates = (state) => state.recommendations;

export default recommendationsSlice.reducer;
