import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./root.reducer.js";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root.saga.js";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, logger)
});
sagaMiddleware.run(rootSaga);
export default store;