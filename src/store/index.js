import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

// Reactotron + Saga
const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const SagaMiddleware = createSagaMiddleware({
  sagaMonitor,
});

const enhancer = __DEV__
  ? compose(
      console.tron.createEnhancer(),
      applyMiddleware(SagaMiddleware)
    )
  : applyMiddleware(SagaMiddleware);

const store = createStore(rootReducer, enhancer);

SagaMiddleware.run(rootSaga);

export default store;
