import Immutable from 'immutable';
import defaultState from '../default-state';
import reducer from '../reducer';
import {
  initializeShoe,
  startNewHand,
  drawPlayerCard,
  drawDealerCard,
  stand,
  standDealer,
  rewardPlayer,
  doubleHand,
  split
} from '../actions';
import StoreUtils from '../utils';
import CardUtils from '../../utils/card';
import HandUtils from '../../utils/hand';
import GameUtils from '../../utils/game';

const initializedShoe = reducer(defaultState, initializeShoe());
const initializedShoeDetermined = StoreUtils.generateTestStore(
  undefined,
  undefined,
  undefined,
  HandUtils.generateHand([
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
  ]).cards
);

const storeWithNoCards = StoreUtils.generateTestStore();

const startNewHandWithEnoughCards = reducer(initializedShoe, startNewHand());
const twoHandsSplittable = Object.assign({}, startNewHandWithEnoughCards, {
  playerHands: startNewHandWithEnoughCards.playerHands.push(HandUtils.generateHand(['2', '2']))
});
const threeHandsSplittable = Object.assign({}, twoHandsSplittable, {
  playerHands: twoHandsSplittable.playerHands.push(HandUtils.generateHand(['3', '3']))
});

const storeWithStoodPlayer = Object.assign({}, startNewHandWithEnoughCards, {
  playerHands: StoreUtils.standPlayerHand(startNewHandWithEnoughCards)
});
const storeWithStoodDealer = Object.assign({}, startNewHandWithEnoughCards, {
  dealerHand: StoreUtils.standDealerHand(startNewHandWithEnoughCards)
});

const startNewHandWithNoCards = reducer(storeWithNoCards, startNewHand());
const startNewHandWithStoodPlayer = reducer(storeWithStoodPlayer, startNewHand());
const startNewHandWithStoodDealer = reducer(storeWithStoodDealer, startNewHand());

const drawPlayerCardWithEnoughCards = reducer(initializedShoe, drawPlayerCard());
const drawPlayerCardWithNoCards = reducer(storeWithNoCards, drawPlayerCard());
const drawPlayerCardWithStoodPlayer = reducer(storeWithStoodPlayer, drawPlayerCard());

const drawDealerCardWithNoCards = reducer(storeWithNoCards, drawDealerCard());
const drawDealerCardWithEnoughCards = reducer(initializedShoe, drawDealerCard());

const standWithEnoughCards = reducer(startNewHandWithEnoughCards, stand());
const standWithStoodPlayer = reducer(storeWithStoodPlayer, stand());

describe('Unknown action', () => {
  it('returns the same state on weird state', () => {
    expect(reducer({ test: 'TEST' }, { type: undefined })).toEqual({ test: 'TEST' });
  });
});

describe('Missing state', () => {
  it('returns default state if no state given', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(defaultState);
  });
});

describe('INITIALIZE_SHOE', () => {
  it('overwrite any existing shoe', () => {
    expect(Immutable.is(defaultState.shoe, initializedShoe.shoe)).toEqual(false);
  });

  it('create a correctly sized shoe', () => {
    expect(initializedShoe.shoe.size).toEqual(initializedShoe.numberOfDecks * 52);
  });
});

describe('START_NEW_HAND', () => {
  it('do nothing if there are fewer than 4 cards in the shoe', () => {
    expect(startNewHandWithNoCards.shoe).toEqual(storeWithNoCards.shoe);
    expect(StoreUtils.getPlayerHand(startNewHandWithNoCards).cards)
      .toEqual(StoreUtils.getPlayerHand(storeWithNoCards).cards);
    expect(startNewHandWithNoCards.dealerHand).toEqual(storeWithNoCards.dealerHand);
  });

  it('deal 2 cards to the player and the dealer', () => {
    expect(startNewHandWithEnoughCards.shoe.size).toEqual(initializedShoe.shoe.size - 4);
    expect(StoreUtils.getPlayerHand(startNewHandWithEnoughCards).cards.size).toEqual(2);
    expect(startNewHandWithEnoughCards.dealerHand.cards.size).toEqual(2);
  });

  it('stop the player being stood', () => {
    expect(startNewHandWithStoodPlayer.playerHands.reduce(
      (anyStoodSoFar, hand) => anyStoodSoFar || hand.stood,
      false
    )).toEqual(false);
  });

  it('stop the dealer being stood', () => {
    expect(startNewHandWithStoodDealer.dealerHand.stood).toEqual(false);
  });
});

describe('DRAW_PLAYER_CARD', () => {
  it('do nothing if the player is stood', () => {
    expect(drawPlayerCardWithStoodPlayer.shoe.size).toEqual(storeWithStoodPlayer.shoe.size);
    const handBeforeAction = StoreUtils.getPlayerHand(
      storeWithStoodPlayer,
      storeWithStoodPlayer.currentPlayerHand - 1
    );
    const handAfterAction = StoreUtils.getPlayerHand(
      drawPlayerCardWithStoodPlayer,
      drawPlayerCardWithStoodPlayer.currentPlayerHand - 1
    );
    expect(handBeforeAction.stood).toEqual(true);
    expect(handAfterAction.stood).toEqual(true);
    expect(handBeforeAction.cards.size).toEqual(handAfterAction.cards.size);
  });

  it('do nothing if no cards are left', () => {
    expect(StoreUtils.getPlayerHand(drawPlayerCardWithNoCards).cards.size)
      .toEqual(StoreUtils.getPlayerHand(storeWithNoCards).cards.size);
  });

  it('give the player a card from the shoe', () => {
    expect(drawPlayerCardWithEnoughCards.shoe.size).toEqual(initializedShoe.shoe.size - 1);
    expect(StoreUtils.getPlayerHand(drawPlayerCardWithEnoughCards).cards.size)
      .toEqual(StoreUtils.getPlayerHand(initializedShoe).cards.size + 1);
  });
});

describe('DRAW_DEALER_CARD', () => {
  it('do nothing if no cards are left', () => {
    expect(drawDealerCardWithNoCards.dealerHand.cards.size).toEqual(storeWithNoCards.dealerHand.cards.size);
  });

  it('give the dealer a card from the shoe', () => {
    expect(drawDealerCardWithEnoughCards.shoe.size).toEqual(initializedShoe.shoe.size - 1);
    expect(drawDealerCardWithEnoughCards.dealerHand.cards.size).toEqual(initializedShoe.dealerHand.cards.size + 1);
  });
});

describe('STAND', () => {
  it('stands the player', () => {
    expect(standWithEnoughCards.playerHands.get(standWithEnoughCards.currentPlayerHand).stood).toEqual(true);
  });

  it('increases current player hand if there is another hand waiting', () => {
    expect(twoHandsSplittable.currentPlayerHand).toEqual(0);
    expect(reducer(twoHandsSplittable, stand()).currentPlayerHand).toEqual(1);
  });

  it('does nothing when the player is already stood', () => {
    expect(standWithStoodPlayer.playerHands.get(standWithStoodPlayer.currentPlayerHand).stood)
      .toEqual(storeWithStoodPlayer.playerHands.get(storeWithStoodPlayer.currentPlayerHand).stood);
  });
});

describe('STAND_DEALER', () => {
  it('stand the dealer', () => {
    expect(reducer(startNewHandWithEnoughCards, standDealer()).dealerHand.stood).toEqual(true);
  });

  it('do nothing when the dealer is already stood', () => {
    expect(reducer(storeWithStoodDealer, standDealer()).dealerHand.stood)
      .toEqual(storeWithStoodDealer.dealerHand.stood);
  });
});

describe('REWARD_PLAYER', () => {
  it('give a betsize when player pushes', () => {
    expect(reducer(initializedShoe, rewardPlayer(GameUtils.HAND_RESULTS.PUSH)).bank)
      .toEqual(initializedShoe.bank + initializedShoe.betSize);
  });

  it('give two betsizes when player wins', () => {
    expect(reducer(initializedShoe, rewardPlayer(GameUtils.HAND_RESULTS.WIN)).bank)
      .toEqual(initializedShoe.bank + initializedShoe.betSize * 2);
  });

  it('do nothing when player loses', () => {
    expect(reducer(initializedShoe, rewardPlayer(GameUtils.HAND_RESULTS.LOSE)).bank)
      .toEqual(initializedShoe.bank);
  });

  it('give a blackjack payout when player gets blackjack', () => {
    expect(reducer(initializedShoe, rewardPlayer(GameUtils.HAND_RESULTS.BLACKJACK)).bank)
      .toEqual(initializedShoe.bank + (initializedShoe.betSize * 5 / 2));
  });
});

describe('DOUBLE', () => {
  const playerHandBefore = StoreUtils.getPlayerHand(startNewHandWithEnoughCards);
  const stateAfterDouble = reducer(startNewHandWithEnoughCards, doubleHand());
  const playerHandAfter = StoreUtils.getPlayerHand(stateAfterDouble, stateAfterDouble.currentPlayerHand - 1);
  it('double the bet size of the hand', () => {
    expect(playerHandAfter.bet).toEqual(playerHandBefore.bet * 2);
  });

  it('take away an extra bet from the bank', () => {
    expect(stateAfterDouble.bank).toEqual(startNewHandWithEnoughCards.bank - playerHandBefore.bet);
  });

  it('take an extra card', () => {
    expect(playerHandAfter.cards.size).toEqual(playerHandBefore.cards.size + 1);
  });

  it('stands player hand', () => {
    expect(playerHandBefore.stood).toEqual(false);
    expect(playerHandAfter.stood).toEqual(true);
  })

  it('does nothing if the hand has more than two cards', () => {
    const multiCardHand = reducer(startNewHandWithEnoughCards, drawPlayerCard());
    const multiCardHandAfter = reducer(multiCardHand, doubleHand());
    expect(multiCardHand).toEqual(multiCardHandAfter);
  });

  it('does nothing if all player hands are stood', () => {
    expect(reducer(storeWithStoodPlayer, doubleHand())).toEqual(storeWithStoodPlayer);
  });
});

describe('SPLIT', () => {
  const sameCardShoeState = Object.assign({}, storeWithNoCards, {
    shoe: Immutable.List(['8', '8', '8', '8', '8', '8', '8', '8'].map(card => CardUtils.generateCard(card)))
  });
  const differentCardShoeState = Object.assign({}, storeWithNoCards, {
    shoe: Immutable.List(['2', '3'].map(card => CardUtils.generateCard(card)))
  });

  const handWithTwoOfSame = reducer(reducer(sameCardShoeState, drawPlayerCard()), drawPlayerCard());

  it('does nothing if the hand has too many cards', () => {
    const handWithThreeOfSame = reducer(handWithTwoOfSame, drawPlayerCard());
    expect(reducer(handWithThreeOfSame, split())).toEqual(handWithThreeOfSame);
    expect(handWithThreeOfSame.playerHands.size).toEqual(handWithTwoOfSame.playerHands.size);
  });

  it('does nothing if the hand does not have the same ranks', () => {
    const handWithDifferentRanks = reducer(reducer(differentCardShoeState, drawPlayerCard()), drawPlayerCard());
    expect(reducer(handWithDifferentRanks, split())).toEqual(handWithDifferentRanks);
    expect(reducer(handWithDifferentRanks, split()).playerHands.size).toEqual(handWithDifferentRanks.playerHands.size);
  });

  const splitHand = reducer(handWithTwoOfSame, split());
  it('splits the first hand if there are just two of the same rank', () => {
    expect(splitHand.playerHands.size).toEqual(handWithTwoOfSame.playerHands.size + 1);
  });

  it('draws a second card for the current hand on split, but not for the next hand', () => {
    expect(splitHand.playerHands.get(splitHand.currentPlayerHand).cards.size).toEqual(2);
    expect(splitHand.playerHands.get(splitHand.currentPlayerHand + 1).cards.size).toEqual(2);
  });

  it('splits a middle hand if it should', () => {
    const splitMiddleHand = reducer(reducer(threeHandsSplittable, stand()), split());
    expect(splitMiddleHand.currentPlayerHand).toEqual(1);
    expect(splitMiddleHand.playerHands.size).toEqual(4);
    // Make sure it's the 2 hand, not the 3 hand
    expect(splitMiddleHand.playerHands.get(splitMiddleHand.currentPlayerHand).cards.get(0).rank).toEqual('2');
    expect(splitMiddleHand.playerHands.get(splitMiddleHand.currentPlayerHand + 1).cards.get(0).rank).toEqual('2');
    expect(splitMiddleHand.playerHands.get(splitMiddleHand.currentPlayerHand + 2).cards.get(0).rank).toEqual('3');
  });
});
