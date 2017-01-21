import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from './reducers';

const defaultState = {
	todos: []
};

const enhancers = compose(
	window.devToolsExtension && window.devToolsExtension()
);

const createStoreWithMiddleware = applyMiddleware()(createStore);

const store = createStoreWithMiddleware(rootReducer, defaultState, enhancers);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
