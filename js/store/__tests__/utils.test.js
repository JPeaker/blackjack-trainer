import { List } from 'immutable';
import StoreUtils from '../utils';

const hand1 = { cards: List([{ rank: '2', suit: 'spades' }]), stood: false };
const hand2 = { cards: List([{ rank: '3', suit: 'spades' }]), stood: false };
const hand3 = { cards: List([{ rank: '4', suit: 'spades' }]), stood: false };
const dealerHand = { cards: List([{ rank: '5', suit: 'spades' }]), stood: false };

const standHand = (hand) => Object.assign({}, hand, { stood: true });

const generateStore = (hands, currentPlayerHand = 0, dealerHand = List()) => ({
  playerHands: List(hands),
  currentPlayerHand,
  dealerHand
});

const storeIndexZero = generateStore([hand1, hand2, hand3], 0, dealerHand);
const storeIndexOne = generateStore([hand1, hand2, hand3], 1, dealerHand);
const storeIndexTwo = generateStore([hand1, hand2, hand3], 2, dealerHand);

describe('getPlayerHand()', () => {
  it('should get the correct hand', () => {
    expect(StoreUtils.getPlayerHand(storeIndexZero)).toEqual(hand1);
    expect(StoreUtils.getPlayerHand(storeIndexZero))
      .toEqual(storeIndexZero.playerHands.get(storeIndexZero.currentPlayerHand));

    expect(StoreUtils.getPlayerHand(storeIndexOne)).toEqual(hand2);
    expect(StoreUtils.getPlayerHand(storeIndexOne))
      .toEqual(storeIndexOne.playerHands.get(storeIndexOne.currentPlayerHand));

    expect(StoreUtils.getPlayerHand(storeIndexTwo)).toEqual(hand3);
    expect(StoreUtils.getPlayerHand(storeIndexTwo))
      .toEqual(storeIndexTwo.playerHands.get(storeIndexTwo.currentPlayerHand));
  });

  it('should get different hand if specified', () => {
    expect(StoreUtils.getPlayerHand(storeIndexOne, 0)).toEqual(hand1);
    expect(StoreUtils.getPlayerHand(storeIndexOne, 1)).toEqual(hand2);
    expect(StoreUtils.getPlayerHand(storeIndexOne, 2)).toEqual(hand3);
  });
});

describe('setPlayerHandInList()', () => {
  it('should set new player hand', () => {
    expect(StoreUtils.setPlayerHandInList(storeIndexZero, 'TEST'))
      .toEqual(List(['TEST', hand2, hand3]));
    expect(StoreUtils.setPlayerHandInList(storeIndexOne, 'TEST'))
      .toEqual(List([hand1, 'TEST', hand3]));
    expect(StoreUtils.setPlayerHandInList(storeIndexTwo, 'TEST'))
      .toEqual(List([hand1, hand2, 'TEST']));
  });
});

describe('addCardToPlayerHand()', () => {
  it('should add card to end of hand', () => {
    expect(
      StoreUtils
        .addCardToPlayerHand(storeIndexZero, 'TEST')
        .get(storeIndexZero.currentPlayerHand)
        .cards
    ).toEqual(hand1.cards.push('TEST'));
  });
});

describe('standPlayerHand()', () => {
  it('should stand current player hand', () => {
    expect(StoreUtils.standPlayerHand(storeIndexOne).get(storeIndexOne.currentPlayerHand).stood)
      .toEqual(true);
  });

  it('should not stand any other hands', () => {
    expect(StoreUtils.standPlayerHand(storeIndexTwo).get(0).stood).toEqual(false);
    expect(StoreUtils.standPlayerHand(storeIndexTwo).get(1).stood).toEqual(false);
  });
});

describe('standDealerHand()', () => {
  it('should stand dealer hand', () => {
    expect(storeIndexOne.dealerHand.stood).toEqual(false);
    expect(StoreUtils.standDealerHand(storeIndexOne).stood).toEqual(true);
  });
});

describe('allPlayerHandsStood()', () => {
  const testListAndExpect = (list, expectToBe) => {
    it('should give ${expectToBe} on ${list}', () => {
      expect(StoreUtils.allPlayerHandsStood(generateStore(list))).toEqual(expectToBe);
    });
  }

  testListAndExpect([], true);
  testListAndExpect([hand1], false);
  testListAndExpect([standHand(hand1)], true);
  testListAndExpect([hand1, hand2], false);
  testListAndExpect([standHand(hand1), hand2], false);
  testListAndExpect([hand1, standHand(hand2)], false);
  testListAndExpect([standHand(hand1), standHand(hand2)], true);
  testListAndExpect([hand1, hand2, hand3], false);
  testListAndExpect([hand1, hand2, standHand(hand3)], false);
  testListAndExpect([hand1, standHand(hand2), hand3], false);
  testListAndExpect([hand1, standHand(hand2), standHand(hand3)], false);
  testListAndExpect([standHand(hand1), hand2, hand3], false);
  testListAndExpect([standHand(hand1), hand2, standHand(hand3)], false);
  testListAndExpect([standHand(hand1), standHand(hand2), hand3], false);
  testListAndExpect([standHand(hand1), standHand(hand2), standHand(hand3)], true);
});