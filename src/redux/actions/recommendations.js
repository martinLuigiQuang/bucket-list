import { createAsyncThunk } from '@reduxjs/toolkit';

export const sliceName = 'recommendations';

const getRecommendations = async ({ destination, startDate, endDate, numOfTravellers }) => {
    const apiUrl = `https://bucket-list-generator.netlify.app/api/bucket-list/${destination}/${startDate}/${endDate}/${numOfTravellers}`;
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            return { data };
        }
    } catch (e) {
        console.log(`Encountered error while calling ${apiUrl}`, e);
    }
};

// asynchronous actions
export const GET_RECOMMENDATIONS = createAsyncThunk(
    `${sliceName}/GET_RECOMMENDATIONS`,
    getRecommendations,
);
