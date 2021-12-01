import { createStore, combineReducers, applyMiddleware  } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import eventReducer from "./eventReducer";
import firebaseReducer from "./firebaseReducer";

const reducer = combineReducers({
  eventReducer: eventReducer,
  firebaseReducer: firebaseReducer,
})


const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
))
export default store;

store.subscribe(() => {
  const storeNow = store.getState()
  console.log('storenow', storeNow)
})