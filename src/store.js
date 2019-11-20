import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import {routerMiddleware , connectRouter} from 'connected-react-router';
import history from './router/history'
import reducers from './reducers/index'

// import {authState} from './testing_assets/auth_state'
const reduxRouterMiddleware = routerMiddleware(history)
const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(ReduxPromise, ReduxThunk, reduxRouterMiddleware),
));

export default store;
