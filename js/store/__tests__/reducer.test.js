import Immutable from 'immutable';
import reducer from '../reducer';
import defaultState from '../default-state';
import {
  drawDealerCard,
  drawPlayerCard,
  initializeShoe,
  stand,
  startNewHand
} from '../actions';

const initializedShoe = reducer(defaultState, initializeShoe());
const stoodState = Object.assign({}, defaultState, { stood: true, dealerDrawing: true });

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

const describeDrawCardTestsFor = (playerOrDealer) => {
  describe(`DRAW_${playerOrDealer}_CARD`, () => {
    const drawAction = playerOrDealer === 'PLAYER' ? drawPlayerCard() : drawDealerCard();
    const storeKey = playerOrDealer === 'PLAYER' ? 'playerHand' : 'dealerHand';
    const drawSingleCard = reducer(initializedShoe, drawAction);

    it('should draw the top card of the shoe', () => {
      expect(drawSingleCard[storeKey].size).toEqual(1);
      expect(drawSingleCard[storeKey].get(0)).toEqual(initializedShoe.shoe.get(0));
      expect(drawSingleCard.shoe.size).toEqual(defaultState.rules.numberOfDecks * 52 - 1);
      expect(drawSingleCard.shoeComplete).toEqual(false);
    });

    it('should draw the next card after', () => {
      const drawSecondCard = reducer(drawSingleCard, drawAction);
      expect(drawSecondCard[storeKey].size).toEqual(2);
      expect(drawSecondCard[storeKey].get(0)).toEqual(initializedShoe.shoe.get(0));
      expect(drawSecondCard[storeKey].get(1)).toEqual(initializedShoe.shoe.get(1));
      expect(drawSecondCard.shoe.size).toEqual(defaultState.rules.numberOfDecks * 52 - 2);
      expect(drawSecondCard.shoeComplete).toEqual(false);
    });

    it('should set shoe to complete if no cards are left', () => {
      const drawCardFromEmptyShoe = reducer(defaultState, drawAction);
      expect(drawCardFromEmptyShoe.shoeComplete).toEqual(true);
    });

    it('shouldn\'t draw a card when the player is stood', () => {
      expect(reducer(stoodState, drawAction)[storeKey].size).toEqual(0);
    });
  });
};

describeDrawCardTestsFor('PLAYER');
describeDrawCardTestsFor('DEALER');

describe('STAND', () => {
  it('should stand', () => {
    expect(reducer(defaultState, stand())).toEqual(stoodState);
  });

  it('should remain stood', () => {
    expect(reducer(stoodState, stand())).toEqual(stoodState);
  });
});

describe('START_NEW_HAND', () => {
  it('should deal two cards to each player', () => {
    const twoCardHand = reducer(reducer(initializedShoe, drawPlayerCard()), drawPlayerCard());
    expect(reducer(twoCardHand, startNewHand()).dealerHand)
      .toEqual(Immutable.List([twoCardHand.shoe.get(0), twoCardHand.shoe.get(1)]));
    expect(reducer(twoCardHand, startNewHand()).playerHand)
      .toEqual(Immutable.List([twoCardHand.shoe.get(2), twoCardHand.shoe.get(3)]));
  });

  it('should make stood false', () => {
    const stoodState = reducer(initializedShoe, stand());
    expect(reducer(stoodState, startNewHand()).stood).toEqual(false);
  });
});