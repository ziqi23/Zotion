import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import sessionReducer from './session';
const logger = require('redux-logger').default

const preloadedState = {};

const rootReducer = combineReducers({session: sessionReducer});

const configureStore = () => {
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
};

export default configureStore;