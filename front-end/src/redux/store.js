import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const logger = (Store) => (next) => (action) => {
    console.log("dispatching: ", action)
    let result = next(action)
    console.log("next state: ", Store.getState())
    return result
}

const Store = configureStore({
    reducer: {
        data: rootReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger)
})

export default Store;