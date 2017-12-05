import Immutable from 'immutable';
import dealer from '../dealer';
import player from '../player';
import shoe from '../shoe';
import { combineReducers } from 'redux';
import defaultState from '../../default-state';
import {
  drawDealerCard,
  initializeShoe,
} from '../../actions';

const reducer = combineReducers({ dealer, player, shoe, game: () => defaultState.game, rules: () => defaultState.rules });
const initializedShoe = reducer(defaultState, initializeShoe());

describe(`DRAW_DEALER_CARD`, () => {
  const drawSingleCard = reducer(initializedShoe, drawDealerCard());

  it('should draw the top card of the shoe', () => {
    expect(drawSingleCard.dealer.cards.size).toEqual(1);
    expect(drawSingleCard.dealer.cards.get(0)).toEqual(initializedShoe.shoe.cards.get(0));
    expect(drawSingleCard.shoe.cards.size).toEqual(defaultState.rules.numberOfDecks * 52 - 1);
    expect(drawSingleCard.shoe.cards.size === 0).toEqual(false);
  });

  it('should draw the next card after', () => {
    const drawSecondCard = reducer(drawSingleCard, drawDealerCard());
    expect(drawSecondCard.dealer.cards.size).toEqual(2);
    expect(drawSecondCard.dealer.cards.get(0)).toEqual(initializedShoe.shoe.cards.get(0));
    expect(drawSecondCard.dealer.cards.get(1)).toEqual(initializedShoe.shoe.cards.get(1));
    expect(drawSecondCard.shoe.cards.size).toEqual(defaultState.rules.numberOfDecks * 52 - 2);
    expect(drawSecondCard.shoe.cards.size === 0).toEqual(false);
  });
});
