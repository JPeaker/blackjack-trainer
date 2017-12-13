import { List } from 'immutable';
import StoreUtils from '../utils';
import HandUtils from '../../utils/hand';

const hand1 = HandUtils.generateHand(['2'])
const hand2 = HandUtils.generateHand(['3'])
const hand3 = HandUtils.generateHand(['4'])
const dealerHand = HandUtils.generateHand(['5'])

const standHand = (hand) => Object.assign({}, hand, { stood: true });

const generateStore = (hands, currentPlayerHand = 0, dealerHand = List()) => ({
  playerHands: List(hands),
  currentPlayerHand,
  dealerHand
});

const storeIndexZero = generateStore([hand1, hand2, hand3], 0, dealerHand);
const storeIndexOne = generateStore([hand1, hand2, hand3], 1, dealerHand);
const storeIndexTwo = generateStore([hand1, hand2, hand3], 2, dealerHand);
const allHandsStood = generateStore([hand1, hand2, hand3], 3, dealerHand);

describe('getPlayerHand()', () => {
  it('get the correct hand', () => {
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

  it('get different hand if specified', () => {
    expect(StoreUtils.getPlayerHand(storeIndexOne, 0)).toEqual(hand1);
    expect(StoreUtils.getPlayerHand(storeIndexOne, 1)).toEqual(hand2);
    expect(StoreUtils.getPlayerHand(storeIndexOne, 2)).toEqual(hand3);
  });
});

describe('getPreviousPlayerHand()', () => {
  it('throws an error if we haven\'t stood any hand yet', () => {
    expect(() => StoreUtils.getPreviousPlayerHand(storeIndexZero)).toThrowError(Error);
  })

  it('gets the correct hand if we have stood at least one hand', () => {
    expect(StoreUtils.getPreviousPlayerHand(storeIndexOne)).toEqual(hand1);
    expect(StoreUtils.getPreviousPlayerHand(storeIndexTwo)).toEqual(hand2);
  })

  it('gets the last hand if we have stood all hands', () => {
    expect(StoreUtils.getPreviousPlayerHand(allHandsStood)).toEqual(hand3);
  });
});

describe('setPlayerHandInList()', () => {
  it('set new player hand', () => {
    expect(StoreUtils.setPlayerHandInList(storeIndexZero, 'TEST'))
      .toEqual(List(['TEST', hand2, hand3]));
    expect(StoreUtils.setPlayerHandInList(storeIndexOne, 'TEST'))
      .toEqual(List([hand1, 'TEST', hand3]));
    expect(StoreUtils.setPlayerHandInList(storeIndexTwo, 'TEST'))
      .toEqual(List([hand1, hand2, 'TEST']));
  });
});

describe('addCardToPlayerHand()', () => {
  it('add card to end of hand', () => {
    expect(
      StoreUtils
        .addCardToPlayerHand(storeIndexZero, 'TEST')
        .get(storeIndexZero.currentPlayerHand)
        .cards
    ).toEqual(hand1.cards.push('TEST'));
  });
});

describe('standPlayerHand()', () => {
  it('stand current player hand', () => {
    expect(StoreUtils.standPlayerHand(storeIndexOne).get(storeIndexOne.currentPlayerHand).stood)
      .toEqual(true);
  });

  it('not stand any other hands', () => {
    expect(StoreUtils.standPlayerHand(storeIndexTwo).get(0).stood).toEqual(false);
    expect(StoreUtils.standPlayerHand(storeIndexTwo).get(1).stood).toEqual(false);
  });
});

describe('standDealerHand()', () => {
  it('stand dealer hand', () => {
    expect(storeIndexOne.dealerHand.stood).toEqual(false);
    expect(StoreUtils.standDealerHand(storeIndexOne).stood).toEqual(true);
  });
});

describe('allPlayerHandsStood()', () => {
  const testListAndExpect = (list, expectToBe) => {
    it('give ${expectToBe} on ${list}', () => {
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