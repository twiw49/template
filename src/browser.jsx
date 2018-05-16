import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./client/reducers";
import App from "./client/components/App";
import registerServiceWorker from "./sw/registerServiceWorker";

const env = process.env.NODE_ENV;

const middlewares = [];

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const preloadedState = window.PRELOADED_STATE;
delete window.PRELOADED_STATE;

const store =
  env === "development"
    ? createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)))
    : createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
