import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./js/reducer";

const initState = {};
const middleware = [thunk];
const devTools =  process.env.NODE_ENV === "production" ?null :  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() 
const store = createStore(
  rootReducer,
  initState,
  compose(applyMiddleware(...middleware)  , devTools)
);

export default store;
