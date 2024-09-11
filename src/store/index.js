import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import notifSlice from './notifSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistAuthConfig = {
    key: 'auth',
    storage,
};

const persistedAuth = persistReducer(persistAuthConfig, authSlice);

export const store = configureStore({
    reducer: {
        auth: persistedAuth,
        notifications: notifSlice,
    },
    devTools: true,
});

export const persistor = persistStore(store);
