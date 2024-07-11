import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import recommendationsReducer from '../reducers/recommendationsReducer';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    reducer: {
        recommendations: recommendationsReducer,
    },
});
