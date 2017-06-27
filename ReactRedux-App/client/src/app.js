import React from 'react';
import ReactDOM from 'react-dom';

// Redux config
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from './store/reducers';

// End redux
import App from './components/App';


const middleware = [thunk, createLogger()];
// createLogger can be turned off for production

const store = createStore(
  reducer,
  applyMiddleware(...middleware),

  // following is for Redux dev tools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'));
