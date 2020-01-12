import { combineReducers, createStore } from 'redux';
import reducers from './reducers/reducers';
import rootSaga from './sagas/rootSaga';
import middleware, { sagaMiddleware } from './middleware';

const store = createStore(
    combineReducers(reducers),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    middleware
);

sagaMiddleware.run(rootSaga);

export default store;
