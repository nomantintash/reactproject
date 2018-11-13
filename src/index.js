import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import App from './components/app';
import './assets/app.css';
import './assets/util.css';
import './assets/main.css';

import { createStore,applyMiddleware } from 'redux';
import reducers from './reducers';
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
ReactDOM.render(
  <Provider store = { createStoreWithMiddleware (reducers, {}, applyMiddleware (ReduxThunk)) }>
   <App/>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
