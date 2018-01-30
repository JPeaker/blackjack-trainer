import CardUtils from '../card';
import HandUtils from '../hand';
import { List } from 'immutable';

const expectHandToEqual = (cards, expectedStood = false) => {
  expect(HandUtils.generateHand(cards)).toEqual({
    cards: List(cards.map(card => CardUtils.generateCard(card))),
    bet: 10,
    stood: expectedStood
  });
}

describe('generateHand()', () => {
  it('generates empty hand', () => {
    expectHandToEqual([]);
  });

  it('generates single card hand', () => {
    expectHandToEqual(['5']);
  });

  it('generates multiple card hand', () => {
    expectHandToEqual(['2', '3', 'A']);
  });
});

const expectMaxHandValueOfToBe = (listOfRanks, toBe) => {
  expect(
    HandUtils.getMaxHandValue({
      cards: List(listOfRanks.map((rank) => CardUtils.generateCard(rank))),
      bet: 10,
      stood: false
    })
  ).toEqual(toBe);
}

describe('getMaxHandValue()', () => {
  it('values empty hand as 0', () => {
    expectMaxHandValueOfToBe([], 0);
  });

  it('values single card hands correctly', () => {
    expectMaxHandValueOfToBe(['A'], 11);
    expectMaxHandValueOfToBe(['J'], 10);
    expectMaxHandValueOfToBe(['2'], 2);
  });

  it('values two card hands correctly', () => {
    expectMaxHandValueOfToBe(['A', '4'], 15);
    expectMaxHandValueOfToBe(['A', 'Q'], 21);
    expectMaxHandValueOfToBe(['2', '3'], 5);
    expectMaxHandValueOfToBe(['4', '10'], 14);
  });

  it('values many card hands correctly', () => {
    expectMaxHandValueOfToBe(['A', '2', '3', '4', '5', '6'], 31);
    expectMaxHandValueOfToBe(['Q', 'J', 'K'], 30);
    expectMaxHandValueOfToBe(['Q', '10', '4', '7'], 31);
  });
});

const expectHandValueOfToBe = (listOfRanks, toBe) => {
  expect(
    HandUtils.getHandValue({
      cards: List(listOfRanks.map((rank) => CardUtils.generateCard(rank))),
      bet: 10,
      stood: false
    })
  ).toEqual(toBe);
};

describe('getHandValue()', () => {
  it('values empty hand', () => {
    expectHandValueOfToBe([], 0);
  });

  it('values single card hand', () => {
    expectHandValueOfToBe(['A'], 11);
    expectHandValueOfToBe(['J'], 10);
    expectHandValueOfToBe(['7'], 7);
  });

  it('values hard hands', () => {
    expectHandValueOfToBe(['10', '4'], 14);
    expectHandValueOfToBe(['2', '6'], 8);
    expectHandValueOfToBe(['J', 'Q'], 20);
  });

  it('values soft hands', () => {
    expectHandValueOfToBe(['A', 'A'], 12);
    expectHandValueOfToBe(['A', '2'], 13);
    expectHandValueOfToBe(['3', 'A'], 14);
    expectHandValueOfToBe(['A', 'K'], 21);
    expectHandValueOfToBe(['A', '4', 'A'], 16);
    expectHandValueOfToBe(['5', 'A', 'A', 'A'], 18);
    expectHandValueOfToBe(['A', '6', '6', '5'], 18);
  });
});

const expectIsBlackjackToBe = (hand, isBlackjack) => {
  expect(HandUtils.isBlackjack(HandUtils.generateHand(hand))).toEqual(isBlackjack);
};

describe('isBlackjack()', () => {
  it('identifies blackjack', () => {
    expectIsBlackjackToBe(['A', '10'], true);
    expectIsBlackjackToBe(['A', 'J'], true);
    expectIsBlackjackToBe(['A', 'Q'], true);
    expectIsBlackjackToBe(['A', 'K'], true);
    expectIsBlackjackToBe(['10', 'A'], true);
    expectIsBlackjackToBe(['J', 'A'], true);
    expectIsBlackjackToBe(['Q', 'A'], true);
    expectIsBlackjackToBe(['K', 'A'], true);
  });

  it('identifies non-blackjack', () => {
    expectIsBlackjackToBe([], false);
    expectIsBlackjackToBe(['4'], false);
    expectIsBlackjackToBe(['A'], false);
    expectIsBlackjackToBe(['J'], false);
    expectIsBlackjackToBe(['Q'], false);
    expectIsBlackjackToBe(['K'], false);
    expectIsBlackjackToBe(['10'], false);
    expectIsBlackjackToBe(['10', '10'], false);
    expectIsBlackjackToBe(['10', 'J'], false);
    expectIsBlackjackToBe(['10', 'K'], false);
    expectIsBlackjackToBe(['A', '9'], false);
    expectIsBlackjackToBe(['A', '2'], false);
    expectIsBlackjackToBe(['4', '7'], false);
    expectIsBlackjackToBe(['7', '7'], false);
    expectIsBlackjackToBe(['9', '8', '4'], false);
  });
});

describe('splitHand()', () => {
  const firstEight = { rank: '8', suit: 'spades' };
  const secondEight = { rank: '8', suit: 'diamonds' };
  const firstRandomCard = { rank: '3', suit: 'clubs' };
  const secondRandomCard = { rank: '4', suit: 'hearts' };
  const hands = List([ { cards: List([firstEight, secondEight]), stood: false, bet: 10 } ]);
  const shoe = List([ firstRandomCard, secondRandomCard ]);

  it('works correctly', () => {
    const split = HandUtils.splitHand(0, hands, shoe);
    expect(split.get(0).cards).toEqual(List([ firstEight, firstRandomCard ]));
    expect(split.get(0).stood).toEqual(false);
    expect(split.get(0).bet).toEqual(hands.get(0).bet);
    expect(split.get(1).cards).toEqual(List([ secondEight, secondRandomCard ]));
    expect(split.get(1).stood).toEqual(false);
    expect(split.get(1).bet).toEqual(hands.get(0).bet);
  });
});