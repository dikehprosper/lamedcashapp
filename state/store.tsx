/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import getDataReducer from "./userData/getUserData";
import fixturesReducer from "./fixtures";

const rootReducer = combineReducers({
    getUserData: getDataReducer,
    fixturesSlice: fixturesReducer,
    // Add other reducers as needed
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: {
    //             ignoredActions: [
    //                 FLUSH,
    //                 REHYDRATE,
    //                 PAUSE,
    //                 PERSIST,
    //                 PURGE,
    //                 REGISTER,
    //             ],
    //         } ,
    //     }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
