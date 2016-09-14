import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import * as reducers from './reducers';

// const logger = createLogger();

const combinedReducer = combineReducers(reducers);

const middleware = [
  thunkMiddleware, 
  // logger, 
];


export function create() {
  return compose(
    applyMiddleware(...middleware)
  )(createStore)(combinedReducer)
};

