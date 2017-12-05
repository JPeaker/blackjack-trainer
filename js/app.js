import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game.jsx';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import player from './store/reducers/player';
import dealer from './store/reducers/dealer';
import shoe from './store/reducers/shoe';
import defaultState from './store/default-state';

const store = createStore(
  combineReducers({ player, dealer, shoe }),
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><Game /></Provider>,  document.getElementById('app'));
