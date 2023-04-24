import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import sessionReducer from './session';
import pageReducer from './page';
const logger = require('redux-logger').default

const preloadedState = {};

const rootReducer = combineReducers({
    session: sessionReducer,
    page: pageReducer
});

const configureStore = () => {
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
};

export default configureStore;