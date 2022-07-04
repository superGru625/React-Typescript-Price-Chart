import { createReducer } from '@reduxjs/toolkit';
import { chartAction, newsAction } from './actions';

const initialState: any = {
    data: [],
    news: []
};

export default createReducer<any>(initialState, (builder) =>
    builder
        .addCase(chartAction, (state, { payload }) => {
            return {
                ...state,
                data: payload
            };
        })
        .addCase(newsAction, (state, { payload }) => {
            return {
                ...state,
                news: payload
            };
        })
);
