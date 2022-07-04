import { combineReducers, configureStore } from '@reduxjs/toolkit';

import dashboard from './dashboard/dashboard';

const reducer = combineReducers({
    dashboard
});

// eslint-disable-next-line import/no-mutable-exports
let store: ReturnType<typeof makeStore>;

export function makeStore(preloadedState = undefined) {
    return configureStore({
        reducer: reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: true,
                serializableCheck: {
                    ignoredActions: []
                }
            }),
        devTools: process.env.NODE_ENV === 'development',
        preloadedState
    });
}

export const initializeStore = (preloadedState = undefined) => {
    let _store = store ?? makeStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = makeStore({
            ...store.getState(),
            ...preloadedState
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store;

    // Create the store once in the client
    if (!store) {
        store = _store;
    }

    return _store;
};

store = initializeStore();

// /**
//  * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
//  */
// export type AppDispatch = typeof store.dispatch;
// export type AppState = ReturnType<typeof store.getState>;
// export const useAppDispatch = () => useDispatch();

export default store;
