import Immutable from 'immutable';
import dealer from '../dealer';
import player from '../player';
import shoe from '../shoe';
import { combineReducers } from 'redux';
import defaultState from '../../default-state';
import {
  initializeShoe
} from '../../actions';

const reducer = combineReducers({ dealer, player, shoe, game: () => defaultState.game, rules: () => defaultState.rules });
const initializedShoe = reducer(defaultState, initializeShoe());

describe('INITIALIZE_SHOE', () => {
  it('should overwrite any existing shoe', () => {
    expect(Immutable.is(defaultState.shoe.cards, initializedShoe.shoe.cards)).toEqual(false);
  });

  it('should create a correctly sized shoe', () => {
    expect(initializedShoe.shoe.cards.size).toEqual(initializedShoe.rules.numberOfDecks * 52);
  });
});
