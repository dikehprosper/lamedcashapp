import {configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {userReducer} from "./features/userSlice";
import themeReducer from "./features/themeSlice";
import langReducer from "./features/langSlice";
import {combineReducers} from "redux";

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  lang: langReducer,
});

// Configure persist for the entire rootReducer
const persistConfig = {
  key: "root", // Key to store everything
  storage, // Define storage mechanism (local storage in this case)
};

// Apply persistence to the entire rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted rootReducer
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer here
  // Middleware for redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Allow these actions for redux-persist
      },
    }),
});

// Persistor for the store
export const persistor = persistStore(store);

// Infer the type of the store's state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
