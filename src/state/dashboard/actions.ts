import { createAction } from '@reduxjs/toolkit';

export const chartAction = createAction<{ data: any }>('dashboard/chart');
export const newsAction = createAction<{ data: any }>('dashboard/news');
