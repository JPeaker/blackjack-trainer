import Immutable from 'immutable';
import reducer from '../reducer';
import defaultState from '../default-state';
import {
  drawPlayerCard,
  initializeShoe
} from '../actions';

const initializedShoe = reducer(defaultState, initializeShoe());

describe('INITIALIZE_SHOE', () => {
  it('should overwrite any existing shoe', () => {
    expect(
      Immutable.is(
        defaultState.shoe,
        initializedShoe.shoe
      )
    ).toEqual(false);
  });
});

describe('DRAW_PLAYER_CARD', () => {
  const drawSingleCard = reducer(initializedShoe, drawPlayerCard());

  it('should draw the top card of the shoe', () => {
    expect(drawSingleCard.playerHand.size).toEqual(1);
    expect(drawSingleCard.playerHand.get(0)).toEqual(initializedShoe.shoe.get(0));
    expect(drawSingleCard.shoe.size).toEqual(defaultState.rules.numberOfDecks * 52 - 1);
    expect(drawSingleCard.shoeComplete).toEqual(false);
  });

  it('should draw the next card after', () => {
    const drawSecondCard = reducer(drawSingleCard, drawPlayerCard());
    expect(drawSecondCard.playerHand.size).toEqual(2);
    expect(drawSecondCard.playerHand.get(1)).toEqual(initializedShoe.shoe.get(0));
    expect(drawSecondCard.playerHand.get(0)).toEqual(initializedShoe.shoe.get(1));
    expect(drawSecondCard.shoe.size).toEqual(defaultState.rules.numberOfDecks * 52 - 2);
    expect(drawSecondCard.shoeComplete).toEqual(false);
  });

  it('should set shoe to complete if no cards are left', () => {
    const drawCardFromEmptyShoe = reducer(defaultState, drawPlayerCard());
    expect(drawCardFromEmptyShoe.shoeComplete).toEqual(true);
  });
});
