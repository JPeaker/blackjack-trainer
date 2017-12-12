import Immutable from 'immutable';
import defaultState from '../default-state';
import reducer from '../reducer';
import {
  initializeShoe,
  startNewHand,
  drawPlayerCard,
  drawDealerCard,
  stand,
  standDealer
} from '../actions';

const initializedShoe = reducer(defaultState, initializeShoe());
const storeWithNoCards = Object.assign({}, initializedShoe, { shoe: Immutable.List() });

const startNewHandWithEnoughCards = reducer(initializedShoe, startNewHand());
const storeWithStoodPlayer = Object.assign({}, startNewHandWithEnoughCards, { playerStood: true });
const storeWithStoodDealer = Object.assign({}, startNewHandWithEnoughCards, { dealerStood: true });

const startNewHandWithNoCards = reducer(storeWithNoCards, startNewHand());
const startNewHandWithStoodDealer = reducer(storeWithStoodDealer, startNewHand());

const drawPlayerCardWithEnoughCards = reducer(initializedShoe, drawPlayerCard());
const drawPlayerCardWithNoCards = reducer(storeWithNoCards, drawPlayerCard());
const drawPlayerCardWithStoodPlayer = reducer(storeWithStoodPlayer, drawPlayerCard());

const drawDealerCardWithNoCards = reducer(storeWithNoCards, drawDealerCard());
const drawDealerCardWithEnoughCards = reducer(initializedShoe, drawDealerCard());

describe('INITIALIZE_SHOE', () => {
  it('should overwrite any existing shoe', () => {
    expect(Immutable.is(defaultState.shoe, initializedShoe.shoe)).toEqual(false);
  });

  it('should create a correctly sized shoe', () => {
    expect(initializedShoe.shoe.size).toEqual(initializedShoe.numberOfDecks * 52);
  });
});

describe('START_NEW_HAND', () => {
  it('should do nothing if there are fewer than 4 cards in the shoe', () => {
    expect(startNewHandWithNoCards.shoe).toEqual(storeWithNoCards.shoe);
    expect(startNewHandWithNoCards.playerCards).toEqual(storeWithNoCards.playerCards);
    expect(startNewHandWithNoCards.dealerCards).toEqual(storeWithNoCards.dealerCards);
  });

  it('should deal 2 cards to the player and the dealer', () => {
    expect(startNewHandWithEnoughCards.shoe.size).toEqual(initializedShoe.shoe.size - 4);
    expect(startNewHandWithEnoughCards.playerCards.size).toEqual(2);
    expect(startNewHandWithEnoughCards.dealerCards.size).toEqual(2);
  });

  it('should stop the dealer being stood', () => {
    expect(startNewHandWithStoodDealer.dealerStood).toEqual(false);
  });
});

describe('DRAW_PLAYER_CARD', () => {
  it('should do nothing if the player is stood', () => {
    expect(drawPlayerCardWithStoodPlayer.playerStood).toEqual(true);
    expect(drawPlayerCardWithStoodPlayer.shoe.size).toEqual(storeWithStoodPlayer.shoe.size);
    expect(drawPlayerCardWithStoodPlayer.playerCards.size).toEqual(storeWithStoodPlayer.playerCards.size);
  });

  it('should do nothing if no cards are left', () => {
    expect(drawPlayerCardWithNoCards.playerCards.size).toEqual(storeWithNoCards.playerCards.size);
  });

  it('should give the player a card from the shoe', () => {
    expect(drawPlayerCardWithEnoughCards.shoe.size).toEqual(initializedShoe.shoe.size - 1);
    expect(drawPlayerCardWithEnoughCards.playerCards.size).toEqual(initializedShoe.playerCards.size + 1);
  });
});

describe('DRAW_DEALER_CARD', () => {
  it('should do nothing if no cards are left', () => {
    expect(drawDealerCardWithNoCards.dealerCards.size).toEqual(storeWithNoCards.dealerCards.size);
  });

  it('should give the dealer a card from the shoe', () => {
    expect(drawDealerCardWithEnoughCards.shoe.size).toEqual(initializedShoe.shoe.size - 1);
    expect(drawDealerCardWithEnoughCards.dealerCards.size).toEqual(initializedShoe.dealerCards.size + 1);
  });
});

describe('STAND', () => {
  it('should stand the player', () => {
    expect(reducer(startNewHandWithEnoughCards, stand()).playerStood).toEqual(true);
  });

  it('should do nothing when the player is already stood', () => {
    expect(
      reducer(storeWithStoodPlayer, stand()).playerStood
    ).toEqual(storeWithStoodPlayer.playerStood);
  });
});

describe('STAND_DEALER', () => {
  it('should stand the dealer', () => {
    expect(reducer(startNewHandWithEnoughCards, standDealer()).dealerStood).toEqual(true);
  });

  it('should do nothing when the dealer is already stood', () => {
    expect(reducer(storeWithStoodDealer, standDealer()).dealerStood).toEqual(storeWithStoodDealer.dealerStood);
  });
});
