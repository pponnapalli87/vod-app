import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from './sagas';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(rootReducer, undefined, middleware);
  sagaMiddleware.run(rootSaga);

  return store;
};
