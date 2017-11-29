import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import defaultState from './store/default-state';

const store = createStore(
  reducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><Game /></Provider>,  document.getElementById('app'));
