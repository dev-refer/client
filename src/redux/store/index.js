import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from "history";
import { routerMiddleware, connectRouter } from "connected-react-router";

import dashboard from '../reducer/dashboard';
import category from '../reducer/categoryList';
import currentPage from '../reducer/currentPage';
import spot from '../reducer/spotList';
import user from '../reducer/auth';

export const history = createBrowserHistory();

const middlewares = [thunk, routerMiddleware(history)];
const enhancers = [applyMiddleware(...middlewares)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(
    combineReducers({
        dashboard,
        category,
        currentPage,
        spot,
        user,
        router: connectRouter(history)
    }),
    composeEnhancers(...enhancers)
)
