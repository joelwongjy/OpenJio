/* eslint-disable @typescript-eslint/no-var-requires */
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "reducers/rootReducer";

const persistConfig = {
  key: "openjio-frontend",
  storage,
};

// To support the persisting of redux across sessions
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Creation of custom middleware, needed for redux persist
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

// Creation of redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
});

export const persistor = persistStore(store);

// Settings to aid development
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("reducers/rootReducer", () => {
    // eslint-disable-next-line global-require
    const newRootReducer = require("reducers/rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
